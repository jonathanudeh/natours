const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
  getMyTours,
  alerts,
} = require('../controllers/viewController');
const { protect, isLoggedIn } = require('../controllers/authController');
// const { createBookingCheckout } = require('../controllers/bookingController');

const router = express.Router();

// router.use(isLoggedIn);
router.use(alerts);

router.get(
  '/',
  //  createBookingCheckout,
  isLoggedIn,
  getOverview,
);
router.get('/tour/:slug', isLoggedIn, getTour);
router.get('/login', isLoggedIn, getLoginForm);
router.get('/me', protect, getAccount);
router.get('/my-tours', protect, getMyTours);

module.exports = router;
