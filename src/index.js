const yargs = require('yargs')
const Server = require('./app')


const argv = yargs
    .usage('like-anywhere [options]')
    .option('p', {
        alias: 'port',
        describe: 'port',
        default: '9527'
    })
    .option('h', {
        alias: 'hostname',
        describe: 'host',
        default: '127.0.0.1'
    })
    .option('d', {
        alias: 'root',
        describe: 'root path',
        default: process.cwd()
    })
    .version()
    .option('v', {
        alias:('v','version')
    })
    .help()
    .argv

let server = new Server(argv)


server.start()