const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const task_schema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        title: { type: String, required: true },
        text: { type: String, required: true },
        completed: { type: Boolean, default: false }
    },
    {
        timestamps: true // to get add time and update time..
    }
);

task_schema.plugin(AutoIncrement, {
    inc_field: 'ticket', // a field inside schema, which will get sequential number
    id: 'ticketNums', // a separate collection counter will be there,, and ticketNums will represet that collection there
    start_seq: 500 // start sequence from 500 onwards 
});

module.exports = mongoose.model('Task', task_schema);