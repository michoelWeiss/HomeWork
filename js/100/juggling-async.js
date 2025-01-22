const http = require('http');

function getText(url) {
    return new Promise((resolve, reject) => {
        http.get(url, (response) => {
            let fullText = '';
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                fullText += chunk;
            });
            response.on('end', () => {
                resolve(fullText);
            });
            response.on('error', (err) => {
                reject(err);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function run() {
    try {
        const url1 = await getText(process.argv[2]);
        const url2 = await getText(process.argv[3]);
        const url3 = await getText(process.argv[4]);

        console.log(url1); // Print content from the first URL
        console.log(url2); // Print content from the second URL
        console.log(url3); // Print content from the third URL
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

run();
