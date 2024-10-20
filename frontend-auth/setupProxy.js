const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth',  // Proxy any requests to /auth
        createProxyMiddleware({
            target: 'http://localhost:5001',  // Backend URL
            changeOrigin: true,
        })
    );
};
