// import mongoose from "mongoose";
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connect = async (db) => {
    try {
        const result = await mongoose.connect(db);
        if (result) {
            console.log("Connected To Database");
        }
    } catch (error) {
        console.log(error, "Database Connection Failed");
    }
};

// export default connect;
module.exports = connect;
