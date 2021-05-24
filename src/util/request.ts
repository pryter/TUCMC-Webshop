import http from "http"

export const request = (command: string) => {

  const data = JSON.stringify({
    API_KEY: process.env.API_KEY,
    command: command
  })

  const options = {
    hostname: 'http://api.shop.mc.triamudom.club',
    port: '80',
    path: '/api/index.php',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
      'Content-Length': data.length
    }
  }

  const req = http.request(options, res => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', d => {
      process.stdout.write(d)
    })
  })

  req.on('error', error => {
    return false
  })

  req.write(data)
  req.end()
}