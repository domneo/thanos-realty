module.exports = {
  defaultSrc: ["'none'"],

  baseURI: ["'self'"],

  connectSrc: [
    "'self'",
    // Allow localhost websocket only for development
    process.env.NODE_ENV !== "production" ? "ws://localhost:*" : "",
  ],

  fontSrc: ["'self'", "https://use.typekit.net", "https://fonts.gstatic.com"],

  formAction: ["'self'"],

  frameAncestors: [
    "'self'",
    // Allow localhost only for development
    process.env.NODE_ENV !== "production" ? "http://localhost:*" : "",
  ],

  frameSrc: ["'self'"],

  imgSrc: ["'self'", "data:"],

  mediaSrc: ["'self'"],

  prefetchSrc: ["'self'"],

  scriptSrc: [
    "'self'",
    // It is strongly recommended not to use 'unsafe-inline',
    // but until we can figure out how to get Google Tag Manager
    // to work without this, we will have to add it in.
    // NOTE: 'unsafe-inline' is ignored if either a hash or nonce value is present.
    "'unsafe-inline'",

    // Uncomment the next line below if a nonce is required.
    // `'nonce-${module.exports.env.NONCE}'`,

    // 'unsafe-eval' should only be present in development environment
    // Without this, an error would be thrown due to Next.js using `eval()` "to generate and rebuild [eval source maps] during development".
    // See: https://github.com/vercel/next.js/issues/14221#issuecomment-657258278
    process.env.NODE_ENV !== "production" ? "'unsafe-eval'" : "",
  ],

  styleSrc: [
    "'self'",
    "'unsafe-inline'",
    "https://use.typekit.net",
    "https://p.typekit.net",
    "https://fonts.googleapis.com",
  ],
};
