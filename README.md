
# Nodepop - Second-Hand Ads API

## 📖 Description

This is the API for the **Nodepop** second-hand item sales service. It allows management of buy/sell product listings, with filtering, pagination, and sorting options. Includes both a **RESTful API** and a **web frontend**.

---

## 📚 Table of Contents

- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Example API Usage](#example-api-usage-with-postman)
  - [Get all ads](#1-get-all-ads)
  - [Filter by tag](#2-filter-by-tag)
  - [Filter by ad type](#3-filter-by-ad-type-sale-or-search)
  - [Filter by price range](#4-filter-by-price-range)
  - [Search by name](#5-search-by-name)
  - [Pagination and sorting](#6-pagination-and-sorting)
  - [Combined filters](#7-combined-filters)
  - [POST: Create new ad](#🔍-post-example-api-usage)
- [Notes](#notes)
- [Extras](#extras)

---

## 🚀 Features

- ✅ **List ads** with filters: tag, ad type (sell/buy), price range, item name.
- ✅ **Create ads** with item details, ad type, tags, and photo.
- ✅ **Pagination** and **sorting**.
- ✅ **Frontend** with EJS templates and filterable UI.
- ✅ **Data validation** with `express-validator`.
- ✅ **Code style checking** with ESLint.

---

## 🧰 Requirements

- **Node.js** (v22.14.0 or higher)
- **MongoDB** (local or cloud)

---

## ⚙️ Installation

Clone the repository:

```sh
git clone <REPOSITORY_URL>
cd nodepop
```

Install dependencies with:

```sh
npm install
```

Initialize the database with:

```sh
npm run initDB
```

Start in development mode:

```sh
npm run dev
```

Access the API at http://localhost:3000.

---

## 🔍 Example API Usage with Postman

Base endpoint:

```sh
GET http://localhost:3000/api/anuncios
```

### 1. Get all ads

```sh
GET /api/anuncios
```

### 2. Filter by tag

```sh
GET /api/anuncios?tag=mobile
```

---

### 3. Filter by ad type (sale or search)

```sh
GET /api/anuncios?sale=true
```

```sh
GET /api/anuncios?sale=false
```

---

### 4. Filter by price range

```sh
GET /api/anuncios?price=50-200
GET /api/anuncios?price=100-
GET /api/anuncios?price=-300
```
---

### 5. Search by name

```sh
GET /api/anuncios?name=iPhone
```

---

### 6. Pagination and sorting

```sh
GET /api/anuncios?start=10&limit=5&sort=-price
```

---

### 7. Combined filters

```sh
GET /api/anuncios?tag=motor&sale=true&price=100-1000&name=h&limit=3&sort=-price
```

---

### 🔍 POST Example API Usage

### 1. Create a new ad (sale)

```sh
POST /api/anuncios
```

#### Request Body (JSON):

```json
{
  "name": "iPhone 12",
  "sale": true,
  "price": 600,
  "photo": "http://example.com/iphone12.jpg",
  "tags": "mobile"
}
```
---

### 2. Create a new ad (wanted item)

#### Request Body (JSON):

```json
{
  "name": "Laptop for sale",
  "sale": false,
  "price": 0,
  "photo": "http://example.com/laptop.jpg",
  "tags": "lifestyle"
}
```
---

### 📌 Notes

- Boolean values (e.g., `sale`) must be passed as strings: `"true"` or `"false"`.
- The `name` filter is case-insensitive and uses a regular expression to match from the start of the string.
- All filters can be combined.

---

🧪 Extras

- ✅ ESLint is used to enforce consistent code style.
You can run it manually using:

```sh
npx slint .
```

---
