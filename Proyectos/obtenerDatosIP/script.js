const OPTIONS = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'f8c94def98mshf0e6007223f1261p19361cjsn52c96d2a462a',
    'X-RapidAPI-Host': 'ip-geolocation-and-threat-detection.p.rapidapi.com'
  }
}

const fetchYpInfo = ip => {
  return fetch(`https://ip-geolocation-and-threat-detection.p.rapidapi.com/${ip}`, OPTIONS)
  .then(res => res.json())
  .catch(err => console.error(err))
}

const $form = document.querySelector('#form')
const $input = document.querySelector('#input')
const $submit = document.querySelector('#submit')
const $results = document.querySelector('#results')

$form.addEventListener('submit', async (event) => {
  event.preventDefault()
  const {value} = $input
  if (!value) return 

  $submit.setAttribute('disabled', '')
  $submit.setAttribute('aria-busy', 'true')

  const ipInfo = await fetchYpInfo(value)

  if (ipInfo) {
    $results.innerHTML = JSON.stringify(ipInfo, null, 2) 
  } else {
    $results.innerHTML = "Sin resultados" 
  }

  $submit.removeAttribute('disabled')
  $submit.removeAttribute('aria-busy')
})