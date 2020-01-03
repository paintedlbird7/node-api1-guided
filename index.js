const express = require('express'); // import the express package

const db = require("./data/hubs-model.js"); // imports the database file

const server = express(); // creates the server

server.get('/', (req, res) => {
    res.send({ api: "up & running!"})
});



// the R in CRUDS (Read)
server.get('/hubs', (req, res) => {
    // GET list of hubs, 
    db.find()
    .then (hubs => {
        res.status(200).json(hubs);   
    })
    .catch(error => {
        res
            .status(500)
            .json({message: 'error retrieving hubs'})
    })
});




// watch for connections on port 4000
const port = 4000;
server.listen(port, () => 
    console.log(`\n ** API up and running on port ${port} ** \n`)
    )

// server.listen(4000, () =>
//   console.log('\n Server running on http://localhost:4000')
// );