// JavaScript que corre en el navegador después de que la página cargó
document.addEventListener('DOMContentLoaded', () => {

  // seleccionamos todos los botones de votar de la página
  const voteButtons = document.querySelectorAll('.vote-btn')

  // agregamos un listener de clic a cada botón
  voteButtons.forEach(button => {
    button.addEventListener('click', () => {

      // leemos los atributos data del botón para saber qué votar
      const type = button.getAttribute('data-type')       // "topic" o "link"
      const topicId = button.getAttribute('data-id')      // id del tema
      const linkId = button.getAttribute('data-link-id')  // id del enlace (solo si es link)

      let url = ''
      let counterId = ''

      // construimos la URL y el id del contador según el tipo de voto
      if (type === 'topic') {
        url = '/topics/' + topicId + '/vote'
        counterId = 'votes-topic-' + topicId
      } else {
        url = '/topics/' + topicId + '/links/' + linkId + '/vote'
        counterId = 'votes-link-' + linkId
      }

      // enviamos el voto al servidor sin recargar la página
      fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(data => {

          // actualizamos el contador en pantalla con el nuevo valor
          document.getElementById(counterId).textContent = data.votes + ' votos'

          // si votamos un tema, reordenamos las tarjetas en pantalla
          if (type === 'topic') {

            // pedimos la lista de temas ordenada al servidor
            fetch('/topics/json')
              .then(res => res.json())
              .then(topics => {

                // activamos flexbox para poder controlar el orden visualmente
                const contenedor = document.querySelector('h1').parentElement
                contenedor.style.display = 'flex'
                contenedor.style.flexDirection = 'column'

                // asignamos el order CSS a cada tarjeta según el orden del servidor
                for (let i = 0; i < topics.length; i++) {
                  const id = topics[i].id
                  const tarjeta = document.querySelector('.card [data-id="' + id + '"]').closest('.card')
                  tarjeta.style.order = i
                }

              })
          }

        })
    })
  })

})