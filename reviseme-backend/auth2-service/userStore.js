const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    // Proxy API calls to the backend
    app.use(
        '/api',
        createProxyMiddleware({
            target: process.env.REACT_APP_API_URL || 'http://localhost:5002',
            changeOrigin: true, // Necessary for virtual hosted sites
        })
    );

    // Proxy authentication requests to the Google authentication server
    app.use(
        '/auth',
        createProxyMiddleware({
            target: process.env.REACT_APP_AUTH_URL || 'http://localhost:5003',
            changeOrigin: true, // Necessary for virtual hosted sites
        })
    );
};
