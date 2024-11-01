import express from "express"
import { PORT, mongoDBUrl } from "../backend/config.js";
import mongoose from "mongoose";
import booksRoutes from '../backend/routes/booksRoutes.js'
import cors from 'cors'

const app = express();

//Middleware for parsing request body as JSON
app.use(express.json())

//Middleware for handling CORS POLICY
app.use(cors())

app.get('/', (request, response) => {
    console.log(request)
    return response.status(200).send('Welcome to MERN Stack Tutorial')
})

app.use('/books', booksRoutes)

mongoose
    .connect(mongoDBUrl)
    .then(() => {
        console.log('App connected to database')
        app.listen((PORT), () => {
            console.log(`App is listening to port: ${PORT}`)
        })
    }).catch((error) => {
        console.log(error)
    })