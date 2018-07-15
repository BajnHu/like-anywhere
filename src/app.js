const chalk = require('chalk')
const path = require('path')
const route = require('./helper/router')

const conf = require('./config/defaultConfig')

const http = require('http')

const open = require('./helper/open')

class Server {
    constructor(confing) {
        this.conf = Object.assign({}, conf, confing)
    }

    start() {
        const server = http.createServer((req, res) => {
            if (req.url !== "/favicon.ico") {
                const filePath = path.join(this.conf.root, req.url)
                route(req, res, filePath, this.conf)
            }
        })

        server.listen(this.conf.port, this.conf.hostname, () => {
            const addr = `http://${this.conf.hostname}:${this.conf.port}`
            open(addr)
            console.info(`Server started at ${chalk(addr)}`)
        })
    }
}


module.exports = Server




