const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// use middleWar
app.use(cors());
app.use(express.json());

// username: phone-store
// pass: CjbeCnYhRnbjs8DS



const uri = "mongodb+srv://phone-store:CjbeCnYhRnbjs8DS@cluster0.vdvri.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const phoneDB = client.db("phone-DB").collection("phones");
        app.get('/products', async (req, res) => {
            const query = {};
            const cursor = phoneDB.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await phoneDB.insertOne(newProduct);
            res.send(result)
        })


    } finally {

    }

}
run().catch(console.dir());



app.get('/', (req, res) => {
    res.send('phone server run unsuccessfully.')
})

app.listen(port, () => {
    console.log("server running...");
})