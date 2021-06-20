const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema ({
    givenName: {
      type: String,
      trim: true,
      required: true,
    },
    familyName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
    },
    created: {type: Date, default: Date.now},
});
module.exports = mongoose.model('User', userSchema);
