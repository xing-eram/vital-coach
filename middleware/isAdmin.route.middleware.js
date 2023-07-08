const isAdmin = (req, res, next) => {
    const { _id, profile } = req.session.currentUser;
    console.log(profile)
    if (!req.session.currentUser) {
        req.app.locals.isLoggedIn = false;
        return res.redirect("/login");
    }
    if(profile === 'Admin'){
        req.app.locals.isAdmin = true
        next();
    }else if(profile === 'Patient'){
        req.app.locals.isAdmin = false
        res.redirect(`/auth/patient/${_id}/main`);
    }else if(profile === 'Trainer'){
        req.app.locals.isAdmin = false
        res.redirect(`/auth/trainer/${_id}/main`);
    }
    
}

module.exports = { isAdmin };