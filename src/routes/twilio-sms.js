





const express = require('express');
const { sendOTP, verifyOTP } = require('../controller/twilio-sms');
const router = express.Router();

router.route('/send-otp').post((req, res) => {
  console.log('Received request for /send-otp:', req.body);
  sendOTP(req, res);
});

router.route('/verify-otp').post((req, res) => {
  console.log('Received request for /verify-otp:', req.body);
  verifyOTP(req, res);
});

module.exports = router;
