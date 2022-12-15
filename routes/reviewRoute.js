const express = require('express')

const { fetchReviews, fetch_reviews_of_a_user, fetch_reviews_of_a_service, createReview, deleteReview, updateReview } = require('../controllers/reviewController.js')


const router = express.Router()


// Get all reviews
router.route('/').get(fetchReviews)

// Get all the reviews of particular service
router.route('/service/:id').get(fetch_reviews_of_a_service)

// Get all the reviews of particular user
router.route('/user/:id').get(fetch_reviews_of_a_user)


// Post a new review
router.route('/').post(createReview)


// Delete a specific review
router.route('/:id').delete(deleteReview)


// Update a specific review
router.route('/:id').patch(updateReview)



module.exports = router