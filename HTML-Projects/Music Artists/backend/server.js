const express = require("express");
const cors = require("cors");
const app = express();




app.use(cors());
app.use(express.json());
require("./db");







app.use("/artists", require("./routes/artistsRoutes"));
app.use("/albums", require("./routes/albumsRoutes"));
app.use("/songs", require("./routes/songsRoutes"));





app.listen(5000, () => {
  console.log("Server running on port 5000");
});