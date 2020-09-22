import expressJwt from 'express-jwt'
function authorizer(){
    console.log("Checking Authorizer")
    return expressJwt({
        secret:process.env.PRIVATE_JWT_KEY,
        userProperty:'auth'
    })
}

export const isAuth = (req, res, next) => {
    console.log(req.auth,req.body.user)
    let user = req.body.user&& req.auth && req.body.user._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            error: 'Access denied'
        });
    }
    next();
};

export const isAdmin = (req, res, next) => {
    if (req.body.user.role === 0) {
        return res.status(403).json({
            error: 'Admin resourse! Access denied'
        });
    }
    next();
};


export default authorizer