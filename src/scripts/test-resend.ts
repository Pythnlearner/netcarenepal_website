import { Resend } from 'resend';
import 'dotenv/config';

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  console.log('Using API Key:', process.env.RESEND_API_KEY?.substring(0, 10) + '...');
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'manish.triveni@gmail.com',
      subject: 'Diagnostic Test - Netcare Newsletter',
      html: '<p>If you see this, Resend integration is working with the onboarding email!</p>'
    });

    if (error) {
      console.error('Resend Error:', error);
    } else {
      console.log('Email sent successfully!', data);
    }
  } catch (err) {
    console.error('System Error:', err);
  }
}

testEmail();
