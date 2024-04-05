const { mongoose } = require('mongoose');
const Company = require('../models/CompanyModel');


async function createCompany(req, res) {
 
    try {
        console.log(req.body);
        const { name, industry, size, location, description} = req.body;
        const company = new Company({ name, industry, size, location, description});
        let companyExist = await Company.findOne({ $or: [{ name } ] })
        if (companyExist) {
            return res.json({'message': `This ${name} already exists`,'status':400});
        }
        const response = await company.save();
        if(response){
            return res.send({
                'msg':'Company create successfully.',
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
const editCompany = async (req, res ) => {
   
    try {
        const {id} = req.query;
        const response = await Company.findOne({ _id: id})
        if(response){
            return res.send({
                'msg':'Company fetch successfully using id.',
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
const updateCompany = async (req, res) => {
    try {
        const {id} = req.query;
        const {  name, industry, size, location, description } = req.body;
        const filter = { _id: id };
        const update = { 
            name: name,
            industry:industry,
            size:size,
            location:location,
            description:description,
            
        };
        const response = await Company.findOneAndUpdate(filter, update, {
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
const companylist  = async (req, res) => {
 
    try {
        
        const allcompany = await Company.find()
        
        return res.send({
            'msg':'Fetch data successful!',
            'status':200,
            'data':allcompany
        });
 
    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
       
    }
 
}


module.exports = { createCompany, editCompany, updateCompany, companylist };