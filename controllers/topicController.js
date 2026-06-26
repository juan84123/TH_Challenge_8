// importamos el modelo para acceder a los datos
const topicModel = require('../models/topicModel')

// obtiene todos los temas ordenados y renderiza la página principal
function index(req, res) {
  const topics = topicModel.getAll()
  res.render('index', { topics })
}

// renderiza el formulario para crear un tema nuevo
function newForm(req, res) {
  res.render('new')
}

// recibe los datos del formulario, crea el tema y redirige al inicio
function create(req, res) {
  topicModel.create(req.body)
  res.redirect('/')
}

// busca un tema por id y renderiza su página de detalle
function show(req, res) {
  const topic = topicModel.getById(req.params.id)
  res.render('show', { topic })
}

// busca un tema por id y renderiza el formulario de edición con sus datos
function editForm(req, res) {
  const topic = topicModel.getById(req.params.id)
  res.render('edit', { topic })
}

// recibe los datos del formulario, actualiza el tema y redirige al inicio
function update(req, res) {
  topicModel.update(req.params.id, req.body)
  res.redirect('/')
}

// elimina un tema y redirige al inicio
function remove(req, res) {
  topicModel.remove(req.params.id)
  res.redirect('/')
}

// incrementa el voto de un tema y responde con JSON (para fetch)
function vote(req, res) {
  const topic = topicModel.vote(req.params.id)
  res.json({ votes: topic.votes })
}

// incrementa el voto de un enlace y responde con JSON (para fetch)
function voteLink(req, res) {
  const link = topicModel.voteLink(req.params.id, req.params.linkId)
  res.json({ votes: link.votes })
}

// devuelve todos los temas en JSON para que main.js pueda reordenar las tarjetas
function indexJson(req, res) {
  const topics = topicModel.getAll()
  res.json(topics)
}

// exportamos todas las funciones para que app.js pueda usarlas
module.exports = { index, newForm, create, show, editForm, update, remove, vote, voteLink, indexJson }