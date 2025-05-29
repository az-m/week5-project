import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, function () {
  console.log("Server is alive and listening on 8080");
});

app.get("/", function (request, response) {
  response.json({ message: "This is the root route of the API." });
});

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.get("/get_food", async (request, response) => {
  const query = await db.query(`SELECT * FROM food`);
  response.json(query.rows);
});

app.get("/get_games", async (request, response) => {
  const query = await db.query(`SELECT * FROM games`);
  response.json(query.rows);
});

app.get("/get_films", async (request, response) => {
  const query = await db.query(`SELECT * FROM films`);
  response.json(query.rows);
});

app.post("/add_food", (request, response) => {
  const body = request.body;
  const query = db.query(
    `INSERT INTO food (tag, title, description,ingredients) VALUES($1,$2,$3,$4)`,
    [body.tag, body.title, body.description, body.ingredients]
  );
  response.json(query);
});

app.post("/add_game", (request, response) => {
  const body = request.body;
  const query = db.query(
    `INSERT INTO games (tag, title, description,year) VALUES($1,$2,$3,$4)`,
    [body.tag, body.title, body.description, body.year]
  );
  response.json(query);
});

app.post("/add_film", (request, response) => {
  const body = request.body;
  const query = db.query(
    `INSERT INTO films (tag, title, description,year,director,time,actor) VALUES($1,$2,$3,$4,$5,$6,$7)`,
    [
      body.tag,
      body.title,
      body.description,
      body.year,
      body.director,
      body.time,
      body.actor,
    ]
  );
  response.json(query);
});

app.get("/get_food_select", async (request, response) => {
  const t = request.query.tag;

  const query = await db.query(`SELECT * FROM food WHERE $1 = ANY(tag)`, [t]);
  response.json(query.rows);
});

app.get("/get_films_select", async (request, response) => {
  const t = request.query.tag;

  const query = await db.query(`SELECT * FROM films WHERE $1 = ANY(tag)`, [t]);
  response.json(query.rows);
});

app.get("/get_games_select", async (request, response) => {
  const t = request.query.tag;

  const query = await db.query(`SELECT * FROM games WHERE $1 = ANY(tag)`, [t]);
  response.json(query.rows);
});
