export default {
  origin: '*',// process.env.CORS_ALLOWED_ORIGIN,
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization', 'RefreshToken'],
  exposedHeaders: ['Content-Length', 'Content-Type', 'RefreshToken', 'Token'],
};