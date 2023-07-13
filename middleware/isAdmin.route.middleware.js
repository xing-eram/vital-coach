const isAdmin = (req, res, next) => {
     
    const { _id, profile } = req.session.currentUser;
    if(profile === 'Admin'){
        req.app.locals.isAdmin = true
        
    }else if(profile === 'Patient'){
        req.app.locals.isAdmin = false
        res.redirect(`/auth/patient/${_id}/main`);
    }else if(profile === 'Trainer'){
        req.app.locals.isAdmin = false
        res.redirect(`/auth/trainer/${_id}/main`);
    }
    next();
    
}

module.exports = { isAdmin };