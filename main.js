const app = require("./app.js");

// designate which PORT the server will listen on
const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
}); // start the server and have it listen on the designated PORT