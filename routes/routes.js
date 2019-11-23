var loginservice=require('../services/loginservice')
const path = require('path');
var appRouter = function(app) {
    app.get("/login", function(req,res) {
        loginservice.loginCredentials(req).then(function(response){
            res.json(response);
        });
    });

    app.get("/activateLoginId", function(req,res) {
        loginservice.activateLoginId(req).then(function(response){
            if(response.status=="Success") {
                res.render('success.html')
            } else {
                res.render('success.html')
            }
        });
    });

}

module.exports = appRouter