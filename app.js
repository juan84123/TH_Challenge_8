// Importamos Express — el framework principal que nos permite crear el servidor
const express = require('express')

// Importamos method-override — nos permite simular PUT y DELETE desde formularios HTML
// Los formularios HTML solo soportan GET y POST, este paquete soluciona eso
// Lee el campo ?_method=PUT o ?_method=DELETE en la URL y convierte la solicitud
const methodOverride = require('method-override')

// Importamos path — módulo nativo de Node.js para construir rutas de archivos
// Maneja automáticamente las diferencias entre / (Linux/Mac) y \ (Windows)
const path = require('path')

// Importamos express-ejs-layouts — permite usar un layout base compartido entre todas las vistas
// Sin esto tendríamos que repetir el <head>, navbar y footer en cada archivo EJS
const ejsLayouts = require('express-ejs-layouts')

// Importamos las rutas de temas — acá están definidos todos los endpoints de la app
// El ./ indica que está en la misma carpeta raíz que app.js
const topicRoutes = require('./routes/topicRoutes')

//crear el servidor
const app = express()

//Configuracion de EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
// Activa el sistema de layouts
app.use(ejsLayouts)
app.set('layout', 'layout')

//// leer formularios
app.use(express.urlencoded({ extended: true }))
// leer JSON del fetch
app.use(express.json())
// simular PUT y DELETE
app.use(methodOverride('_method'))
// servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', topicRoutes)

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})