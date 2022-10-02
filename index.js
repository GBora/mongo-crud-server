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
		res.status(200).send(results)
	} catch(e) {
		console.error(e);
		res.sendStatus(500);
	}
});

app.get("/users/:id", (req, res) => {
  const user = ITEMS.users.find(
    (user) => {
		return user.id === req.params.id
	}
  );
  if (user) {
    return sendResponse(res.status(200), user);
  }
  return sendResponse(res.status(404), null);
});

app.post("/users", (req, res) => {
  const body = req.body || {};
  ITEMS.users.push({...body, id: crypto.randomUUID() });
  return sendResponse(res.status(201), ITEMS.users[ITEMS.users.length - 1]);
});

app.put("/users/:id", (req, res) => {
  const body = req.body || {};
  const userIdx = ITEMS.users.findIndex(
    (user) => user.id === req.params.id
  );
  const user = ITEMS.users[userIdx];
  ITEMS.users[userIdx] = { ...body }
  return sendResponse(res.status(201), ITEMS.users[userIdx]);
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id
  ITEMS.users = ITEMS.users.filter(user => user.id !== id)
  return sendResponse(res.status(200))
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
