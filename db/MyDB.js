const { MongoClient, ObjectId } = require('mongodb');

function MyDB() {
  const myDB = {};

  const url = process.env.MONGO_URL || 'mongodb://localhost:27017';
  const DB_NAME_1 = 'myFiles';

  const DB_NAME_2 = 'fakeUsers';
  const COLLECTION_NAME = 'users';

  myDB.authenticate = async (user) => {
    const client = new MongoClient(url);

    const db = client.db(DB_NAME);
    const usersCol = db.collection(COLLECTION_NAME);
    console.log('searching for', user);
    const res = await usersCol.findOne({ user: user.user });
    console.log('res', res, res.password === user.password);
    if (res.password === user.password) return true;
    return false;
  };

  myDB.getFiles = async (query = {}) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log('Connecting to the db');
      await client.connect();
      console.log('Connected!');
      const db = client.db(DB_NAME);
      const filesCol = db.collection('files');
      console.log('Collection ready, querying with ', query);
      const files = await filesCol.find(query).toArray();
      console.log('Got files', files);

      return files;
    } finally {
      console.log('Closing the connection');
      client.close();
    }
  };

  myDB.deleteFile = async (file) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log('Connecting to the db');
      await client.connect();
      console.log('Connected!');
      const db = client.db(DB_NAME);
      const filesCol = db.collection('files');
      console.log('Collection ready, deleting ', file);
      const files = await filesCol.deleteOne({ _id: ObjectId(file._id) });
      console.log('Got files', files);

      return files;
    } finally {
      console.log('Closing the connection');
      client.close();
    }
  };

  myDB.createFile = async (file) => {
    let client;
    try {
      client = new MongoClient(url, { useUnifiedTopology: true });
      console.log('Connecting to the db');
      await client.connect();
      console.log('Connected!');
      const db = client.db(DB_NAME);
      const filesCol = db.collection('files');
      console.log('Collection ready, insert ', file);
      const res = await filesCol.insertOne(file);
      console.log('Inserted', res);

      return res;
    } finally {
      console.log('Closing the connection');
      client.close();
    }
  };
  return myDB;
}
module.exports = MyDB();
