const fs = require('fs');
const path = require('path');

const releaseDir = path.resolve('release');
if (fs.existsSync(releaseDir)) {
  fs.rmSync(releaseDir, { recursive: true, force: true });
}
fs.mkdirSync(releaseDir, { recursive: true });

// 1. Copy compiled frontend (frontend/dist) into release/public
console.log('Copying frontend/dist -> release/public...');
fs.cpSync(path.resolve('frontend/dist'), path.resolve(releaseDir, 'public'), { recursive: true });

// 2. Copy compiled backend (backend/dist) into release/server
console.log('Copying backend/dist -> release/server...');
fs.cpSync(path.resolve('backend/dist'), path.resolve(releaseDir, 'server'), { recursive: true });

// 3. Create minimal production package.json
const pkg = {
  name: 'sree-murugan-sons-standalone',
  version: '1.0.0',
  private: true,
  description: 'Standalone Production Bundle for Sree Murugan Sons',
  main: 'server/server.js',
  scripts: {
    start: 'node server/server.js'
  },
  dependencies: {
    cors: '^2.8.5',
    dotenv: '^16.4.7',
    express: '^4.21.2',
    mongoose: '^9.11.2'
  }
};
fs.writeFileSync(path.resolve(releaseDir, 'package.json'), JSON.stringify(pkg, null, 2));

// 4. Create .env
const envText = 'PORT=5000\nCLIENT_URL=http://localhost:5000\n';
fs.writeFileSync(path.resolve(releaseDir, '.env.example'), envText);
fs.writeFileSync(path.resolve(releaseDir, '.env'), envText);

// 5. Create README.md
const readme = '# Sree Murugan Sons - Standalone Production Bundle\n\n' +
  'This is the consolidated standalone production folder containing both the compiled client UI and the Node.js Express server.\n\n' +
  '## Folder Structure\n' +
  '- `public/` - Compiled static frontend with all 36 brand logos, 4K store gallery, and assets.\n' +
  '- `server/` - Compiled Node.js Express API and database models.\n' +
  '- `package.json` - Production dependencies.\n' +
  '- `.env` - Environment settings (Port, MongoDB connection).\n\n' +
  '## How to Run\n\n' +
  '1. Install production dependencies:\n' +
  '```bash\n' +
  'npm install --omit=dev\n' +
  '```\n\n' +
  '2. Start the server:\n' +
  '```bash\n' +
  'npm start\n' +
  '```\n\n' +
  '3. Open your browser:\n' +
  'Navigate to `http://localhost:5000`\n';
fs.writeFileSync(path.resolve(releaseDir, 'README.md'), readme);

console.log('Standalone bundle created successfully at:', releaseDir);
