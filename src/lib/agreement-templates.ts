export type FieldType = "text" | "money" | "date" | "textarea";

export type TemplateField = {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  required?: boolean;
};

export type AgreementTemplate = {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  /** Builds the deal title from the entered values. */
  title: (f: Record<string, string>) => string;
  /** Renders the agreement in plain English. */
  render: (f: Record<string, string>, p: { initiator: string; counterparty: string }) => string;
};

const money = (v?: string) => (v ? `$${Number(v).toLocaleString()}` : "(amount)");
const or = (v: string | undefined, fallback: string) => (v && v.trim() ? v : fallback);

export const TEMPLATES: AgreementTemplate[] = [
  {
    id: "marketplace_sale",
    name: "Marketplace sale",
    description: "Selling an item like a bike, phone, or furniture.",
    fields: [
      { key: "item", label: "What's being sold", type: "text", placeholder: "Mountain bike", required: true },
      { key: "price", label: "Price", type: "money", placeholder: "420", required: true },
      { key: "condition", label: "Condition", type: "text", placeholder: "Used, good condition" },
      { key: "payment_method", label: "How they'll pay", type: "text", placeholder: "Cash on pickup" },
      { key: "handover", label: "Pickup or delivery", type: "text", placeholder: "Pickup Sat 2pm, 12 Smith St" },
    ],
    title: (f) => or(f.item, "Marketplace sale"),
    render: (f, p) =>
      `This is an agreement between ${p.initiator} (seller) and ${p.counterparty} (buyer).\n\n` +
      `${p.initiator} agrees to sell "${or(f.item, "the item")}" to ${p.counterparty} for ${money(f.price)}.\n` +
      `Condition: ${or(f.condition, "as described")}.\n` +
      `Payment: ${or(f.payment_method, "as agreed")}.\n` +
      `Pickup / delivery: ${or(f.handover, "as agreed")}.`,
  },
  {
    id: "vehicle_sale",
    name: "Vehicle sale",
    description: "Selling a car or motorbike privately.",
    fields: [
      { key: "vehicle", label: "Vehicle (make, model, year)", type: "text", placeholder: "2015 Toyota Corolla", required: true },
      { key: "rego", label: "Rego / plate", type: "text", placeholder: "ABC123" },
      { key: "odometer", label: "Odometer (km)", type: "text", placeholder: "98,000" },
      { key: "price", label: "Price", type: "money", placeholder: "12000", required: true },
      { key: "terms", label: "Condition & terms", type: "textarea", placeholder: "Sold as-is, no warranty." },
      { key: "handover", label: "Handover date & place", type: "text", placeholder: "Sun 10am, 12 Smith St" },
    ],
    title: (f) => or(f.vehicle, "Vehicle sale"),
    render: (f, p) =>
      `This is an agreement between ${p.initiator} (seller) and ${p.counterparty} (buyer).\n\n` +
      `${p.initiator} agrees to sell the vehicle "${or(f.vehicle, "the vehicle")}"` +
      `${f.rego ? ` (rego ${f.rego})` : ""}${f.odometer ? `, odometer ${f.odometer} km` : ""} ` +
      `to ${p.counterparty} for ${money(f.price)}.\n` +
      `Condition & terms: ${or(f.terms, "sold as-is")}.\n` +
      `Handover: ${or(f.handover, "as agreed")}.`,
  },
  {
    id: "friend_loan",
    name: "Friend loan",
    description: "Lending money, with a clear repayment plan.",
    fields: [
      { key: "amount", label: "Amount being lent", type: "money", placeholder: "500", required: true },
      { key: "purpose", label: "What it's for (optional)", type: "text", placeholder: "Car repair" },
      { key: "repayment", label: "How it'll be repaid", type: "textarea", placeholder: "$100 per fortnight, starting next payday", required: true },
      { key: "due_date", label: "Final due date", type: "date" },
    ],
    title: (f) => `Loan of ${money(f.amount)}`,
    render: (f, p) =>
      `This is a loan agreement between ${p.initiator} (lender) and ${p.counterparty} (borrower).\n\n` +
      `${p.initiator} is lending ${money(f.amount)} to ${p.counterparty}` +
      `${f.purpose ? ` for ${f.purpose}` : ""}.\n` +
      `Repayment: ${or(f.repayment, "as agreed")}.\n` +
      `${f.due_date ? `To be fully repaid by ${f.due_date}.` : ""}`,
  },
  {
    id: "rental",
    name: "Rental",
    description: "Renting a room, a whole place, or a short stay.",
    fields: [
      { key: "property", label: "What's being rented", type: "text", placeholder: "Spare room at 12 Smith St", required: true },
      { key: "rent", label: "Rent / fee", type: "money", placeholder: "300", required: true },
      { key: "frequency", label: "Per", type: "text", placeholder: "week / month / night" },
      { key: "start_date", label: "Start date", type: "date", required: true },
      { key: "end_date", label: "End date (if any)", type: "date" },
      { key: "deposit", label: "Deposit / bond (optional)", type: "money", placeholder: "300" },
      { key: "terms", label: "House rules / conditions", type: "textarea", placeholder: "No smoking. Bills split evenly." },
    ],
    title: (f) => or(f.property, "Rental"),
    render: (f, p) =>
      `This is a rental agreement between ${p.initiator} (provider) and ${p.counterparty} (renter).\n\n` +
      `${p.initiator} agrees to rent "${or(f.property, "the property")}" to ${p.counterparty} ` +
      `for ${money(f.rent)}${f.frequency ? ` per ${f.frequency}` : ""}.\n` +
      `Starts: ${or(f.start_date, "as agreed")}${f.end_date ? `, ends: ${f.end_date}` : ""}.\n` +
      `${f.deposit ? `Deposit / bond: ${money(f.deposit)}.\n` : ""}` +
      `Conditions: ${or(f.terms, "as agreed")}.`,
  },
  {
    id: "custom",
    name: "Custom agreement",
    description: "Anything else, written in your own words.",
    fields: [
      { key: "title", label: "Title of the agreement", type: "text", placeholder: "Lawn mowing arrangement", required: true },
      { key: "terms", label: "The agreement, in your own words", type: "textarea", placeholder: "Describe what each person is agreeing to.", required: true },
    ],
    title: (f) => or(f.title, "Custom agreement"),
    render: (f, p) =>
      `This is an agreement between ${p.initiator} and ${p.counterparty}.\n\n` +
      `${or(f.title, "Agreement")}\n\n${or(f.terms, "")}`,
  },
];

export function getTemplate(id: string): AgreementTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}
