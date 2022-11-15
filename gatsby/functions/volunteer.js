const { google } = require('googleapis');
const { auth } = require('google-auth-library');
const sheets = google.sheets({ version: 'v4' });
const range = 'A:C';
const spreadsheetId = '15A5u0En8KZAaNvzg2dZ7OSpY9ijow8Cc1TduQvo66RI';
const keys = JSON.parse(process.env.GOOGLE);
const scopes = ['https://www.googleapis.com/auth/spreadsheets'];

const client = auth.fromJSON(keys);
client.scopes = scopes;

exports.handler = async function(event, context) {
  let result;
  switch (event.httpMethod) {
    case 'POST':
      const { name, contact, meetup, role } = event.queryStringParameters;
      await append([meetup, role, name, contact]);
    case 'GET':
    default:
      result = await get();
      return { statusCode: 200, body: JSON.stringify(result.data.values) };
      break;
  }
};

function get() {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.get(
      { spreadsheetId, range, auth: client },
      (err, res) => {
        if (err) return reject(err);
        resolve(res);
      }
    );
  });
}

function append(data) {
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append(
      {
        auth: client,
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [data],
        },
      },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );
  });
}
