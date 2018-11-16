var mongoose = require('mongoose');
var MoodSchema = new mongoose.Schema({
  mood: Number,
  datetime: Date,
  notes: { type: String, default: ''}
});
// MoodSchema.methods.upvote = function(cb) {
//   this.upvotes += 1;
//   this.save(cb);
// };
mongoose.model('Mood', MoodSchema);
