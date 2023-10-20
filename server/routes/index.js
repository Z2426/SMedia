import express  from "express"
import autheRoute from './authRoutes.js'
const router =express.Router()
router.use('/auth',autheRoute)// auth/register
export default router