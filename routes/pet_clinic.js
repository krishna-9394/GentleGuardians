const express = require('express')
const router = express.Router();
const connection = require('../db');

const baseQuery = "select c.clinic_id as id, c.clinic_name as clinicName, c.doctor_name as doctorName, c.contact_number as contactNumber, a.street_name as streetName, a.city, a.state, a.pincode from pet_clinic as c join address as a on a.address_id = c.address_id";

router.get('/', (req, res) => {
    const sql_query = baseQuery+";";
    connection.query(sql_query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data from database');
            return;
        }
        res.json(results);
    });
});

router.get('/id', (req, res) => {
    const userId = req.query.id;
    const sql_query = baseQuery+" where c.clinic_id = " + userId + ";";
    connection.query(sql_query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data from database');
            return;
        }
        res.json(results);
    });
});

router.get('/name', (req, res) => {
    const clinicName = req.query.name;
    const sql_query = baseQuery+" where c.clinic_name LIKE '" + clinicName + "%' OR c.clinic_name LIKE '%"+clinicName+"' OR c.clinic_name LIKE '%"+clinicName+"%';";
    connection.query(sql_query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data from database');
            return;
        }
        res.json(results);
    });
});

router.get('/city', (req, res) => {
    const city = req.query.city;
    const sql_query = baseQuery+" where a.city LIKE '" + city + "%' OR a.city LIKE '%"+city+"' OR a.city LIKE '%"+city+"%';"
    connection.query(sql_query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data from database');
            return;
        }
        res.json(results);
    });
});

router.get('/state', (req, res) => {
    const state = req.query.state;
    const sql_query = baseQuery+" where a.state LIKE '" + state + "%' OR a.state LIKE '%"+state+"' OR a.state LIKE '%"+state+"%';"
    connection.query(sql_query, (err, results) => {
        if (err) {
            console.error('Error fetching data:', err);
            res.send('Error fetching data from database');
            return;
        }
        res.json(results);
    });
});


module.exports = router;