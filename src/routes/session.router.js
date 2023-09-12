import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.js"
import userDTO from "../DAO/DTO/user.DTO.js";
import passport from "passport";
import { generateToken, authToken } from "../../utils/jwt.js";
import userDTO from "../DAO/DTO/user.DTO.js";

const sessionRouter = Router();

sessionRouter.get('/register', (req, res) => {
    res.render('register', {})
})

sessionRouter.post('/register', passport.authenticate('register', {failureRedirect: 'api/session/failregister'}), async (req, res) => {
    res.render ('login', {})
})

sessionRouter.get('/failregister', async (req, res)=>{
    res.render('register-error', {})
})

sessionRouter.get('/login', (req, res) => {
    res.render('login', {})
})

sessionRouter.post('/login', passport.authenticate('login', {failureRedirect: 'api/session/fail-login'}), async (req, res) => {
    if(!req.user) return res.render('login-error', {})
    req.session.user = req.user.email
    let user = req.body
    if(req.session.user === "admin@admin.com"){
    req.session.role = "admin"
    }else{
        req.session.role = "user"
    }
    const access_token = generateToken(user)
    res.cookie('authToken', access_token).render('products', { user: req.session.user, access_token})
})

sessionRouter.get('/fail-login', (req, res)=>{
    res.render('login-error', {})
})

sessionRouter.get('/profile', authMiddleware, async (req, res) => {
    let user = await getByEmail(req.session.user);
    res.render('datos', { user })
})

sessionRouter.get('/logout', (req, res) => {
    req.session.destroy(error => {
        res.render('login')
    })
})

sessionRouter.get('/restore', (req, res) => {
    res.render('restore-password', {})
})

sessionRouter.post('/restore', async (req, res) => {
    let user = req.body;
    let userFound = await getByEmail(user.email)
    if (!userFound) {
        res.render('register', {})
    } else {
        let newPassword = createHash(user.password)
        await updateUserPassword(user.email, newPassword)
    }
    res.render('login', {})
})

sessionRouter.get('/current', authToken, async (req, res)=>{
    let user = await getByEmail(req.session.user);
    let userDTO = await new userDTO(user)
    res.send('Estás logueado con token', {userDTO})
})

export default sessionRouter;