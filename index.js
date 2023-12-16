import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import 'dotenv/config'
import routes from "./routes/index.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());


const port = process.env.PORT || 3000;
const user = process.env.USER

const password = process.env.PASSWORD

routes(app);

const mongodbConnURL = `mongodb+srv://slenka321:${password}@cluster0.mc8bndc.mongodb.net/?retryWrites=true&w=majority`;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(mongodbConnURL, connectionParams)
    .then(() => {
        console.info("Connected to the DB");
    })
    .catch((e) => {
        console.log("Error: ", e);
    });

app.listen(port, () => {
    console.log(`Server started on port ${port}!`);
});

export default app;