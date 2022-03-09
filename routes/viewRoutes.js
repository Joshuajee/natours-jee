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

router.get('/my-reviews', authController.protect, viewsController.getMyReviews);

router.get('/billings', authController.protect, viewsController.getBillings);


router.get('/about-us', authController.protect, viewsController.getAboutUs);
router.get('/download-app', authController.protect, viewsController.getDownload);
router.get('/become-a-guide', authController.protect, viewsController.getBecomeAGuide);
router.get('/careers', authController.protect, viewsController.getCareers);
router.get('/contact', authController.protect, viewsController.getContact);

module.exports = router;
