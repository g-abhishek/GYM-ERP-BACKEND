import Notice from '../../../database/models/notices/index.js'

export function submitNotice(req, res, next){
    console.log(req.body)
    let noticeBody = {
        title:req.body.title,
        content:req.body.content,
        date:req.body.date,
        user:req.body.user
    }

    let newNotice = new Notice(noticeBody)

    newNotice.save((err, notice)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

         res.json(notice)   
    })
}

export function fetchNoticeForUser(req,res, next){
    Notice.find({approved:true},(err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(result)
    })

}
export function fetchNoticeForAdmin(req,res, next){
    Notice.find((err,result)=>{
        if(err){
            let errorMessage = err
            console.log(errorMessage)
            return res.status(400).json({
                errorMessage : errorMessage
            })
        }

        res.json(result)
    })

}




export function approveNotice(req, res){
    let id = req.params.id ;
    Notice.updateOne({_id:id},{approved:true},(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json({message:"updated sucessfully"})
    })
}