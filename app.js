const stringifyEmail = require('./index.js')
stringifyEmail.stringifyEmail({
  filename: 'otp-ar',
  args: {
    name: 'ahmed',
    otp: '123'
  }
})