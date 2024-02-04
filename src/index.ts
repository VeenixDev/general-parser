import express from "express";
import bodyParser from "body-parser";

import mongoose from "mongoose";
import routes from "./routes";
require("dotenv").config();

const serverHost = process.env.SERVER_HOST || "localhost";
const serverPort = Number(process.env.SERVER_PORT) || 8081;
const serverBacklog = Number(process.env.SERVER_BACKLOG) || 511;

const mongooseHost = process.env.MONGOOSE_HOST || "localhost";
const mongoosePort = Number(process.env.MONGOOSE_PORT) || 20717;
const mongooseName = process.env.MONGOOSE_NAME;
const mongooseUser = process.env.MONGOOSE_USER;
const mongoosePassword = process.env.MONGOOSE_PASSWORD;

const mongooseOptions: mongoose.ConnectOptions = {
  auth: {
    username: mongooseUser,
    password: mongoosePassword,
  },
};

if (!mongooseName) {
  console.error(
    "No mongoose database name provided. Please add MONGOOSE_NAME to .env"
  );
  process.exit(1);
}
const mongoURL = `mongodb://${mongooseHost}:${mongoosePort}/${mongooseName}`;

const app = express();
mongoose
  .connect(mongoURL, mongooseOptions)
  .then(() => console.log(`Connected to database on ${mongoURL}`))
  .catch((err) => {
    console.error(
      `Error occured :: "${err.name}": ${err.message}`,
      err.stack || ""
    );
  });

app.use(bodyParser.json());
app.use(routes);

app.listen(serverPort, serverHost, serverBacklog, () => {
  console.log(`Server now listens on http://${serverHost}:${serverPort}`);
});
