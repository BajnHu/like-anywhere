module.exports = (totalSize, req, res) => {
    const range = req.headers['range']
    if (!range) {
        return {code: 200}
    }

    let sizes = range.match(/bytes=(\d*)-(\d*)/)
    let end = sizes[2] || totalSize - 1
    let start = sizes[1] || totalSize - end
    if (start > end || start < 0 || end > totalSize) {
        return {code: 200}
    }

    res.setHeader('Accept-Range', 'bytes')
    res.setHeader('Content-Range', `bytes ${start}-${end}/${totalSize}`)
    res.setHeader('Content-Length', end - start)

    return {
        code: 206,
        start: parseInt(start),
        end: parseInt(end)
    }

}