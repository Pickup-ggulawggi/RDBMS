const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000; //노드서버가 사용할 포트넘버
const db = require('./config/db');

app.use(express())
app.use(cors());

app.get('/country', (req, res) => {
	const q = "select * from country;"
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
})

app.get('/league', (req, res) => {
	const q = "select * from league;"
	console.log(q)
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
})

app.get('/team', (req, res) => {
	const league = req.query._leagueId
	let ql = " ;"
	if (league != -1) {
		ql = `where leagueId = ${league};`
	} 
	const q = `select * from team ${ql}`
	console.log(q)
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
})

//get player query
app.get('/player', (req, res) => {

	const name = req.query._name;

	let qname = `playerName LIKE "%${name}%" and`
	if (name === "" ){
		qname = ""
	}

	const position = req.query._position;
	let pos = `p.Position = "${position}" and`
	if (position === "ALL" || position ==="") {
		pos = ""
	}

	const country = req.query._countryId;
	let qcountry = `p.countryId = ${country} and`
	if (country === "-1") {
		qcountry = ""
	}

	const league = req.query._leagueId;
	let qleague = `l.leagueId = ${league} and`
	if (league === "-1") {
		qleague = ""
	}

	const team = req.query._teamId;
	let qteam = `p.teamId = ${team} and`
	if (team === "-1") {
		qteam = ""
	}

	const minOverall = req.query._minOverall
	const maxOverall = req.query._maxOverall
	const minPace = req.query._minPace
	const maxPace = req.query._maxPace
	const minShooting = req.query._minShooting
	const maxShooting = req.query._maxShooting
	const minPassing = req.query._minPassing
	const maxPassing = req.query._maxPassing
	const minDribbling = req.query._minDribbling
	const maxDribbling = req.query._maxDribbling
	const minDefending = req.query._minDefending
	const maxDefending = req.query._maxDefending
	const minPhysicality = req.query._minPhysicality
	const maxPhysicality = req.query._maxPhysicality

	const q = 
	`SELECT * FROM player p
	JOIN team t ON p.teamId = t.teamId
	JOIN league l ON t.leagueId = l.leagueId
	WHERE
	${qleague}\
	${qteam}\
	${qcountry}\
	${qname}\
	${pos}\
 	p.Overall >= ${minOverall} and p.Overall <= ${maxOverall}\
	and p.pace >= ${minPace} and p.pace <= ${maxPace}\
	and p.shooting >= ${minShooting} and p.shooting <= ${maxShooting}\
	and p.Passing >= ${minPassing} and p.Passing <= ${maxPassing}\
	and p.Dribbling >= ${minDribbling} and p.Dribbling <= ${maxDribbling}\
	and p.Defending >= ${minDefending} and p.Defending <= ${maxDefending}\
	and p.Physicality >= ${minPhysicality} and p.Physicality <= ${maxPhysicality}\

	ORDER BY p.Overall DESC LIMIT 50;`

	console.log(q)
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
})

//delete selected player query 
app.get('/delete', (req, res) => {
	const pId = req.query._pId
	const q = `delete from player where playerId = ${pId}`
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
	db.commit
})

app.listen(port, () => {
	console.log(`Connected to ${port}`)
});