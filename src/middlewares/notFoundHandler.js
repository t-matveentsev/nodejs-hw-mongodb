export const notFoundHandler = (req, res) => {
  res.status(404).json({
    message: `${res.url} not found`,
  });
};
