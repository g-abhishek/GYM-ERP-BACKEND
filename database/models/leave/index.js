import mongoose from '../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model


const Leave = new Schema({
    name:{
        type:String,
        required:true
    }
    ,
    userId:{
        type: String,
        required:true
    },
    urn:{
        type:Number,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },
    guardianName:{
        type:String,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    contact:{
        type:Number,
        required:true
    },
    reason:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"Pending"
    }
},({timestamps:true}))

export default model('Leave' ,Leave)