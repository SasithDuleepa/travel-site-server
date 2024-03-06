const nodemailer = require('nodemailer');
const crypto = require('crypto');
const DB = require('../config/database');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'node-123-123-123@outlook.com',
        pass: 'Node123123',
    },
});

const CreateOTP = (email) => {
    console.log('Email:', email);
    
    return new Promise((resolve, reject) => {
        const token = generateOtp();

        const mailOptions = {
            from: 'node-123-123-123@outlook.com',
            to: email,
            subject: 'Confirm your email address',
            text: `OTP Code: ${token}`,
            html: `<p>Your OTP Code is: <strong>${token}</strong></p>`,
        };
        

        const sql = `INSERT INTO otp ( otp, email) VALUES (?, ?)`;
        const values = [token, email];
        DB.connection.query(sql, values, (err, result) => {
            if (err) {
                console.error('Error saving OTP to database:', err);
                reject('Error saving OTP to database');
            } else {
                console.log('OTP saved to database.');

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                        reject('Error sending verification email.');
                    } else {
                        console.log('Email sent: ' + info.response);
                        resolve({ status: 'success' });
                    }
                });
            }
        });
    });
};

const generateOtp = () => {
    return crypto.randomBytes(2).toString('hex');
};

module.exports = CreateOTP;
