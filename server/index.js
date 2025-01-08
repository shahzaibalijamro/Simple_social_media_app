import dotenv from "dotenv";
import { app } from "./app.js";
dotenv.config();

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
});