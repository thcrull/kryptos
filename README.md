# Kryptos — Electron Password Keeper

> **Kryptos** — a secure, offline-first desktop password manager built with **Electron**.  
> This is a **portfolio project** designed to showcase full-stack desktop app development, security-conscious design, and packaging with Electron.

---

## Tech stack

- **Electron** — desktop shell for cross-platform apps.
- **React + TypeScript** — modern, type-safe UI layer.
- **Vite** — fast build tool for the renderer.

---

## Requirements

- 🔒 Create/open an encrypted Vault (`.kryptos`).
- 🔑 Master password with **Argon2id** (or scrypt fallback).
- 📊 Real-time password strength feedback with **zxcvbn** for master password.
- 🛡️ AES-256-GCM encryption.

---

## Setup (quick start)

```bash
# clone repo
git clone https://github.com/thcrull/kryptos.git
cd kryptos

# install dependencies
npm install

# start in development
npm run dev
```
