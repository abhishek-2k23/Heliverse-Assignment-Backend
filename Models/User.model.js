import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    id: { type: Number, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String, required: true },
    available: { type: Boolean, default: true },
    domain: { type: String, required: true },
    gender: { type: String, required: true },
})

const User = mongoose.model("User", userSchema)

export default User
