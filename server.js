const express = require('express');
const app = express();
const PORT = 8080;
const path = require('path');


app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});


app.get('/bad-request', (req, res, next) => {
    const error = new Error('Bad Request');
    error.status = 400;
    console.log('Bad Request routen är nådd, här tar det stôpp');
    next(error);
});

app.get('/server-error', (req, res, next) => {
    const error = new Error('Internal Server Error');
    error.status = 500;
    console.log('Server Error rounten funnen');
    next(error);
});


app.use((err, req, res, next) => {
    console.error(`Error occurred: ${err.message}`);
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

