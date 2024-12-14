const { client, sender } = require("./mailtrap.config.js");
const { VERIFICATION_EMAIL_TEMPLATE,PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates.js");

const sentVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Verify your email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Email Verification",
    });

    console.log("Email sent successfully", response);
  } catch (err) {
    throw new Error(`Error Sending Verfication Email: ${err}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      template_uuid: "16c1550e-1371-4181-9229-c90b5e5ad376",
      template_variables: {
        name: name,
        company_info_name: "Classroom App",
      },
    });
    console.log("email send successfully", response);
  } catch (err) {
    throw new Error(`Error Sending Verfication Email: ${err}`);
  }
};

const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];

  try {
    const response = await client.send({
      from: sender,
      to: recipient,
      subject: "Reset your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("email password reset link send successfully", response);
  } catch (err) {
    console.log("Error sending Reset password link", err);

    throw new Error(`Error sending Reset password link: ${err}`);
  }
};

const sendResetSuccessEmail = async(email) => {
    const recipient = [{ email }];

    try {
      const response = await client.send({
        from: sender,
        to: recipient,
        subject: "Password Reset Successfully",
        html: PASSWORD_RESET_SUCCESS_TEMPLATE,
        category: "Password Reset",
      });
      console.log("email password reset link send successfully", response);
    } catch (err) {
      console.log("Error sending Reset password link", err);
  
      throw new Error(`Error sending Reset password link: ${err}`);
    }
}

module.exports = {
  sentVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail
};
