import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const checkAuth = async (req, res, next) => {
   try{
    const token= req.cookies.token;
    if(!token){
      console.log('No Token Provided');
      return res.status(401).json({ message: 'User Not Verified' });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //console.log(decoded);
    req.userId = decoded.id;
    next();
   }
   catch(error){
     console.error(error);
     return res.status(500).json({ message: 'No Token Provided' });
   }
};

export default checkAuth;