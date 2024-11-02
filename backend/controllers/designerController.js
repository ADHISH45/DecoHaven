import designerModel from "../models/designerModel.js"
const designerList = async (req,res) => {
    try{
        const designers = await designerModel.find({}).select(['-password','-email'])
        res.json({success:true,designers})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {designerList}