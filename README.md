# EC Store

EC Store is a small e-commerce web application built with React, TypeScript, and Vite. The project was created as a practice app to work with product data, routing, cart state, form validation, and a simple checkout flow.

## Features

- Product catalog loaded from Fake Store API
- Product search by title
- Category filtering
- Price sorting from low to high and high to low
- Product details page
- Shopping cart with quantity controls
- Cart total calculation
- Login flow with local storage
- Protected checkout page
- Checkout form with validation
- Light and dark theme toggle
- Responsive layout for desktop and mobile screens

## Tech Stack

- React
- TypeScript
- Vite
- React Router
- Zustand
- TanStack Query
- React Hook Form
- CSS

## What I Practiced

This project helped me practice building a React application with multiple pages and shared state. I focused on connecting API data to the UI, organizing components, working with forms, and keeping the cart and authentication logic separate from the page components.

## Getting Started

### Prerequisites

- Node.js
- npm

### Installation

```bash
npm install
```

### Run the Project

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Project Structure

```text
src/
  features/
    products/
      ui/
  pages/
  shared/
    api/
    types/
    ui/
  store/
```

## API

The product data is fetched from:

```text
https://fakestoreapi.com/products
```

## Notes

This is a learning project, so the authentication and order creation are simplified. Login data is stored locally, and checkout creates a local order number instead of sending the order to a backend server.
