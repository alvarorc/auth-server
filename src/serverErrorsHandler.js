const baseErrors = {
  status: '',
  type: 'Status report',
  message: '',
  description: 'No description available.',
  footer: `Node ${process.version} / Express server -`,
};

export function notFoundHandler(req, res) {
  const data = {
    status: 404,
    description: `The resource [${req.originalUrl}] is not available.`,
    resource: req.originalUrl,
  };

  return res
    .status(404)
    .render('404', { ...baseErrors, ...data });
}

export function generalErrorHandler(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? err : {};

  const status = err.status || 500;
  const data = {
    status,
    message: err.message,
    description: err.toString(),
  };

  return res
    .status(status)
    .render('500', { ...baseErrors, ...data });
}
