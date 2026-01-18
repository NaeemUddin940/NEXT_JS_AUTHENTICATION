import { env } from "@/lib/env";
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465, false for port 587
  auth: {
    user: env.COMPANY_EMAIL,
    pass: env.APP_PASSWORD,
  },
});

export default async function sendEmail(email, subject, template) {
  return await transporter.sendMail({
    from: '"TRACK O DATA" <trackodata@gmail.com>',
    to: email,
    subject,
    html: template,
  });
}
