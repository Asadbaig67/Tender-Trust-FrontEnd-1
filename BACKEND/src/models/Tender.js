const mongoose = require('mongoose');


const TenderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contract_title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    tender_no: {
        type: Number,
    },
    start_date: {
        type: String,
    },
    end_date: {
        type: String,
    },
});


const Tender = mongoose.model("Tenders", TenderSchema);

module.exports = Tender;
