const core = require('@actions/core');
const Diawi = require('./diawi.js');

async function run() {
  try {
    const parameters = {
      token: 'iYpw54XQppTthpuwrfRdmVwLtpMWfCHJP9MHz7DvxN',
      path: './example.apk',
      // password: 'password',
      callback_emails: 'dattran0319@gmail.com',
      wall_of_apps: 0,
      installation_notifications: 1,
      find_by_udid: 0,
      comment: 'test upload apk',
    };
    console.log(`Parameters: ${parameters}`);

    const diawiCommand = new Diawi(parameters)
      .on('complete', function (url, qrcode) {
        console.log('url: ' + url);
        console.log('qrcode: ' + qrcode);
        core.setOutput('url', url);
        core.setOutput('qrcode', qrcode);
      })
      .on('error', function (error) {
        console.error('Failed: ', error);
        core.setFailed(error.message);
        process.exit(1);
      });

    if (!core.getInput('dry-run')) {
      diawiCommand.execute();
    }
  } catch (error) {
    core.setFailed(error.message);
  }
  // console.log('iYpw54XQppTthpuwrfRdmVwLtpMWfCHJP9MHz7DvxN');
}

run();
