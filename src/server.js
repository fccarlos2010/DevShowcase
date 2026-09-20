require('dotenv').config({
  path: 'prisma/.env'
});

const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');

const profileRoutes = require('./routes/profile.routes');
const projectRoutes = require('./routes/project.routes');
const technologyRoutes = require('./routes/technology.routes');

const {
  notFoundHandler,
  errorHandler
} = require('./middlewares/error.middleware');

const swaggerSpec = require('./swagger');

const app = express();

app.use(cors());
app.use(express.json());

// Servir arquivos da pasta public
app.use(express.static('public'));

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rotas da API
app.use('/api/profiles', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/technologies', technologyRoutes);

// Rota principal da API
app.get('/api', (req, res) => {
  res.json({
    message: 'DevShowcase API funcionando!'
  });
});

// Tratamento de rotas inexistentes
app.use(notFoundHandler);

// Tratamento global de erros
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});