import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ version: '1.0', developer: 'febriyan.aji@gmail.com' });
});
router.get('/healthz', (req, res) => {
  if (mongoose.STATES[mongoose.connection.readyState] !== 'connected') {
    res.status(500).json({ message: 'disconnected from database' });
  }
  res.json({ up: true });
});
export default router;
