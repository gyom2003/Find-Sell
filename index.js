import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import dotenv from "dotenv"
import connecttoMongoose from "./backend/db_script.js"
import { Crud_ref } from "./models/crud_model.js"
dotenv.config()
const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connecttoMongoose()

//display
app.get("/products", async (req, res) => {
    try {
        const result = await Crud_ref.find()
        res.send({
            "message": "get global data", 
            "data": result
        })
    } catch(error) {
        res.status(400).json({ message: 'Error get the data for home', error });
    }
})
//add
app.post("/products", async (req, res) => {
    try {
        const result = await Crud_ref.create(req.body)
        res.send({
            message: "add a crud obj", 
            data: result
        })
    } catch(error) {
        res.status(400).json({ message: 'Error add product', error });
    }
})
//get specific
app.get("/products/:model_id", async (req, res) => {
    const model_id = req.params.model_id
    try {
        const result = await Crud_ref.findById(model_id)
        res.send({
            message: "find crud obj by id", 
            data: result
        })
    } catch(error) {
        res.status(400).json({ message: 'Error get specific product', error });
    }
})
//update
app.put("/products/:model_id", async (req, res) => {
    const model_id = req.params.model_id
    const content_replacement = req.body
    try {
        const result = await Crud_ref.findByIdAndUpdate(model_id, content_replacement, { new: true })
        res.send({
            message: "replace obj with new obj and values", 
            data: result
        })
    } catch(error) {
        res.status(400).json({ message: 'Error update specific product', error });
    }
})
//delete
app.delete("/products/:model_id", async (req, res) => {
    try {
        const result = await Crud_ref.findByIdAndDelete(req.params.model_id);
        if (!result) {
            return res.status(404).send({ message: "Product not found" });
        }
        res.send({
            message: "replace obj with new obj and values", 
            data: result
        })
    } catch(error) {
        console.log("get item error", error)
    }
})


app.listen(port, () => {
    console.log(`app listened from port ${port}`)
})