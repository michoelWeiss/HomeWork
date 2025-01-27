
const net = require('net');

const server = net.createServer((socket) => {
    const dataTime = new Date();
    const year = dataTime.getFullYear();
    const month = (dataTime.getMonth() + 1).toString().padStart(2, '0');
    const date = dataTime.getDate().toString().padStart(2, '0');
    const hours = dataTime.getHours().toString().padStart(2, '0');
    const minutes = dataTime.getMinutes().toString().padStart(2, '0');
  
    socket.end(`${year}-${month}-${date} ${hours}:${minutes}\n`);
}).listen(process.argv[2]);