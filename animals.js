import {promises as fs} from 'node:fs'; // to be able to read/write and work with async functions
import path from "node:path" // providing utilities for working with file and directory paths

import { v4 as uuidv4 } from "uuid" // importing the id function from 3rd party package

const filePath = path.resolve(process.cwd(), "animals.json") // creating an absolute path so we use same path no matter where we are in project

// 