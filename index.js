const express = require("express");
const airtable = require("airtable");
const env = require("dotenv");
const axios = require("axios");
env.config();
const app = express();
const tableName = "table1";
const baseId = "appkftJ6qnOiI3AKX";

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.airtable.com/v0/${baseId}/${tableName}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
        },
      }
    );
    // Extract relevant data from the Airtable response
    const records = response.data.records.map((record) => ({
      fields: record.fields,
    }));
    const airtableFields = records.map((record) => {
      let firstname = record.fields.FirstName;
      let lastname = record.fields.LastName;
      let status = record.fields.Status;
      console.log(`Details: ${firstname} ${lastname} ${status}`);
    });
    //console.log(response);
    //res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching data from Airtable:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("server running");
});
