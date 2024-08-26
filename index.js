import express from "express"
import dbConnection from "./Configuration/dbConnect.js"
import dotenv from "dotenv"
import cors from "cors"
import router from "./Routers/router.js"

//initialize
const app = express()
dotenv.config()

//middlewares
app.use(express.json({limit: '50mb'}))
app.use(cors())

dbConnection()

app.listen(process.env.DB_PORT, () => {
  console.log("server is up at ", process.env.DB_PORT)
})

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to the Home Route of the Blog App Backend`)
})

//route mounting
app.use("/api", router)
