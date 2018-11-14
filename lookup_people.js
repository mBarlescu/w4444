const pg = require("pg");
const settings = require("./secrets/settings"); // settings.json
var myArgs = process.argv.slice(2);


const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching....')
  client.query(`SELECT * FROM famouss_people where first_name='${myArgs}'`, (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log('RESULT',result);
    console.log(`Found ${result.rowCount} person(s) by the name 'Paul':`);
    result.rows.forEach(function (value, i){
      console.log(`${value.id}: ${value.first_name} ${value.last_name}, born '${value.birthdate}'`);
    })

    client.end();
  });
});
// first_name='"+[myArgs]+"'"