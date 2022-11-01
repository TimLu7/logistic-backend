const {MongoClient} = require('mongodb');
const { ObjectId } = require('mongodb');
const dbName = 'logistic_system';
const coll = 'items';
const collUser = 'users';
const url = process.env.MOGO_URL || "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const db = client.db(dbName);

module.exports = {

  getAllDocs: async () => {
    return await db.collection(coll).find().toArray();
  },

  addDoc: async (doc) => {
    return await db.collection(coll).insertOne(doc);
  },

  deleteDoc: async (id) => {
    const filter = { _id: new ObjectId(id) };
    return await db.collection(coll).deleteOne(filter);
  },
  findUser:async(name)=>{
    let obj=db.collection(collUser).findOne({username:name});
    return await db.collection(collUser).findOne({username:name});
  },
  addUser:async(user)=>{
    return await db.collection(collUser).insertOne(user);
  },
  findByName:async(name)=>{
    return await db.collection(coll).find({name:name}).toArray();
  },
  findItemById:async(id)=>{
    return await db.collection(coll).findOne({
      _id:ObjectId(id)
    });
  },
  updateItemById:async(id,item)=>{
    return await db.collection(coll).updateOne({_id:ObjectId(id)},{$set:item});
  }
};
