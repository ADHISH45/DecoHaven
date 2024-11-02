import express from 'express'
import { designerList } from '../controllers/designerController.js'

const designerRouter = express.Router()

designerRouter.get('/list',designerList)


export default designerRouter