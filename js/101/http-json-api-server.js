const http = require('http');

http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.pathname;
    const isoParam = url.searchParams.get('iso');
    if (isoParam) {
        const date = new Date(isoParam);
        switch (path) {
            case '/api/parsetime':
                const hour = date.getHours();
                const minute = date.getMinutes();
                const second = date.getSeconds();
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(
                    JSON.stringify({
                        hour,
                        minute,
                        second,
                    }));
                break;
            case '/api/unixtime':
                res.writeHead(200, { 'Content-Type': 'application/json' })
                res.end(
                    JSON.stringify({
                        unixtime: date.getTime()
                    }));
                break;
        }
    }
}).listen(Number(process.argv[2]));