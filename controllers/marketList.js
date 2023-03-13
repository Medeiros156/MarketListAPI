import { db } from "../db_postgres_supabase.js";

export const getList = async (req, res) => {
  res.status(200).send(await db.any("SELECT * FROM marketlist"));
};

export const removeFromList = async (req, res) => {
  let item = req.query.q;
  console.log(item);
  res
    .status(200)
    .send(await db.any("DELETE FROM Marketlist WHERE items = $1", [item]));
};

export const setList = async (req, res) => {
  let netItem = req.body;
  const oldData = await db.any("SELECT * FROM marketlist WHERE items = $1", [
    netItem.items,
  ]);
  if (oldData.length > 0) {
    // Registro já existe, não faz nada
    res.status(200).send("Data already exists on db.");
    return;
  } else {
    db.query("INSERT INTO marketlist(items) VALUES($1)", [netItem.items]);

    res.status(200).send("data inserted");
  }
};
