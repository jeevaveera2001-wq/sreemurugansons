# Sree Murugan Sons - Standalone Production Bundle

This is the consolidated standalone production folder containing both the compiled client UI and the Node.js Express server.

## Folder Structure
- `public/` - Compiled static frontend with all 36 brand logos, 4K store gallery, and assets.
- `server/` - Compiled Node.js Express API and database models.
- `package.json` - Production dependencies.
- `.env` - Environment settings (Port, MongoDB connection).

## How to Run

1. Install production dependencies:
```bash
npm install --omit=dev
```

2. Start the server:
```bash
npm start
```

3. Open your browser:
Navigate to `http://localhost:5000`
