import {promises as fs} from 'node:fs'; // to be able to read/write and work with async functions
import path from "node:path" // providing utilities for working with file and directory paths

import { v4 as uuidv4 } from "uuid" // importing the id function from 3rd party package

const filePath = path.resolve(process.cwd(), "animals.json") // creating an absolute path so we use same path no matter where we are in project

// Function to first construct the animal object, and then add it

async function addAnimal (animalName, fact, habitat) {
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

addAnimal("koi fish", "the oldest koi fish lived to around 200 years old", "ponds and rivers");