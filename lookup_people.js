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
  client.query("SELECT first_name FROM famouss_people where first_name='"+[myArgs]+"'", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    console.log("Total Number of Rows  ",result.rows.length);
    //console.log(result.rows); //output: 1
    for(var i = 0; i < result.rows.length; i++){
      console.log(result.rows[i].first_name);
    }

    client.end();
  });
});