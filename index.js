const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const crypto = require('crypto');
const configs = require('./configs');
const usersRepo = require('./users/config.repository');

app.use(cors())
app.use(bodyParser.json());

const port = configs.port;

app.get("/users", async (req, res) => {
	try {
		const results = await usersRepo.getAllUsers();
		res.status(200).send(results);
	} catch(e) {
		console.error(e);
		res.sendStatus(500);
	}
});

app.get("/users/:id", async (req, res) => {
	console.log(req.params.id);
});

app.post("/users", async (req, res) => {
	console.log(req.body);
});

app.put("/users/:id", async (req, res) => {
	console.log(req.params.id, req.body)
});

app.delete("/users/:id", async (req, res) => {
	console.log(req.params.id);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
