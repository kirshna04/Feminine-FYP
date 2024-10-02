const joi = require('joi');
const { statusCode } = require('../../../common/api_response');

const registeration_validation = (req,res,next)=>{
    let validation =joi.object().keys({
        role:joi.string().required(),
        name:joi.string().required(),
        email:joi.string().email().required(),
        password:joi.string().required(),
    })
    const {error} = validation.validate(req.body,{abortEarly:false})
    if(error){
        res.status(statusCode.bad_request).json({error:error.message})
    }
    else{
        next()
    }
}

const login_validation = (req,res,next)=>{
    let validation = joi.object().keys({
        email:joi.string().email().required(),
        password:joi.string().required(),
    })
    const {error} = validation.validate(req.body,{abortEarly:false})
    if(error){
        res.status(statusCode.bad_request).json(error?.message)
    }
    else{
        next()
    }
}

const send_otp_validation =(req,res,next)=>{
    let validation = joi.object().keys({
        email:joi.string().email().required(),
    })
    const {error} = validation.validate(req.body,{abortEarly:false})
    if(error){
        res.status(statusCode.bad_request).json(error.message)
    }
    else{
        next()
    }
}

const verify_otp_validation = (req, res, next) => {
    let validation = joi.object().keys({
        email: joi.string().email().required(),
        otp: joi.string().required()
    });
    const { error } = validation.validate(req.body, { abortEarly: false });

    if (error) {
        console.log(error);
        res.status(statusCode.bad_request).json(error.message);
    } else {
        next();
    }
};



const change_password_validation = async(req,res,next)=>{
    let validation = await joi.object().keys({
        email:joi.string().email().required(),
        password:joi.string().required()
    })
    const {error} = validation.validate(req.body,{abortEarly:false})
    if(error){
        res.status(statusCode.bad_request).json(error.message)
    }
    else{
        next()
    }
}

module.exports = {registeration_validation,login_validation,send_otp_validation,verify_otp_validation,change_password_validation}