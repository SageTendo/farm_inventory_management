# 🧺 Farm Tuckshop Inventory Management System

A desktop-based Inventory Management System (IMS) designed for point of sales, management of; products, stock levels, transactions, and reporting. 
With the aim of being offline-first.

---

## 🛠️ Tech Stack

- **Frontend:** [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/)
- **Desktop Runtime:** [Electron](https://www.electronjs.org/)
- **Backend Runtime:** [Node.js](https://nodejs.org/)
- **Database:** [SQLite](https://www.sqlite.org/index.html)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)

---

## ⚙️ Features

- [ ] 📦 Product catalog and stock tracking
- [ ] 💰 Sales and purchase logging
- [ ] 🧾 Transaction history
- [ ] 📊 Dashboard with low-stock alerts
- [ ] 🔍 Product search and category filtering
- [ ] 🧑 Simple responsive UI (Desktop + Web + Mobile friendly)
- [ ] 🗃️ Offline-first using SQLite
- [ ] 🌐 Syncing online for data access anywhere
- [ ] Report export (CSV/PDF)
- [ ] Bulk CSV product imports

---
<!-- 
## 📁 Project Structure

```
.
├── electron/             # Electron main process (window, preload, DB access)
├── src/                  # React frontend (renderer process)
|   |── database          # Drizzle DB setup, ORM Schemas, DTOs, and migration files
│   ├── ui/               # Reusable UI components & Views (Dashboard, Inventory, Sales, etc.)
│   ├── lib/              # APIs and utilities
├── drizzle/              # ORM schema and migration files
├── public/               # Static assets
├── package.json          # Root config for both frontend/backend
├── tailwind.config.ts    # Tailwind configuration
└── tsconfig.json         # TypeScript compiler config
```

--- -->

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- pnpm (or npm/yarn)
- SQLite3

---

### 🔧 Setup

```bash
# Clone the repo
git clone https://github.com/your-user/farm-ims.git
cd farm-ims
```
### 💻 Client setup
Refer to [README.md](./client/README.md)

---

<!-- ### 🏗️ Build

```bash
# Build frontend + Electron
pnpm build
```

Output is in the `dist/` directory.

To create installable packages:

```bash
pnpm electron:pack
```

Or for cross-platform builds (if set up):

```bash
pnpm electron:make
```
--- -->
