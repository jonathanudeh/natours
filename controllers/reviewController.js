// create review and get all reviews for a tour

const Review = require('../models/reviewModel');
// const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const Tour = require('../models/tourModel');
const {
  deleteOne,
  updateOne,
  createOne,
  getOne,
  getAll,
} = require('./handlerFactory');

// middleware to set tour and user ids for nested routes used in the review routes
exports.setTourAndUserIds = async (req, res, next) => {
  const { tour, user, review, rating } = req.body;

  // Allow nested routes
  if (!tour) {
    req.body.tour = req.params.tourId;
  }
  if (!user) {
    req.body.user = req.user.id;
  }

  if (!tour || !user || !review || !rating) {
    return next(
      new AppError('Please provide tour, user, review and rating', 400),
    );
  }

  const userExists = await User.findById(user);
  if (!userExists) {
    return next(new AppError("User doesn't exist", 404));
  }

  const tourExists = await Tour.findById(tour);
  if (!tourExists) {
    return next(new AppError("Tour doesn't exist", 404));
  }
  next();
};

exports.createReview = createOne(Review);
exports.updateReview = updateOne(Review);
exports.deleteReview = deleteOne(Review);
exports.getReview = getOne(Review);
exports.getAllReviews = getAll(Review);
