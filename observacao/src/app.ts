import express from "express"

import axios from "axios"
const { v4: uuidv4 } = require("uuid")

const app = express()
app.use(express.json())

interface Observacao {
  id: string // use uuid
  texto: string
  lembreteId: string
}

const observacoes: Record<string, Observacao> = {
  "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d": {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    texto: "Comprar açúcar",
    lembreteId: "1",
  },
}

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 4001
const ENDPOINT_LEMBRETES =
  process.env.ENDPOINT_LEMBRETES || "http://localhost:4000/lembretes"

app.listen(PORT, () => {
  console.log(`Observações: ${PORT}`)
})

app.get("/lembretes/:id/observacoes", (req, resp) => {
  const { id } = req.params

  const observacoes_needed = Object.values(observacoes).filter(
    (observacao) => observacao.lembreteId === id
  )

  resp.json(observacoes_needed)
})

app.post("/lembretes/:id/observacoes", (req, resp) => {
  const { id } = req.params
  const { text } = req.body

  const observacaoId = uuidv4()

  const observacao: Observacao = {
    id: observacaoId,
    texto: text,
    lembreteId: id,
  }

  observacoes[observacaoId] = observacao

  resp.json(observacao)
})

app.delete("/lembretes/:id/observacoes/:lembreteId", (req, resp) => {
  const { id, lembreteId } = req.params
  const { text } = req.body

  delete observacoes[lembreteId]

  resp.json({ message: "Observação deletada" })
})

app.put("/lembretes/:id/observacoes/:lembreteId", (req, resp) => {
  const { id, lembreteId } = req.params
  const { new_text } = req.body

  const observacaoId = uuidv4()

  const observacao: Observacao = observacoes[lembreteId]

  if (observacao == undefined) {
    resp.status(404).json({ error: "Observação não encontrada" })
  }

  observacao.texto = new_text

  observacoes[lembreteId] = observacao

  resp.json(observacao)
})
