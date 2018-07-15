const fs = require('fs')
const path = require('path')
const {promisify} = require('util')
const Handlebars = require('handlebars')
const Mime = require('mime-types')
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
const compress = require('./compress')
const range = require('./range')
const isFresh = require('./cache')


const tplPath = path.join(__dirname, '../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())

module.exports = async function (req, res, filePath, conf) {
    try {
        let stats = await stat(filePath)
        if (stats.isFile()) {
            // let extname = path.extname(filePath).split('.').pop().toLowerCase()
            let mimeType = Mime.contentType(filePath)
            res.setHeader('Content-Type', mimeType)

            if (isFresh(stats, req, res)) {
                res.statusCode = 304
                res.end()
                return
            }

            let rs
            let {code, start, end} = range(stats.size, req, res)

            if (code === 200) {
                // 以流的方式读取文件，边读边 输出
                res.statusCode = code
                rs = fs.createReadStream(filePath)
            } else {
                res.statusCode = code
                rs = fs.createReadStream(filePath, {
                    start,
                    end
                })
            }

            if (filePath.toString().match(conf.compress)) {
                rs = compress(rs, req, res)
            }
            rs.pipe(res)
        } else {
            res.setHeader('Content-Type', 'text/html')
            let files = await readdir(filePath)
            let dir = path.relative(conf.root, filePath)
            let prevPath = path.relative(filePath, '../') === '..' ? 'javasript:;' : '../'
            let rootPath = path.relative(conf.root, filePath) === '..' ? 'javasript:;' : "/"
            let data = {
                rootPath,
                prevPath,
                title: path.basename(filePath),
                dir: dir ? `/${dir}` : ''
            }
            data.files = []
            files.map((file, idx) => {
                let filePt = path.join(filePath, file)
                let newData = {
                        file
                    }
                ;(async function () {
                    var sta = await stat(filePt)
                    let mimeType = Mime.lookup(file)
                    let icon = mimeType ? mimeType.split('/').pop() : 'Txt'
                    icon = sta.isFile() ? icon : 'Dir'
                    newData.icon = icon
                    data.files.push(newData)
                    if (idx === files.length - 1) {
                        res.end(template(data))
                    }
                })()
            })
        }
    } catch (err) {
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        console.log('err:' + err)
        res.end(`${filePath} is not a directory or file !`)
    }
}



