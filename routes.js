const fs = require('fs');

const requestHandler = (req, res) => {
    //  console.log(req.url, req.method, req.headers);
    const url = req.url
    const method = req.method
    if (url === '/') {
        res.write('<h1>Home page</h1>')
        res.write(`<form action='/message' method='POST'><input type='text' name='message'></input><button>send</button></form>`)
        return res.end();
    }
    if (url === '/page1') {
        res.write('<h1>page 1</h1>')
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        /*
        fs.writeFileSync('message.txt', 'DUMMY');
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end()
        */
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk)
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('='[1]);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end()
            });
        });
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<h1>Hello world</h1>')
    res.end()
};

module.exports = requestHandler;
