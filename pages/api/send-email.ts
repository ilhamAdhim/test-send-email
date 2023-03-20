import sendgrid from '@sendgrid/mail'

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '')

async function sendEmail(req: any, res: any) {
  try {
    await sendgrid.send({
      to: 'ilhamavab3l@gmail.com', // Your email where you'll receive emails
      subject: req.body.subject,
      from: {
        email: 'ilham.adhim@gmail.com',
        name: req.body.name,
      }, // your website email address here
      content: [
        {
          type: 'text/html',
          value: `<div>You've got a mail from ${req.body.email}.
          <br>
          ${req.body.message}. 
          <br>
           Test send from sendgrid ya bang</div>`,
        },
      ],
    })
    console.log('Email terkirim')
  } catch (error: any) {
    console.log(error)
    console.log(error.response.body.errors)
    return res.status(error.code || 500).json({ error: error.message })
  }

  return res.status(200).json({ error: '' })
}

export default sendEmail
