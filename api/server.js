const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
server.use(express.json());

const router = express.Router();

router.get('/', async (req, res) => { 
    try {
    const accountList = await db.select("*").from("accounts")
    res.status(200).json(accountList)
    } catch (err) {
        next(err)
    }
})

router.get('/:id',  async (req, res) => { 
    try {
        const projectList = await db.get(req.params.id)
        res.status(200).json(projectList)
        } catch (err) {
            next(err)
        }
})

router.get("/:id/actions",  (req, res) => {
    db.getProjectActions(req.params.id)
    .then(list => { 
        res.status(200).json(list)
    })
    .catch(err => { 
        res.status(500).json({
          message: "There was an error because we are learning how to write APIs"
        })
      })
})



router.put("/:id",  (req, res) => {
    db.update(req.params.id, req.body)
    .then(updates => { 
        res.status(200).json(updates)
    })
    .catch(err => { 
        res.status(500).json({
          message: "There was an error because we are learning how to write APIs"
        })
      })
})

router.post("/", (req, res) => {
    db.insert({name: req.body.name, description: req.body.description})
    .then(bananaword => {
        res.status(201).json(req.body)
    })
    .catch(err => { 
        res.status(500).json({
          message: "There was an error because we are learning how to write APIs"
        })
      })
})

router.delete("/:id",  (req, res) => {
    db.remove(req.params.id)
    .then(removed => { 
        res.status(200).json({message: "Deleted"})
    })
    .catch(err => { 
        res.status(500).json({
          message: "There was an error because we are learning how to write APIs"
        })
      })
})




module.exports = server;
