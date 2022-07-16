import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ version: '1.0', developer: 'febriyan.aji@gmail.com' });
});
router.get('/healthz', (req, res) => {
  res.json({ success: true });
});
export default router;
