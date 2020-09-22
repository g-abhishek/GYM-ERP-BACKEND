import mongoose from '../../../connect.js'

const Schema = mongoose.Schema
const model = mongoose.model


const Vacancy = new Schema({
    postName:{
        type:String,
        required:true
    }
    ,
    eligibility:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    vacancy:{
        type:Number,
        required:true
    },
    startDate:{
        type: Date,
        required: true
    },
    endDate:{
        type: Date,
        required: true
    }

},({timestamps:true}))

export default model('Vacancy' ,Vacancy)