import mongoose, {model, Schema} from "mongoose"

const crud_schema = new Schema({
    categorie: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true}, 
    image_ref: {type: Number, required: false},
    is_mine: {type: Boolean, required: false},
})

export const Crud_ref = mongoose.models.Crud_ref || new model("Crud_ref", crud_schema)