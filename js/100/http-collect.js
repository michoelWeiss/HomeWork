const http = require('http');
const url = process.argv[2];

http.get(url, (response) => {
    let fullString = '';
    let numOfChar = 0;

    response.setEncoding('utf8');
    response.on('data', (chunk) => {
        fullString += chunk;
        numOfChar += chunk.length; 
    });
        response.on('end', () => {
           console.log(numOfChar); 
           console.log(fullString);       
      });

    response.on('error', (err) => {
               console.error('Error:', err.message);
    });
}).on('error', (err) => {
       console.error('Request Error:', err.message);
});