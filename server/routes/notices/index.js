import express from 'express'
import {submitNotice,fetchNoticeForAdmin,fetchNoticeForUser,approveNotice}  from '../../controllers/notices/index.js'
import {isAuth ,isAdmin} from '../../helpers/authorizers/index.js'
import authorizer from '../../helpers/authorizers/index.js'

const router  = express.Router()


router.get('/notice/fetch',fetchNoticeForUser)
router.post('/notice/submit',authorizer(),submitNotice)

router.get('/notice/admin/approve/:id',authorizer(),isAuth,isAdmin,approveNotice)
router.get('/notice/admin/fetch',fetchNoticeForAdmin)


export default router