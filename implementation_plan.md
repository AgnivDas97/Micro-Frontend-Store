# Implementation Plan - E-Commerce Micro Frontend Store Enhancement & Scaling

This implementation plan outlines the roadmap and technical steps for upgrading, hardening, and scaling the **E-Commerce Micro Frontend (MFE) Store** architecture (`host-app` + `remote-app`).

## User Review Required

> [!IMPORTANT]
> - **Architecture Scope**: This plan covers expanding the MFE ecosystem by introducing a 3rd Micro Frontend (`auth-app`), centralizing UI design tokens/components, adding automated testing (Vitest & Playwright), and configuring CI/CD deployment.
> - **Port Allocations**: 
>   - Host Shell App (`host-app`): Port `5000`
>   - Remote Cart App (`remote-app`): Port `5001`
>   - Remote Auth App (`auth-app`): Port `5002`

## Open Questions

> [!QUESTION]
> 1. **Target Feature Priority**: Would you prefer starting with the **Auth MFE (`auth-app`)**, establishing **Shared UI Components**, or setting up **Automated E2E Testing** first?
> 2. **Authentication Backend**: Should the Auth MFE mock authentication locally (e.g., mock JWT/LocalStore) or connect to an OAuth provider (e.g., Auth0, Firebase, or custom API)?

---

## Proposed Changes

### 1. New Micro Frontend (`auth-app`) - Port 5002

Create an independent authentication and user profile Micro Frontend exposed via Module Federation.

#### [NEW] [auth-app/package.json](file:///c:/PP/Micro%20FrontEnd/auth-app/package.json)
- Configure Vite, `@originjs/vite-plugin-federation`, React 19, Redux Toolkit, and Tailwind CSS v4.

#### [NEW] [auth-app/vite.config.js](file:///c:/PP/Micro%20FrontEnd/auth-app/vite.config.js)
- Expose `./LoginPage`, `./UserProfileModal`, and `./authSlice` on port `5002`.

#### [NEW] [auth-app/src/components/LoginPage.jsx](file:///c:/PP/Micro%20FrontEnd/auth-app/src/components/LoginPage.jsx)
- User login interface with credentials, OAuth buttons, and token management.

#### [NEW] [auth-app/src/store/authSlice.js](file:///c:/PP/Micro%20FrontEnd/auth-app/src/store/authSlice.js)
- Redux slice managing user state (`user`, `isAuthenticated`, `token`).

---

### 2. Host Application (`host-app`) Federation Integration

Integrate the new Auth MFE into the host navigation and header shell.

#### [MODIFY] [host-app/vite.config.js](file:///c:/PP/Micro%20FrontEnd/host-app/vite.config.js)
- Register `authApp` remote endpoint (`http://localhost:5002/assets/remoteEntry.js`).

#### [MODIFY] [host-app/src/App.jsx](file:///c:/PP/Micro%20FrontEnd/host-app/src/App.jsx)
- Dynamic `React.lazy()` import for `authApp/LoginPage` and `authApp/UserProfileModal`.
- Wrap remote components with dynamic `Suspense` loading fallbacks.

#### [MODIFY] [host-app/src/components/Navbar.jsx](file:///c:/PP/Micro%20FrontEnd/host-app/src/components/Navbar.jsx)
- Render user avatar, login modal trigger, and auth status indicator.

---

### 3. Shared Component & Design System Protocol

Establish unified styling and UI tokens across host and all remote MFEs.

#### [NEW] [shared-ui/components/GlassCard.jsx](file:///c:/PP/Micro%20FrontEnd/shared-ui/components/GlassCard.jsx)
- Reusable glassmorphic wrapper component with dark gradient borders.

#### [NEW] [shared-ui/components/StatusBadge.jsx](file:///c:/PP/Micro%20FrontEnd/shared-ui/components/StatusBadge.jsx)
- Standard badge components for product stock, discounts, and order statuses.

---

### 4. Automated Testing Suite

Ensure federated contract stability across host and remote builds.

#### [NEW] [tests/e2e/mfe-integration.spec.js](file:///c:/PP/Micro%20FrontEnd/tests/e2e/mfe-integration.spec.js)
- Playwright E2E test validating:
  1. Host loading remote cart on port 5001.
  2. Adding products from Host -> Cart MFE state.
  3. Checkout process and sync to Host order history.

#### [NEW] [host-app/src/App.test.jsx](file:///c:/PP/Micro%20FrontEnd/host-app/src/App.test.jsx)
- Vitest unit tests for host rendering and fallback state when remote is offline.

---

## Verification Plan

### Automated Tests
- Run `npm test` across all app directories:
  ```bash
  cd host-app && npm test
  cd remote-app && npm test
  ```
- Execute Playwright E2E testing:
  ```bash
  npx playwright test
  ```

### Manual Verification
1. Launch all MFE services:
   - `remote-app`: `http://localhost:5001`
   - `auth-app`: `http://localhost:5002`
   - `host-app`: `http://localhost:5000`
2. Test adding products to cart, applying promo codes (`SAVE10`), completing checkout, and logging in/out via the Auth MFE.
3. Verify graceful error handling when any remote server is stopped.
