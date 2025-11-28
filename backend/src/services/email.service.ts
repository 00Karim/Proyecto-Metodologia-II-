import nodemailer from "nodemailer";

interface EmailPayload {
  to: string;
  trip: any;
  activity: any;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendNewActivityEmail({ to, trip, activity }: EmailPayload) {
  const subject = `Nueva actividad en el trip: ${trip.name}`;

  const text = `
Se ha agregado una nueva actividad al trip "${trip.name}":

Titulo: ${activity.title}
Descripcion: ${activity.description || "-"}

Ingresa a la app para votar si aprobas o no esta actividad.
`;

  await transporter.sendMail({
    from: `"TripMate" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });
}
