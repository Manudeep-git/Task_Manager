const mongoose = require('mongoose')

const mongodbConnector = async () => {
    try {
        const con = await mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })

        console.log("Connection created successfully");
    }
    catch (e) {
        console.log("Error while connecting", e);
    }
}

mongodbConnector();




