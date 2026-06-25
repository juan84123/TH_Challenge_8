// Importamos Express para poder usar el Router
const express = require('express')

// Router es un mini-servidor que nos permite definir rutas en un archivo separado
// En vez de definir todo en app.js, lo organizamos acá
const router = express.Router()

// Importamos el controlador para conectar cada ruta con su función correspondiente
// El ../ sube un nivel de carpeta (de routes/ a la raíz) y entra a controllers/
const topicController = require('../controllers/topicController')

// Temas
// GET / — página principal, muestra la lista de todos los temas ordenados por votos
router.get('/', topicController.index)

// GET /topics/new — muestra el formulario para crear un tema nuevo
// OJO: esta ruta va ANTES de /topics/:id porque si fuera después,
// Express interpretaría "new" como un id y llamaría al controlador equivocado
router.get('/topics/new', topicController.newForm)

// POST /topics — recibe los datos del formulario y crea el tema nuevo
router.post('/topics', topicController.create)

// GET /topics/:id — muestra el detalle de un tema específico con sus enlaces
// :id es dinámico — puede ser cualquier número, se lee con req.params.id
router.get('/topics/:id', topicController.show)

// GET /topics/:id/edit — muestra el formulario de edición con los datos actuales del tema
router.get('/topics/:id/edit', topicController.editForm)

// PUT /topics/:id — recibe los datos del formulario y actualiza el tema
// Los formularios HTML no soportan PUT — method-override lo convierte desde POST
router.put('/topics/:id', topicController.update)

// DELETE /topics/:id — elimina el tema
// Los formularios HTML no soportan DELETE — method-override lo convierte desde POST
router.delete('/topics/:id', topicController.remove)

// POST /topics/:id/vote — incrementa el voto de un tema
// No redirige ni renderiza — responde con JSON para el fetch del cliente
router.post('/topics/:id/vote', topicController.vote)

// Enlaces dentro de un tema
// POST /topics/:id/links — agrega un enlace nuevo dentro de un tema específico
// :id identifica el tema al que pertenece el enlace
// Los datos del enlace (url, descripción) vienen en req.body desde el formulario
router.post('/topics/:id/links', topicController.addLink)

// DELETE /topics/:id/links/:linkId — elimina un enlace específico de un tema específico
// Necesita dos parámetros dinámicos:
// :id → identifica el tema
// :linkId → identifica el enlace dentro de ese tema
// method-override lo convierte desde POST porque los formularios no soportan DELETE
router.delete('/topics/:id/links/:linkId', topicController.removeLink)

// POST /topics/:id/links/:linkId/vote — incrementa el voto de un enlace específico
// Igual que la votación de temas pero necesita dos parámetros:
// :id → identifica el tema
// :linkId → identifica el enlace dentro de ese tema
// Responde con JSON para el fetch del cliente — no redirige ni renderiza
router.post('/topics/:id/links/:linkId/vote', topicController.voteLink)

// Exportamos el router para que app.js pueda importarlo con require()
// En Node.js todo lo que querés compartir entre archivos tiene que exportarse explícitamente
// Sin esta línea, app.js haría require('./routes/topicRoutes') y recibiría undefined
module.exports = router