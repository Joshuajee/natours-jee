const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(viewsController.alerts);

router.get('/', authController.isLoggedIn, viewsController.getOverview);

router.get('/tour/:slug', authController.isLoggedIn, viewsController.getTour);

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/sign-up', authController.isLoggedIn, viewsController.getSignUpForm);
router.get('/reset', authController.isLoggedIn, viewsController.getResetForm);
router.get('/forgot', authController.isLoggedIn, viewsController.getForgotForm);


router.get('/me', authController.protect, viewsController.getAccount);

router.get('/my-tours', authController.protect, viewsController.getMyTours);

module.exports = router;