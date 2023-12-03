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
	JOIN country c on p.countryId = c.countryId
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

app.get('/create', (req, res) => {
	const Acceleration = req.query._Acceleration
	const Age = req.query._Age
	const Aggression = req.query._Aggression
	const Agility = req.query._Agility
	const Attworkrate =  req.query._Attworkrate
	const Balance = req.query._Balance
	const Ball = req.query._Ball
	const Composure = req.query._Composure
	const Crossing = req.query._Crossing
	const Curve = req.query._Curve
	const Def =req.query._Def
	const Defending = req.query._Defending
	const Defworkrate = req.query._Defworkrate
	const Dribbling = req.query._Dribbling
	const Finishing = req.query._Finishing
	const Free = req.query._Free
	const GK = req.query._GK
	const Gender = req.query._Gender
	const Heading = req.query._Heading
	const Interceptions = req.query._Interceptions
	const Jumping = req.query._Jumping
	const Long = req.query._Long 
	const Overall = req.query._Overall
	const Pace = req.query._Pace
	const Passing = req.query._Passing
	const Penalties = req.query._Penalties
	const Physicality = req.query._Physicality
	const position = req.query._position
	const Positioning = req.query._Positioning
	const Preferredfoot = req.query._Preferredfoot
	const Reactions = req.query._Reactions
	const Shooting = req.query._Shooting
	const Shot = req.query._Shot
	const Skillmoves = req.query._Skillmoves
	const Sliding = req.query._Sliding
	const Sprint = req.query._Sprint
	const Stamina = req.query._Stamina
	const Standing = req.query._Standing
	const Strength = req.query._Strength
	const Vision = req.query._Vision
	const Volleys = req.query._Volleys
	const Weakfoot = req.query._Weakfoot
	const countryId = req.query._countryId
	const teamId = req.query._teamId
	const playerName = req.query._playerName

	const q = 
		`insert into player(playerName,
			Position,
			Age,
			Overall,
			Pace,
			Shooting,
			Passing,
			Dribbling,
			Defending,
			Physicality,
			Acceleration,
			Sprint,
			Positioning,
			Finishing,
			Shot,
			\`Long\`,
			Volleys,
			Penalties,
			Vision,
			Crossing,
			Free,
			Curve,
			Agility,
			Balance,
			Reactions,
			Ball,
			Composure,
			Interceptions,
			Heading,
			Def,
			Standing,
			Sliding,
			Jumping,
			Stamina,
			Strength,
			Aggression,
			Attworkrate,
			Defworkrate,
			Preferredfoot,
			Weakfoot,
			Skillmoves,
			Gender,
			GK,
			countryId,
			teamId) values(
			'${playerName}',
			'${position}',
			${Age},
			${Overall},
			${Pace},
			${Shooting},
			${Passing},
			${Dribbling},
			${Defending},
			${Physicality},
			${Acceleration},
			${Sprint},
			${Positioning},
			${Finishing},
			${Shot},
			${Long},
			${Volleys},
			${Penalties},
			${Vision},
			${Crossing},
			${Free},
			${Curve},
			${Agility},
			${Balance},
			${Reactions},
			${Ball},
			${Composure},
			${Interceptions},
			${Heading},
			${Def},
			${Standing},
			${Sliding},
			${Jumping},
			${Stamina},
			${Strength},
			${Aggression},
			'${Attworkrate}',
			'${Defworkrate}',
			'${Preferredfoot}',
			${Weakfoot},
			${Skillmoves},
			'${Gender}',
			${GK},
			${countryId},
			${teamId});`
	console.log(q)

	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
	db.commit
})

app.get('/update', (req, res) => {
	const pId = req.query._pId
	const teamId = req.query._teamId
	const q = `update player set teamId = ${teamId} where playerId = ${pId}`
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
	db.commit
})

app.get('/teaminfo', (req, res) => {
	const leagueId = Number(req.query._leagueId)

	const q = `SELECT t.*, COUNT(p.playerId) AS playerNum FROM team t join player p on t.teamId = p.teamId where t.leagueId = ${leagueId} group by t.teamId;`
	console.log(q)
	db.query(q, (err, result, fields) => {
		if (!err) res.send(result);
		else res.send(err);
	})
})

app.listen(port, () => {
	console.log(`Connected to ${port}`)
});