const axios = require('axios')
var appNode = document.getElementById('app')

appNode.innerHTML = `
    <h2> Welcome </h2>
    </br>
`

async function testApi () {
  var result = await axios.get(`${apiBaseUrl}/api/test`)

  if (result) {
    if (result.data) {
      appNode.innerHTML += `
        <h4>${result.data}</h4>
  
      `
    } else {
      appNode.innerHTML += `
        <h4>the api is not working</h4>
  
      `
    }
  } else {
    appNode.innerHTML += `
        <h4>the api is not working</h4>
  
      `
  }
}

testApi()
