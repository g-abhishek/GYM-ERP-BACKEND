import mongoose from '../../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model


const Documents = new Schema({
    idproof:{
        type:String,
        required:true
    }
    ,
    marksheet1:{
        type:String,
        required:true
    },
    marksheet2:{
        type:String,
        required:true
    },
    marksheet3:{
        type:String,
        required:true
    },
    marksheet4:{
        type:String,
        required:true
    },
    teachingCertificate:{
        type: String,
        required: true
    }
},({timestamps:true}))

export default model('Documents' ,Documents)