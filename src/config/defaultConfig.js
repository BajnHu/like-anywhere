module.exports = {
  hostname: '127.0.0.1',
  port: 3333,
  root: process.cwd(),
  compress: /\.(html|js|css|md)/,
  cache: {
    maxAge: 600,
    expires: true,
    cacheControl: true,
    etag: true  
  }
}
