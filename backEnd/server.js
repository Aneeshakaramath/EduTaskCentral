require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const sessions = require('express-session');

const authRouter = require('./routers/auth');
const userTypeRouter = require('./routers/userType');
const userRouter = require('./routers/user');
const taskTypeRouter = require('./routers/taskType');
const taskRouter = require('./routers/task');
const commentsRouter = require('./routers/comments');
const accountDetailsRouter = require('./routers/accountDetails');
const groupRouter = require('./routers/group');
const courseRouter = require('./routers/course');
const overAllPlanRouter = require('./routers/overallPlan');

const errroHandlingMiddleware = require('./middleware/errorHandler');
const { isAuthorized } = require('./middleware/isAuthorized');

const oneDay = 1000 * 60 * 60 * 24;

// initialize express object
const app = express();

// serving the static front end build files
app.use(express.static("public"));

// connect to mongo db
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

// express middle ware to parse incoming request into json payload
app.use(express.json());

// cors middle ware to accept cross origin request
app.use(cors());

// set headers for all the incoming request
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

/* 
*   setting routers for the request path
*   Here isAuthorized is a middleware to check whether the user has logged in
*/
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/userType',userTypeRouter);
app.use('/api/taskType', isAuthorized, taskTypeRouter);
app.use('/api/task', isAuthorized, taskRouter);
app.use('/api/comment', isAuthorized, commentsRouter);
app.use('/api/getAccountDetails', isAuthorized, accountDetailsRouter);
app.use('/api/group', isAuthorized, groupRouter);
app.use('/api/course', isAuthorized, courseRouter);
app.use('/api/overAllPlan', isAuthorized, overAllPlanRouter)

/*
*   Set handler for unknown routes and errorhandling middleware
*/
app.use(errroHandlingMiddleware.unknownRouteHandler);
app.use(errroHandlingMiddleware.errorHandler);

// start the server in specified port
app.listen(process.env.PORT || 3000 , () => console.log('Server Started'))