var express = require('express');
var router = express.Router();
router.use(express.json());

var VerifyToken = require('../utils/VerifyToken');
var Meeting = require('../model/Meeting');
var ObjectId = require('mongoose').Types.ObjectId;

// Creates a new meeting and returns the details including an _id
router.post('/', VerifyToken, function (req, res) {
    Meeting.create({
        title: req.body.title,
        date: req.body.date,
        time: req.body.time,
        organiser: req.body.organiser,
        attendies: req.body.attendies,
        timestamp: req.body.timestamp
    },
        function (err, meeting) {
            if (err) {
                //Check for DB validation errors
                if (err.name && err.name === 'ValidationError') return res.status(400).send({ message: err.message });

                return res.status(500).send({ message: 'Server error' });
            }

            // return success with the created meeting details
            res.status(200).send(meeting);
        });
});

// Fetcha meeting with different search options passed as http query params
// If no search options are fprovided then all meetings are returned
router.get('/', VerifyToken, function (req, res) {
    Meeting.find(req.query, function (err, meetings) {
        if (err) {
            //Check for DB validation errors
            if (err.name && err.name === 'ValidationError') return res.status(400).send({ message: err.message });

            return res.status(500).send({ message: 'Server error' });
        }

        if (!meetings)
            return res.status(404).send({ message: 'No meetings found with provided options' });

        res.status(200).send(meetings);
    });
});


// Updates a meeting with the provided id
router.put('/:id',  VerifyToken,  function (req, res) {

    //Check if the provided id is a valid mongodb objectid
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send({message: 'No meeting found with given id'});
    }

    //Find update and fetch the updated meeting details from DB
    Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, meeting) {
        
        if (err) {
            //Check for DB validation errors
            if (err.name && err.name === 'ValidationError') return res.status(400).send({ message: err.message });

            return res.status(500).send({ message: 'Server error' });
        }

        if (!meeting)
            return res.status(404).send({ message: 'No meeting found with given id' });

        res.status(200).send(meeting);
    });
});


module.exports = router;