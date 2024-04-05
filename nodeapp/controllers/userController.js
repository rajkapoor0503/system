const { mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
const { successResponse,errorResponse } = require('../routes/utils/response');
const { responseMessage } = require('../routes/utils/responseMessage');

exports.register = async (req, res) => {
    try {
      const { name, email, password,  address, country, mobile } = req.body;
  
      let user = await User.findOne({ email });
      if (user) {
        return errorResponse(res,400,responseMessage?.user_already_exist,responseMessage?.user_already_exist)
      }
  
      user = new User({ name, email, password, address, country, mobile });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      return successResponse(res,400,responseMessage?.user_created, user)
    } catch (error) {
      console.error(error.message);
      return statusResponse(res,500,responseMessage?.internal_server_err)
    }
  };
  exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const payload = { user: { id: user.id } };
      console.log(payload)
      jwt.sign(payload, 'jwtSecret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  exports.userlist  = async (req, res) => {
 
    try {
        
        const alluser = await User.find()
        
        return res.send({
            'msg':'Fetch data successful!',
            'status':200,
            'data':alluser
        });
 
    } catch (error) {
        console.error(error);
        return res.send({
            'msg':error.message,
            'status':500,
        });
       
    }
 
}
  