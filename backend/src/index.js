require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const moduleRoutes = require('./routes/modules');
const rankingRoutes = require('./routes/ranking');
const gameRoutes = require('./routes/game');
const blogRoutes = require('./routes/blog');
const packagesRoutes = require('./routes/packages');
const marketplaceRoutes = require('./routes/marketplace');
const contactRoutes = require('./routes/contact');
const roadmapRoutes = require('./routes/roadmap');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/auth', authRoutes);
app.use('/api/modules', moduleRoutes);
app.use('/api/ranking', rankingRoutes);
app.use('/api/game', gameRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/packages', packagesRoutes);
app.use('/api/marketplace', marketplaceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/roadmap', roadmapRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`HASHWAR API corriendo en http://localhost:${PORT}`);
});
