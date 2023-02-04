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

const errroHandlingMiddleware = require('./middleware/errorHandler');
const { isAuthorized } = require('./middleware/isAuthorized');

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

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

app.use(express.json())
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/userType',isAuthorized, userTypeRouter);
app.use('/api/taskType', isAuthorized, taskTypeRouter);
app.use('/api/task', isAuthorized, taskRouter);
app.use('/api/comment', isAuthorized, commentsRouter);
app.use('/api/getAccountDetails', isAuthorized, accountDetailsRouter);
app.use('/api/group', isAuthorized, groupRouter);

app.use(errroHandlingMiddleware.unknownRouteHandler);
app.use(errroHandlingMiddleware.errorHandler);

app.listen(process.env.PORT || 3000 , () => console.log('Server Started'))