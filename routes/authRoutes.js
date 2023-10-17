const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Email already registered, handle this case
            return res.send('Email already registered, handle this case'); // Redirect to registration page with an error message
        }

        // If the email is unique, proceed with registration
        const token = Math.random().toString(36).substr(2) + Date.now().toString(36);
        const user = new User({ firstName, lastName, email, password, token });
        await user.save();
        res.render('register');
    } catch (error) {
        console.error(error);
        res.redirect('/register');
    }
});


router.get('/', (req, res) => {
    res.render('register');
});



router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.userId = user._id; // Store user ID in session
            res.redirect('/home');
        } else {
            res.redirect('/login');
        }
    } catch (error) {
        console.error(error);
        res.redirect('/login');
    }
});


router.get('/logout', (req, res) => {
    res.render('register');
});
// In routes/authRoutes.js
router.get('/home', async (req, res) => {
    
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
        const userId = req.session.userId;

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
