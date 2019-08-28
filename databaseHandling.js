const sequelize = require("sequelize")

  models.sequelize.sync().then(() => {
    console.log('You are connected to the database successfully.');
    sequelize_fixtures.loadFile('./fixtures/*.json', models).then(() =>{
        console.log("database is updated!");
   });
   }).catch((err) => {
       console.log(err,"Some problems with database connection!!!");
});