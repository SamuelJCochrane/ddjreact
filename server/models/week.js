const mongoose = require('mongoose');

const WeekSchema = new mongoose.Schema({
    weekID: {
        type: String,
        required: true,
    },
    monday: {
        type: Array,
        require: true,
    },
    tuesday: {
        type: Array,
        require: true,
    },
    wednesday: {
        type: Array,
        require: true,
    },
    thursday: {
        type: Array,
        require: true,
    },
    friday: {
        type: Array,
        require: true,
    },
    saturday: {
        type: Array,
        require: true,
    },
    sunday: {
        type: Array,
        require: true,
    }
})

const Week = mongoose.model('Week', WeekSchema);
module.exports = Week;