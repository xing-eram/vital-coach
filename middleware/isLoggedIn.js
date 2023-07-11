module.exports = (req, res, next) => {
    // checks if the user is logged in when trying to access a specific page
    if (!req.session.currentUser) {
      req.app.locals.isLoggedIn = false;
    } else {
      req.app.locals.isLoggedIn = true;
    }
    console.log('isLoggedIn: ', req.app.locals.isLoggedIn);
    next();
  };