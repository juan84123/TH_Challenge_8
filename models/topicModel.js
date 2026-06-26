// fs permite leer y escribir archivos en el disco
const fs = require('fs')

// path permite construir rutas de archivos sin preocuparnos por / o \
const path = require('path')

// ruta absoluta al archivo JSON que hace de base de datos
const filePath = path.join(__dirname, '../data/topics.json')

// lee el archivo JSON y lo convierte a array de JavaScript
function readData() {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

// convierte el array a JSON y lo guarda en el archivo
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// devuelve todos los temas ordenados por votos de mayor a menor
function getAll() {
  const topics = readData()
  return topics.sort((a, b) => b.votes - a.votes)
}

// busca y devuelve un tema por su id
function getById(id) {
  const topics = readData()
  return topics.find(t => t.id === parseInt(id))
}

// crea un tema nuevo con id autoincremental y lo agrega al JSON
function create(data) {
  const topics = readData()
  const newTopic = {
    id: topics.length > 0 ? topics[topics.length - 1].id + 1 : 1,
    title: data.title,
    description: data.description,
    votes: 0,
    links: []
  }
  topics.push(newTopic)
  writeData(topics)
  return newTopic
}

// actualiza el título y descripción de un tema existente
function update(id, data) {
  const topics = readData()
  const index = topics.findIndex(t => t.id === parseInt(id))
  topics[index].title = data.title
  topics[index].description = data.description
  writeData(topics)
  return topics[index]
}

// elimina un tema del array y guarda el resultado
function remove(id) {
  let topics = readData()
  topics = topics.filter(t => t.id !== parseInt(id))
  writeData(topics)
}

// incrementa en 1 el voto de un tema y guarda
function vote(id) {
  const topics = readData()
  const index = topics.findIndex(t => t.id === parseInt(id))
  topics[index].votes++
  writeData(topics)
  return topics[index]
}

// incrementa en 1 el voto de un enlace dentro de un tema y guarda
function voteLink(topicId, linkId) {
  const topics = readData()
  const topicIndex = topics.findIndex(t => t.id === parseInt(topicId))
  const linkIndex = topics[topicIndex].links.findIndex(l => l.id === parseInt(linkId))
  topics[topicIndex].links[linkIndex].votes++
  writeData(topics)
  return topics[topicIndex].links[linkIndex]
}

// exportamos todas las funciones para que el controlador pueda usarlas
module.exports = { getAll, getById, create, update, remove, vote, voteLink }