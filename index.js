const express = require('express'); // import the express package

const db = require("./data/hubs-model.js"); // imports the database file

const server = express(); // creates the server

server.use(express.json()); // add this to make POST & PUT work 
                            // needed to parse JSOnN from the body

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

// the C in CRUDS (Create)
// POST add a hub
server.post('/hubs', (req, res) => {
    // get the data the client sent
    const hubData = req.body; // express does not know how to parse JSON
    console.log('hub data', hubData);
    // call the database & ADD the hub
  db.add(hubData)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(error => {
        console.log("error on POST /hubs", error);
        res.status(500).json({ message: 'error adding the hub' });
    });  
});



// DELETE in CRUDS 
// Remove a hub by its id
server.delete('/hubs/:id', (req, res) => {
    const id = req.params.id;

  db.remove(id)
    .then(removed => {
        if (removed) {
        res.status(200).json({ message: "hubs removed successfully"});
        } else {
            // there was no hub with that id
            res.status(404).json({ message: "hub not found"});
        }
    })
    .catch(error => {
        console.log("error on DELETE /hubs/:id", error);
        res.status(500).json({ message: 'error removing the hub' });
    });  
}); 

// watch for connections on port 4000
const port = 4000;
server.listen(port, () => 
    console.log(`\n ** API up and running on port ${port} ** \n`)
    )

// server.listen(4000, () =>
//   console.log('\n Server running on http://localhost:4000')
// );