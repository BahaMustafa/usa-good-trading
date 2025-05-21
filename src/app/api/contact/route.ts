import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    // Parse the request body
    const formData: ContactFormData = await request.json();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: 'bhaatobase93@gmail.com', // Your business email
      replyTo: formData.email,
      subject: `Contact Form: Message from ${formData.name}`,
      text: `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb;">New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Message:</strong></p>
          <p style="background-color: #f3f4f6; padding: 15px; border-radius: 5px;">${formData.message}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    
    // Log success (can be removed in production)
    console.log('Contact form email sent successfully');
    
    // Return success response
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form submission' },
      { status: 500 }
    );
  }
}