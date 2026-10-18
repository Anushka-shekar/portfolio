import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import data from "./data/portfolio.js";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Optional MongoDB Atlas storage for contact messages
const Message = mongoose.model("Message", new mongoose.Schema({ name: String, email: String, message: String }, { timestamps: true }));
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB connected")).catch((e) => console.error("MongoDB error:", e.message));
}

// Simple rate limit: 5 messages per hour per IP
const hits = new Map();
function limiter(req, res, next) {
  const now = Date.now();
  const recent = (hits.get(req.ip) || []).filter((t) => now - t < 3600000);
  if (recent.length >= Number(process.env.RATE_LIMIT_MAX || 5)) return res.status(429).json({ error: "Too many messages. Please try again later." });
  hits.set(req.ip, [...recent, now]);
  next();
}

// Forward the message to n8n (email notification, auto-reply, AI triage). Fire-and-forget.
async function notifyN8n(msg) {
  const url = process.env.N8N_WEBHOOK_URL;
  if (!url) return console.warn("[contact] N8N_WEBHOOK_URL is empty, skipping n8n");
  console.log("[contact] forwarding to n8n:", url);
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-webhook-secret": process.env.N8N_WEBHOOK_SECRET || "" },
      body: JSON.stringify(msg),
      signal: AbortSignal.timeout(8000),
    });
    console.log("[contact] n8n responded with status", r.status);
  } catch (e) {
    console.error("n8n webhook failed:", e.message);
  }
}

app.get("/api/health", (_req, res) => res.json({ ok: true }));
app.get("/api/portfolio", (_req, res) => res.json(data));

app.post("/api/contact", limiter, async (req, res) => {
  console.log("[contact] request received from", req.ip);
  const { name = "", email = "", message = "" } = req.body || {};
  const clean = { name: String(name).trim().slice(0, 80), email: String(email).trim().slice(0, 120), message: String(message).trim().slice(0, 2000) };
  if (!clean.name || !clean.message || !/^\S+@\S+\.\S+$/.test(clean.email)) return res.status(400).json({ error: "Please fill in name, a valid email and a message." });
  try {
    if (mongoose.connection.readyState === 1) await Message.create(clean);
    else {
      const file = path.join(__dirname, "messages.json");
      const all = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : [];
      fs.writeFileSync(file, JSON.stringify([...all, { ...clean, at: new Date().toISOString() }], null, 2));
    }
    notifyN8n(clean); // not awaited: the visitor gets a fast response even if n8n is slow
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: "Could not save your message. Please email me directly." });
  }
});

// Production: serve the built React app
const dist = path.join(__dirname, "../client/dist");
if (fs.existsSync(dist)) { app.use(express.static(dist)); app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html"))); }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));