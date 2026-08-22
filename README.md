# 🛒 E-Commerce Micro Frontend Store

A modern, high-performance E-Commerce application built using **Micro Frontend Architecture** with **Vite**, **React 19**, **Module Federation**, **Redux Toolkit**, and **Tailwind CSS v4**.

![Micro Frontend Architecture](https://img.shields.io/badge/Architecture-Micro%20Frontend-indigo?style=for-the-badge)
![React 19](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-8.1-646CFF?style=for-the-badge&logo=vite)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2.12-764ABC?style=for-the-badge&logo=redux)

---

## 🌟 Overview

This repository demonstrates a production-ready **Micro Frontend (MFE)** pattern splitting an e-commerce platform into independently composable applications:

- 🏠 **Host Application (`host-app`)**: Container shell running on `http://localhost:5000`. Handles primary navigation, home page, product catalog, orders management, dynamic remote cart loading, and auth status integration.
- 🛍️ **Remote Cart Application (`remote-app`)**: Independent Micro Frontend running on `http://localhost:5001`. Exposes the full interactive Shopping Cart page (`./CartPage`) and cart state logic (`./cartSlice`) via **Vite Module Federation**.
- 🔐 **Remote Auth Application (`auth-app`)**: Independent Micro Frontend running on `http://localhost:5002`. Exposes the authentication login view (`./LoginPage`), user profile modal (`./UserProfileModal`), and auth state management (`./authSlice`).

---

## 🏗️ Architecture & Module Federation

```
┌────────────────────────────────────────────────────────────────────────┐
│                      HOST APP (Port 5000)                              │
│  ┌────────────┐  ┌─────────────┐  ┌─────────────┐  ┌────────────────┐  │
│  │ Navigation │  │  Products   │  │ Orders Page │  │ Auth Indicator │  │
│  └────────────┘  └─────────────┘  └─────────────┘  └────────────────┘  │
│         │                                                 │            │
│         ▼ (http://localhost:5001)                         ▼ (5002)     │
│  ┌──────────────────────────────┐              ┌────────────────────┐ │
│  │ <Suspense> Remote Cart MFE   │              │ Remote Auth MFE    │ │
│  └──────────────────────────────┘              └────────────────────┘ │
└─────────┬─────────────────────────────────────────────────┬────────────┘
          │                                                 │
          │ remoteEntry.js                                  │ remoteEntry.js
          ▼                                                 ▼
┌──────────────────────────────┐         ┌──────────────────────────────┐
│    REMOTE CART (Port 5001)   │         │    REMOTE AUTH (Port 5002)   │
│ Exposed:                     │         │ Exposed:                     │
│  - ./CartPage                │         │  - ./LoginPage               │
│  - ./cartSlice               │         │  - ./UserProfileModal        │
│                              │         │  - ./authSlice               │
└──────────────────────────────┘         └──────────────────────────────┘
```

---

## ✨ Features

- **Micro Frontend Integration**: Dynamic component loading over HTTP using `@originjs/vite-plugin-federation`.
- **Interactive Shopping Cart**:
  - Real-time quantity increment/decrement & item removal.
  - Promo code engine with discount presets (`SAVE10`, `TECH20`, `SUPER50`).
  - Interactive Checkout Modal with multiple payment options (Credit Card, PayPal, Pay on Delivery).
  - Dynamic tax, shipping, and total calculations.
- **Product Catalog & Management**: Browse products, view badges, and add items directly to cart.
- **Order Tracking**: Placed orders automatically sync from Remote MFE to Host MFE state.
- **Resilient UI Loading**: React `Suspense` fallback spinner and custom error fallback UI if the remote application becomes unreachable.
- **Modern UI/UX**: Sleek dark mode design, glassmorphism cards, glowing ambient effects, responsive layout, and custom badges.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 19** | Core UI library |
| **Vite 8** | Next-generation frontend build tool |
| **`@originjs/vite-plugin-federation`** | Vite-native Module Federation for MFE architecture |
| **Redux Toolkit & React-Redux** | Centralized global state management |
| **React Router DOM v7** | Client-side routing across host and remote views |
| **Tailwind CSS v4** | Modern utility-first CSS styling |
| **Lucide React** | Premium icon suite |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher

### Installation

Clone the repository and install dependencies for both applications:

```bash
git clone https://github.com/AgnivDas97/Micro-Frontend-Store.git
cd Micro-Frontend-Store

# Install host app dependencies
cd host-app
npm install

# Install remote app dependencies
cd ../remote-app
npm install
```

---

## 🏃 Running the Project

Module Federation requires the remote application to expose `remoteEntry.js`. Follow these steps to run both applications:

### Step 1: Start the Remote Cart App (Port 5001)

Open a terminal window and run:

```bash
cd remote-app
npm run dev
```

> **Note**: In `remote-app`, `npm run dev` builds the production bundle (generating `dist/assets/remoteEntry.js`) and starts Vite's preview server on port `5001`.

### Step 2: Start the Host Shell App (Port 5000)

Open a second terminal window and run:

```bash
cd host-app
npm run dev
```

### Step 3: Access the Application

Open your browser and navigate to:
👉 **`http://localhost:5000`**

- Click on **Products** to browse items and add them to your cart.
- Click on **Cart** to see the **Remote Micro Frontend Cart** dynamically loaded into the host shell!
- Complete a checkout to view orders in **My Orders**.

---

## 📦 Project Structure

```
Micro-Frontend-Store/
├── host-app/                 # Host Shell Application (Port 5000)
│   ├── src/
│   │   ├── components/       # Host components (Navbar, etc.)
│   │   ├── pages/            # HomePage, ProductsPage, OrdersPage
│   │   ├── store/            # Redux store & ordersSlice
│   │   ├── App.jsx           # Lazy loads remoteApp/CartPage
│   │   └── main.jsx
│   ├── vite.config.js        # Configures remoteApp endpoint
│   └── package.json
│
└── remote-app/               # Remote Micro Frontend (Port 5001)
    ├── src/
    │   ├── components/       # Exposed CartPage component
    │   ├── store/            # Exposed cartSlice & store
    │   └── main.jsx
    ├── vite.config.js        # Exposes ./CartPage and ./cartSlice
    └── package.json
```

---

## 🔧 Scripts Reference

### Remote Application (`remote-app`)

- `npm run dev`: Builds the remote bundle and starts preview server on port `5001`.
- `npm run build`: Compiles production build into `dist/`.
- `npm run preview`: Serves `dist/` on port `5001`.
- `npm run dev:standalone`: Runs stand-alone Vite dev server for independent remote UI work.

### Host Application (`host-app`)

- `npm run dev`: Starts host development server on port `5000`.
- `npm run build`: Compiles host production build into `dist/`.
- `npm run preview`: Previews host build on port `5000`.

---

## 📄 License

This project is licensed under the MIT License.
