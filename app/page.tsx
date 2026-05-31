"use client";

import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import MobileBottomNav from "@/components/MobileBottomNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-white pb-16">
      <Header />

      {/* Быстрые ссылки (только для десктопа) */}
      <div className="hidden md:block border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="grid grid-cols-5 lg:grid-cols-11 gap-2">
            {[
              { name: "Спальня", slug: "spalnya" },
              { name: "Гостиная", slug: "gostinaya" },
              { name: "Столовая", slug: "stolovaya" },
              { name: "Кухня", slug: "kuhnya" },
              { name: "Мягкая мебель", slug: "myagkaya" },
              { name: "Посуда", slug: "posuda" },
              { name: "Ароматы", slug: "aromaty" },
              { name: "Текстиль", slug: "tekstil" },
              { name: "Освещение", slug: "lighting" },
              { name: "Новинки", slug: "novinki" },
              { name: "Скидки", slug: "skidki" },
            ].map((item) => (
              <Link
                key={item.name}
                href={`/catalog/${item.slug}`}
                className="text-center py-2 px-1 rounded-lg text-sm font-medium text-gray-700 hover:text-white hover:bg-amber-600 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Основной контент */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Блок акции */}
        <div className="relative rounded-2xl overflow-hidden mb-10 bg-gradient-to-r from-amber-800 to-amber-600">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 p-8 md:p-12">
            <div className="max-w-md">
              <span className="text-amber-200 text-sm font-medium tracking-wider"> ЛИМИТИРОВАННОЕ ПРЕДЛОЖЕНИЕ</span>
              <h2 className="text-3xl md:text-4xl font-light text-white mt-2">Акция месяца</h2>
              <p className="text-amber-100 text-lg mt-1">Скидка до 30% на мебель для спальни</p>
              <div className="flex items-center gap-4 mt-4">
                <span className="text-white text-sm">27 апреля – 31 мая</span>
                <a href="/catalog/spalnya" className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
                  Выбрать →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Сетка акционных категорий */}
        <div className="mb-16">
          <h3 className="text-xl font-medium text-gray-900 mb-5">Выберите категорию</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: "Постельное белье", img: "https://ir.ozone.ru/s3/multimedia-j/6536829967.jpg", slug: "tekstil" },
              { name: "Свечи", img: "https://avatars.mds.yandex.net/i?id=c96f3de9f87a83029cec9c6d3996f8d9391c4f16-10707439-images-thumbs&n=13", slug: "aromaty" },
              { name: "Диффузоры", img: "https://avatars.mds.yandex.net/i?id=68c81801a0f3b87665746a7269d3103aa2ce91d3-10870819-images-thumbs&n=13", slug: "aromaty" },
              { name: "Кровати", img: "https://avatars.mds.yandex.net/i?id=d84d2b030715d79b153add41ade40b64b0c7979b-5492373-images-thumbs&n=13", slug: "spalnya" },
              { name: "Столы", img: "https://avatars.mds.yandex.net/i?id=822e37196bdebc4766cc14d5c7a3cc605fd0c938-8334793-images-thumbs&n=13", slug: "stolovaya" },
              { name: "Пледы", img: "https://avatars.mds.yandex.net/i?id=07a3c32afc7de8537d39de47b0999c0d5fef681b-7086169-images-thumbs&n=13", slug: "tekstil" },
              { name: "Посуда", img: "https://avatars.mds.yandex.net/i?id=56c49b8dd8e26c70af7fe7eca54bb3802baea5cc-10640350-images-thumbs&n=13", slug: "posuda" },
              { name: "Вазы", img: "https://avatars.mds.yandex.net/i?id=65c02b39a16c5d17b5bab65e079d9e7ba60e60d2-5233110-images-thumbs&n=13", slug: "posuda" },
              { name: "Подушки", img: "https://avatars.mds.yandex.net/i?id=a8cb661d113fbe4ac09e115f56445ef117930871-5087196-images-thumbs&n=13", slug: "tekstil" },
            ].map((item) => (
              <Link
                key={item.name}
                href={`/catalog/${item.slug}`}
                className="group text-center"
              >
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-gray-800 text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Популярные товары */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-xl font-medium text-gray-900">Популярные товары</h3>
            <a href="#" className="text-sm text-gray-500 hover:text-black">
              Смотреть все →
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { id: 1, name: "Кровать Татьяна", price: 49990, oldPrice: 69990, isSale: true, image: "https://meb-online.ru/upload/resize_cache/iblock/6fa/530_530_140cd750bba9870f18aada2478b24840a/item_302.jpg" },
              { id: 2, name: "Шкаф Верона", price: 89900, isNew: true, image: "https://avatars.mds.yandex.net/i?id=6beb7a1db938847778774962d42c5b886a5a24cb-12752873-images-thumbs&n=13" },
              { id: 3, name: "Стол обеденный", price: 24900, image: "https://avatars.mds.yandex.net/i?id=a9db41ca0e5c9c028294ba5ccfe9091e4a00e8d6-5384958-images-thumbs&n=13" },
              { id: 4, name: "Диван угловой", price: 129900, oldPrice: 159900, isSale: true, image: "https://avatars.mds.yandex.net/i?id=ba34d7dc25e1ccda75769752993f507caad80892-3085767-images-thumbs&n=13" },
            ].map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                oldPrice={product.oldPrice}
                image={product.image}
                isNew={product.isNew}
                isSale={product.isSale}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Мобильная нижняя навигация */}
      <MobileBottomNav />
    </div>
  );
}