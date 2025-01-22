
const http = require('http');
//console.log(http);
http.get(process.argv[2], (response) => {
    response.setEncoding("utf8");
    response.on('data', (data) => { console.log(data);})

    response.on('error', () => {
        return console.error('could not load url');
    });
});