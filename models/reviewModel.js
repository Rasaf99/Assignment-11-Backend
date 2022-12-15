const mongoose = require('mongoose');


const reviewSchema = mongoose.Schema({

    


    user_id: {
        type: String,
        required: true
    },


    service_id:{

        type: String,
        required: true
    },


    review: {
        type: String,
        required: true
    },

    reviewer_name: {

        type: String,
        required: true
    },   
    
    reviewer_image_url: {

        type: String,
        required: true
    }




}, { timestamps: true })



module.exports = mongoose.model('ReviewModel', reviewSchema)

