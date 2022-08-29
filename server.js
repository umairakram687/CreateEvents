const express = require("express");
const core = require("cors");
const server = express();

var coreOptions = {
  origin: "hhtp://localhost:8002",
};

// middleware define
server.use(core(coreOptions));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const route = require("./router/userRoute");
server.use("/api/Bracesol/events", route);

// Api testing define

server.get("/", (req, res) => {
  res.send("Event api is in progress....");
});

// port define
const PORT = process.env.PORT || 8002;
// server define

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
