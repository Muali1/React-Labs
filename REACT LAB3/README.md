# E-commerce Demo (React + Vite + Tailwind)

Minimal e-commerce demo built with React, Vite, TailwindCSS and Ant Design. It fetches product data from the public DummyJSON API and demonstrates routing, components, search, pagination and simple forms.

---

## Quick start

1. Install dependencies
```sh
npm install
````

2. Start dev server

```sh
npm run dev
```

3. Build for production

```sh
npm run build
```

4. Preview production build

```sh
npm run preview
```

See scripts and metadata in [package.json](package.json).

---

## Project structure (workspace)

Top-level:

- [index.html](index.html) — app entry HTML
- [vite.config.js](vite.config.js) — Vite config
- [package.json](package.json) — dependencies & scripts
- [eslint.config.js](eslint.config.js) — lint config
- [README.md](README.md)

Source:

- [src/main.jsx](src/main.jsx) — React entry, mounts [`App`](src/App.jsx)
- [src/index.css](src/index.css) — global styles & Tailwind import
- [src/App.jsx](src/App.jsx) — router and top-level routes

Pages (route targets):

- [`Home`](src/pages/Home.jsx) — home page, renders [`Products`](src/components/Products.jsx)
- [`ProductDetail`](src/pages/ProductDetail.jsx) — product detail page (route `/product/:id/:slug/`)
- [`Login`](src/pages/Login.jsx) — login page (uses [`AuthForm`](src/components/AuthForm.jsx))
- [`Register`](src/pages/Register.jsx) — register page (uses [`AuthForm`](src/components/AuthForm.jsx))
- [`NotFound`](src/pages/NotFound.jsx) — 404 page

Components:

- [`Navbar`](src/components/Navbar.jsx) — top navigation
- [`Products`](src/components/Products.jsx) — fetches product list, search, pagination
- [`ProductCard`](src/components/ProductCard.jsx) — card for each product
- [`ProductDetail` page uses Ant Design `Rate`](src/pages/ProductDetail.jsx)
- [`Search`](src/components/Search.jsx) — search box used by [`Products`](src/components/Products.jsx)
- [`AuthForm`](src/components/AuthForm.jsx) — login/register form (client-side validation)
- [`Button`](src/components/Button.jsx) — shared button component

Assets:

- `src/assets/` — images used by auth pages (referenced in [Login.jsx](src/pages/Login.jsx) and [Register.jsx](src/pages/Register.jsx))

---

## Routing

Routes are configured in [`App.jsx`](src/App.jsx):

- `/` → [`Home`](src/pages/Home.jsx)
- `/product/:id/:slug/` → [`ProductDetail`](src/pages/ProductDetail.jsx)
- `/login` → [`Login`](src/pages/Login.jsx)
- `/register` → [`Register`](src/pages/Register.jsx)
- `*` → [`NotFound`](src/pages/NotFound.jsx)

---

## Data fetching

Product data is fetched from the public DummyJSON API:

- Product list: [`Products`](src/components/Products.jsx) calls `GET https://dummyjson.com/products`
- Product detail: [`ProductDetail`](src/pages/ProductDetail.jsx) calls `GET https://dummyjson.com/products/:id`

These are plain axios calls inside the components and the data returned is used directly to render UI.

---

## Styling

- Tailwind is configured via the Vite plugin in [vite.config.js](vite.config.js) and imported in [src/index.css](src/index.css).
- Components use Tailwind utility classes for layout and appearance.
- Ant Design (`antd`) is used for `Rate` and `Pagination` components (see [`ProductCard`](src/components/ProductCard.jsx), [`ProductDetail`](src/pages/ProductDetail.jsx), [`Products`](src/components/Products.jsx)).

---

## Notable components and behavior

- [`Navbar`](src/components/Navbar.jsx)

  - Top navigation with logo, links to `Register` and `Login`, and a cart button (icon from `react-icons`).
  - Links: [`Register`](src/pages/Register.jsx) and [`Login`](src/pages/Login.jsx).

- [`Products`](src/components/Products.jsx)

  - Fetches products on mount and stores them in state.
  - Provides client-side search and pagination.
  - Uses [`Search`](src/components/Search.jsx) for the search form and [`ProductCard`](src/components/ProductCard.jsx) to render each product.
  - Uses `antd`'s [`Pagination`](https://ant.design/components/pagination/) component.

- [`ProductCard`](src/components/ProductCard.jsx)

  - Shows product thumbnail, title, price, short description and rating (`antd`'s `Rate`).
  - Links to product detail route using `slugify`.
  - Uses [`Button`](src/components/Button.jsx`)` for Add To Cart (disabled when out of stock).

- [`ProductDetail`](src/pages/ProductDetail.jsx)

  - Fetches full product by id and renders images, description, rating, tags, stock and controls to change quantity.
  - Uses `Rate` from `antd`, `axios` for fetching and `react-icons` for UI icons.

- [`AuthForm`](src/components/AuthForm.jsx)

  - Shared login/register form. Performs client-side validation for required fields, password confirmation and acceptance of terms (for register).
  - Toggles show/hide password with `react-icons`.

- [`Button`](src/components/Button.jsx)
  - Reusable button component that accepts `children`, `className` and `disabled`.

---

## Dependencies

Major dependencies in [package.json](package.json):

- react, react-dom
- react-router-dom
- axios
- tailwindcss, @tailwindcss/vite
- antd
- react-icons
- slugify

Dev dependencies include Vite, ESLint configs and React plugin.

---

## Known issues and recommended fixes

1. AuthForm navigation

   - Current bug: [`AuthForm`](src/components/AuthForm.jsx) imports and calls `Navigate` like a function. `Navigate` is a component, not a navigation function. Use React Router's `useNavigate` hook instead.
   - Fix: replace `Navigate` usage with `useNavigate`. Example patch below.

2. Minor:
   - Ensure images in `src/assets/` exist and are referenced correctly from [`Login.jsx`](src/pages/Login.jsx) and [`Register.jsx`](src/pages/Register.jsx).
   - Confirm Tailwind v4 plugin usage matches your Tailwind config (this demo imports Tailwind via `@tailwindcss/vite`).

Suggested patch for navigation in [`AuthForm.jsx`](src/components/AuthForm.jsx):

```jsx
// filepath: /home/adhamemam/Documents/Coding/React/day3/ecommerce/src/components/AuthForm.jsx
// ...existing code...
import { useState } from 'react'
// - import { Navigate, Link } from 'react-router-dom'
import { useNavigate, Link } from 'react-router-dom'
// ...existing code...

const AuthForm = ({ action }) => {
  const navigate = useNavigate()
  // ...existing code...

  if (Object.keys(errors).length === 0) {
    if (action === 'register') {
      // - Navigate('/login', { replace: true })
      navigate('/login', { replace: true })
    } else {
      // - Navigate('/', { replace: true })
      navigate('/', { replace: true })
    }
  }
}
// ...existing code...
```

Apply this change in [`src/components/AuthForm.jsx`](src/components/AuthForm.jsx).

---

## File references (open directly)

Top-level:

- [index.html](index.html)
- [vite.config.js](vite.config.js)
- [package.json](package.json)
- [eslint.config.js](eslint.config.js)
- [README.md](README.md)

Source files:

- [src/App.jsx](src/App.jsx) — root router
- [src/main.jsx](src/main.jsx) — mount point
- [src/index.css](src/index.css) — global styles

Pages:

- [src/pages/Home.jsx](src/pages/Home.jsx) — [`Home`](src/pages/Home.jsx)
- [src/pages/ProductDetail.jsx](src/pages/ProductDetail.jsx) — [`ProductDetail`](src/pages/ProductDetail.jsx)
- [src/pages/Login.jsx](src/pages/Login.jsx) — [`Login`](src/pages/Login.jsx)
- [src/pages/Register.jsx](src/pages/Register.jsx) — [`Register`](src/pages/Register.jsx)
- [src/pages/NotFound.jsx](src/pages/NotFound.jsx) — [`NotFound`](src/pages/NotFound.jsx)

Components:

- [src/components/Navbar.jsx](src/components/Navbar.jsx) — [`Navbar`](src/components/Navbar.jsx)
- [src/components/Products.jsx](src/components/Products.jsx) — [`Products`](src/components/Products.jsx)
- [src/components/ProductCard.jsx](src/components/ProductCard.jsx) — [`ProductCard`](src/components/ProductCard.jsx)
- [src/components/Search.jsx](src/components/Search.jsx) — [`Search`](src/components/Search.jsx)
- [src/components/AuthForm.jsx](src/components/AuthForm.jsx) — [`AuthForm`](src/components/AuthForm.jsx)
- [src/components/Button.jsx](src/components/Button.jsx) — [`Button`](src/components/Button.jsx)

---

## Tests & linting

- Lint the codebase:

```sh
npm run lint
```

- There are no unit tests included by default.

---

## Contributing

- Fork the repo or make changes locally.
- Run dev server: `npm run dev`
- Run linter: `npm run lint`
- Open a PR describing the changes.

---

If you want, I can:

- Insert this README into the repository file directly.
- Create a PR with the `AuthForm` navigation fix.
- Add more examples (component prop docs, screenshots, or deployment instructions).
