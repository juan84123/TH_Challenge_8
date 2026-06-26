// Importamos Express para crear el servidor
const express = require('express')
const app = express()
const PORT = 3000

// Importamos el controlador que maneja la lógica de cada endpoint
const topicController = require('./controllers/topicController')

// Configuramos EJS como motor de plantillas
app.set('view engine', 'ejs')
app.set('views', './views')

// Middleware para leer datos de formularios HTML
app.use(express.urlencoded({ extended: true }))

// Middleware para leer datos JSON (usado por fetch)
app.use(express.json())

// Sirve los archivos de la carpeta public/ al navegador (CSS, JS del cliente)
app.use(express.static('./public'))

// Endpoints
app.get('/', topicController.index)                                    // lista todos los temas
app.get('/topics/new', topicController.newForm)                        // formulario crear tema
app.get('/topics/json', topicController.indexJson)                     // devuelve temas en JSON (para fetch) — va antes de /:id
app.post('/topics', topicController.create)                            // crea un tema nuevo
app.get('/topics/:id', topicController.show)                           // detalle de un tema
app.get('/topics/:id/edit', topicController.editForm)                  // formulario editar tema
app.post('/topics/:id/update', topicController.update)                 // actualiza un tema
app.post('/topics/:id/delete', topicController.remove)                 // elimina un tema
app.post('/topics/:id/vote', topicController.vote)                     // vota por un tema
app.post('/topics/:id/links', topicController.addLink)  // agrega un enlace a un tema
app.post('/topics/:id/links/:linkId/vote', topicController.voteLink)   // vota por un enlace


// Arranca el servidor en el puerto 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})