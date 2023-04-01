 function emailSend(){
    return `
    <!DOCTYPE html>
      <html>
        <head>
          <title>Example Email Template</title>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 18px; line-height: 1.5; color: #333; padding: 20px;">
          <table style="width: 100%; max-width: 600px; margin: 0 auto; background-color: #fff; border-collapse: collapse;">
            <tr>
              <td style="background-color: #0077c0; text-align: center; padding: 10px;">
                <h1 style="font-size: 28px; color: #fff; margin: 0;">MEDISTAR HOSPITALS</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 20px;">
                <h2 style="font-size: 24px; color: #0077c0; margin-top: 0;">Hello, [${patientFirstName}]</h2>
                <h5 style="margin-bottom: 20px;">Thank you for your recent appointment with Dr.[${docFirstName}]. Your appointment has been booked for [${problemDescription}] on [${appointmentDate}]</h5>
                <p style="margin-bottom: 20px;">If you do have any issues, please don't hesitate to contact our customer service team. We're always happy to help.</p>
                <p style="margin-bottom: 20px;">Thank you for choosing Medistar Services</p>
                <p style="margin-bottom: 0;">Best regards,</p>
                <p style="margin-bottom: 20px;">Medistar Hospitals</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `
}

module.exports = {
    emailSend
}