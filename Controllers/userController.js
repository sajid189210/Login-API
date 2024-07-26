//predefining the login credentials
const fullName = 'Muhammed Sajid';
const validEmail = 'sajid189210@gmail.com';
const validPassword = 'password';


const validateCredentials = ( validEmail, validPassword, email, password, req ) => {

    if ( email !== validEmail ) {
        if ( email === '' ){
        req.session.emailErrorMessage = 'Must enter email.';
        } else {
        req.session.emailErrorMessage = 'Incorrect Email.';
        }
    } else {
        req.session.emailErrorMessage = '';
    }

    if ( password !== validPassword ) {
        if ( password === '' ){
            req.session.passwordErrorMessage = 'Must enter password.';
            } else {
            req.session.passwordErrorMessage = 'Incorrect Password.';
            }   
    } else {
        req.session.passwordErrorMessage = '';
    }
};


//validating the login page
const loginValidation = (req, res) => {
    const { email, password } = req.body;

    validateCredentials ( validEmail, validPassword, email, password, req );

    if ( email === validEmail && password === validPassword ) {
        req.session.user = email;
        res.redirect ( 'homePage' );
    } else  {
        res.redirect ( 'loginPage' );
    }
}


//rendering the login page
const loginPage = ( req, res ) => {
    if ( req.session.user ) {
        res.redirect ( 'homePage' );
    } else {
        const emailErrorMessage = req.session.emailErrorMessage || '';
        const passwordErrorMessage = req.session.passwordErrorMessage || '';
        req.session.emailErrorMessage = '';
        req.session.passwordErrorMessage = '';
        res.render( 'login', { emailErrorMessage, passwordErrorMessage });
    }
}


//rendering homepage
const homepage = ( req, res) => {
    if ( req.session.user ) {
        res.render ( 'home', { fullName, user: req.session.user } );
    } else {
        res.redirect( 'loginPage' );
    }
};

const homeSignOut = ( req, res ) => {
    req.session.destroy ();
    res.redirect ( 'loginPage' );
}

module.exports = { 
    loginPage, 
    loginValidation, 
    homepage,
    homeSignOut
};



