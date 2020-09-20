const express = require('express');

const db = require('../../data/dbConfig');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const accounts = await db('accounts');
        res.status(200).json(accounts);
    } catch (error) {
        res.status(500).json({message: "must be a valid user"});
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const [account] = await db('accounts').where({id});
        if(account) {
            res.status(200).json(account);
        } else {
            res.status(404).json({message: "please use a valid id in the url"});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Error getting account by ID"})
    }
})

router.post('/', async (req, res) => {
    const newAccount = req.body;

    try {
        const account = await db('accounts').insert(newAccount);
        res.status(201).json(newAccount);
    } catch (error) {
        res.status(500).json({message: "Error creating new account"});
    }
})

router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const changes = req.body;

    try {
        const count = await db('accounts').update(changes).where({id});
        if(count) {
            res.json({updated: count});
        } else {
            res.status(404).json({message: "invalid ID"});
        }
    } catch (error) {
        res.status(500).json({message: "Error updating the account"});
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const count = await db('accounts').where({id}).del();
        if(count) {
            res.status(200).json({deleted: count});
        } else {
            res.status(404).json({message: "invalid ID"});
        }
    } catch (error) {
        res.status(500).json({message: "Could not successfully delete the account"});
    }
})

module.exports = router;