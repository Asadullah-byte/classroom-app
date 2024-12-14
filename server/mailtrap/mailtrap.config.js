const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv')

dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "mailtrap@demomailtrap.com",
  name: "Mailtrap Test",
};


module.exports = {
    client,
    sender
}