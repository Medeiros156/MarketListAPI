import { db } from "../db_postgres_supabase.js";

export const getList = async (req, res) => { 
    res.send(await db.any('SELECT * FROM marketlist'))
};
export const removeFromList = async (req, res) => { 
    let item = req.query.q
    console.log(item);
    res.send(await db.any('DELETE FROM Marketlist WHERE items = $1', [item]))
};

export const setList = (req, res) => { 
    console.log("set");
    let netItem = req.body
    
    console.log(netItem);
    
    db.query('INSERT INTO marketlist(items) VALUES($1)', [netItem.items])
    
    res.send("data inserted")
};

