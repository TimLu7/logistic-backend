const express = require('express');
const cors = require('cors');
const { ObjectId } = require('mongodb');
const router = require('./routes/routes');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const busboy = require('connect-busboy');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(busboy());
app.use(
  session({
    secret: 'catcatcat',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(router);

app.listen(PORT, () => {
  console.log(`Listening for connections on port ${PORT}`);
});
