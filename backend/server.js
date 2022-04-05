const express = require("express");
const app = express();
const port = 8080;

// routes
const createRoute = require("./routes/create");
const readRoute = require("./routes/read");
const updateRoute = require("./routes/update");
const deleteRoute = require("./routes/delete");
app.use("/create", createRoute);
app.use("/read", readRoute);
app.use("/update", updateRoute);
app.use("/delete", deleteRoute);

app.listen(port, () => console.log("Server started on port " + port));
