"use client";

import Link from "next/link";
import { Truck, Clock, MapPin, CreditCard, Package, Shield } from "lucide-react";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Кнопка назад */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition"
          >
            ← На главную
          </Link>
        </div>

        <h1 className="text-3xl font-light text-gray-900 mb-2">Доставка и оплата</h1>
        <p className="text-gray-500 mb-8">Удобные способы получения и оплаты ваших заказов</p>

        {/* Блоки информации */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Доставка */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-medium text-gray-900">Доставка</h2>
            </div>
            <div className="space-y-4 text-gray-600 text-sm">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Способы доставки:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Курьерская доставка по городу</li>
                  <li>Доставка в пункты выдачи заказов</li>
                  <li>Самовывоз из нашего шоурума</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Сроки доставки:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>По городу — 1-3 дня</li>
                  <li>По области — 2-5 дней</li>
                  <li>По России — от 5 до 14 дней</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Стоимость:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>При заказе от 50 000 ₽ — бесплатно</li>
                  <li>Доставка по городу — 500 ₽</li>
                  <li>Доставка по области — от 1 000 ₽</li>
                  <li>Самовывоз — бесплатно</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Оплата */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-gray-700" />
              <h2 className="text-xl font-medium text-gray-900">Оплата</h2>
            </div>
            <div className="space-y-4 text-gray-600 text-sm">
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Способы оплаты:</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Банковской картой онлайн (Visa, MasterCard, МИР)</li>
                  <li>Наличными курьеру при получении</li>
                  <li>Картой курьеру при получении</li>
                  <li>Безналичный расчёт для юрлиц</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Безопасность:</h3>
                <p>Все платежи защищены. Мы не храним данные вашей карты.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Регионы доставки */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <MapPin className="w-6 h-6 text-gray-700" />
            <h2 className="text-xl font-medium text-gray-900">Регионы доставки</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-gray-600">
            <div>📍 Москва и Московская область</div>
            <div>📍 Санкт-Петербург и Ленинградская область</div>
            <div>📍 Регионы России (доставка СДЭК)</div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Доставка в другие регионы уточняйте у менеджера по телефону или в чате WhatsApp.
          </p>
        </div>

        {/* Условия */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <Package className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Проверка при получении</h3>
            <p className="text-xs text-gray-500 mt-1">Осмотрите товар до оплаты</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <Clock className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Возврат 14 дней</h3>
            <p className="text-xs text-gray-500 mt-1">Верните товар, если он не подошёл</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <Shield className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <h3 className="font-medium text-gray-900">Гарантия качества</h3>
            <p className="text-xs text-gray-500 mt-1">Все товары сертифицированы</p>
          </div>
        </div>
      </div>
    </div>
  );
}