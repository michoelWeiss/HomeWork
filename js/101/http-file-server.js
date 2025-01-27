const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    const fileStream = fs.createReadStream(process.argv[3]); 
    fileStream.on('error', (err) => {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('File not found or error reading file.');
    });

    res.writeHead(200, { 'Content-Type': 'text/plain' });
    fileStream.pipe(res);
  }).listen(process.argv[2], () => {
    console.log(`Server listening on port ${process.argv[2]}`);
  });