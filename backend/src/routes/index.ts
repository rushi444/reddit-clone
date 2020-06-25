import { Router } from 'express'
import { userRouter } from './users'

export const routes = Router()

routes.use('/users', userRouter)