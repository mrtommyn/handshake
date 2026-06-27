import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { createAdminClient } from "./supabase/admin";

type Admin = ReturnType<typeof createAdminClient>;

// Helvetica (WinAnsi) can't encode smart quotes / em dashes / emoji; normalise to safe chars.
function clean(s: string) {
  return s
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/[^\x00-\xFF]/g, "");
}

/** Generates the signed agreement PDF, uploads it to Storage, and saves the path. */
export async function generateAgreementPdf(
  admin: Admin,
  agreementId: string,
): Promise<string | null> {
  const { data: ag } = await admin.from("agreements").select("*").eq("id", agreementId).single();
  if (!ag) return null;
  const { data: deal } = await admin.from("deals").select("*").eq("id", ag.deal_id).single();
  const { data: sigs } = await admin
    .from("signatures")
    .select("*")
    .eq("agreement_id", agreementId);

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 56;
  const maxWidth = page.getWidth() - margin * 2;
  let y = page.getHeight() - margin;

  const charcoal = rgb(0.165, 0.137, 0.125);
  const muted = rgb(0.5, 0.45, 0.42);
  const orange = rgb(0.97, 0.51, 0.22);

  function draw(str: string, f: typeof font, size: number, color = charcoal) {
    for (const para of clean(str).split("\n")) {
      if (!para) {
        y -= size * 0.8;
        continue;
      }
      let line = "";
      for (const word of para.split(" ")) {
        const test = line ? `${line} ${word}` : word;
        if (f.widthOfTextAtSize(test, size) > maxWidth && line) {
          page.drawText(line, { x: margin, y, size, font: f, color });
          y -= size * 1.5;
          line = word;
        } else {
          line = test;
        }
      }
      if (line) {
        page.drawText(line, { x: margin, y, size, font: f, color });
        y -= size * 1.5;
      }
    }
  }

  page.drawText("Handshake", { x: margin, y, size: 22, font: bold, color: orange });
  y -= 30;
  draw("Agreement", bold, 14);
  y -= 4;
  draw(`Reference: ${ag.unique_code ?? ""}`, font, 10, muted);
  draw(`Finalised: ${new Date(ag.signed_at ?? Date.now()).toLocaleString()}`, font, 10, muted);
  y -= 14;

  draw(deal?.title ?? "Agreement", bold, 13);
  y -= 6;
  draw(ag.content ?? "", font, 11);
  y -= 18;

  draw("Signatures", bold, 12);
  y -= 6;
  for (const s of sigs ?? []) {
    draw(`${s.signer_name} - signed ${new Date(s.signed_at).toLocaleString()}`, font, 11);
  }
  y -= 16;
  draw("Created with Handshake. Identity verification is recorded in each party's account.", font, 9, muted);

  const bytes = await pdf.save();

  try {
    await admin.storage.createBucket("agreements", { public: false });
  } catch {
    // bucket already exists
  }

  const path = `${agreementId}.pdf`;
  await admin.storage
    .from("agreements")
    .upload(path, Buffer.from(bytes), { contentType: "application/pdf", upsert: true });
  await admin.from("agreements").update({ pdf_path: path }).eq("id", agreementId);

  return path;
}
