import express from "express";
import cors from "cors";
import fs from "fs";
import { parse } from "csv-parse";
import isolateToFrom from "./utils/isolateToFrom.js";
import getDistance from "./utils/getDistance.js";

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.listen(port, () => {
  console.log("Server is running on port" + port);
});

app.get("/api/v1/stations", (req, res) => {
  const stations = [];
  fs.createReadStream("./data/D_Bahnhof_2020_alle.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", (row) => stations.push(row))
    .on("end", () => {
      res.status(200).json(stations);
    })
    .on("error", (e) => res.status(500).json({ error: e.message }));
});

app.get("/api/v1/distance/:from/:to", (req, res) => {
  if (req.params.from === req.params.to) return res.status(400).json({ error: "Same station - no travel necessary! 🐧" });
  const stations = [];
  fs.createReadStream("./data/D_Bahnhof_2020_alle.csv")
    .pipe(parse({ delimiter: ";", from_line: 2 }))
    .on("data", (row) => stations.push(row))
    .on("end", () => {
      const { from, to } = isolateToFrom(req.params, stations);
      if ( !from || !to ) return res.status(404).json({ error: "City not found :(" })
      const distance = getDistance(to, from);
      return res.status(200).json({ from: from[3], to: to[3], distance, unit: "km" });
    })
    .on("error", (e) => res.status(500).json({ error: e.message }));
});

app.use("*", (req, res) => res.status(404).json({ error: "Something went wrong - check path" }))