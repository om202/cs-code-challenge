const path = require("path");
const express = require("express");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "src")));

app.listen(port, () => {
  console.log(`Exercise-1 app listening on port ${port}`);
});
