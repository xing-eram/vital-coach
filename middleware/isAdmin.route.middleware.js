const isAdmin = (req, res, next) => {
    console.log('Entramos al middleware')
    if(req.session.currentUser.profile === 'Admin'){
        next();
    }else if(req.session.currentUser.profile === 'Patient'){
        return res.redirect(`/auth/patient/${req.session.currentUser._id}/main`);
    }else{
        return res.redirect(`/auth/trainer/${req.session.currentUser._id}/main`);
    }
}

module.exports = { isAdmin };