import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import sendEmail from "./sendEmail.js";

export const sendTicket = async (userEmail, booking) => {
  try {
    console.log("📧 Sending email to:", userEmail);

    const doc = new PDFDocument({
      size: "A4",
      margin: 0,
    });

    const buffers = [];
    doc.on("data", buffers.push.bind(buffers));

    // QR GENERATE
    const qrData = await QRCode.toDataURL(
      JSON.stringify({
        bookingId: booking._id,
        event: booking.event?.title,
      })
    );

    // 🎨 HEADER (DARK)
    doc.rect(0, 0, 600, 100).fill("#1e293b");

    doc
      .fillColor("white")
      .fontSize(22)
      .text("UTSAV AI", 50, 40);

    doc
      .fontSize(12)
      .text("Your Event Ticket 🎟️", 50, 70);

    // 🎟️ MAIN CARD
    doc
      .roundedRect(40, 120, 520, 500, 10)
      .fillAndStroke("#f8fafc", "#e2e8f0");

    // RESET COLOR
    doc.fillColor("black");

    // EVENT TITLE
    doc
      .fontSize(18)
      .text(booking.event?.title || "Event Name", 60, 150);

    doc.moveTo(60, 175).lineTo(540, 175).stroke("#cbd5f5");

    // DETAILS
    doc.fontSize(12);

    doc.text("📍 Location:", 60, 200);
    doc.text(booking.event?.location || "-", 180, 200);

    doc.text("📅 Date:", 60, 230);
    doc.text(
      new Date(booking.event?.date).toLocaleDateString(),
      180,
      230
    );

    doc.text("🎫 Tickets:", 60, 260);
    doc.text(String(booking.tickets), 180, 260);

    doc.text("🆔 Booking ID:", 60, 290);
    doc.text(String(booking._id), 180, 290);

    // QR CODE
    const qrImage = qrData.replace(/^data:image\/png;base64,/, "");
    const qrBuffer = Buffer.from(qrImage, "base64");

    doc.image(qrBuffer, 380, 200, {
      width: 140,
      height: 140,
    });

    doc
      .fontSize(10)
      .fillColor("gray")
      .text("Scan for entry", 410, 350);

    // FOOTER
    doc
      .fillColor("#64748b")
      .fontSize(10)
      .text(
        "Thank you for booking with Utsav AI 🎉",
        180,
        600
      );

    doc.end();

    doc.on("end", async () => {
      const pdfBuffer = Buffer.concat(buffers);

      await sendEmail({
        to: userEmail,
        subject: "Your Utsav AI Ticket 🎟️",
        html: `
          <div style="font-family:sans-serif;">
            <h2 style="color:#dc2626;">Utsav AI 🎉</h2>
            <p>Your booking is confirmed!</p>
            <p><b>${booking.event?.title}</b></p>
            <p>Your ticket is attached below 👇</p>
          </div>
        `,
        attachments: [
          {
            filename: "utsav-ticket.pdf",
            content: pdfBuffer,
          },
        ],
      });

      console.log("✅ Ticket email sent successfully");
    });
  } catch (err) {
    console.error("❌ Ticket email error:", err);
  }
};