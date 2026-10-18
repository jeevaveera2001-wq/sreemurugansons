"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("./config/db.js");
const health_js_1 = __importDefault(require("./routes/health.js"));
const quotes_js_1 = __importDefault(require("./routes/quotes.js"));
const products_js_1 = __importDefault(require("./routes/products.js"));
const contact_js_1 = __importDefault(require("./routes/contact.js"));
const auth_js_1 = __importDefault(require("./routes/auth.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Connect to MongoDB
(0, db_js_1.connectDB)();
// Middleware
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL || 'http://localhost:3000',
    credentials: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Request Logger
app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
    next();
});
const path_1 = __importDefault(require("path"));
// API Routes
app.use('/api/health', health_js_1.default);
app.use('/api/quotes', quotes_js_1.default);
app.use('/api/products', products_js_1.default);
app.use('/api/contact', contact_js_1.default);
app.use('/api/admin', auth_js_1.default);
// 404 Handler for unknown API endpoints
app.use('/api/*', (_req, res) => {
    res.status(404).json({ error: 'API endpoint not found' });
});
// Serve production static frontend assets if public directory exists
const publicPath = path_1.default.resolve(__dirname, process.env.PUBLIC_DIR || '../public');
app.use(express_1.default.static(publicPath));
// Fallback to index.html for client-side routing
app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api'))
        return next();
    res.sendFile(path_1.default.join(publicPath, 'index.html'), (err) => {
        if (err) {
            next();
        }
    });
});
// Start Server
app.listen(PORT, () => {
    console.log(`🚀 SREE MURUGAN SONS Backend (Node.js/Express/MongoDB) running on http://localhost:${PORT}`);
    console.log(`   - Health:   http://localhost:${PORT}/api/health`);
    console.log(`   - Quotes:   http://localhost:${PORT}/api/quotes/estimate?sqft=1200`);
    console.log(`   - Products: http://localhost:${PORT}/api/products/categories`);
    console.log(`   - Contact:  http://localhost:${PORT}/api/contact/info`);
});
