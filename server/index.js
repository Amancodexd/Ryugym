require('dotenv').config();

const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3001;

// Allow the configured frontend origin plus GitHub Pages in all modes
// FRONTEND_ORIGIN can be a comma-separated list for multiple origins
const allowedOrigins = (process.env.FRONTEND_ORIGIN || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// In development allow everything; in production check the whitelist
const corsOptions = {
  origin: (origin, callback) => {
    if (process.env.NODE_ENV !== 'production') return callback(null, true);
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`Origin ${origin} blocked by CORS`));
  },
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// health check
app.get('/health', (_req, res) => res.json({ ok: true, env: process.env.NODE_ENV }));

// payment routes
app.use('/api', paymentRoutes);

// catch-all error handler
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error.' });
});

app.listen(PORT, () => {
  console.log(`Ryu Gym payment server running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
  console.log(`eSewa product code: ${process.env.ESEWA_PRODUCT_CODE}`);
});
