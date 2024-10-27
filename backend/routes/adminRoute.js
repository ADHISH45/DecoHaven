import express from 'express'
import { addDesigner,allDesigners,loginAdmin } from '../controllers/adminController.js'
import uploads from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()
adminRouter.post('/add-designer',authAdmin,uploads.single('image'),addDesigner)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-designers',authAdmin,allDesigners)

export default adminRouter