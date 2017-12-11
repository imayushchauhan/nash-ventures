//require node modules
const Express = require('express');
const Mongoose = require('mongoose');
const Config = require('config');
const Fs = require('fs');
const Path = require('path').join;
const BodyParser = require('body-parser');
const Cors = require('cors');

//initialize models
const modules = Path(__dirname, 'app/modules');
Fs.readdirSync(modules)
    .forEach(file => require(Path(modules + '/' + file + '/' + file + '.js')));

//require files
const routes = require('./routes/index');
const utility = require('./app/libs/utils');

//create app
const app = new Express();

//Use the routes defined in routes
app.use(Cors());
app.use(BodyParser.json({limit: '50mb'}));
app.use(Express.static(__dirname + '/images'));
app.use(Express.static(__dirname + '/public'));
app.use(routes);

//set environment
const env = process.env.NODE_ENV || 'development';

//database connection
const dbConfig = Config.get(env + '.dbConfig.url');
// Mongoose.connect(dbConfig);

//start app server
app.listen(3000, function(){
    console.log("App running");
});

/*
  1. async call like utility.readFile are handled by using generators and promises.
  2. utility.readFile returns a promise
  3. the returned promise is handled by another utility class function utility.async
     which runs a generator function
 */
utility.async(function* () {

    let imagePath = Path(__dirname, 'images/1509884367452.png');

    let readFileResponse1 = yield utility.readFile(imagePath);
    console.log("readFileResponse1", readFileResponse1);

    imagePath = Path(__dirname, '../images/1509884367452.png');
    let readFileResponse2 = yield utility.readFile(imagePath);
    console.log("readFileResponse2", readFileResponse2);
});
