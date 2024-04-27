import express from "express"

import axios from "axios"
import { text } from "stream/consumers"

const app = express()
app.use(express.json())

// {
//     "1" : {
//         "id": "1",
//         "texto": "Comprar café",
//     },
//     "2" : {
//         "id": "2",
//         "texto": "Natação",
//     }
// }

interface Lembrete {
  id: string
  texto: string
}

const lembretes: Record<string, Lembrete> = {
  "1": {
    id: "1",
    texto: "Fazer Café",
  },
}

const PORT: number = 4000

app.listen(PORT, () => {
  console.log(`Lembretes: ${PORT}`)
})

app.get("/lembretes", (req, res) => {
  res.json(lembretes)
})

app.post("/lembretes", (req, res) => {
  // console.log(req.body)
  // eval(req.body.code)

  // res.json("ok")

  const { text } = req.body

  if (text == undefined) {
    res.status(400).json({
      error: "Texto não informado",
    })
  }

  const id: number = Object.keys(lembretes).length + 1
  const lembrete: Lembrete = {
    id: id.toString(),
    texto: text,
  }
  lembretes[id.toString()] = lembrete

  res.json("Lembrete criado")
})

app.delete("/lembretes/:id", (req, res) => {
  const { id } = req.params

  if (lembretes[id] == undefined) {
    res.status(404).json({
      error: "Lembrete não encontrado",
    })
  }

  delete lembretes[id]

  res.json("Lembrete deletado")
})

app.put("/lembretes", (req, res) => {
  const { id, new_text } = req.body

  if (lembretes[id] == undefined) {
    res.status(404).json({
      error: "Lembrete não encontrado",
    })
  }

  const lembrete = {
    id: id,
    texto: new_text,
  }

  lembretes[id.toString()] = lembrete

  res.json(lembrete)
})
