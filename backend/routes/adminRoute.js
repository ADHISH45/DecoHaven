import express from 'express'
import { addDesigner,loginAdmin } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()
adminRouter.post('/add-designer',authAdmin,upload.single('image'),addDesigner)
adminRouter.post('/login',loginAdmin)

export default adminRouter