# Learn It, Love It Inc. 📚

Plataforma educativa donde los usuarios pueden agregar, actualizar y eliminar temas de aprendizaje, agregar enlaces útiles dentro de cada tema, y votar por los más útiles. El contenido se reordena dinámicamente según los votos.

---

## Tecnologías y conceptos

### Node.js
Entorno de ejecución que permite usar JavaScript fuera del navegador — en el servidor. Sin Node.js, JavaScript solo puede correr en el navegador.

### Express
Framework que corre sobre Node.js y simplifica la creación de servidores web. Permite definir rutas, manejar solicitudes HTTP y configurar middlewares con pocas líneas de código.

### EJS (Embedded JavaScript)
Motor de plantillas que permite mezclar HTML con datos del servidor usando etiquetas especiales (`<%= %>`, `<% %>`). El servidor procesa el archivo EJS, inserta los datos y envía HTML puro al navegador.

### Fetch API
Función nativa del navegador que permite enviar solicitudes HTTP en segundo plano sin recargar la página. Se usa para las votaciones en tiempo real.

### Arquitectura MVC
Patrón de diseño que separa el código en tres capas:
- **Model** — maneja los datos (`topicModel.js`)
- **View** — muestra la información (`views/*.ejs`)
- **Controller** — coordina modelo y vistas (`topicController.js`)

---

## Archivos del proyecto

| Archivo | Descripción |
|---|---|
| `app.js` | Punto de entrada — configura Express y define los endpoints |
| `controllers/topicController.js` | Recibe las solicitudes HTTP y coordina modelo y vistas |
| `models/topicModel.js` | Lee y escribe el archivo JSON con los datos |
| `data/topics.json` | Base de datos — array de temas en formato JSON |
| `views/index.ejs` | Página principal con lista de temas ordenados por votos |
| `views/show.ejs` | Detalle de un tema con sus enlaces |
| `views/new.ejs` | Formulario para crear un tema nuevo |
| `views/edit.ejs` | Formulario para editar un tema existente |
| `public/js/main.js` | JavaScript del navegador — maneja votaciones en tiempo real |
| `package.json` | Lista las dependencias del proyecto (como requirements.txt en Python) |
| `package-lock.json` | Registro exacto de las versiones instaladas — no se modifica manualmente |

---

## Instalación

```bash
git clone https://github.com/juan84123/TH_Challenge_8.git
cd TH_Challenge_8
npm install
node app.js
```

Abrí el navegador en `http://localhost:3000`

---

## Endpoints

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/` | Lista todos los temas ordenados por votos |
| GET | `/topics/new` | Formulario para crear tema |
| GET | `/topics/json` | Devuelve temas en JSON para el reordenamiento en tiempo real |
| POST | `/topics` | Crea un tema nuevo |
| GET | `/topics/:id` | Detalle de un tema con sus enlaces |
| GET | `/topics/:id/edit` | Formulario para editar tema |
| POST | `/topics/:id/update` | Actualiza un tema |
| POST | `/topics/:id/delete` | Elimina un tema |
| POST | `/topics/:id/vote` | Incrementa votos de un tema |
| POST | `/topics/:id/links` | Agrega un enlace a un tema |
| POST | `/topics/:id/links/:linkId/vote` | Incrementa votos de un enlace |

---