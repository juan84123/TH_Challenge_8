const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())

let productos = [
  { 
    id: 1, 
    nombre: 'Laptop', 
    precio: 800 },
  { 
    id: 2, 
    nombre: 'Mouse', 
    precio: 20 }
]

// acá van los endpoints

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

app.get('/productos', (req, res) => {
    res.json(productos);
})

app.get('/productos/:id', (req, res) => {
    const idBuscar =  parseInt(req.params.id);
    let producto = null

    for(let i=0; i < productos.length; i++){
        if(productos[i].id === idBuscar){
            producto = productos[i]
            break
        }
    }
    if (!producto) {
    return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }
    res.json(producto)
})

app.post('/productos', (req, res) => {
    if (productos.length > 0){
        idNuevo = productos[productos.length-1].id + 1 
    }else{
        idNuevo = 1
    }

    const nuevoProducto = {
        id: idNuevo,
        nombre: req.body.nombre,
        precio:req.body.precio,
    }

    productos.push(nuevoProducto)
    res.status(201).json(nuevoProducto);
})

//PUT    /productos/:id    → actualizar uno
app.put('/productos/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id)
    let producto = null
    let lugar = null
    for (let i=0; i < productos.length; i++){
        if(productos[i].id === idBuscar){
            producto = productos[i] // apunta al mismo objeto
            break
        }
    }
    if (!producto){
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }
    producto.nombre = req.body.nombre || producto.nombre
    producto.precio = req.body.precio || producto.precio
    res.json({ mensaje: 'Producto actualizado con éxito', producto })
})

//DELETE /productos/:id    → eliminar uno
app.delete('/productos/:id', (req, res) => {
    const idBuscar = parseInt(req.params.id)
    let indice = -1
    for(let i=0; i< productos.length; i++){
        if(productos[i].id === idBuscar){
            indice = i
            break
        }
    }
    if(indice === -1){
        return res.status(404).json({ mensaje: 'Producto no encontrado' })
    }
    const eliminado = productos.splice(indice, 1);
    res.json({ mensaje: 'Producto eliminado con éxito', producto: eliminado[0] })  

})