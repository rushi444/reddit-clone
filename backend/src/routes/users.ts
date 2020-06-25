import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
export const userRouter = Router()

// Gets all users
userRouter.get('/', async (req, res) => {
    const allUsers = await prisma.user.findMany()
    return res.json(allUsers)
})

// Creates a User, still need to add auth and checks
userRouter.post('/new', async ({ body: { email, name, username, password } }, res) => {
    // const { email, name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await prisma.user.create({
        data: {
            email, name, username, password: hashedPassword
        }
    })
    return res.json(`User ${username} has been created`)
})

// Login
userRouter.post('/login', async ({ body: { username, password } }, res) => {
    const user = await prisma.user.findOne({
        where: {
            username
        }
    })
    if (!user) {
        throw new Error('user does not exist')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
        throw new Error('Incorrect username or password')
    }

    const token = jwt.sign({ id: user.id, username: user.username }, '1234567890', { expiresIn: '30d' })

    return res.json(token)

})

// Deletes a user given an id or email
userRouter.delete('/', async ({ body: { id } }, res) => {
    const deletedUser = await prisma.user.delete({
        where: { id }
    })
    return res.json(deletedUser)
})