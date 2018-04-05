/* global Schema, DB */

import bcrypt from 'bcrypt';

let userSchema = new Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    employee_id: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    image: {
        type: String,
        require: true
    },
    webhooks: {
        type: String,
        require: true
    }
});

userSchema.methods.verifyPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

export default DB.model('User', userSchema);
