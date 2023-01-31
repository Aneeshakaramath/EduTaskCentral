require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userTypeRouter = require('./routers/userType');
const userRouter = require('./routers/user');
const taskTypeRouter = require('./routers/taskType');
const errroHandlingMiddleware = require('./middleware/errorHandler');
const app = express();

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

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


app.use('/api/userType', userTypeRouter);
app.use('/api/user', userRouter);
app.use('/api/taskType', taskTypeRouter);

app.use(errroHandlingMiddleware.unknownRouteHandler);
app.use(errroHandlingMiddleware.errorHandler);

app.listen(process.env.PORT || 3000 , () => console.log('Server Started'))