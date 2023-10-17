// mongoose.connect('mongodb://0.0.0.0:27017/login_signup_example', { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');

// const web = require('./routes/web.js');


const app = express();

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Database connection
mongoose.connect('mongodb://0.0.0.0:27017/authApp', { useNewUrlParser: true, useUnifiedTopology: true });
// mongoose.connect("mongodb+srv://gautamsingh893591:V2jTulad1dfL6bE9@cluster0.vwrm2se.mongodb.net/student?retryWrites=true&w=majority")
const db = mongoose.connection;
db.once('open', () => console.log('Connected to MongoDB'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));


// exit

// app.use('/', express.static(path.join(process.cwd(), 'public')));
// app.use('/edit', express.static(path.join(process.cwd(), 'public')));
// app.use('/student/update', express.static(path.join(process.cwd(), 'public')));
// Routes
app.use('/', require('./routes/authRoutes'));

// app.use('/', web);
// const routes = require('./routes');
// app.use('/', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});













































































































































// const express = require('express');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const app = express();
// const session = require('express-session');
// const jwt = require('jsonwebtoken');

// const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
// app.use(session({ secret: 'your-secret-key', resave: true,saveUninitialized: true }));

// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true,
//   store: new MongoStore({ mongooseConnection: mongoose.connection })
// }));


// app.use(express.urlencoded({ extended: true }));



// app.set('view engine', 'ejs');
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('images'));
// app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/css'));

// Connect to your MongoDB database
// mongoose.connect("mongodb+srv://gautamsingh893591:V2jTulad1dfL6bE9@cluster0.vwrm2se.mongodb.net/student?retryWrites=true&w=majority")
// mongoose.connect('mongodb://0.0.0.0:27017/login_signup_example', { useNewUrlParser: true, useUnifiedTopology: true });

// Create a User model
// const User = mongoose.model('User', {
//   name:String,
//   username: String,
//   password: String
// });

// Render the login page
// app.get('/', async(req, res) => {
//   res.render('signup');
// });



// Handle login form submission
// app.post('/login', async (req, res) => {
//   const {  name, password } = req.body;

//   try {
//     const user = await User.findOne({name, password });

//     if (user && user.password === password) {
    //   res.send(`Welcome, ${user.username}!`);
        // res.render('home');
//         const token = jwt.sign({ name }, 'your-secret-key', { expiresIn: '1h' });
//         req.session.token = token;
//         res.redirect('/home');
//     } else {
//       res.send('Invalid credentials. Please try again.');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// Render the signup page
// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

// Handle signup form submission
// app.post('/signup', async (req, res) => {
//   const {name,username, password } = req.body;

//   try {
//     const userExists = await User.exists({ username });

//     if (userExists) {
//       res.send('Username is already taken. Please choose another.');
//     } else {
//       await User.create({ name,username, password });
    //   res.send('Account created successfully!');
//         res.render('signup');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Internal Server Error');
//   }
// });



// connection 
// app.get('/home', async(req, res) => {
//     res.render('home');
//   });
  // app.get('/about', (req, res) => {
  //   // res.render('about');
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('about', { name });
  //   });
  // });
  // app.get('/contact', (req, res) => {
  //   // res.render('contact');
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('contact', { name });
  //   });
  // });
  // app.get('/courses', (req, res) => {
  //   // res.render('courses');
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('courses', { name });
  //   });
  // });
  // app.get('/logout', (req, res) => {
  //   // res.render('signup'); 
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('signup', { name });
  //   });
  // });
  // app.get('/playlist', (req, res) => {
  //   // res.render('playlist'); 
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('playlist', { name });
  //   });
  // });
  // app.get('/profile', (req, res) => {
  //   // res.render('profile'); 
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('profile', { name });
  //   });
  // });
  // app.get('/teacher', (req, res) => {
  //   // res.render('login');
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('login', { name });
  //   });
  // });
  // app.get('/teachers', (req, res) => {
    // res.render('login');
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('login', { name });
  //   });
  // });
  // app.get('/update', (req, res) => {
  //   // res.render('update');
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('update', { name });
  //   });
  // });
  // app.get('/watch-video', (req, res) => {
  //   // res.render('watch-video');
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('watch-video', { name });
  //   });
  // });


  // app.get('/home', async (req, res) => {
  //   const token = req.session.token;
  //   if (!token) return res.redirect('/login');
  
  //   jwt.verify(token, 'your-secret-key', (err, decoded) => {
  //     if (err) return res.redirect('/login');
  //     const { name } = decoded;
  //     res.render('home', { name });
  //   });
  // });

// const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server started on http://localhost:${port}`);
// });
