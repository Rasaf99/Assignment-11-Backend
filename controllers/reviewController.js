const ReviewModel = require('../models/reviewModel')

const AppError = require('../utlis/appError.js')
const tryCatchAsync = require('../utlis/tryCatchAsync.js')



/* 

Description: Fetch all the reviews 

Method: GET

Route: /api/review

Access: Public

*/

const fetchReviews = tryCatchAsync(async (req, res, next) => {

        const reviews = await ReviewModel.find({}).sort({ createdAt: -1 })

        res.status(200).json(reviews)

     
})




/* 

Description: fetch all the reviews of a particular service 

Method: GET

Route: /api/reviews/service/:id

Access: Public
*/


const fetch_reviews_of_a_service = tryCatchAsync(async (req, res, next) => {


        const { id } = req.params

        // checking whether any review exits with that id or not
        const review = await ReviewModel.find({service_id: id }).sort({ createdAt: -1 })

        
        if (!review) {

        return next(new AppError('No review exits with that id', 400))
            
        }


      res.status(200).json(review)
        
})




/* 

Description: fetch all the reviews of a particular user 

Method: GET

Route: /api/reviews/user/:id

Access: Public
*/


const fetch_reviews_of_a_user = tryCatchAsync(async (req, res, next) => {


        const { id } = req.params

        // checking whether any review exits with that id or not
        const review = await ReviewModel.find({user_id: id }).sort({ createdAt: -1 })

        
        if (!review) {

        return next(new AppError('No review exits with that id', 400))
            
        }


      res.status(200).json(review)
        
})



/* 

Description:  Create a Review 

Method: POST

Route: /api/review

Access: Private


*/

const createReview = tryCatchAsync(async (req, res, next) => {


     

        const review = await ReviewModel.create({ ...req.body })

        res.status(200).json(review)


})





/* 

Description:  Delete a specific review 

Method: DELETE

Route: /api/review/:id

Access: Private

*/


const deleteReview = tryCatchAsync(async (req, res, next) => {


        const { id } = req.params

        // trying to find the review 
        const existsOrNot = await ReviewModel.findOne({ _id: id })


        if (!existsOrNot) {

                return next(new AppError('There is no review with that id.', 400))

        }

        const review = await ReviewModel.findOneAndDelete({ _id: id })


        res.status(200).json(review)

})




/* 

Description:  Update a review  

Method: PATCH

Route: /api/review/:id

Access: Private

*/

const updateReview =  tryCatchAsync(async (req, res, next) => {

        const { id } = req.params

        // trying to find the review 
        const existsOrNot = await ReviewModel.findOne({ _id: id })


        if (!existsOrNot) {

                return next(new AppError('There is no review with that id.', 400))
        }

    
        const review = await ReviewModel.findOneAndUpdate({_id: id}, req.body, {new:true, runValidators:true}) 
        
    
        res.status(200).json(review)

})





module.exports = { fetchReviews, fetch_reviews_of_a_service, fetch_reviews_of_a_user, createReview, deleteReview, updateReview }