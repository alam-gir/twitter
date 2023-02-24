import nodemailer from 'nodemailer'

const email = process.env.GMAIL
const pass = process.env.GMAIL_APP_PASS
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: email,
        pass: pass
    },
    from: email
})


export const emailOptions = {
    from: email,
    to: email
}