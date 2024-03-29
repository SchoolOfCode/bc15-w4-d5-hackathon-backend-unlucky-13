import {promises as fs} from 'node:fs'; // to be able to read/write and work with async functions
import path from "node:path" // providing utilities for working with file and directory paths

import { v4 as uuidv4 } from "uuid" // importing the id function from 3rd party package

const filePath = path.resolve(process.cwd(), "animals.json") // creating an absolute path so we use same path no matter where we are in project

// Function to first construct the animal object, and then add it

export async function addAnimal (animalName, fact, habitat) {
   const animalsJSON = await fs.readFile(filePath, "utf-8"); // reading the JSON file
   const animalList = JSON.parse(animalsJSON); // putting the JSON into format that JS can read - like a translator 
   // creating the new animal:
    const newAnimal = {
      id: uuidv4(),
      animalName,
      fact,
      habitat,
   }
// adds the animal to the end of the array in animals.JSON:
animalList.push(newAnimal);
// translating the data back into json format
await fs.writeFile(filePath, JSON.stringify(animalList, null, 3), "utf-8"); // stringify syntax: the value, the replacer, and then amount of white space
return newAnimal;
}

// GET all animals function
export async function allAnimals () {
    const animalsJSON = await fs.readFile(filePath, "utf-8"); //reading the JSON file
    const animalList = JSON.parse(animalsJSON); // putting the JSON into format that JS can read - like a translator 
    return animalList;
}

// GET animal by ID
export async function animalByID(id) {
    const animalsJSON = await fs.readFile(filePath, "utf-8"); //reading the JSON file
    const animalList = JSON.parse(animalsJSON); // putting the JSON into format that JS can read 


    // search for the animal by id
    for (const animal of animalList) { // animal of animalList. instead of (const i = 0; i < animalList.length; i++)
        // console.log(`loop counter ${animal}`) // debug logger
        if (animal.id === id) {
            return animal;
        }
    
    } 
    //return null if ID not found 
return null; 

    // Return the record
}

// STRETCH GOAL - searching for an animal by name
// retrieve data and search through, use for loop for search
// if match, return animal
// if no match, return error message
/*
export async function animalByName(searchName) {
    const animalsJSON = await fs.readFile(filePath, "utf-8"); //reading the JSON file
    const animalList = JSON.parse(animalsJSON); // putting the JSON into format that JS can read 
    const searchResult = null;
    for (let i = 0; i < animalList.length; i++) {
        if (animalList[i].animalName === searchName) {
        searchResult = animalList[i];
        return searchResult;
        }
    }
    return "We don't have the animal you're searching for :("
}
*/

// Delete animal from our database by ID
export async function deleteAnimal(id) {
    const animalsJSON = await fs.readFile(filePath, "utf-8"); //reading the JSON file
    const animalList = JSON.parse(animalsJSON); // putting the JSON into format that JS can read 

    let animalIndexToBeDeleted = null; 

    // search for the animal by id 
    for (let i = 0; i < animalList.length; i++) { 
    // console.log(`loop counter ${i}`) // debug logger
    if (animalList[i].id === id) {
        animalIndexToBeDeleted = i;
       break;
        }
    }
    if (animalIndexToBeDeleted !== null) {
        const deletedAnimal = animalList.splice(animalIndexToBeDeleted,1); // animal we found in for loop, we are now deleting
        await fs.writeFile(filePath, JSON.stringify(animalList, null, 3), "utf-8"); // stringify syntax: the value, the replacer, and then amount of white space
        return deletedAnimal;
    }
    return null 
}

// PATCH request to update a record
export async function updateAnimaldetails(id, newAnimalName, newFact, newHabitat) {
    const animalsJSON = await fs.readFile(filePath, "utf-8"); //reading the JSON file
    const animalList = JSON.parse(animalsJSON); // putting the JSON into format that JS can read 
    let updatedAnimal = null;
    // find the animal by ID
    for (let i = 0; i < animalList.length; i++) {
        if (animalList[i].id === id) {
            // update required data
            updatedAnimal = animalList[i]
            updatedAnimal.animalName = newAnimalName;
            updatedAnimal.fact = newFact;
            updatedAnimal.habitat = newHabitat;
            break;
    }
    }
    // return the json
    await fs.writeFile(filePath, JSON.stringify(animalList, null, 3), "utf-8");
    return updatedAnimal;
}