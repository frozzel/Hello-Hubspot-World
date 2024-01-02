const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config()   ;

const app = express();

app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));

// const PRIVATE_APP_ACCESS = process.env.PRIVATE_APP_ACCESS;

app.get('/contacts', async (req, res) => {

    const contacts = 'https://api.hubspot.com/crm/v3/objects/contacts';
    const headers = {
        Authorization: `Bearer ${process.env.PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }

    try {
        const resp = await axios.get(contacts, { headers });
        const data = resp.data.results;
        res.render('contacts', { title: 'Contacts | HubSpot APIs', data });    
        // res.json(data);  
    } catch (error) {
        console.error(error);
    }

});

PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}/contacts`));