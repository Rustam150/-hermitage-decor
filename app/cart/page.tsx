"use client";

import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalItems, totalPrice, clearCart } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [mounted, setMounted] = useState(false);

  // Просто ждём монтирования на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  // Формирование сообщения для WhatsApp
  const generateWhatsAppMessage = () => {
    let message = "Здравствуйте! Хочу заказать:\n\n";
    
    items.forEach((item, idx) => {
      message += `${idx + 1}. ${item.name} — ${item.price.toLocaleString()} ₽ x ${item.quantity} = ${(item.price * item.quantity).toLocaleString()} ₽\n`;
    });
    
    message += `\nИтого: ${totalPrice.toLocaleString()} ₽\n\n`;
    message += `--- Данные клиента ---\n`;
    if (name) message += `Имя: ${name}\n`;
    if (phone) message += `Телефон: ${phone}\n`;
    if (address) message += `Адрес доставки: ${address}\n`;
    if (comment) message += `Комментарий: ${comment}\n`;
    
    message += `\nПожалуйста, свяжитесь со мной для подтверждения заказа.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppOrder = () => {
    const phoneNumber = "79991234567";
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  // Пока не смонтировано — показываем заглушку
  if (!mounted) {
    return null;
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
            >
              ← На главную
            </a>
          </div>
          <h1 className="text-3xl font-light text-gray-900 mb-8">Корзина</h1>
          <div className="text-center py-12">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Ваша корзина пуста</p>
            <a href="/" className="mt-4 inline-block text-gray-900 underline">
              Перейти к покупкам
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
          >
            ← На главную
          </a>
        </div>

        <h1 className="text-3xl font-light text-gray-900 mb-8">Корзина</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Таблица товаров */}
          <div className="flex-1">
            <div className="hidden md:grid grid-cols-12 gap-4 pb-3 border-b text-sm text-gray-500">
              <div className="col-span-6">Товар</div>
              <div className="col-span-2 text-center">Цена</div>
              <div className="col-span-2 text-center">Количество</div>
              <div className="col-span-1 text-center">Сумма</div>
              <div className="col-span-1"></div>
            </div>

            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-4 py-4 border-b items-center">
                <div className="col-span-12 md:col-span-6 flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
                    📷
                  </div>
                  <div>
                    <a href={`/product/${item.id}`} className="text-gray-900 hover:underline">
                      {item.name}
                    </a>
                  </div>
                </div>
                <div className="col-span-4 md:col-span-2 text-left md:text-center text-gray-900">
                  {item.price.toLocaleString()} ₽
                </div>
                <div className="col-span-4 md:col-span-2 flex justify-start md:justify-center">
                  <div className="flex items-center border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 hover:bg-gray-100 text-gray-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-10 text-center text-sm text-gray-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 hover:bg-gray-100 text-gray-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                <div className="col-span-3 md:col-span-1 text-left md:text-center text-gray-900">
                  {(item.price * item.quantity).toLocaleString()} ₽
                </div>
                <div className="col-span-1 text-right md:text-center">
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-between">
              <button onClick={clearCart} className="text-sm text-gray-500 hover:text-red-500">
                Очистить корзину
              </button>
            </div>
          </div>

          {/* Форма оформления заказа */}
          <div className="lg:w-96">
            <div className="bg-gray-50 rounded-xl p-6 sticky top-20">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Оформление заказа</h3>

              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400"
                />
                <input
                  type="tel"
                  placeholder="Телефон *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="Адрес доставки"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400"
                />
                <textarea
                  placeholder="Комментарий к заказу"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 resize-none"
                />
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Товаров ({totalItems}):</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-2">
                  <span>Итого:</span>
                  <span>{totalPrice.toLocaleString()} ₽</span>
                </div>
              </div>

              <button
                onClick={handleWhatsAppOrder}
                disabled={!name || !phone}
                className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                  name && phone
                    ? "bg-green-500 hover:bg-green-600 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                📱 Заказать через WhatsApp
              </button>
              <p className="text-xs text-gray-400 text-center mt-3">
                * Имя и телефон обязательны для заполнения
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}