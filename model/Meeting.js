var mongoose = require('mongoose');

var MeetingSchema = new mongoose.Schema({
  //_id: will be generated when saved to the DB
  title: { type: String, required: [true, 'is required'] },
  date: { type: String, required: [true, 'is required'] },
  time: { type: String, required: [true, 'is required'] },
  organiser: { type: String, required: [true, 'is required'] },
  attendies: { type: [String], required: [true, 'is required'] },
  timestamp: { type: String, required: false }
}, { versionKey: false });

mongoose.model('Meeting', MeetingSchema);

module.exports = mongoose.model('Meeting');