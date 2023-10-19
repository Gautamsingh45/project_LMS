const express = require('express');
const router = express.Router();
const User = require('../models/User');

const loginMiddleware = require('../middleware/login');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
router.get('/', async(req, res) => {
    res.render('register');
    
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, role, email, password  } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        const confirmationCode = generateConfirmationCode();//change 1
        if (existingUser) {
            // Email already registered, handle this case
            return res.send('Email already registered, handle this case'); // Redirect to registration page with an error message
        }

        // If the email is unique, proceed with registration
        const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const user = new User({ firstName, lastName,role, email, password, token , confirmationCode,
            isConfirmed: false });
        await user.save();

        sendConfirmationEmail(email, confirmationCode);//change 1
        // res.render('register', { email }); 
    } catch (error) {
        console.error(error);
        res.redirect('/register');
    }
});
function generateConfirmationCode() {
    // return uuidv4().toString().replace(/-/g, ''); // Generate a random confirmation code using UUID
    const code = Math.floor(100000 + Math.random() * 900000); // Generates a 6-digit random number
    return code.toString();  
}
  
  function sendConfirmationEmail(email, confirmationCode) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'gautamsingh893591@gmail.com',
        pass: 'tcdencsoubsnhymc'
      }
    });
  
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Confirmation Email',
      text: `Your confirmation code is: ${confirmationCode}`
    };
  
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  router.post('/confirmation', async (req, res) => {
    const { verificationCode } = req.body;
  
    try {
      const user = await User.findOne({ confirmationCode: verificationCode });
  
      if (user) {
        user.isConfirmed = true;
        await user.save();
        res.redirect('/'); // Redirect to login after successful confirmation
      } else {
        return res.status(404).send('User not found or invalid verification code.');
      }
    } catch (err) {
      console.error(err);
      return res.status(500).send('Internal Server Error');
    }
  });
router.get('/', (req, res) => {
    res.render('register');
});



// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email, password });
//         if (user) {
//             req.session.userId = user._id; // Store user ID in session
//             res.redirect('/home');
//         } else {
//             res.redirect('/login');
//         }
//     } catch (error) {
//         console.error(error);
//         res.redirect('/login');
//     }
// });

router.post('/login', loginMiddleware, (req, res) => {
    const { role, userId, isConfirmed} = req.session;
    // const {user} = req.session;
    // if (role === 'Admin' && isConfirmed== 'true' ) {
    // //   return res.render('login');
    // res.redirect('/admin');
    // res.redirect('/admin');
    // } else if (role === 'Student' && isConfirmed== 'true') {
    // //   return res.render('home',{ userId });
    //       res.redirect('/home');
    // } else {
    //   res.send('Invalid role');
    // }
    if (isConfirmed) {
        if (role === 'Admin') {
            res.redirect('/admin');
        } else if (role === 'Student') {
            res.redirect('/home');
        } else {
            res.send('Invalid role');
        }
    } else {
        res.send('Email not confirmed. Please confirm your email before logging in.');
    }
  });


router.get('/logout', (req, res) => {
    res.render('register');
});
// In routes/authRoutes.js
router.get('/home', async (req, res) => {
    
    try {
        const { userId} = req.session;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('home', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});

router.get('/admin', async (req, res) => {
    
    try {
        const { userId} = req.session;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            // return res.redirect('/login');
            res.render('admin');
        }
        res.render('admin', { user });
        // res.render('admin');
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});

router.get('/about',async(req, res) => {
    
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('about', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
router.get('/contact', async(req, res) => {
    
    try {
        const userId = req.session.role;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('contact', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
router.get('/courses', async(req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('courses', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
   
});
router.get('/login',async(req, res) => {
   
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('home', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
router.get('/playlist',async(req, res) => {
    
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('playlist', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
router.get('/profile', async(req, res) => {
    
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('profile', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
router.get('/teacher', async(req, res) => {
   
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('teacher', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
router.get('/teachers', async(req, res) => {
   
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('teachers', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
// router.get('/update', async(req, res) => {
   
//     try {
//         const userId = req.session.userId;

//         if (!userId) {
//             return res.redirect('/login');
//         }

//         const user = await User.findById(userId);

//         if (!user) {
//             return res.redirect('/login');
//         }

//         res.render('update', { user });
//     } catch (error) {
//         console.error(error);
//         res.redirect('/login');
//     }
// });

// Add this at the end of your authRoutes.js file

router.get('/update/:id', async (req, res) => {
    try {
        const userId = req.session.userId;

        if (!userId) {
            return res.redirect('/login');
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.redirect('/login');
        }

        res.render('update', { user });
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});
// router.get('/update/:id', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public/images/pic-1.jpg'));
// });


router.post('/update/:id', async (req, res) => {
    const { firstName,lastName, email, password } = req.body;

    try {
        const user = await User.findById(req.params.id);
        user.firstName = firstName;
        user.lastName = lastName
        user.email = email;
        if (password) {
            user.password = password;
        }
        await user.save();
        res.redirect('/profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// module.exports = router;

    
router.get('/profile', (req, res) => {
    res.render('profile');
});

// Handle profile update
router.post('/profile', async (req, res) => {
    const { firstName,lastName, email, password } = req.body;
    try {
        const user = await User.findById(req.user._id);
        user.firstName = firstName;
        user.lastName = lastName
        user.email = email;
        if (password) {
            user.password = password;
        }
        await user.save();
        res.redirect('/profile');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
