const fs = require('fs')
const path = require('path')

const filePath = path.join(__dirname, '../data/topics.json')

// Lee el archivo JSON y devuelve los datos como array
function readData() {
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

// Guarda el array en el archivo JSON
function writeData(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Devuelve todos los temas ordenados por votos (mayor a menor)
function getAll() {
  const topics = readData()
  return topics.sort((a, b) => b.votes - a.votes)
}

// Busca y devuelve un tema por su id
function getById(id) {
  const topics = readData()
  return topics.find(topic => topic.id === parseInt(id))
}

// Crea un tema nuevo y lo agrega al JSON
function create(data) {
  const topics = readData()
  const newTopic = {
    id: Date.now(),
    title: data.title,
    description: data.description,
    votes: 0,
    links: []
  }
  topics.push(newTopic)
  writeData(topics)
  return newTopic
}

// Actualiza el título y descripción de un tema existente
function update(id, data) {
  const topics = readData()
  const index = topics.findIndex(topic => topic.id === parseInt(id))
  topics[index].title = data.title
  topics[index].description = data.description
  writeData(topics)
  return topics[index]
}

// Elimina un tema por su id
function remove(id) {
  let topics = readData()
  topics = topics.filter(topic => topic.id !== parseInt(id))
  writeData(topics)
}

// Incrementa en 1 el voto de un tema
function vote(id) {
  const topics = readData()
  const index = topics.findIndex(topic => topic.id === parseInt(id))
  topics[index].votes++
  writeData(topics)
  return topics[index]
}

// Agrega un enlace nuevo dentro de un tema
function addLink(id, linkData) {
  const topics = readData()
  const index = topics.findIndex(topic => topic.id === parseInt(id))
  const newLink = {
    id: Date.now(),
    url: linkData.url,
    description: linkData.description,
    votes: 0
  }
  topics[index].links.push(newLink)
  writeData(topics)
  return newLink
}

// Elimina un enlace de un tema
function removeLink(id, linkId) {
  const topics = readData()
  const index = topics.findIndex(topic => topic.id === parseInt(id))
  topics[index].links = topics[index].links.filter(link => link.id !== parseInt(linkId))
  writeData(topics)
}

// Incrementa en 1 el voto de un enlace
function voteLink(id, linkId) {
  const topics = readData()
  const topicIndex = topics.findIndex(topic => topic.id === parseInt(id))
  const linkIndex = topics[topicIndex].links.findIndex(link => link.id === parseInt(linkId))
  topics[topicIndex].links[linkIndex].votes++
  writeData(topics)
  return topics[topicIndex].links[linkIndex]
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  vote,
  addLink,
  removeLink,
  voteLink
}