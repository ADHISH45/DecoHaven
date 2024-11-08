import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminroute.js'
import designerRouter from './routes/designerRoute.js'
import userRouter from './routes/userRoute.js'


//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middleware
app.use(express.json())
app.use(cors())

// api endpoints
app.use('/api/admin',adminRouter)
app.use('/api/designer',designerRouter)
app.use('/api/user',userRouter)
// localhost:4000/api/admin/add-designer

app.get('/',(req,res)=>{
    res.send('API WORKING great')
})

app.listen(port,()=> console.log("server started",port))