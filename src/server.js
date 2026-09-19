require('dotenv').config({
  path: './prisma/.env'
});

const express = require('express');
const cors = require('cors');
const path = require('path');

const profileRoutes = require('./routes/profile.routes');
const technologyRoutes = require('./routes/technology.routes');
const projectRoutes = require('./routes/project.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../.agents/public')));


app.use('/api/profiles', profileRoutes);
app.use('/api/technologies', technologyRoutes);
app.use('/api/projects', projectRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});