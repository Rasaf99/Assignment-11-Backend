const express = require('express')

const { fetchServices, searchService, createService, deleteService, updateService } = require('../controllers/serviceController')


const router = express.Router()


// Get all services
router.route('/').get(fetchServices)


// Get a specific service
router.route('/:id').get(searchService)

// Post a new service
router.route('/').post(createService)


// Delete a specific service
router.route('/:id').delete(deleteService)


// Update a specific service
router.route('/:id').patch(updateService)


module.exports = router