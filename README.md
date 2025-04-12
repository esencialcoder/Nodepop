# Nodepop - Second-Hand Ads API

## Description

This is the API for the **Nodepop** second-hand item sales service. It allows management of buy/sell product listings, with filtering, pagination, and sorting options.

## Features

- **List ads** with filters: tag, ad type (sell/buy), price range, item name.
- **Create ads** with item details, ad type (sell or buy), and photo.
- **Pagination** and **sorting** of ads.
- **Frontend** with a web page using EJS that displays the list of ads with filters.

## Requirements

- **Node.js** (v22.14.0 or higher)
- **MongoDB** (local or cloud service)

## Documentation

### Installation:

Clone the repository

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

---

### 2. Filter by tag

Get ads with the `mobile` tag:

```sh
GET /api/anuncios?tag=mobile
```

---

### 3. Filter by ad type (sale or search)

Get sale ads:

```sh
GET /api/anuncios?sale=true
```

Get wanted/search ads:

```sh
GET /api/anuncios?sale=false
```

---

### 4. Filter by price range

Ads priced between 50 and 200:

```sh
GET /api/anuncios?price=50-200
```

Only minimum price:

```sh
GET /api/anuncios?price=100-
```

Only maximum price:

```sh
GET /api/anuncios?price=-300
```

---

### 5. Search by name

Find ads where the name starts with "iPhone":

```sh
GET /api/anuncios?name=iPhone
```

---

### 6. Pagination and sorting

Get 5 ads starting from index 10, sorted by price descending:

```sh
GET /api/anuncios?start=10&limit=5&sort=-price
```

---

### 7. Combined filters

Get sale ads with tag `motor`, price between 100 and 1000, name starting with "h", limited to 3 results, sorted by price descending:

```sh
GET /api/anuncios?tag=motor&sale=true&price=100-1000&name=h&limit=3&sort=-price
```

---

### 📌 Notes

- Boolean values (e.g., `sale`) must be passed as strings: `"true"` or `"false"`.
- The `name` filter is case-insensitive and uses a regular expression to match from the start of the string.
- All filters can be combined.
