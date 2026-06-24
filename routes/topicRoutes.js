const express = require('express')
const router = express.Router()
const topicController = require('../controllers/topicController')

// Temas
router.get('/', topicController.index)
router.get('/topics/new', topicController.newForm)
router.post('/topics', topicController.create)
router.get('/topics/:id', topicController.show)
router.get('/topics/:id/edit', topicController.editForm)
router.put('/topics/:id', topicController.update)
router.delete('/topics/:id', topicController.remove)
router.post('/topics/:id/vote', topicController.vote)

// Enlaces dentro de un tema
router.post('/topics/:id/links', topicController.addLink)
router.delete('/topics/:id/links/:linkId', topicController.removeLink)
router.post('/topics/:id/links/:linkId/vote', topicController.voteLink)

module.exports = router