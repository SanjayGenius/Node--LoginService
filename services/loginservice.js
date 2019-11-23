const request = require('./request');
const bcrypt = require('bcrypt');

module.exports =  {
    loginCredentials: loginCredentials,
    activateLoginId:activateLoginId
}

function loginCredentials(req){
    if(req.query.loginId!=''&&req.query.password!=null){
        let url = 'login';
        let data = req.query;
        return request.sendpostrequest(url,data).then(function(response){
            var finalResult={
                "status" : "Success",
                "message" : "Login succesful.",
                "data":response.data
            }
            if(response.status == "Success"){
                console.log(bcrypt.compare(data.password,response.data.password));
                if(bcrypt.compareSync(data.password,response.data.password)){
                    if(response.data.activation_flag != 1){
                        finalResult.status = "Failure";
                        finalResult.message = "Account not activated"; 
                        finalResult.data="";
                    }
                } else {
                    finalResult.status = "Failure";
                    finalResult.message = "Invalid Credentials"; 
                    finalResult.data="";
                }
            } else {
                finalResult.status = "Failure";
                finalResult.message = "Something went wrong"; 
                finalResult.data="";
            }
            return finalResult;
        });
    }else{
        var finalResult={
            "status" : "Failure",
            "message" : "Invalid parameters passed"
        }
        return finalResult;
    }
}

function activateLoginId(req){
    if(req.query.loginId!=''){
        let url = 'activateLoginId';
        let data = req.query;
        return request.sendpostrequest(url,data).then(function(response){
            var finalResult={
                "status" : "Success",
                "message" : "Login succesful.",
                "data":response.data
            }
            if(response.status == "Success"){
                finalResult={
                    "status" : "Success",
                    "data" : "Account activated successfully",
                }
            } else {
                finalResult={
                    "status" : "Failure",
                    "data" : "Error occured while activating account"
                }
            }
            return finalResult;
        });
    } else {
        var finalResult={
            "status" : "Failure",
            "message" : "Invalid parameters passed"
        }
        return finalResult;
    }
}
