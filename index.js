const express = require('express');
const wa = require('@open-wa/wa-automate');
const knex = require('./src/database/connection')
const port = process.env.PORT || 3333;
const cors = require('cors');

const app = express();

app.use(express.json({ limit: '20mb', extended: true }));
app.use(cors());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    next();
});


wa.create().then((client) => {

    app.post('/contacts', async (request, response) => {
        const { contacts } = request.body;
        if (Array(contacts).length === 0) {
            return response.json({ message: 'error', value: 'Not Contact received' })
        }
        Array(contacts).map(async (ress) => {
            return knex('leads').insert([{
                is_active: true,
                number: String(ress.number),
                email: String(ress.email)
            }])
        })
        return response.json({ message: 'success' })
    });


    app.get('/contacts', async (request, response) => {
        knex('leads').select('*').then(res => {
            return response.json({ message: 'success', leads: res })
        }).catch(err => {
            return response.json({ message: 'error', err: err })
        })

    })

    app.post('/send', async (request, response) => {
        const { message } = request.body;
        if (String(message).length === 0) {
            if (Array(contacts).length === 0) {
                return response.json({ message: 'error', value: 'Not Message received' })
            }
        }
        knex('leads').select('*').then(resss => {
            if (Array(resss).length === 0) {
                return response.json({ message: 'error', value: 'Not leads found' })
            }
            resss.map(async (val) => {
                return client.sendText(`${val.number}@c.us`, message);
            })
            return response.json({ message: 'success', leads: resss })
        }).catch(err => {
            return response.json({ message: 'error', value: err })
        })
    })



}).then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))




