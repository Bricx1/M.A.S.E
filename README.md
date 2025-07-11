# M.A.S.E

This project now includes a Firebase backend. To run the API routes locally you must provide Firebase service account credentials.

## Setup

1. Copy `.env.example` to `.env` and fill in the values from your Firebase service account JSON:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=your-client-email
FIREBASE_PRIVATE_KEY=your-private-key
```

Make sure the private key retains its line breaks. If you store it on a single line, keep the `\n` characters so it can be parsed correctly.

2. Install dependencies and start the dev server:

```
pnpm install
pnpm run dev
```

## Testing the Firebase connection

An endpoint is provided at `/api/firebase/test` which attempts a simple query against Firestore. When the credentials are configured correctly it will respond with:

```json
{ "success": true, "message": "Connected to Firebase" }
```

You can test it with `curl`:

```
curl http://localhost:3000/api/firebase/test
```

If the credentials are invalid or the connection fails the endpoint will return a 500 status with an error message.

