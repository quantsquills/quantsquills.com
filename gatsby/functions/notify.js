const mailer = require('@sendgrid/mail');
mailer.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const data = JSON.parse(event.body);

  const result = await mailer.send(
    Object.assign(data, {
      to: process.env.NOTIFICATIONS_EMAIL,
    })
  );

  return { statusCode: 200, body: 'ok' };
};
