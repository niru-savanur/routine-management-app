const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const routineSchema = new Schema({
  username: { 
      type: String,
      required: true 
    },
  description: { 
      type: String, 
      required: true 
  },
  duration: { 
      type: Number, 
      required: true 
  },
  date: { 
      type: Date, 
    required: true 
  },
}, {
  timestamps: true,
});

const Routine = mongoose.model('Routine', routineSchema);

module.exports = Routine;