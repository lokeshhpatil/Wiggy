# Mistakes and fixes log

## Backend

### Auth service
- Fixed cookie settings to use `sameSite: "lax"` and make `secure` conditional on production, which keeps cookie auth compatible in local development.
- Removed the fallback header-based token lookup so authentication now consistently relies on cookies only.
- Corrected the JWT helper to accept both `ObjectId` and plain string IDs for safer token generation.
- Kept the existing login, Google login, role update, and profile routes intact while making them work with the cookie-based flow.

### Restaurant service
- Corrected the restaurant route definitions so the frontend calls the intended endpoints at `/api/v0/restaurants/`.
- Kept the restaurant auth middleware aligned with the cookie-based token flow and removed the header fallback.
- Fixed the restaurant controller responses to use explicit status codes for create and fetch operations.

## Frontend

### Auth flow
- Removed the incorrect reliance on token storage assumptions from the client-side auth service setup.
- Adjusted the app context to handle profile loading with the backend’s cookie-based response more safely.
- Kept the Google login flow intact while aligning it with the backend’s cookie-based session handling.

### Role selection and routing
- Fixed the role-selection page type handling and error display so role updates behave more predictably.
- Corrected the protected-route role mapping to use a type-safe partial record.
- Cleaned up the restaurant page so the build remains error-free.

## Notes
- No new features were added; the work focused on improving and correcting the existing implementation.
- The project now builds successfully for the auth, restaurant, and frontend apps.
