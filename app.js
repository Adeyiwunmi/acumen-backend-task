const express = require('express');



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const enrollmentRouter = require('./routes/enrollments');


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/enrollments', enrollmentRouter);


app.listen(3000, () => {
    console.log(`Acumen App listening at http://localhost:3000`)
});
module.exports = app;
