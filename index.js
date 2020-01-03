const express = require('express'); // import the express package

const server = express(); // creates the server

server.get('/', (req, res) => {
    res.send({ api: "up & running!"})
});

// watch for connections on port 4000
server.listen(4000, () =>
  console.log('\n Server running on http://localhost:4000')
);

