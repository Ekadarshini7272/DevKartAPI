const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
   name : {
    type: String,
    required: true
   },
   gmail: {
    type: String,
    required: true,
    unique: true
   },
   age: {
    type: Number,
    required: true
   },
   username: {
    type: String,
    required: true,
    unique: true
   },
   password: {
    type: String,
    required: true
   },
   contactNumber: {
    type : Number,
    required: true
   },
   gender: {
    type:String,
    enum: ['male', 'female'], 
    required: true
   },
});
//pre-save hook to hash the password
userSchema.pre('save', async function (next) {
    // Check if the password field is modified
    if (!this.isModified('password')) {
        return next(); //If not ModifiedPathsSnapshot, proceed without re-hashing
    }
    //Generate a salt
    const salt = await bcrypt.genSalt(10);
    //Hash the password with the salt
    this.password = await bcrypt.hash(this.password, salt);
    //proceed to the next middleware or save operation
    next();
});
const User = mongoose.model('User', userSchema);

module.exports = User;