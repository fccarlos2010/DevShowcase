const prisma = require('../lib/prisma');

async function createTechnology(req, res) {
  try {
    const { name } = req.body;

    const technology = await prisma.technology.create({
      data: {
        name
      }
    });

    res.status(201).json(technology);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao criar tecnologia'
    });
  }
}

async function getTechnologies(req, res) {
  try {
    const technologies = await prisma.technology.findMany();

    res.json(technologies);
  } catch (error) {
    res.status(500).json({
      error: 'Erro ao buscar tecnologias'
    });
  }
}

module.exports = {
  createTechnology,
  getTechnologies
};