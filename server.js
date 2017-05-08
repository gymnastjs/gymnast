const express = require('express');
const { join } = require('path');
const http = require('http');
const reload = require('reload');

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static('.'));
app.get('/', (req, res) => res.sendFile(join(__dirname, 'index.html')));

const server = http.createServer(app);

reload(server, app);

server.listen(app.get('port'), () => console.log(`Web server listening on ${app.get('port')}`));
