const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000; //노드서버가 사용할 포트넘버
const db = require('./config/db');

app.use(express())
app.use(cors());

app.get('/player', (req, res) => {

	const name = req.query._name;

	const position = req.query._position;
	let pos = `and Position = "${position}"`
	if (position === "ALL" || position ==="") {
		pos = ""
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
	`SELECT * FROM player\
	WHERE playerName LIKE "%${name}%"\
	${pos}\
	and pace >= ${minOverall} and pace <= ${maxOverall}\
	and pace >= ${minPace} and pace <= ${maxPace}\
	and shooting >= ${minShooting} and shooting <= ${maxShooting}\
	and Passing >= ${minPassing} and Passing <= ${maxPassing}\
	and Dribbling >= ${minDribbling} and Dribbling <= ${maxDribbling}\
	and Defending >= ${minDefending} and Defending <= ${maxDefending}\
	and Physicality >= ${minPhysicality} and Physicality <= ${maxPhysicality}\

	ORDER BY playerId LIMIT 50;`

	console.log(q)
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
})

app.listen(port, () => {
	console.log(`Connected to ${port}`)
});