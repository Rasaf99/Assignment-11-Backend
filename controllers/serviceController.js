const ServiceModel = require('../models/serviceModel.js')

const AppError = require('../utlis/appError.js')
const tryCatchAsync = require('../utlis/tryCatchAsync.js')




/* 

Description:  Fetch all the  services 

Method: GET

Route: /api/service

Access: Public

*/

const fetchServices = tryCatchAsync(async (req, res, next) => {

        let queriedServices = ServiceModel.find({}).sort({ createdAt: -1 })


        // pagination & limit
        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10
        const skip = (page-1)*limit


        queriedServices = queriedServices.skip(skip).limit(limit)

        

        // if everything is ok
        const services = await queriedServices

        res.status(200).json(services)

})




/* 

Description:  Search a specific service 

Method: GET

Route: /api/services/:id

Access: Public
*/


const searchService = tryCatchAsync(async (req, res, next) => {


        const { id } = req.params

        // checking whether any service exits with that id or not
        const service = await ServiceModel.findOne({_id: id })

        
        if (!service) {

        return next(new AppError('No service exits with that id', 400))
            
        }


      res.status(200).json(service)
        
})





/* 

Description:  Create a Service 

Method: POST

Route: /api/service

Access: Private


*/

const createService = tryCatchAsync(async (req, res, next) => {


        const newService = new ServiceModel(req.body);
        await newService.save();

        res.status(200).json(newService)


})





/* 

Description:  Delete a specific service 

Method: DELETE

Route: /api/service/:id

Access: Private

*/


const deleteService = tryCatchAsync(async (req, res, next) => {


        const { id } = req.params

        // trying to find the service 
        const existsOrNot = await ServiceModel.findOne({ _id: id })


        if (!existsOrNot) {

                return next(new AppError('There is no service with that id.', 400))

        }

        const service = await ServiceModel.findOneAndDelete({ _id: id })


        res.status(200).json(service)

})




/* 

Description:  Update a specific service 

Method: PATCH

Route: /api/service/:id

Access: Private

*/

const updateService =  tryCatchAsync(async (req, res, next) => {

        const { id } = req.params

        // trying to find the service 
        const existsOrNot = await ServiceModel.findOne({ _id: id })


        if (!existsOrNot) {

                return next(new AppError('There is no service with that id.', 400))
        }

    
        const service = await ServiceModel.findOneAndUpdate({_id: id}, req.body, {new:true, runValidators:true}) 
        
    
        res.status(200).json(service)

})



module.exports = { fetchServices, searchService, createService, deleteService, updateService }