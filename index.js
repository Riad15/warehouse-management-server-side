const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
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

        // find my item
        app.get('/myitems', async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const cursor = phoneDB.find(query);
            const myitems = await cursor.toArray();
            res.send(myitems);
        })

        // find a product
        app.get('/products/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await phoneDB.findOne(query);
            res.send(result);
        })

        // insert a product
        app.post('/products', async (req, res) => {
            const newProduct = req.body;
            const result = await phoneDB.insertOne(newProduct);
            res.send(result)
        })

        // update a quantity
        app.put('/quantity/:id', async (req, res) => {
            const id = req.params.id;
            const newQuantity = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    quantity: newQuantity.quantity,
                }
            };
            const result = await phoneDB.updateOne(filter, updateDoc, options);
            res.send(result);

        })

        // update product
        app.put('/products/:id', async (req, res) => {
            const id = req.params.id;
            const updateProduct = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updateProduct.name,
                    price: updateProduct.price,
                    quantity: updateProduct.quantity,
                    picture: updateProduct.picture,
                    feature: updateProduct.feature
                }
            };
            const result = await phoneDB.updateOne(filter, updateDoc, options);
            res.send(result);
        })



        // delete a product
        app.delete('/myitems/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await phoneDB.deleteOne(query);
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