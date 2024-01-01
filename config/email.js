import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
const mailconfig = {
    transporter: nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth:{
            user:process.env.EMAIL_HOST_USER,
            pass:process.env.EMAIL_HOST_PASSWORD,
        },
    }),
    from:`ecom <${process.env.EMAIL_HOST_USER}>`,
};
export default mailconfig;