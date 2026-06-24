const express = require('express')
const methodOverride = require('method-override')
const path = require('path')
const ejsLayouts = require('express-ejs-layouts')
const topicRoutes = require('./routes/topicRoutes')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// Activa el sistema de layouts
app.use(ejsLayouts)
app.set('layout', 'layout')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', topicRoutes)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})