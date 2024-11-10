import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    userId: { type:String, required:true},
    desId: { type:String, required:true},
    slotDate: { type:String, required:true},
    slotTime: { type:String, required:true},
    userData: { type:Object, required:true},
    desData: { type:Object, required:true},
    // amount:
    date: { type:Number, required:true},
    cancelled: { type:Boolean, required:false},
    isCompleted: { type:Boolean, required:false},
    isPaid: { type: Boolean, default: false },  // New field to track payment status
    paymentDetails: {                            // New field to store payment information
        orderId: { type: String },
        paymentId: { type: String },
        status: { type: String, default: 'pending' }
    }
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment',appointmentSchema)
export default appointmentModel