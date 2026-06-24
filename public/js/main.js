document.addEventListener('DOMContentLoaded', () => {

  const voteButtons = document.querySelectorAll('.vote-btn')

  voteButtons.forEach(button => {

    button.addEventListener('click', () => {

      const type = button.getAttribute('data-type')
      const topicId = button.getAttribute('data-id')
      const linkId = button.getAttribute('data-link-id')

      let url = ''
      let counterId = ''

      if (type === 'topic') {
        url = '/topics/' + topicId + '/vote'
        counterId = 'votes-topic-' + topicId
      } else {
        url = '/topics/' + topicId + '/links/' + linkId + '/vote'
        counterId = 'votes-link-' + linkId
      }

      fetch(url, { method: 'POST' })
        .then(res => res.json())
        .then(data => {
          document.getElementById(counterId).textContent = data.votes + ' votos'
        })

    })

  })

})