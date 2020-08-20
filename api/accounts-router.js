const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
server.use(express.json());

const router = express.Router();

router.get('/accounts', async (req, res) => { 
    try {
    const accountList = await db.select("*").from("Accounts")
    res.status(200).json(accountList)
    } catch (err) {
        next(err)
    }
})

router.get('/accounts/:id',  async (req, res) => { 
    try {
        const account = await db.select("*").from("Accounts").where("id", req.params.id)
        res.status(200).json(account)
        } catch (err) {
            next(err)
        }
})



router.put("/accounts/:id",   async (req, res) => { 
    try {
        const account = await db("Accounts").update({
            name: req.body.name,
            budget: req.body.budget
        })
        .where("id", req.params.id)
        
        
        const updatedAcct = await db("Accounts")
        .where("id", req.params.id)
        .first()
        
        res.status(200).json(updatedAcct)
        } catch (err) {
            next(err)
        }
})

router.post("/accounts",   async (req, res) => { 
    try {
        const id = await db.insert({
            name: req.body.name,
            budget: req.body.budget
        })
        .into("Accounts")
        
        const newAcct = await db("Accounts").where("id", id)
        
        res.status(201).json(newAcct)
        } catch (err) {
            next(err) 
        }
})

router.delete("/accounts/:id",  async (req, res) => { 
    try {
        await db("Accounts")        
        .where("id", req.params.id)
        .del()
        
        
        res.status(204).end()
        } catch (err) {
            next(err) 
        }
})




module.exports = router;
