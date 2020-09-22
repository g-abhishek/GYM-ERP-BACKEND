import express from 'express'
import {DeleteClass, UpdateClass, createRegistration, fetchEnquiryForUser, CreateLeave, getAllMyLeaves, getStudentData, CreateNewEnquiry, fetchCustomers, fetchCustomersById, UpdatePicture} from '../../controllers/students/index.js'
import {createExcelAdmissions}  from '../../controllers/admissions/index.js'
import {isAuth ,isAdmin} from '../../helpers/authorizers/index.js'
import authorizer from '../../helpers/authorizers/index.js'

const StudentRouter  = express.Router()

StudentRouter.post('/student/enquiry', authorizer(), CreateNewEnquiry)
StudentRouter.delete('/student/delete/:id', authorizer(), DeleteClass)
StudentRouter.post('/student/update/:id',authorizer(), UpdateClass)
StudentRouter.post('/student/update/picture/:id',authorizer(), UpdatePicture)

StudentRouter.get('/student/enquiry/fetch',fetchEnquiryForUser)
StudentRouter.get('/student/registrations/fetch',fetchCustomers)
StudentRouter.get('/student/fetch/:id',fetchCustomersById)
// StudentRouter.post('/student/submit',authorizer(),submitNotice)

// StudentRouter.get('/student/admin/approve/:id',authorizer(),isAuth,isAdmin,approveNotice)
// StudentRouter.get('/student/admin/fetch',fetchNoticeForAdmin)
// StudentRouter.get('/student/admin/fetch',fetchNoticeForAdmin)


StudentRouter.post('/student/registration', authorizer(), createRegistration)
StudentRouter.post('/student/excel/registrations', authorizer(), createExcelAdmissions)

StudentRouter.post('/leave/submit', authorizer(), CreateLeave)
StudentRouter.get('/:userId/leaves/fetch', getAllMyLeaves)

StudentRouter.get('/student/fetch/:urn', getStudentData)

export default StudentRouter
