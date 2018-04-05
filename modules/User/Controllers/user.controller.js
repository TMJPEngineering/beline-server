import passport from 'passport';
import axios from 'axios';
import _ from 'lodash';
let UserModel = new Models('User');
let ContactModel = new Models('Contact');
class UserController {
   
    index(req, res) {
        
        passport.authenticate('tmj', function(err, user, info) {
            var throwErr = err || info;
            if (throwErr) {
                return res.json(false);
            }
    
            req.logIn(user, function(err) {
                if (err) {
                    return res.json(false);
                }
                
                UserModel.findById(user).then(function(data) {
                    console.log("data:", data);
                    if (_.isEmpty(data)) {
                        console.log('user does not exist');
                        var newUser = UserModel.save(user);
                        console.log("new:", newUser);
                        return res.json(user);
                    }

                    return res.json(data);
                });
               
            });
        })(req, res);

    }

    search(req, res) {

        var key = req.query.key;
        UserModel.search(key).then((user)=>{
            console.log(user);
            res.send(user);
        });
       
    }

    add(req, res) {
       
        let data = req.body.data;
        console.log('add:', data);
        if (data.contact.webhooks) {
            axios.post(data.contact.webhooks, {events: [data]}).then((response)=>{
                console.log('test', response.data);
                if (response.data) {
                    //Save new contact
                    ContactModel.save(data);
                    res.send(data);
                }
            });

            return;
        }

        //Save new contact
        ContactModel.save(data);
        res.send(data);
       

    }
}

module.exports = new UserController;
