import express from "express"
import axios from "axios"

import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

app.use(express.json())

const PORT = process.env.PORT_BARRAMENTO || 4002

app.listen(PORT, () => {
  console.log(`Barramento rodando na porta ${PORT}`)
})

app.post("/eventos", (req, res) => {
  const evento = req.body

  axios.post("http://localhost:4000/eventos", evento)
  axios.post("http://localhost:5000/eventos", evento)

  res.end()
})
