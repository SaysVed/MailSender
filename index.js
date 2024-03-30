const express = require('express');
const app = express();

const cors = require('cors');
require('dotenv').config();
app.use(cors());
app.options('*', cors());

const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/sendEmails', (req, res) => {
  res.send('Hello World!');
});

app.get('/start', async (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'adityasinghmoni@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!',
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent: ' + info.response);
    }
  });


});


app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
