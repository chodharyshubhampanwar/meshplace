const notFoundMiddleware = (req, res) => {
  res.status(404).send("does not exist");
};

export default notFoundMiddleware;
