const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');
const Trainer = require('../models/Trainer.model')
const Patient = require('../models/Patients.model')

const getSignup = (req, res, next) => {
    res.render('auth/signup');
}

const postSignup = async (req, res, next) => {
    const {username, email, password, confirmpassword, profile} = req.body;
   

    try {
        
        if(!username) {
            return res.status(400).render('auth/signup', { errorMessage: 'The username fiel is required' });
        }
        if(!email) {
            return res.status(400).render('auth/signup', { errorMessage: 'The email fiel is required' });
        }
        if(!password){
            return res.status(400).render('auth/signup', {errorMessage: 'The password fiel is required' });
        }
        
        const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!regex.test(password)) {
          res
            .status(400)
            .render("auth/signup", {
              errorMessage: "Password needs to have at least 8 chars and must contain at least one number, one lowercase and one uppercase letter."
          });
          return;
        }

        if(password !== confirmpassword){
            return res.status(400).render('auth/signup', { errorMessage: 'Plase make sure your passwords match' });
        }

        if(!profile) {
            return res.status(400).render('auth/signup', { errorMessage: 'The profile fiel is required' });
        }
        const foundUserName = await User.findOne( { username } )
        const foundEmail = await User.findOne( { email } )

        if(foundUserName || foundEmail){
            return res.render('auth/signup', {errorMessage: 'The user already exist' });
        }

        const salt = bcrypt.genSaltSync(12);
        const encryptedPassword = bcrypt.hashSync(password, salt);
        const userCreate = await User.create( { username, email, password: encryptedPassword, profile } )
        

        if(userCreate){

            if(profile === 'Trainer'){
                
                const userExist = await User.findOne( { username } );

                req.session.currentUser = userExist.toObject();
                delete req.session.currentUser.password;
                // guardamos el user en el req.session

                const createTrainer = await Trainer.create( {name: username, user: userExist._id})
            
                return res.redirect(`admin/${req.session.currentUser._id}/main`);
            }else{
                
                const userExist = await User.findOne( { username } );

                req.session.currentUser = userExist.toObject();
                delete req.session.currentUser.password;
            // guardamos el user en el req.session
            const createPatient = await Patient.create( {name: username, user: userExist._id})
            
                return res.redirect(`admin/${req.session.currentUser._id}/main`);
            }
            
            
        }
       
        
    } catch (error) {
        if (error instanceof mongoose.Error.ValidationError) {
            res.status(500).render("auth/signup", { errorMessage: error.message });
        } else if (error.code === 11000) {
            res.status(500).render("auth/signup", {
                errorMessage:
                    "Username and email need to be unique. Provide a valid username or email.",
            });
        } else {
            next(error);
        }
    }
}

const getLogin = (req, res) => {
    res.render('auth/login');
}

const postLogin = async (req, res, next) => {
    const {user,  password,} = req.body;
    console.log(req.body)
    try {
        if(!user) {
            return res.status(400).render('auth/login', { errorMessage: 'The username or email fiel is required' });
        }
        //if(!email) {
        //    return res.status(400).render('auth/login', { errorMessage: 'The email fiel is required' });
        //}
        if(!password){
            return res.status(400).render('auth/login', {errorMessage: 'The password fiel is required' });
        }

        const userExistNameUser = await User.findOne( {username: user} );
        const userExistEmail = await User.findOne( {email: user} );

        if(userExistNameUser){
            const matchUserName = bcrypt.compareSync(password, userExistNameUser.password);

            if(matchUserName){
                req.session.currentUser = userExistNameUser.toObject();
                 delete req.session.currentUser.password;
                return res.redirect(`admin/${req.session.currentUser._id}/main`);
            }

        
        }else if(userExistEmail){
            
            const matchEmail = bcrypt.compareSync(password, userExistEmail.password);

            if(matchEmail){
                req.session.currentUser = userExistEmail.toObject();
                 delete req.session.currentUser.password;
                return res.redirect(`admin/${loggedUserEmail._id}/main`);
            }

        }

        res.status(400).render('auth/login', {errorMessage: 'The username or password are incorrect' } );

    } catch (error) {
        next(error)
    }
}

const getMainPatient = async (req, res, next) => {
    try {
        const { _id, username, email, profile } = req.session.currentUser;
        const foundTrainers = await Trainer.find();
        res.render('patient/main-patient', {_id, username, email, profile, foundTrainers});
    } catch (error) {
        next(error)
    }
}

const getMainTrainer = async (req, res, next) => {
    try {
        const { _id, username, email, profile } = req.session.currentUser;
        const foundTrainer = await Trainer.findOne({user: _id})
        .populate( {path: 'user'} )

        res.render('trainer/main-trainer', {_id, username, email, profile, foundTrainer});

    } catch (error) {
        next(error)
    }
}
const getAdminMain = (req, res) => {
    try {
        const { username, email, profile } = req.session.currentUser;
        res.render('admin/main-admin', {username, email, profile});
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getSignup,
    postSignup,
    getLogin,
    postLogin,
    getMainPatient,
    getMainTrainer,
    getAdminMain
}