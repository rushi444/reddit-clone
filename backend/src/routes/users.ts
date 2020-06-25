import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export const userRouter = Router()

// Gets all users
userRouter.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    return res.json(allUsers)
})

// Creates a User, still need to add auth and checks
userRouter.post('/', async ({ body: { email, name, password } }, res) => {
    // const { email, name, password } = req.body
    const newUser = await prisma.user.create({
        data: {
            email, name, password
        }
    })
    return res.json(newUser)
})

// Deletes a user given an id or email
userRouter.delete('/', async ({ body: { id } }, res) => {
    const deletedUser = await prisma.user.delete({
        where: { id }
    })
    return res.json(deletedUser)
})