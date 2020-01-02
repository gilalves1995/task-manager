// Code required to send emails related to user accounts
const sgMail = require('@sendgrid/mail');

const sendGridAPIKey = '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';

sgMail.setApiKey(sendGridAPIKey);

const sendWelcomeEmail = (email, name) => {
    // .send returns a Promise
    sgMail.send({
        to: email,
        from: 'gg.alves@campus.fct.unl.pt',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    });
};

const sendCancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'gg.alves@campus.fct.unl.pt',
        subject: 'Account cancellation',
        text: `Sad to see you go, ${name}. Why are you leaving us?`
    });
};

module.exports = {
    sendWelcomeEmail,
    sendCancellationEmail
};

