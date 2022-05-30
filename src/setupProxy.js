const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/api/**", {
      target:
        "http://bakeshopapp-env-1.eba-bf5dgg3k.us-east-1.elasticbeanstalk.com",
    })
  );
};
