import connect from 'connect';

const app = connect();

app.use((req, res, next) => {
    const url = new URL(req.url, `http://${req.headers.host}/`);
    const paramString = url.searchParams;
    req.params = Object.fromEntries(paramString.entries());
    next();
});

app.use((req, res, next) => {
    const num1Str = req.params.num1;
    const num2Str = req.params.num2;
    const isValidNumber = (str) => /^-?\d+(\.\d+)?$/.test(str);
    if (!isValidNumber(num1Str) || !isValidNumber(num2Str)) {
        res.statusCode = 400;
        return res.end('Invalid numbers provided.');
    }
    else {
        req.params.num1 = parseFloat(num1Str);
        req.params.num2 = parseFloat(num2Str);
        next();
    }
});

app.use('/add', (req, res) => {
    res.end(`${req.params.num1} + ${req.params.num2} = ${req.params.num1 + req.params.num2}`);
});

app.use('/subtract', (req, res) => {
    res.end(`${req.params.num1} - ${req.params.num2} = ${req.params.num1 - req.params.num2}`);
});

app.use('/makeOperator', (req, res) => {
    let result;
    const num1 = req.params.num1;
    const num2 = req.params.num2;
    const operator = req.params.operator;
    if (['+', '-', '*', '/'].includes(operator)) {                               // the url cant pickup a + it needs to be %2B
        result = new Function('a', 'b', `return a ${operator} b;`)(num1, num2);
    }
    else {
        res.statusCode = 400;
        return res.end('Invalid operator provided.');
    }
    if (operator === '/' && num2 === 0) {
        res.statusCode = 400;
        return res.end('Division by zero is not allowed.');
    }
    res.end(`${num1} ${operator} ${num2} = ${result}`);
});

app.listen(80);