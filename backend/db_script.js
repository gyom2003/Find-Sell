import mongoose from "mongoose"

const connecttoMongoose = async () => {
    await mongoose.connect(process.env.MONGOCO).then((res) => {
        console.log("connected ")
    })
}

export default connecttoMongoose;