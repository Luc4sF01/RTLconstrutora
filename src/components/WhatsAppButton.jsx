import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/content';

export default function WhatsAppButton() {
  const url = `https://wa.me/${COMPANY.whatsapp}?text=Olá!%20Gostaria%20de%20solicitar%20um%20orçamento.`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110"
      style={{ background: '#25D366' }}
      aria-label="WhatsApp"
    >
      <MessageCircle size={26} color="#fff" fill="#fff" />
    </a>
  );
}
