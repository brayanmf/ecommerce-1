async function createTokenHandler(req, res) {
  return res.status(200).json({ funcionando: "hola" })
}
module.exports = {
  createTokenHandler,
}
