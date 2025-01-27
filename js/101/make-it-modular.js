


const filteredFiles = require('./mymodule');

try {
    const files = filteredFiles(process.argv[2], process.argv[3], (err, files) => {
        if (err) {
            console.log('error');
        }
        if (files) {
            files.forEach(f => {
                console.log(f);
            });
        }
    });
}
catch (e) {
    console.error(e);
}
