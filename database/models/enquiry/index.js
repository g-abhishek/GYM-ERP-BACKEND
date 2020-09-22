import mongoose from '../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model


const Enquiry = new Schema({
    name:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    solution:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        required:true
    },
    createdBy:{
        type:String,
        required:true
    },
    updatedBy:{
        type:String,
        required:true
    }
},({timestamps:true}))

export default model('Enquiry' ,Enquiry)