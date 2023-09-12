import express from 'express';
import __dirname from './utils.js'
import productRouter from "./src/routes/product.router.js";
import cartRouter from "./src/routes/cart.router.js";
import handlebars from 'express-handlebars'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import sessionRouter from './src/routes/session.router.js'
import viewRouter from './src/routes/view.router.js'
import passport from 'passport'
import initializePassport from './src/config/passport.config.js'
import cookieParser from 'cookie-parser'
import config from './src/config/config.js'

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cookieParser())

app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 3600
    }),
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}))

initializePassport()

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/session', sessionRouter)
app.use('/', viewRouter)

const httpServer = app.listen(config.port, () => console.log('Server corriendo en '+config.port))

// const PORT = 8080;
// const server = app.listen(PORT, ()=> console.log(`Server running on port: ${server.address().port}`))
// server.on('error', error => console.log(error))