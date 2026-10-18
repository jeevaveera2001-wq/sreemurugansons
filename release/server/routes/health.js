"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        service: 'SREE MURUGAN SONS API',
        version: '1.0.0',
        uptime: process.uptime(),
    });
});
exports.default = router;
