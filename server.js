const http = require('http');
const { getWords } = require('./controllers/words');
const server = http.createServer((req, res)=>{
  if(req.url === '/api/words' && req.method === 'GET') {
    getWords(req, res, process.argv[2], process.argv[3]);
  } else {
    res.writeHead(404, {'Content-type': 'application/json'});
    res.end(JSON.stringify({ message: 'Route not found'}));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, ()=> {
  console.log(`Server running on port ${PORT}`)
});

module.exports = server;