const Sequelize = require('sequelize');
const sequelize = new Sequelize('sms', 'root', '', {localhost: 'localhost', dialect: 'mysql', operatorAliases: false});

var test = sequelize.authenticate()
    .then(function () {
        console.log("CONNECTED! ");
    })
    .catch(function (err) {
        console.log("SOMETHING DONE GOOFED");
    })
    .done();

    // Create Item Table Structure
// var Subject = sequelize.define('Subject', {
//     name:Sequelize.STRING,
//     board: Sequelize.INTEGER,
//     class: Sequelize.INTEGER
// });
 
// //Applying Item Table to database  
// sequelize.sync({force:true}).then(function () {
//     console.log('Subject table created successfully');
// })
// .catch(function (err) {
//     console.log("SOMETHING DONE GOOFED");

// }).done();
// var item1 = Subject.build({
//     name:'Mathamatics',
//     board: 1,
//     class: 1
// }).save();





module.exports = sequelize;     
