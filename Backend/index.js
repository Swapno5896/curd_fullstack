const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express()
const port = 5000


// use middleware
app.use(cors());
app.use(express.json())


const uri = "mongodb+srv://nogod:5896@cluster0.kv6ok.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("users");
        // const user = { name: 'sunny', email: 'sunny@gmail.com' }
        // const result = await userCollection.insertOne(user);
        // console.log(`user inserted with id : ${result.insertedId}`);


        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send({ result })
        })
    }
    finally {
        // await client.close()
    }
}
run().catch(console.dir)





app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})