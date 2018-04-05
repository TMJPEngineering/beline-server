import ContactSchema from './ContactSchema';

class ContactModel {
    save(data) {       
        let newContacts = [
            {
                _user: data.contact._id,
                user_id: data.user.id,            
            }, {
                _user: data.user._id,
                user_id: data.contact.id,     
            }

        ]
        ContactSchema.insertMany(newContacts).then(function() {
            console.log('New contact added');
        }).catch(function(err) {
            console.log(err);
        });

    }

    get(id) {
        return ContactSchema.find({user_id: id})
            .populate('_user')
            .exec(function(err, users) {
                if (err) throw err;
                console.log(users);
                return users;
            })
    }

    delete(data) {
        console.log('delete:', data);
        ContactSchema.remove({$or: [{user_id: data.user.id, _user: data.contact._id}, {user_id: data.contact.id, _user: data.user._id}]}, function() {
            console.log('Deleted');
        });
    }
}

export default new ContactModel();
