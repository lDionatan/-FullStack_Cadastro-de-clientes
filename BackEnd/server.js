import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client/extension';

const prisma = new PrismaClient()

const app = express()
app.use(express.json())
app.use(cors())


/* cria usuarios */
app.post('/usuarios', async (req, res) => {

    await prisma.user.create({
        data: {

            email: req.body.email,
            nome: req.body.nome,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

/* lista usuarios */
app.get('/usuarios', async (req, res) => {

    let users = []

    if (req, query) {

        user = await prisma.user.findMany({

            where: {
                email: req.query.email,
                nome: req.query.nome,
                age: req.query.age
            }
        })
    } else {

        await prisma.user.findMany()

    }

    res.status(200).json(users)
})

/* edita usuarios */
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {

            id: req.params.id

        },

        data: {

            email: req.body.email,
            nome: req.body.nome,
            age: req.body.age
        }
    })

    res.status(201).json(req.body)
})

/* deleta usuarios */
app.delete('/usuarios/:id', async (req, res) => {

    await prisma.user.delete({

        where: {
            id: req.params.id
        }
    })

    req.status(201).json({ message: "usuario deletado com sucesso !" })
})

app.listen(3000)
