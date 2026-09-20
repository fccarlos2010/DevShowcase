function notFoundHandler(req, res) {
  res.status(404).json({
    error: 'Recurso não encontrado',
    message: `A rota ${req.method} ${req.originalUrl} não foi encontrada.`
  });
}

function errorHandler(err, req, res, next) {
  console.error(err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || 'Erro interno do servidor'
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};