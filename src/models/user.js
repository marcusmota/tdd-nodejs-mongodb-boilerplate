const userSchema = require("./../schemas/user");
const mongoose = require('mongoose');

module.exports =  mongoose.models.users || mongoose.model('users', userSchema);
