// starting page of app
const express = require('express');
// require("./db/mongoose")
const app = express();
const port = process.env.PORT || 3000

app.use(express.json())

//Import Routes
const userRoute = require("./routes/user");
const taskRoute = require("./routes/task")


//middleware
// app.use((req,res,next) => {
//     res.status(503).send("Site is under maintenance, please try back soon")
// })

app.use('/users', userRoute);
app.use('/tasks', taskRoute)



app.listen(port, () => {
    console.log(`Listening on ${port}`);
})



