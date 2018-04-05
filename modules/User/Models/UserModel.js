import UserSchema from './UserSchema';

class UserModel {
    findOneByUsername(payload) {
        return UserSchema.findOne({ username: payload.username }, (err, user) => {
            if (err) return payload.done(err);
            if (!user) return payload.done(null, false);
            if (!user.verifyPassword(payload.password)) return payload.done(null, false);
            return payload.done(null, user);
        });
    }

    save(params) {
        let user = new UserSchema(params);
       
        user.save(function(err) {
            if (err) throw err;
            console.log('user saved');
        });   
        return user;
    }

    findById(params) {
        
       
        return UserSchema.findOne({id: params.id}).exec((err, user)=>{
            if (err) throw err;
            console.log('saving');
            if (user) {
                user.id = params.id;
                user.name = params.name;
                user.email = params.email;
                user.image = params.image;
                user.employee_id = params.employee_id;
                user.save();
            }

            return user;
        });
    }

    search(params) {

        return UserSchema.find({name: {$regex: '.*' + params + '.*', $options: 'i'}})
            .exec(function(err, users) {
                return users;
            });
    }
}

export default new UserModel();
