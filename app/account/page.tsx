"use client";

import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useRouter } from "next/navigation";
import { User, Heart, LogOut, Edit2 } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, updateUser } = useAuth();
  const { items: favorites } = useFavorites();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState(user?.phone || "");

  // Перенаправление через useEffect
  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  // Пока проверяем user — показываем загрузку
  if (!user) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Загрузка...</div>
      </div>
    );
  }

  const handleSaveProfile = () => {
    updateUser({ name, phone });
    setIsEditing(false);
  };

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

        <h1 className="text-3xl font-light text-gray-900 mb-8">Личный кабинет</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Левая колонка - профиль */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-900">{user.name}</h2>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-3 mt-4">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                  />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Телефон"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900"
                  />
                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-gray-900 text-white py-2 rounded-lg text-sm hover:bg-gray-800 transition"
                  >
                    Сохранить
                  </button>
                </div>
              ) : (
                <div className="mt-4 space-y-2 text-sm">
                  <p><span className="text-gray-500">Телефон:</span> <span className="text-gray-900">{user.phone}</span></p>
                  <p><span className="text-gray-500">Email:</span> <span className="text-gray-900">{user.email}</span></p>
                </div>
              )}

              <button
                onClick={logout}
                className="w-full mt-6 flex items-center justify-center gap-2 text-red-500 hover:text-red-600 transition text-sm py-2 border-t border-gray-200 pt-4"
              >
                <LogOut className="w-4 h-4" />
                Выйти из аккаунта
              </button>
            </div>
          </div>

          {/* Правая колонка - заказы и избранное */}
          <div className="lg:col-span-2 space-y-6">
            {/* История заказов — пока пусто */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">История заказов</h2>
              <p className="text-gray-500 text-sm">У вас пока нет заказов</p>
            </div>

            {/* Избранное (сохранённые товары) */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium text-gray-900">Избранное</h2>
                <Link href="/favorites" className="text-sm text-gray-500 hover:text-black">
                  Все ({favorites.length})
                </Link>
              </div>
              {favorites.length === 0 ? (
                <p className="text-gray-500 text-sm">У вас пока нет избранных товаров</p>
              ) : (
                <div className="space-y-3">
                  {favorites.slice(0, 3).map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                        📷
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${item.id}`} className="text-sm text-gray-900 hover:underline">
                          {item.name}
                        </Link>
                        <p className="text-sm font-semibold text-gray-900">{item.price.toLocaleString()} ₽</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}