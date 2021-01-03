//const path = require('path')
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/generateDate").generateDate;
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const methodOverride = require('method-override');

const app = express();
const port = 3000;
const hostName = "127.0.0.1";

mongoose.connect(
  "mongodb+srv://mgelgi17:1234567899@cluster0.ackgl.mongodb.net/nodeblog_db?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);

const mongoStore = connectMongo(expressSession);

app.use(
  expressSession({
    secret: "testest",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Flash - Message Middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
});

app.use(fileUpload());
app.use(express.static("public"));
app.use(methodOverride('_method'))

app.engine("handlebars", exphbs({ helpers: { generateDate: generateDate } }));
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// DISPLAY LINK Middleware
app.use((req, res, next) => {
  const { userId } = req.session;
  if (userId) {
    res.locals = {
      displayLink: true,
    };
  } else {
    res.locals = {
      displayLink: false,
    };
  }
  next()
});


const myMiddleware = (req, res, next) => {
  //console.log('benim adım metehan')
  next();
};

app.use("/", myMiddleware);

const main = require("./routes/main");
app.use("/", main);

const posts = require("./routes/posts");
app.use("/posts", posts);

const users = require("./routes/users");
app.use("/users", users);

const admin = require("./routes/admin/home");
app.use("/admin", admin);


app.listen(port, hostName, () => {
  console.log(`Server çalışıyor, http://${hostName}:${port}/`);
});
