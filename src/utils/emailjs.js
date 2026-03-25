import emailjs from '@emailjs/browser';

// ⚠️ Replace these with your actual EmailJS credentials
export const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
export const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
export const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

export async function sendEmail(formData) {
  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      from_name: formData.name,
      from_email: formData.email,
      phone: formData.phone,
      obra_type: formData.obraType,
      message: formData.message,
    },
    EMAILJS_PUBLIC_KEY
  );
}
