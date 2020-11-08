const fs = require('fs')
const path = require('path');

//////////////////////////////////////////////////
// process cli arguments
const { ArgumentParser } = require('argparse')
const parser = new ArgumentParser({
    description: 'launch appx rest api server'
});

parser.add_argument('-c', '--conf', { help: 'mysql config file', required: true });
args = parser.parse_args();

let db_conf_options = JSON.parse(fs.readFileSync(args.conf))

//////////////////////////////////////////////////
// check database connectivity
const db = require('./src/db/db')
let db_pool = db.getPool(args.conf)

//////////////////////////////////////////////////
// load cache to memory
const cache = require('./src/cache/cache')

//////////////////////////////////////////////////
// initialize express
const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require("express-session")
const MySQLStore = require('express-mysql-session')(session);

// express app
const app = express()
app.use('/appx', express.static(path.join(__dirname, 'public')))
//app.use(cookieParser)
//app.configure(function() {
//    app.use(express.cookieParser())
//})

// initialize sessions
let sessionStore = new MySQLStore(db_conf_options);
app.use(session({
    store: sessionStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}))

// initialize passport, and passport session
const { passport, authenticator } = require("./src/auth/passport")
app.use(passport.initialize())
app.use(passport.session())

//////////////////////////////////////////////////
// initialize router --- Note: perform this step only after db_pool is initialized
const { dispatcher } = require('./src/api/dispatcher')

app.use('/api', bodyParser.json())
app.use('/api', authenticator, dispatcher)

// handle local login
app.post('/login/local', passport.authenticate(
    'local',
    {
        successRedirect: '/appx/console',
        failureRedirect: '/appx/login',
        failureFlash: true
    })
)

//            s handle logout
app.get('/logout',
    function(req, res) {
        req.logout();
        res.redirect('/appx/login');
    }
)

//////////////////////////////////////////////////
// start listening
var server = app.listen(3000, () => {
    console.log(`INFO: appx rest api server listening at http://${server.address().address}:${server.address().port}`)
})
