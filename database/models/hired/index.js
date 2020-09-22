import mongoose from '../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model


const Hired = new Schema({
    urn:{
        type: String,
        required: true
    },
    firstName:{
        type:String,
        required:true
    }
    ,
    middleName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    class:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    }
},({timestamps:true}))

export default model('Hired' ,Hired)