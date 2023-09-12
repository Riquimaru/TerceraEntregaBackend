export const roleAdminMiddleware = (req, res, next) => {
    if(req.session.role === "admin"){
        next()
    }else{
        res.render('login', { status: 'no tienes permiso'})
    }
}

export const roleUserMiddleware = (req, res, next) => {
    if(req.session.role === "user"){
        next()
    }else{
        res.render('login', { status: 'no tienes permiso'})
    }
}