import Admission from '../../../database/models/admissions/index.js'
// import {admissionSchema} from './../ExcelSchema.js'
import Hired from '../../../database/models/hired/index.js'
import readXlsxFile from 'read-excel-file/node.js';

import multer from 'multer';

import fs from 'fs'
import path from 'path'
import Registration from '../../../database/models/students/index.js';

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file');

export function createExcelAdmissions(req, res, next){
    
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
        
        const schema = {
            'Serial_no': {
              prop: 'urn',
              type: String
            },
            'customerName': {
              prop: 'customerName',
              type: String
            },
            'fathersName': {
              prop: 'fathersName',
              type: String
            },
            'email': {
                prop: 'email',
                type: String
              },
              'contact': {
                prop: 'contact',
                type: Number
              },
              'fitnessGoal': {
                prop: 'fitnessGoal',
                type: String
              },
              'joiningDate': {
                prop: 'joiningDate',
                type: String
              },
              'dateOfBirth': {
                prop: 'dob',
                type: String
              },
              'gender': {
                  prop: 'gender',
                  type: String
                },
                'address': {
                  prop: 'address',
                  type: String
                },
                'dietPlan': {
                  prop: 'dietPlan',
                  type: String
                },
                'nutrients': {
                  prop: 'nutrients',
                  type: String
                },
                'batch': {
                    prop: 'batch',
                    type: String
                  },
                  'weight': {
                    prop: 'weight2',
                    type: Number
                  },
                  'height': {
                    prop: 'height2',
                    type: Number
                  },
                  'package': {
                    prop: 'package',
                    type: String
                  },
                  'amount': {
                    prop: 'amount',
                    type: Number
                  },
                  'otp': {
                    prop: 'otp',
                    type: Number
                  },
                  'startDate': {
                    prop: 'startDate',
                    type: String
                  },
                  'endDate': {
                    prop: 'endDate',
                    type: String
                  },
            
          }
        const filePath = 'public/' + req.file.filename
        readXlsxFile(filePath, {schema}).then((rows, errors) => {
            
            console.log(rows.rows)
            console.log(req.body.user)
            // rows.rows.createdBy = req.body.user;
            for(var i =0;i<rows.rows.length;i++){
              rows.rows[i].createdBy = req.body.user;
              rows.rows[i].updatedBy = req.body.user;
              rows.rows[i].weight = rows.rows[i].weight2;
              rows.rows[i].height = rows.rows[i].height2;
            }
            console.log(rows.rows)
            Registration.create(rows.rows)
                .then((adm) => {
                    console.log("Admissions created!");
                    try {
                        fs.unlinkSync(filePath);
                    } catch(e) {
                        //error deleting the file
                        console.log('err in deleting file!')
                    }
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(adm);
                }, (err)=> next(err))
                .catch((err)=> next(err));
            
        })
    })
}

export function createExcelHired(req, res, next){
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
    
    const schema = {
        'RegNo': {
          prop: 'urn',
          type: String
        },
        'firstName': {
          prop: 'firstName',
          type: String
        },
        'lastName': {
          prop: 'lastName',
          type: String
        },
        'middleName': {
            prop: 'middleName',
            type: String
          },
          'class': {
            prop: 'class',
            type: String
          },
          'section': {
            prop: 'section',
            type: String
          }
        
      }
    const filePath = 'public/' + req.file.filename
    readXlsxFile(filePath, {schema}).then((rows, errors) => {
        
        console.log(rows.rows)
        Hired.create(rows.rows)
            .then((adm) => {
                console.log("Hires created!");
                try {
                    fs.unlinkSync(filePath);
                } catch(e) {
                    //error deleting the file
                    console.log('err in deleting file!')
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(adm);
            }, (err)=> next(err))
            .catch((err)=> next(err));
        
        })
    })
}