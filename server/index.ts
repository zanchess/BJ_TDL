const express = require('express');
const cors = require('cors');

const PORT = 3300;

const app = express();

app.use(cors({
    origin: '*'
}));

app.get('/hello', (req, res) => {
    console.log(req);
    res.send({data: 'Hello world'});
})

app.listen(PORT, () => {
    console.log(`Server started on ${PORT} port`);
})