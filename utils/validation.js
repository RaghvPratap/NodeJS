const validator=require('validator')
const validate=(req,res)=>{
  const {firstName,lastname,emailID,password}=req.body;
  if(!firstName || !lastname){
    throw new error("Name is not valid");
  }else if(!validator.isEmail(emailID)){
    throw new error('Email is not valid');
  }
  else if(!validator.isStrongPassword(password)){
    throw new error('password is not strong');
  }
}

module.exports={
  validate
}