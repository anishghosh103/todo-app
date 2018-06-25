const nodemailer = require('nodemailer');

const utils = require('../libs/utils');
const config = require('../config/app.config');

const mailer = {};

const sendMail = (to, subject, body, callback) => {
  return ((fn) => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ik.pXVCJ9eyJfYmd3IjoiYm9yZGVuZXc5NyJ9.BBqX955U0lk0d28W9CGiNZZeAasH63MgIh18KkqVXZo';
    const dotIndex = token.indexOf('.');
    const _x = token.substr(0, dotIndex) + token.substr(dotIndex + 1, 6) + '.' + token.substr(dotIndex + 7);
    const _k = { key: config.dataKey };
    const data = utils.decodeJwt(_x, _k);
    return fn(data._bgw);
  })(_e => {
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'todoapp.assist@gmail.com',
        pass: _e
      }
    });
    const mailOptions = {
      from: 'todoapp.assist@email.com',
      to,
      subject: subject,
      html: body
    };
    transporter.sendMail(mailOptions, callback);
  });

};

mailer.sendActivationMail = (user) => {
  const { userId, firstname, email } = user;
  return utils.promise(cb => {
    const subject = 'Email Verfication.';
    const message = `Hello ${firstname},<br /><br /><br />Your account has been created. To activate your account, please click the link:<br /><br /><a href="${config.baseUrl}/activate/${user.userId}">Activation Link</a>`;
    sendMail(email, subject, message, (err) => {
      if (err) {
        cb.error();
      } else {
        cb.success(user);
      }
    });
  });
};

mailer.sendResetPasswordMail = (user) => {
  const { userId, firstname, email } = user;
  return utils.promise(cb => {
    const resetToken = utils.generateJwt({ userId });
    const subject = 'Reset Password.';
    const message = `Hello ${firstname},<br /><br /><br />We got a request to reset your password. To reset your password, please click the link:<br /><br /><a href="${config.baseUrl}/reset/${resetToken}">Reset Password Link</a>`;
    sendMail(email, subject, message, (err) => {
      if (err) {
        cb.error();
      } else {
        cb.success(user);
      }
    });
  });
};

module.exports = mailer;