# Handshake — Machine Setup

How to get a second machine (laptop) fully working on this project.

## 1. Get the code + full stack

```bash
git clone <your-handshake-repo-url> Handshake
cd Handshake
npm install
npm run dev   # http://localhost:3000
```

`npm install` rebuilds the entire stack (Next.js, Tailwind, motion, gsap, three, lenis,
shadcn) from `package.json`. Nothing else to install for the app itself.

## 2. Get the project MCPs

The project's MCP servers are defined in [`.mcp.json`](../.mcp.json) and travel with the repo.
When you open this folder in Claude Code, it will detect them and ask you to approve them.

Two of them need secrets, supplied as **OS environment variables** (never committed to git):

| Env var | Used by | Where to get it |
|---|---|---|
| `GEMINI_API_KEY` | nano-banana (AI image gen) | Google AI Studio — or copy from the desktop |
| `MAGIC_21ST_API_KEY` | 21st-dev magic (UI components) | 21st.dev dashboard — or copy from the desktop |

`supabase` is a remote connector — no secret needed, just authorize in the browser the
first time Claude Code connects to it on this machine.

### Set the env vars (Windows, PowerShell — run once, then restart Claude Code)

```powershell
setx GEMINI_API_KEY "your-key-here"
setx MAGIC_21ST_API_KEY "your-key-here"
```

> `setx` writes to your user environment permanently. You must **restart Claude Code**
> (and any terminal) afterward so it picks up the new variables.

### macOS / Linux

```bash
echo 'export GEMINI_API_KEY="your-key-here"' >> ~/.zshrc
echo 'export MAGIC_21ST_API_KEY="your-key-here"' >> ~/.zshrc
source ~/.zshrc
```

## 3. Built-in tools — nothing to do

computer-use, Claude in Chrome, Claude Preview, and visualize ship inside Claude Code
itself. They're available as soon as the app is installed and you're signed in.

## Mental model

| Layer | Travels via | Notes |
|---|---|---|
| App code + stack | git (`package.json`) | `node_modules` is rebuilt, never committed |
| Project MCPs | git (`.mcp.json`) | secrets stay in OS env vars |
| Secrets (API keys) | set manually per machine | never committed |
| Built-in MCP tools | the Claude Code app | install + sign in |
