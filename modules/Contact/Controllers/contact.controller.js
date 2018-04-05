import passport from 'passport';
import axios from 'axios';
let ContactModel = new Models('Contact');
class ContactController {
   
    show(req, res) {
        ContactModel.get(req.user.id).then((contacts)=>{
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
