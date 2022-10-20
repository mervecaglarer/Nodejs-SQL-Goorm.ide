const express = require('express');
const app = express();
const mysql = require('mysql');
var bodyParser  = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
var connection = mysql.createConnection({
host : 'localhost',
user : 'root', 
database : 'mysql'
});
	   
app.get("/", async(req, res)=>{
	var q = 'SELECT COUNT(*) AS count FROM users';
	connection.query(q, function (error, results, fields) {
		if (error) throw error;
		const count = results[0].count;
		res.render('home', {data: count});
	});
}); 

app.post('/register', async(req,res)=>{
	var person = {email: req.body.email};
	connection.query('INSERT INTO users SET ?', person, function(err, result, fields) {
		console.log(err);
		console.log(result);
		res.redirect("/");
	 });
});

app.listen(process.env.PORT || 3000, process.env.IP,() => {console.log('Server is listening on port 3000');});