/* global Schema, DB */

import bcrypt from 'bcrypt';

let contactSchema = new Schema({
    user_id: {
        type: Number,
        require: true
    },
    _user: [{type: Schema.Types.ObjectId, ref: 'User'}]
});

export default DB.model('Contact', contactSchema);
