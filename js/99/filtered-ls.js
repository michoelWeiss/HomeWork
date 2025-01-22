const fs = require('fs');

fs.readdir(process.argv[2], (err, list) => {
    if (err) {
        console.log('there was an error');
        return;
    }
    list.forEach(file => {
        const lastDot = file.lastIndexOf('.');
        if (lastDot > -1) {
            const extention = file.slice(lastDot + 1);
            if (extention === process.argv[3])
                console.log(file);
        }
    });
});
