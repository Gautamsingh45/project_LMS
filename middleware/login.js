const User = require('../models/User');

const loginMiddleware = async (req, res, next) => {
  const { email, password,isConfirmed } = req.body;

  try {
    const user = await User.findOne({ email, password});

  //   if (user) {
  //     req.session.isConfirmed = user.isConfirmed;
  //     req.session.role = user.role;
  //    req.session.userId = user._id;
  //     next();
  //   } else {
  //     res.send('Invalid credentials');
  //   }
  // } catch (error) {
  //   res.status(500).send('Error during login');
  // }
  if (user) {
    if (user.isConfirmed) {
      req.session.isConfirmed = user.isConfirmed;
      req.session.role = user.role;
      req.session.userId = user._id;
      next();
    } else {
      res.send('Email not confirmed. Please confirm your email before logging in.');
    }
  } else {
    res.send('Invalid credentials');
  }
} catch (error) {
  res.status(500).send('Error during login');
}
};
// router.post('/login',loginMiddleware, async (req, res) => {
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

module.exports = loginMiddleware;
