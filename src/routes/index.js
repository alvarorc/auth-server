import express from 'express';

const router = express.Router();

const pad = (s) => {
  const paded = (s < 10) ? '0' : '';
  return paded + s;
};

const format = (uptime) => {
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  return `${pad(hours)} : ${pad(minutes)} : ${pad(seconds)}`;
};

router.get('/sanity', (req, res) => {
  res.json({
    uptime: format(process.uptime()),
    date: new Date(),
    env: process.env.NODE_ENV,
  });
});

export default router;
