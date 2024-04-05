const { mongoose } = require('mongoose');
const Job = require('../models/jobModels');
 
async function createJob(req, res) {
 
    try {
        const { title, description, location, salary, status } = req.body;
        const job = new Job({ title, description, location, salary, status });
        let jobExist = await Job.findOne({ $or: [{ title } ] })
 
        if (jobExist) {
            return res.json({'message': `This ${title} already exists`,'status':400});
        }
        const response = await job.save();
        if(response){
            return res.send({
                'msg':'Job create successfully.',
                'status':200,
                'response':response
            });
        }
 
    } catch (err) {
        console.error(err);
        return res.send({
            'msg':err.message,
            'status':500,
        });
    }
}

const editJob = async (req, res ) => {
   
    try {
        const {id} = req.query;
        const response = await Job.findOne({ _id: id})
        if(response){
            return res.send({
                'msg':'Job fetch successfully using id.',
                'status':200,
                'response':response
            });
        }
 
    } catch (err) {
        console.error(err);
        return res.send({
            'msg':err.message,
            'status':500,
        });
       
    }
   
}

const updateJob = async (req, res) => {
    try {
        const {id} = req.query;
        const { title, description, location, salary, status } = req.body;
        const filter = { _id: id };
        const update = { 
            title: title,
            description:description,
            location:location,
            salary:salary,
            
            
        };
        const response = await Job.findOneAndUpdate(filter, update, {
            new: true,
        });
        if(response){
            return res.send({
                'msg':'Job update successfully using id.',
                'status':200,
                'response':response
            });
        }
 
    } catch (err) {
        console.error(err);
        return res.send({
            'msg':err.message,
            'status':500,
        });
       
    }
}

const deleteJob = async (req, res) => {
    try {
        const {id} = req.query;
        const response  = await Job.deleteOne({ _id: id });
        if(response){
            return res.send({
                'msg':'Job Delete Successfully.',
                'status':200,
                'response':response
            });
        }
    } catch (err) {
        console.error(err);
        return res.send({
            'msg':err.message,
            'status':500,
        });
    }
}
const index  = async (req, res) => {
 
    try {
        
        const allJob = await Job.find()
        
        return res.send({
            'msg':'Fetch data successful!',
            'status':200,
            'data':allJob
        });
 
    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
       
    }
 
}

module.exports = { createJob, updateJob, deleteJob, editJob, index };



