const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;


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

        // add user
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send({ result })
        })

        // get users
        app.get('/user', async (req, res) => {
            const query = {}
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users)
        })

        // get specific user
        app.get('/user/:_id', async (req, res) => {
            const id = req.params._id
            console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query)
            res.send(result)
        })

        //update user
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id
            const updatedUser = req.body
            const Filter = { _id: ObjectId(id) }
            const options = { upsert: true };
            const updateDocs = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            }
            console.log(Filter, updateDocs, options);
            const result = await userCollection.updateOne(Filter, updateDocs, options);
            res.send(result)
        })

        // delet user
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await userCollection.deleteOne(query);
            res.send(result)
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