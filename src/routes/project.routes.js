const express = require('express');

const {
  createProject,
  getProjects,
  upvoteProject,
  createFeedback
} = require('../controllers/project.controller');

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Lista os projetos
 *     description: Retorna uma lista paginada de projetos, com possibilidade de filtrar por tecnologia.
 *     tags:
 *       - Projetos
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número da página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Quantidade de projetos por página
 *       - in: query
 *         name: technology
 *         schema:
 *           type: string
 *         description: Nome da tecnologia para filtrar os projetos
 *     responses:
 *       200:
 *         description: Lista de projetos retornada com sucesso
 *       400:
 *         description: Parâmetros inválidos
 */
router.get('/', getProjects);

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Cria um novo projeto
 *     tags:
 *       - Projetos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - url
 *               - profileId
 *             properties:
 *               title:
 *                 type: string
 *                 example: DevShowcase
 *               description:
 *                 type: string
 *                 example: Projeto desenvolvido para apresentar trabalhos e tecnologias.
 *               url:
 *                 type: string
 *                 example: https://github.com/
 *               profileId:
 *                 type: integer
 *                 example: 1
 *               technologyIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1]
 *     responses:
 *       201:
 *         description: Projeto criado com sucesso
 *       400:
 *         description: Dados inválidos
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/', createProject);

/**
 * @swagger
 * /api/projects/{id}/feedbacks:
 *   post:
 *     summary: Cadastra um feedback para um projeto
 *     tags:
 *       - Feedbacks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rating
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               comment:
 *                 type: string
 *                 example: Excelente projeto!
 *     responses:
 *       201:
 *         description: Feedback criado com sucesso
 *       400:
 *         description: Nota inválida
 *       404:
 *         description: Projeto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.post('/:id/feedbacks', createFeedback);

/**
 * @swagger
 * /api/projects/{id}/upvote:
 *   put:
 *     summary: Registra um upvote no projeto
 *     tags:
 *       - Projetos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do projeto
 *     responses:
 *       200:
 *         description: Upvote registrado com sucesso
 *       404:
 *         description: Projeto não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
router.put('/:id/upvote', upvoteProject);

module.exports = router;