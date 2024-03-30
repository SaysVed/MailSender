import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import startEmail from "./Mailer.js";
import fs from "fs";
import qr from "qrcode";

const app = express();

dotenv.config();
app.use(cors());
app.options("*", cors());

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

var rawData = fs.readFileSync("dataList.json");
var data = JSON.parse(rawData);

app.get("/start", async (req, res) => {
  try {
    // Function to generate a QR code as a data URL
    for (const element of data) {
      if (element.regNo) {
        const qrCode = await qr.toDataURL(element.regNo); // Await here
        var base64Data = qrCode.replace(/^data:image\/png;base64,/, "");
        fs.writeFile(
          `QrCodes/${element.regNo}.png`,
          base64Data,
          "base64",
          function (err) {
            if (err) {
              console.log(err);
            }
          }
        );
      }
    }

    await startEmail();
    res.json({ message: "Emails sent successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${port}`);
});
