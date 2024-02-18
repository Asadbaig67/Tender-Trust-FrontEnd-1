const Tender = require('../../models/Tender');


const createTender = async (data) => {

    const {
        name,
        contractTitle,
        description,
        startDate,
        endDate,
        tenderNumber,
    } = data;

    const newTender = new Tender({
        name,
        contract_title: contractTitle,
        description,
        tender_no: tenderNumber,
        start_date: startDate,
        end_date: endDate
    });

    const savedTender = await newTender.save();

    return savedTender;

}


module.exports = {
    createTender
} 