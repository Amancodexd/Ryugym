require('dotenv').config();

const express = require('express');
const cors = require('cors');
const paymentRoutes = require('./routes/payment');

const app = express();
const PORT = process.env.PORT || 3001;

// allow all origins in dev, restrict to frontend domain in production
const corsOptions = process.env.NODE_ENV === 'production'
  ? { origin: process.env.FRONTEND_ORIGIN, methods: ['GET', 'POST'] }
  : { origin: true, methods: ['GET', 'POST'] };

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
