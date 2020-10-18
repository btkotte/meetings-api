var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
   //_id: will be generated when saved to the DB
  name: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});
mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');