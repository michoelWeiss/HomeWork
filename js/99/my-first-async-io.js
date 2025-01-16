const fs = require('fs');

fs.readFile(process.argv[2], (err, data) =>{
    if(err)
        console.log('there was an error');
    const file = data.toString();
    const lines = file.split('\n').length - 1;
    console.log(lines);
});