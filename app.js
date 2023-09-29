// Import modules
//import thing from 'thing'
import express from 'express';
import morgan from 'morgan';

// runs the server
const app = express();
const port = 4000;

//imported functions from animals.js
import { addAnimal } from './animals.js';


// Middleware
app.use(express.json());
app.use(morgan('tiny')); // logs status

// Listener
app.listen(port, function (){
    console.log(`Server is now listening on ${port}`)
});

// I'm alive console log for confirmation the server is running
app.get("/", function(req, res) {
    res.send("Hello world, I like pengiuns")
});

// POST request to add an animal to the JSON
app.post("/animals", async function(req, res){
    // Making response object
    const responseObject = {
        status: 'success',
        data: addAnimal(
            req.query.animalName, // Animal name
            req.query.fact, // Animal fact
            req.query.habitat // Animal habitat
        )
    }
    // Send the response with a 201 code
    return res.status(201).json(responseObject);
})