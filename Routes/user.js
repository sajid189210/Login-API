const express = require ( 'express' );
const router = express.Router ();
const userController = require ( '../Controllers/userController' );

router.get ( '/loginPage', userController.loginPage, );
router.post ( '/loginForm', userController.loginValidation );
router.get ( '/homePage', userController.homepage );
router.get ( '/signOut', userController.homeSignOut );

module.exports = router;

