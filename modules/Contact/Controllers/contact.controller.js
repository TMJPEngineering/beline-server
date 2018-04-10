import passport from 'passport';
import axios from 'axios';
let ContactModel = new Models('Contact');
class ContactController {
   
    show(req, res) {
        var user = JSON.parse(req.query.user);
        console.log('show:', req.user.id);
        console.log('body:', user);
        
        ContactModel.get(user.id).then((contacts)=>{
            res.send(contacts);
        });      
    }

    delete(req, res) {
        console.log(req.body);
        ContactModel.delete(req.body);
        res.send(true);
    }

}

module.exports = new ContactController;
