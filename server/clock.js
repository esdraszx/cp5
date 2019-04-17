const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;

const dateSchema = new mongoose.Schema({
    date: String,
    clockIn: String,
    clockOut: String,
    username: String,
});

const Clock = mongoose.model('clock', dateSchema);

//REST POINTS
router.post('/clockIn/:time', async (req, res) => {
    const enterTime = new Clock ({
        date: req.body.date,
        clockIn: req.params.time,
        clockOut: '',
        username: req.body.username
    });
    try {
        if (req.body.username === ''){
            res.render('index.html')
        }
        else {
            await enterTime.save()
            res.send("CLOCKED IN");
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

router.put('/clockOut/:time', async (req, res) => {
    
    try {
        let cOut = await Clock.find({
            date: req.body.date,
            username: req.body.username,
            clockOut: '',
        })
        //console.log(cOut[0]._id)
        if (req.body.username === ''){

        }
        else {
            if (cOut[0] !== undefined){
                Clock.updateOne( 
                    { _id: cOut[0]._id }, 
                    { $set: { clockOut: req.params.time } },
                    function(err, res) {
                      if (err) throw err;
                      console.log("1 document updated");
                    }
                );
                res.sendStatus(200);
            }
            else {
                res.send("CLOCK OUT NOT FOUND. Contact you supervisor")
            }
        }
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

});

router.get('/getAll/:username', async (req, res) => {
    try {
        let result = await Clock.find({
            username: req.params.username
        });
        res.send(result)
    }
    catch (e) {
        console.log(e)
    }
});

router.get('/getAllUsers', async (req, res) => {
    try {
        let result = await Clock.find({});
        res.send(result)
    }
    catch (e) {
        console.log(e)
    }

});

router.put('/saveAll/:username', async (req, res) => {
    try {
        let items = req.body.items;
        
        for (let i = 0; i < items.length; i++){
            Clock.updateOne( 
                { _id: items[i]._id }, 
                { $set: { 
                    clockOut: items[i].clockOut,
                    clockIn: items[i].clockIn
                }},
                function(err, res) {
                  if (err) throw err;
                  console.log("1 document updated");
                }
            );
        }
        res.send('SAVED')

    }   
    catch(e){
        console.log(e)
    }
});

router.put('/saveAll/', async (req, res) => {
    try {
        let items = req.body.items;
        
        for (let i = 0; i < items.length; i++){
            Clock.updateOne( 
                { _id: items[i]._id }, 
                { $set: { 
                    clockOut: items[i].clockOut,
                    clockIn: items[i].clockIn
                }},
                function(err, res) {
                  if (err) throw err;
                  console.log("1 document updated");
                }
            );
        }
        res.send('SAVED')

    }   
    catch(e){
        console.log(e)
    }
});

router.delete('/delete/:ID', async (req, res) => {
    try {
        let itemToDel = await Clock.find({
            _id: req.params.ID
        })
        console.log(itemToDel)
        if (itemToDel === undefined){
            console.log('ITEM TO DELETE NOT FOUND')
        }
        else {
            Clock.deleteOne({
                _id: itemToDel[0]._id
            }, function(err, res) {
                if (err) throw err;
                console.log("1 document updated");
              });

            res.send('DELETED')
        }
    }
    catch(e){
        console.log(e)
    }
});

module.exports = {
    model: Clock,
    routes: router,
}