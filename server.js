m// server.js
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = 3000; // porta do proxy/frontend

// 1) Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

// 2) Proxy para a API backend: tudo que chegar em /api/* vai para http://localhost:8080/*
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8080',
  changeOrigin: true,
  secure: false,          // dev local; em produção remova
  pathRewrite: { '^/api': '' }, // /api/auth/login -> /auth/login no backend
  cookieDomainRewrite: '',      // remove Domain do Set-Cookie (útil se backend setou Domain=localhost)
  cookiePathRewrite: '/',       // ajusta path caso necessário
  onProxyReq(proxyReq, req) {
    // opcional: log básico das requisições proxied
    console.log(`[proxy] ${req.method} ${req.originalUrl} -> ${proxyReq.path}`);
  },
  onError(err, req, res) {
    console.error('Proxy error:', err);
    res.status(500).send('Proxy error');
  }
}));

app.listen(PORT, () => {
  console.log(`Dev proxy running at http://127.0.0.1:${PORT}`);
  console.log('Serving ./public and proxying /api -> http://localhost:8080');
});
