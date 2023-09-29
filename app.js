// Import modules
//import thing from 'thing'
import express from 'express';
import morgan from 'morgan';

// runs the server
const app = express();
const port = 4000;

//imported functions from animals.js
import {
    addAnimal,
    allAnimals,
    animalByID,
    deleteAnimal,
    updateAnimaldetails,
    //animalByName
 } from "./animals.js";


// Middleware
app.use(express.json());
app.use(morgan('Request type: :method, Response time: :response-time ms, Status code: :status, URL: :url')); // logs status

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

// GET request to return all animals
app.get("/animals", async function(req, res){
    // Making response object
    const responseObject = {
        status: 'success',
        data: await allAnimals()
    }
    // Send the response with a 200 code
    return res.status(200).json(responseObject);
})

// Get request to return animal ID
app.get("/animals/:id", async function(req, res){
    // Making response object
    const responseObject = {
        status: 'success',
        data: await animalByID(req.params.id)
    }
    // Send the response with a 200 code
    return res.status(200).json(responseObject);
})

// STRETCH GOAL - searching for an animal by name
// GET request
/*
app.get("/animals?animalName", async function (req, res) {
    
    const responseObject = {
        status: "success",
        data: await animalByName (req.query.animalName)
    }
    return res.status(200).json(responseObject);
})
*/

// Delete request to delete entry by animal ID
app.delete("/animals/:id", async function (req, res) {
    const responseObject = {
        status: "success",
        data: await deleteAnimal (
          req.params.id,
        )
}
    return res.status(200).json(responseObject); 
})

// PATCH request to update a record
app.patch("/animals/:id", async function (req, res) {
    // make response object
    const responseObject = {
        status: 'success',
        data: await updateAnimaldetails (
            req.params.id,
            req.query.newAnimalName,
            req.query.newFact,
            req.query.newHabitat
        )
    }
    // send response with 200 code
    return res.status(200).json(responseObject);
})