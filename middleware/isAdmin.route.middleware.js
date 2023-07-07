const isAdmin = (req, res, next) => {
    const { _id, profile } = req.session.currentUser;
    console.log(profile)
    
    if(profile === 'Admin'){
        next();
    }else if(profile === 'Patient'){
        res.redirect(`/auth/patient/${_id}/main`);
    }else if(profile === 'Trainer'){
        res.redirect(`/auth/trainer/${_id}/main`);
    }
}

module.exports = { isAdmin };