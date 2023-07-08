const express = require("express");
const app = express();
const cors = require('cors')
const route = require("./routes/index");
require('dotenv').config();

const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// app.use(express.static('public'))
app.use("/api/v1", route);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});