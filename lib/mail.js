const nodemailer = require('nodemailer');
const pug = require('pug'); // used to read from pug files and generate HTML
const juice = require('juice'); // apply CSS to HTML content
const htmlToText = require('html-to-text');

require('dotenv').config({ path: '.env' });

// const { fileURLToPath } = require('url');
// const { dirname } = require('path');

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const generateHTML = (filename, options = {}) => {
  const html = pug.renderFile(
    `${__dirname}/../views/email/${filename}.pug`,
    options
  );
  return juice(html);
};

exports.send = async (options) => {
  const html = generateHTML(options.filename, options);
  const text = htmlToText(html);
  const mailOptions = {
    from: `Cervisia <noreply@cervisia.com>`,
    to: options.user.email,
    subject: options.subject,
    html,
    text,
  };
  return transport.sendMail(mailOptions);
};
