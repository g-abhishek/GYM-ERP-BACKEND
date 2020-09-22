import Enquiry from '../../../database/models/enquiry/index.js'
import Registration from './../../../database/models/students/index.js'
import Leave from './../../../database/models/leave/index.js'
import Admission from './../../../database/models/admissions/index.js'

import { parse } from 'querystring';
import multer from 'multer';

import fs from 'fs'
import path from 'path'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

var upload = multer({ storage: storage }).single('file');

export function CreateNewEnquiry(req, res, next) {
    console.log(req.body)

    let contentBody = JSON.parse(req.body.values);
    console.log(contentBody)
    contentBody.createdBy = req.body.user;
    contentBody.updatedBy = req.body.user;

    let newEnquiry = new Enquiry(contentBody)

    newEnquiry.save((err, result) => {
        if (err) {
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage: errorMessage
            })
        }

        res.json(result);
    })
}

export function DeleteClass(req, res, next) {
    Registration.findByIdAndRemove(req.params.id)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
}

export function UpdateClass(req, res, next) {
    // console.log(req.query.picture)
    
        console.log(req.body.values)
        let contentBody = JSON.parse(req.body.values);
        console.log(contentBody)
        // contentBody.picture = req.file.filename;
        contentBody.updatedBy = req.body.user;        
        contentBody.amount = req.body.amount;
        contentBody.otp = req.body.otp;
        Registration.findByIdAndUpdate(req.params.id, {
            $set: contentBody
        }, { new: true })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            });

}

export function fetchEnquiryForUser(req, res, next) {
    Enquiry.find((err, result) => {
        if (err) {
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage: errorMessage
            })
        }

        res.json(result)
    })

}
export function fetchCustomers(req, res, next) {
    Registration.find((err, result) => {
        if (err) {
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage: errorMessage
            })
        }

        res.json(result)
    })

}

// fetchCustomersById

export function fetchCustomersById(req, res, next) {
    console.log(req.params)
    Registration.findById(req.params.id, (err, result) => {
        if (err) {
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage: errorMessage
            })
        }
        const __dirname = path.resolve();

        if (result.picture) {
            var imagePath = path.resolve(__dirname, `public/${result.picture}`);
            let buff = fs.readFileSync(imagePath);
            let base64data = buff.toString('base64');
            result.picture = `data:image/jpeg;base64, ${base64data}`
        }


        res.json(result)
    })

}

export function createRegistration(req, res, next) {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("Checking error from isntance of multer")
            console.log(err);
            return res.status(500).json(err)
        } else if (err) {
            console.log("Checking error")
            console.log(err);
            return res.status(500).json(err)
        }
        console.log("saved file name is - ")
        console.log(req.file.filename) // working!

        let contentBody = JSON.parse(req.body.values);
        console.log(contentBody)
        contentBody.picture = req.file.filename;
        contentBody.createdBy = req.body.user;
        contentBody.updatedBy = req.body.user;
        contentBody.amount = req.body.amount;
        contentBody.otp = req.body.otp;
        contentBody.weight2 = contentBody.weight;
        contentBody.height2 = contentBody.height;

        let newRegistration = new Registration(contentBody)

        newRegistration.save((err, regist) => {
            if (err) {
                let errorMessage = err
                console.log(errorMessage)
                return res.status(400).json({
                    errorMessage: errorMessage
                })
            }

            res.json(regist)
        })
    })
}

export function UpdatePicture(req, res, next) {
    console.log(req.body)
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log("Checking error from isntance of multer")
            console.log(err);
            return res.status(500).json(err)
        } else if (err) {
            console.log("Checking error")
            console.log(err);
            return res.status(500).json(err)
        }
        console.log("saved file name is - ")
        console.log(req.file.filename) // working!

        let contentBody = JSON.parse(req.body.values);
        console.log(contentBody)
        contentBody.picture = req.file.filename;
        contentBody.updatedBy = req.body.user;
        contentBody.amount = req.body.amount;
        contentBody.otp = req.body.otp;

        Registration.findByIdAndUpdate(req.params.id, {
            $set: contentBody
        }, { new: true })
            .then((result) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(result);
            }, (err) => next(err))
            .catch((err) => {
                next(err);
            });
    })
}


export function CreateLeave(req, res, next) {
    console.log(req.body)

    let newLeave = new Leave(req.body)

    newLeave.save((err, result) => {
        if (err) {
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage: errorMessage
            })
        }

        res.json(result);
    })
}

export function getAllMyLeaves(req, res, next) {
    Leave.find({ userId: req.params.userId }, (err, result) => {
        if (err) {
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage: errorMessage
            })
        }

        res.json(result)
    })
}

export function getStudentData(req, res, next) {
    Registration.find({ urn: req.params.urn }, (err, result) => {
        if (err) {
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage: errorMessage
            })
        }
        console.log(result)
        const __dirname = path.resolve()

        if (result.length !== 0 && result[0].picture !== undefined) {
            var imagePath = path.resolve(__dirname, `public/${result[0].picture}`);
            let buff = fs.readFileSync(imagePath);
            let base64data = buff.toString('base64');
            result[0].picture = `data:image/jpeg;base64, ${base64data}`
        }

        res.json(result)
    })
}


// export function approveNotice(req, res){
//     let id = req.params.id ;
//     Notice.updateOne({_id:id},{approved:true},(err, result)=>{
//         if(err){
//             res.json(err)
//         }
//         res.json({message:"updated sucessfully"})
//     })
// }

