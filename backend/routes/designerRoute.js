import express from 'express';
import {
    designerList,
    loginDesigner,
    appointmentsDesigner,
    appointmentComplete,
    appointmentCancel,
    designerDashboard,
    designerProfile,
    updateDesignerProfile
} from '../controllers/designerController.js';
import authDesigner from '../middlewares/authDesigner.js';

const designerRouter = express.Router();

designerRouter.get('/list', designerList);
designerRouter.post('/login', loginDesigner);
designerRouter.get('/appointments', authDesigner, appointmentsDesigner);
designerRouter.post('/complete-appointment', authDesigner, appointmentComplete);
designerRouter.post('/cancel-appointment', authDesigner, appointmentCancel);
designerRouter.get('/dashboard', authDesigner, designerDashboard);
designerRouter.get('/profile', authDesigner, designerProfile);
designerRouter.put('/update-profile', authDesigner, updateDesignerProfile);

export default designerRouter;
