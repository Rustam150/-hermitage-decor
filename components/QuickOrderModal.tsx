"use client";

import { useState } from "react";
import { X, Zap } from "lucide-react";

interface QuickOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    name: string;
    price: number;
  };
}

export default function QuickOrderModal({ isOpen, onClose, product }: QuickOrderModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSending, setIsSending] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSending(true);

    // Формируем сообщение для WhatsApp
    const message = `Здравствуйте! Хочу быстро заказать:\n\n` +
      `Товар: ${product.name}\n` +
      `Цена: ${product.price.toLocaleString()} ₽\n\n` +
      `--- Данные клиента ---\n` +
      `Имя: ${name}\n` +
      `Телефон: ${phone}\n\n` +
      `Пожалуйста, свяжитесь со мной для подтверждения заказа.`;

    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "79991234567"; // Замени на реальный номер заказчицы
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    
    setIsSending(false);
    onClose();
    setName("");
    setPhone("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <Zap className="w-5 h-5 text-yellow-500" />
          <h2 className="text-xl font-medium text-gray-900">Быстрый заказ</h2>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Заказ: <span className="font-medium text-gray-900">{product.name}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ваше имя *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              placeholder="Иван Иванов"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Телефон *
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-500"
              placeholder="+7 999 123-45-67"
            />
          </div>

          <button
            type="submit"
            disabled={isSending}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg font-medium transition flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4" />
            {isSending ? "Отправка..." : "Отправить заказ в WhatsApp"}
          </button>
        </form>

        <p className="text-xs text-gray-400 text-center mt-4">
          Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
        </p>
      </div>
    </div>
  );
}