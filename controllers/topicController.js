// Importamos el modelo para poder usar sus funciones de datos
// El controlador no sabe cómo se guardan los datos — solo le pide al modelo que lo haga
// El ../ sube un nivel de carpeta (de controllers/ a la raíz) y entra a models/
const topicModel = require('../models/topicModel')

// Muestra la lista de todos los temas ordenados por votos
function index(req, res) {
  const topics = topicModel.getAll()
  //Cuando tiene que mostrar una página
  res.render('index', { topics })
}

// Muestra el formulario para crear un tema nuevo
function newForm(req, res) {
  //Cuando tiene que mostrar una página
  res.render('new')
}

// Recibe los datos del formulario y crea el tema
function create(req, res) {
  topicModel.create(req.body)
  //Cuando tiene que mostrar una página
  res.redirect('/')
}

// Muestra el detalle de un tema con sus enlaces
function show(req, res) {
  const topic = topicModel.getById(req.params.id)
  //Cuando tiene que mostrar una página
  res.render('show', { topic })
}

// Muestra el formulario para editar un tema
function editForm(req, res) {
  const topic = topicModel.getById(req.params.id)
  //Cuando tiene que mostrar una página
  res.render('edit', { topic })
}

// Recibe los datos del formulario y actualiza el tema
function update(req, res) {
  topicModel.update(req.params.id, req.body)
  //Cuando termina una acción (crear, editar, eliminar)
  res.redirect('/')
}

// Elimina un tema
function remove(req, res) {
  topicModel.remove(req.params.id)
  //Cuando termina una acción (crear, editar, eliminar)
  res.redirect('/')
}

// Incrementa el voto de un tema y responde con JSON
function vote(req, res) {
  const topic = topicModel.vote(req.params.id)
  //Cuando responde a un fetch (votaciones)
  res.json({ votes: topic.votes })
}

// Agrega un enlace a un tema
function addLink(req, res) {
  topicModel.addLink(req.params.id, req.body)
  //Cuando termina una acción (crear, editar, eliminar)
  res.redirect('/topics/' + req.params.id)
}

// Elimina un enlace de un tema
function removeLink(req, res) {
  topicModel.removeLink(req.params.id, req.params.linkId)
  //Cuando termina una acción (crear, editar, eliminar)
  res.redirect('/topics/' + req.params.id)
}

// Incrementa el voto de un enlace y responde con JSON
function voteLink(req, res) {
  const link = topicModel.voteLink(req.params.id, req.params.linkId)
  //Cuando responde a un fetch (votaciones)
  res.json({ votes: link.votes })
}

module.exports = {
  index,
  newForm,
  create,
  show,
  editForm,
  update,
  remove,
  vote,
  addLink,
  removeLink,
  voteLink
} 