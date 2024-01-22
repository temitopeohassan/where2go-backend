





require('dotenv').config();

const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } = process.env;
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, { lazyloading: true });

/**
 * send OTP
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const sendOTP = async (req, res, next) => {
  const { countryCode, phoneNumber } = req.body;
  try {
    console.log('Received request for sendOTP:', req.body); // Added log statement
    const otpResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: 'sms',
      });
    res.status(200).send(`OTP sent successfully!: ${JSON.stringify(otpResponse)}`);
  } catch (error) {
    console.error('Error in sendOTP:', error); // Added log statement
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
};

/**
 * verify OTP
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const verifyOTP = async (req, res, next) => {
  const { countryCode, phoneNumber, otp } = req.body;
  try {
    console.log('Received request for verifyOTP:', req.body); // Added log statement
    const verifiedResponse = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });
    res.status(200).send(`OTP verified successfully!: ${JSON.stringify(verifiedResponse)}`);
  } catch (error) {
    console.error('Error in verifyOTP:', error); // Added log statement
    res.status(error.status || 400).send(error.message || 'Something went wrong');
  }
};

module.exports = { sendOTP, verifyOTP };
