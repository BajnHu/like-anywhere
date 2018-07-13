const chalk = require('chalk')
const path = require('path')
const route = require('./helper/router')

const conf = require('./config/defaultConfig')

const http = require('http')

const server = http.createServer((req, res) => {
  if(req.url!=="/favicon.ico"){
    const filePath = path.join(conf.root, req.url)
    route(req, res, filePath)
  }
})

server.listen(conf.port, conf.hostname, () => {
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`Server started at ${chalk(addr)}`)
})





