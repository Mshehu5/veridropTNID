import { firestore } from "firebase-functions";
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

admin.initializeApp();

// Configure your email service (using Nodemailer)
const transporter = nodemailer.createTransport({
    service: "Gmail", // You can use other services like SendGrid, Outlook, etc.
    auth: {
        user: functions.config().gmail.email,
        pass: functions.config().gmail.password,
    },
});

exports.sendOrderConfirmation = firestore.onDocumentCreated(
    "orders/{orderId}",
    async (e) => {
        const order = e.data?.data();
        const userEmail = order!.email;

        const mailOptions = {
            from: "aaladan453@gmail.com",
            to: userEmail,
            subject: "Order Confirmation",
            text: `Thank you for your order! Order ID: ${e.params.orderId}`,
        };

        try {
            await transporter.sendMail(mailOptions);
            console.log("Email sent succesfully to:", userEmail);
        } catch (error) {
            console.error("Error sending email:", error);
        }
    },
);
