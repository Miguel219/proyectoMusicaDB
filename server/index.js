//Express backend
//Server para la base de datos
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var db = require('./database');
//Working on development and Port
const ENV = process.env.NODE_ENV;
const PORT = process.env.PORT || 5000;



//Inicalizar express
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

//Apis
app.use('/api/artist', require('./api/artist'));
app.use('/api/track', require('./api/track'));
app.use('/api/album', require('./api/album'));
app.use('/api/genre', require('./api/genre'));
app.use('/api/mediatype', require('./api/mediatype'));
app.use('/api/permission', require('./api/permission'));
app.use('/api/role', require('./api/role'));
app.use('/api/user', require('./api/user'));
app.use('/api/report', require('./api/report'));
app.use('/api/logbook', require('./api/logbook'));


//Listen al puerto
app.listen(PORT,()=>{
    console.log(` Server listening on port ${PORT}`);
})      

//ejemplo de query
// const artId = 10;
// db.query(`select * from artist where artistid=${artId}`,(err,resp)=>{
//     if(err.error){
//         return console.log(err.error);
//     }
//     console.log("PostgressSql" + resp[0].name);
// })

module.exports = app;