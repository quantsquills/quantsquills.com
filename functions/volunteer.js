const { google } = require('googleapis');
const { auth } = require('google-auth-library');
const sheets = google.sheets({ version: 'v4' });
const range = 'A1';
const spreadsheetId = '15A5u0En8KZAaNvzg2dZ7OSpY9ijow8Cc1TduQvo66RI';
const keys = JSON.parse(process.env.GOOGLE);
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const client = auth.fromJSON(keys);
client.scopes = scopes;

exports.handler = async function(event, context) {
  console.log('event', event);
  console.log('event.body', event.body);
  console.log('context', context);
  const result = await appendValues();
  console.log(result);
  return { statusCode: 200, body: JSON.stringify(result) };
};

function appendValues() {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append(
      {
        auth: client,
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [['a', 'b']],
        },
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}
