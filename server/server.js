const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 5000; //노드서버가 사용할 포트넘버
const db = require('./config/db');

app.use(cors());

app.get('/', (req, res) => {
	db.query("SELECT * FROM player Limit 1;", (err, data) => {
		if (!err) res.send({players: data});
		else res.send(err);
	})
})

app.listen(port, () => {
	console.log(`Connected to ${port}`)
});