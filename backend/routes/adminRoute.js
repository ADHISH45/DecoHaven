import express from 'express'
import { addDesigner,allDesigners,appointmentsAdmin,loginAdmin,cancelAppointment, adminDashboard } from '../controllers/adminController.js'
import uploads from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const adminRouter = express.Router()
adminRouter.post('/add-designer',authAdmin,uploads.single('image'),addDesigner)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-designers',authAdmin,allDesigners)
adminRouter.get('/appointments',authAdmin,appointmentsAdmin)
adminRouter.put('/cancel-appointment/:appointmentId', authAdmin, cancelAppointment);
adminRouter.get('/dashboard',authAdmin,adminDashboard)
export default adminRouter