"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import ProductCard from "@/components/ProductCard";
import { SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import Header from "@/components/Header";

// Моковые товары
const mockProducts = [
  // ========== СПАЛЬНЯ ==========
  { id: 1, name: "Кровать Татьяна", price: 49990, oldPrice: 69990, category: "spalnya", type: "krovati", brand: "Италия", material: "массив", color: "Бежевый", inStock: true },
  { id: 2, name: "Шкаф Верона", price: 89900, category: "spalnya", type: "shkafy", brand: "Турция", material: "ЛДСП", color: "Венге", inStock: true },
  { id: 3, name: "Тумба Лондон", price: 15900, category: "spalnya", type: "tumby", brand: "Италия", material: "массив", color: "Орех", inStock: false },
  { id: 4, name: "Комод Николь", price: 34900, category: "spalnya", type: "komody", brand: "Китай", material: "МДФ", color: "Белый", inStock: true },
  { id: 5, name: "Зеркало Венеция", price: 8900, category: "spalnya", type: "zerkala", brand: "Италия", material: "стекло", color: "Прозрачный", inStock: true },
  { id: 6, name: "Кровать София", price: 69900, oldPrice: 89900, category: "spalnya", type: "krovati", brand: "Турция", material: "массив", color: "Серый", inStock: true },

  // ========== ГОСТИНАЯ ==========
  { id: 7, name: "Диван угловой", price: 129900, oldPrice: 159900, category: "gostinaya", type: "divany", brand: "Турция", material: "ткань", color: "Бежевый", inStock: true },
  { id: 8, name: "Диван прямой", price: 89900, category: "gostinaya", type: "divany", brand: "Италия", material: "велюр", color: "Серый", inStock: true },
  { id: 9, name: "Кресло Элис", price: 39900, category: "gostinaya", type: "kresla", brand: "Италия", material: "велюр", color: "Зеленый", inStock: true },
  { id: 10, name: "Кресло Рио", price: 29900, category: "gostinaya", type: "kresla", brand: "Турция", material: "экокожа", color: "Коричневый", inStock: true },
  { id: 11, name: "Журнальный столик", price: 15900, category: "gostinaya", type: "stoly", brand: "Китай", material: "стекло", color: "Прозрачный", inStock: true },
  { id: 12, name: "Стол обеденный", price: 34900, category: "gostinaya", type: "stoly", brand: "Италия", material: "массив", color: "Орех", inStock: true },
  { id: 13, name: "Стеллаж Лофт", price: 24900, category: "gostinaya", type: "stellazhi", brand: "Китай", material: "металл", color: "Черный", inStock: true },
  { id: 14, name: "Стеллаж классик", price: 38900, category: "gostinaya", type: "stellazhi", brand: "Италия", material: "дерево", color: "Белый", inStock: true },

  // ========== КУХНЯ ==========
  { id: 15, name: "Кухонный гарнитур", price: 89900, category: "kuhnya", type: "garnitury", brand: "Италия", material: "МДФ", color: "Белый", inStock: true },
  { id: 16, name: "Кухонный стол", price: 24900, category: "kuhnya", type: "stoly", brand: "Турция", material: "дерево", color: "Дуб", inStock: true },
  { id: 17, name: "Стул кухонный", price: 5900, category: "kuhnya", type: "stulya", brand: "Китай", material: "пластик", color: "Белый", inStock: true },
  { id: 18, name: "Стул мягкий", price: 8900, category: "kuhnya", type: "stulya", brand: "Турция", material: "велюр", color: "Синий", inStock: true },

  // ========== СТОЛОВАЯ ==========
  { id: 19, name: "Стол обеденный", price: 34900, category: "stolovaya", type: "stoly", brand: "Италия", material: "массив", color: "Орех", inStock: true },
  { id: 20, name: "Стол раздвижной", price: 45900, category: "stolovaya", type: "stoly", brand: "Турция", material: "дерево", color: "Дуб", inStock: true },
  { id: 21, name: "Стул Венский", price: 8900, category: "stolovaya", type: "stulya", brand: "Италия", material: "дерево", color: "Орех", inStock: true },
  { id: 22, name: "Буфет классик", price: 38900, category: "stolovaya", type: "bufety", brand: "Китай", material: "МДФ", color: "Белый", inStock: true },

  // ========== МЯГКАЯ МЕБЕЛЬ ==========
  { id: 23, name: "Диван прямой", price: 89900, category: "myagkaya", type: "divany", brand: "Италия", material: "велюр", color: "Серый", inStock: true },
  { id: 24, name: "Диван угловой", price: 129900, oldPrice: 159900, category: "myagkaya", type: "divany", brand: "Турция", material: "ткань", color: "Бежевый", inStock: true },
  { id: 25, name: "Кресло Элис", price: 39900, category: "myagkaya", type: "kresla", brand: "Италия", material: "велюр", color: "Зеленый", inStock: true },
  { id: 26, name: "Кресло Рио", price: 29900, category: "myagkaya", type: "kresla", brand: "Турция", material: "экокожа", color: "Коричневый", inStock: true },
  { id: 27, name: "Пуф мягкий", price: 8900, category: "myagkaya", type: "pufy", brand: "Китай", material: "текстиль", color: "Синий", inStock: true },
  { id: 28, name: "Банкетка", price: 12900, category: "myagkaya", type: "banketki", brand: "Италия", material: "велюр", color: "Розовый", inStock: true },

  // ========== ПОСУДА ==========
  { id: 29, name: "Набор тарелок 12 шт", price: 4990, category: "posuda", type: "nabory", brand: "Италия", material: "керамика", color: "Белый", inStock: true },
  { id: 30, name: "Набор столовых приборов", price: 2990, category: "posuda", type: "nabory", brand: "Турция", material: "металл", color: "Серебро", inStock: true },
  { id: 31, name: "Ваза стеклянная", price: 1290, category: "posuda", type: "vazy", brand: "Италия", material: "стекло", color: "Прозрачный", inStock: true },
  { id: 32, name: "Ваза напольная", price: 4990, category: "posuda", type: "vazy", brand: "Китай", material: "керамика", color: "Белый", inStock: true },
  { id: 33, name: "Набор столовых приборов 24 шт", price: 5990, category: "posuda", type: "pribory", brand: "Италия", material: "металл", color: "Золото", inStock: true },
  { id: 34, name: "Ложки/вилки", price: 990, category: "posuda", type: "pribory", brand: "Турция", material: "металл", color: "Серебро", inStock: true },
  { id: 35, name: "Тарелки глубокие", price: 1990, category: "posuda", type: "tarelki", brand: "Италия", material: "керамика", color: "Синий", inStock: true },
  { id: 36, name: "Тарелки плоские", price: 1990, category: "posuda", type: "tarelki", brand: "Китай", material: "фарфор", color: "Белый", inStock: true },
  { id: 37, name: "Чашки кофейные", price: 1290, category: "posuda", type: "chashki", brand: "Италия", material: "фарфор", color: "Красный", inStock: true },
  { id: 38, name: "Чашки чайные", price: 1490, category: "posuda", type: "chashki", brand: "Турция", material: "керамика", color: "Зеленый", inStock: true },

  // ========== АРОМАТЫ ==========
  { id: 39, name: "Диффузор универсальный", price: 1290, category: "aromaty", type: "diffuzory", brand: "Италия", material: "стекло", color: "Прозрачный", inStock: true },
  { id: 40, name: "Диффузор цветочный", price: 1490, category: "aromaty", type: "diffuzory", brand: "Турция", material: "стекло", color: "Розовый", inStock: true },
  { id: 41, name: "Свеча ароматическая", price: 890, category: "aromaty", type: "svechi", brand: "Италия", material: "воск", color: "Белый", inStock: true },
  { id: 42, name: "Набор свечей 3 шт", price: 1990, category: "aromaty", type: "svechi", brand: "Китай", material: "воск", color: "Зеленый", inStock: true },
  { id: 43, name: "Аромамасло лаванда", price: 590, category: "aromaty", type: "masla", brand: "Италия", material: "масло", color: "Прозрачный", inStock: true },
  { id: 44, name: "Набор аромамасел", price: 1990, category: "aromaty", type: "masla", brand: "Турция", material: "масло", color: "Прозрачный", inStock: true },

  // ========== ТЕКСТИЛЬ ==========
  { id: 45, name: "Постельное белье", price: 4990, category: "tekstil", type: "postel", brand: "Турция", material: "хлопок", color: "Белый", inStock: true },
  { id: 46, name: "Постельное белье премиум", price: 8990, category: "tekstil", type: "postel", brand: "Италия", material: "сатин", color: "Серый", inStock: true },
  { id: 47, name: "Покрывало", price: 3490, category: "tekstil", type: "pokryvala", brand: "Китай", material: "хлопок", color: "Бежевый", inStock: true },
  { id: 48, name: "Покрывало стеганое", price: 4990, category: "tekstil", type: "pokryvala", brand: "Турция", material: "велюр", color: "Бордовый", inStock: true },
  { id: 49, name: "Плед мягкий", price: 1990, category: "tekstil", type: "pledy", brand: "Китай", material: "акрил", color: "Синий", inStock: true },
  { id: 50, name: "Плед шерстяной", price: 3990, category: "tekstil", type: "pledy", brand: "Италия", material: "шерсть", color: "Серый", inStock: true },
  { id: 51, name: "Подушка декоративная", price: 1290, category: "tekstil", type: "podushki", brand: "Турция", material: "велюр", color: "Зеленый", inStock: true },
  { id: 52, name: "Набор подушек 2 шт", price: 2490, category: "tekstil", type: "podushki", brand: "Китай", material: "хлопок", color: "Розовый", inStock: true },

  // ========== НОВИНКИ ==========
  { id: 53, name: "Кровать Адель", price: 79900, category: "novinki", type: "krovati", brand: "Италия", material: "массив", color: "Белый", inStock: true, isNew: true },
  { id: 54, name: "Диван Модерн", price: 99900, category: "novinki", type: "divany", brand: "Турция", material: "велюр", color: "Синий", inStock: true, isNew: true },
  { id: 55, name: "Светильник подвесной", price: 12900, category: "novinki", type: "chandeliers", brand: "Италия", material: "металл", color: "Черный", inStock: true, isNew: true },

  // ========== СКИДКИ ==========
  { id: 56, name: "Кровать София", price: 69900, oldPrice: 89900, category: "skidki", type: "krovati", brand: "Турция", material: "массив", color: "Серый", inStock: true },
  { id: 57, name: "Диван угловой", price: 129900, oldPrice: 159900, category: "skidki", type: "divany", brand: "Турция", material: "ткань", color: "Бежевый", inStock: true },
  { id: 58, name: "Набор аромамасел", price: 1990, oldPrice: 2990, category: "skidki", type: "masla", brand: "Италия", material: "масло", color: "Прозрачный", inStock: true },

  // ========== ОСВЕЩЕНИЕ (ЛЮСТРЫ) ==========
  { id: 59, name: "Люстра хрустальная", price: 15900, category: "lighting", type: "chandeliers", brand: "Италия", material: "хрусталь", color: "Прозрачный", inStock: true },
  { id: 60, name: "Люстра подвесная", price: 8900, category: "lighting", type: "chandeliers", brand: "Китай", material: "металл", color: "Черный", inStock: true },
  { id: 61, name: "Светильник потолочный", price: 4900, category: "lighting", type: "ceiling", brand: "Турция", material: "пластик", color: "Белый", inStock: true },
  { id: 62, name: "Бра настенное", price: 2900, category: "lighting", type: "wall", brand: "Китай", material: "металл", color: "Золотой", inStock: true },
];

// Подкатегории
const subcategories: Record<string, { name: string; slug: string; count: number }[]> = {
  spalnya: [
    { name: "Кровати", slug: "krovati", count: 2 },
    { name: "Шкафы", slug: "shkafy", count: 1 },
    { name: "Тумбы", slug: "tumby", count: 1 },
    { name: "Комоды", slug: "komody", count: 1 },
    { name: "Зеркала", slug: "zerkala", count: 1 },
  ],
  gostinaya: [
    { name: "Диваны", slug: "divany", count: 2 },
    { name: "Кресла", slug: "kresla", count: 2 },
    { name: "Столы", slug: "stoly", count: 2 },
    { name: "Стеллажи", slug: "stellazhi", count: 2 },
  ],
  kuhnya: [
    { name: "Гарнитуры", slug: "garnitury", count: 1 },
    { name: "Столы", slug: "stoly", count: 1 },
    { name: "Стулья", slug: "stulya", count: 2 },
  ],
  stolovaya: [
    { name: "Столы", slug: "stoly", count: 2 },
    { name: "Стулья", slug: "stulya", count: 1 },
    { name: "Буфеты", slug: "bufety", count: 1 },
  ],
  myagkaya: [
    { name: "Диваны", slug: "divany", count: 2 },
    { name: "Кресла", slug: "kresla", count: 2 },
    { name: "Пуфы", slug: "pufy", count: 1 },
    { name: "Банкетки", slug: "banketki", count: 1 },
  ],
  posuda: [
    { name: "Наборы посуды", slug: "nabory", count: 2 },
    { name: "Вазы", slug: "vazy", count: 2 },
    { name: "Столовые приборы", slug: "pribory", count: 2 },
    { name: "Тарелки", slug: "tarelki", count: 2 },
    { name: "Чашки", slug: "chashki", count: 2 },
  ],
  aromaty: [
    { name: "Диффузоры", slug: "diffuzory", count: 2 },
    { name: "Свечи", slug: "svechi", count: 2 },
    { name: "Аромамасла", slug: "masla", count: 2 },
  ],
  tekstil: [
    { name: "Постельное бельё", slug: "postel", count: 2 },
    { name: "Покрывала", slug: "pokryvala", count: 2 },
    { name: "Пледы", slug: "pledy", count: 2 },
    { name: "Подушки", slug: "podushki", count: 2 },
  ],
  lighting: [
    { name: "Люстры", slug: "chandeliers", count: 2 },
    { name: "Светильники", slug: "ceiling", count: 1 },
    { name: "Бра", slug: "wall", count: 1 },
  ],
  novinki: [],
  skidki: [],
};

const brands = ["Италия", "Турция", "Китай"];
const materials = ["массив", "ЛДСП", "МДФ", "стекло", "велюр", "ткань", "хлопок", "керамика", "фарфор", "металл", "хрусталь", "пластик", "воск", "масло"];
const colors = ["Белый", "Бежевый", "Серый", "Коричневый", "Черный", "Зеленый", "Синий", "Красный", "Розовый", "Бордовый", "Орех", "Венге", "Дуб", "Прозрачный", "Серебро", "Золото"];

export default function CategoryPage() {
  const { slug } = useParams();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [isColorOpen, setIsColorOpen] = useState(false);
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [isMaterialsOpen, setIsMaterialsOpen] = useState(false);

  useEffect(() => {
    if (typeParam) {
      setSelectedSubcategory(typeParam);
    } else {
      setSelectedSubcategory(null);
    }
  }, [typeParam]);

  const filteredProducts = mockProducts.filter((product) => {
    if (product.category !== slug) return false;
    if (typeParam && product.type !== typeParam) return false;
    if (selectedSubcategory && product.type !== selectedSubcategory) return false;
    if (slug === "novinki" && !product.isNew) return false;
    if (slug === "skidki" && !product.oldPrice) return false;
    const min = priceMin ? parseInt(priceMin) : 0;
    const max = priceMax ? parseInt(priceMax) : Infinity;
    if (product.price < min || product.price > max) return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(product.brand)) return false;
    if (selectedMaterials.length > 0 && !selectedMaterials.includes(product.material)) return false;
    if (selectedColors.length > 0 && !selectedColors.includes(product.color)) return false;
    if (showInStock && !product.inStock) return false;
    return true;
  });

  const sortedProducts = useMemo(() => {
    const products = [...filteredProducts];
    if (sortBy === "price_asc") return products.sort((a, b) => a.price - b.price);
    if (sortBy === "price_desc") return products.sort((a, b) => b.price - a.price);
    return products;
  }, [filteredProducts, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]);
  };
  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev => prev.includes(material) ? prev.filter(m => m !== material) : [...prev, material]);
  };
  const toggleColor = (color: string) => {
    setSelectedColors(prev => prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]);
  };

  const categoryName = {
    spalnya: "Спальня",
    gostinaya: "Гостиная",
    stolovaya: "Столовая",
    kuhnya: "Кухня",
    myagkaya: "Мягкая мебель",
    posuda: "Посуда",
    aromaty: "Ароматы",
    tekstil: "Текстиль",
    lighting: "Освещение",
    novinki: "Новинки",
    skidki: "Скидки",
  }[slug as string] || slug;

  const currentSubcategories = subcategories[slug as string] || [];
  const handleSubcategoryClick = (slug: string | null) => setSelectedSubcategory(slug);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-4">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition">← На главную</Link>
        </div>
        <div className="mb-6">
          <div className="text-sm text-gray-500 mb-2">
            <Link href="/" className="hover:text-black">Главная</Link> / <span className="text-gray-900">{categoryName}</span>
          </div>
          <h1 className="text-3xl font-light text-gray-900">{categoryName}</h1>
        </div>

        {/* Кнопка фильтров для мобилки */}
        <button onClick={() => setIsFilterOpen(true)} className="md:hidden flex items-center gap-2 mb-4 px-4 py-2 border border-gray-300 rounded-lg text-gray-700">
          <SlidersHorizontal className="w-4 h-4" /> Фильтры
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Левое меню (категории + фильтры) — ТОЛЬКО ДЛЯ ДЕСКТОПА */}
          <div className="hidden md:block md:w-64 shrink-0">
            <div className="sticky top-20">
              {currentSubcategories.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-medium text-gray-900 mb-3">Категории</h3>
                  <div className="space-y-2">
                    <button onClick={() => handleSubcategoryClick(null)} className={`flex justify-between items-center text-sm w-full text-left py-1 ${selectedSubcategory === null ? "text-amber-600 font-medium" : "text-gray-600 hover:text-amber-600"} transition`}>
                      <span>Все товары</span>
                      <span className="text-gray-400 text-xs">{mockProducts.filter(p => p.category === slug).length}</span>
                    </button>
                    {currentSubcategories.map(sub => (
                      <button key={sub.slug} onClick={() => handleSubcategoryClick(sub.slug)} className={`flex justify-between items-center text-sm w-full text-left py-1 ${selectedSubcategory === sub.slug ? "text-amber-600 font-medium" : "text-gray-600 hover:text-amber-600"} transition`}>
                        <span>{sub.name}</span>
                        <span className="text-gray-400 text-xs">{sub.count}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              {/* ФИЛЬТРЫ ДЛЯ ДЕСКТОПА */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-medium text-gray-900 mb-4">Фильтры</h3>
                
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Цена</h4>
                  <div className="flex gap-2">
                    <input type="number" placeholder="от" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400" />
                    <input type="number" placeholder="до" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-gray-900 placeholder-gray-400" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <button onClick={() => setIsBrandsOpen(!isBrandsOpen)} className="flex justify-between items-center w-full text-sm font-medium text-gray-900 mb-2">
                    <span>Бренд / Страна</span>
                    <span>{isBrandsOpen ? "−" : "+"}</span>
                  </button>
                  {isBrandsOpen && (
                    <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                      {brands.map((brand) => (
                        <label key={brand} className="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="rounded" />
                          {brand}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <button onClick={() => setIsMaterialsOpen(!isMaterialsOpen)} className="flex justify-between items-center w-full text-sm font-medium text-gray-900 mb-2">
                    <span>Материал</span>
                    <span>{isMaterialsOpen ? "−" : "+"}</span>
                  </button>
                  {isMaterialsOpen && (
                    <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                      {materials.map((material) => (
                        <label key={material} className="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={selectedMaterials.includes(material)} onChange={() => toggleMaterial(material)} className="rounded" />
                          {material}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <button onClick={() => setIsColorOpen(!isColorOpen)} className="flex justify-between items-center w-full text-sm font-medium text-gray-900 mb-2">
                    <span>Цвет</span>
                    <span>{isColorOpen ? "−" : "+"}</span>
                  </button>
                  {isColorOpen && (
                    <div className="space-y-2 mt-2 max-h-48 overflow-y-auto">
                      {colors.map((color) => (
                        <label key={color} className="flex items-center gap-2 text-sm text-gray-700">
                          <input type="checkbox" checked={selectedColors.includes(color)} onChange={() => toggleColor(color)} className="rounded" />
                          <span className="w-3 h-3 rounded-full border border-gray-300 inline-block" style={{ backgroundColor: color === "Белый" ? "#fff" : color === "Черный" ? "#000" : color === "Серый" ? "#9ca3af" : color === "Коричневый" ? "#8b5a2b" : "#d1d5db" }}></span>
                          {color}
                        </label>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" checked={showInStock} onChange={e => setShowInStock(e.target.checked)} className="rounded" />
                    Только в наличии
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Товары */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-4">
              <p className="text-sm text-gray-500">Найдено: {sortedProducts.length} товаров</p>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="text-sm border border-gray-300 rounded px-3 py-1.5 text-gray-700">
                <option value="default">По умолчанию</option>
                <option value="price_asc">Сначала дешевле</option>
                <option value="price_desc">Сначала дороже</option>
              </select>
            </div>
            {sortedProducts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">Товаров не найдено</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
                {sortedProducts.map(product => (
                  <ProductCard key={product.id} id={product.id} name={product.name} price={product.price} oldPrice={product.oldPrice} image="" isNew={product.isNew} isSale={!!product.oldPrice} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Мобильные фильтры (модалка) */}
{isFilterOpen && (
  <div className="fixed inset-0 z-50 bg-white overflow-y-auto md:hidden">
    <div className="p-4 border-b flex justify-between items-center sticky top-0 bg-white">
      <h3 className="font-medium text-gray-900">Фильтры</h3>
      <button onClick={() => setIsFilterOpen(false)}>
        <X className="w-5 h-5 text-gray-700" />
      </button>
    </div>
    <div className="p-4 space-y-4">
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Цена</h4>
        <div className="flex gap-2">
          <input type="number" placeholder="от" value={priceMin} onChange={e => setPriceMin(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900" />
          <input type="number" placeholder="до" value={priceMax} onChange={e => setPriceMax(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900" />
        </div>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Бренд / Страна</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={selectedBrands.includes(brand)} onChange={() => toggleBrand(brand)} className="rounded" />
              {brand}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Материал</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {materials.map((material) => (
            <label key={material} className="flex items-center gap-2 text-sm text-gray-700">
              <input type="checkbox" checked={selectedMaterials.includes(material)} onChange={() => toggleMaterial(material)} className="rounded" />
              {material}
            </label>
          ))}
        </div>
      </div>

      <div>
  <h4 className="text-sm font-medium text-gray-900 mb-2">Цвет</h4>
  <div className="space-y-2 max-h-40 overflow-y-auto">
    {colors.map((color) => (
      <label key={color} className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={selectedColors.includes(color)}
          onChange={() => toggleColor(color)}
          className="rounded"
        />
        <span
          className="w-4 h-4 rounded-full border border-gray-300"
          style={{
            backgroundColor:
  color === "Белый" ? "#ffffff" :
  color === "Черный" ? "#000000" :
  color === "Серый" ? "#9ca3af" :
  color === "Коричневый" ? "#8b5a2b" :
  color === "Зеленый" ? "#22c55e" :
  color === "Синий" ? "#3b82f6" :
  color === "Красный" ? "#ef4444" :
  color === "Розовый" ? "#ec4899" :
  color === "Бордовый" ? "#7f1d1d" :
  color === "Орех" ? "#b45309" :
  color === "Венге" ? "#4a2c2c" :
  color === "Дуб" ? "#d97706" :
  color === "Золотой" ? "#d4af37" :
  color === "Серебро" ? "#a0a0a0" :
  color === "Бежевый" ? "#d4b896" :
  color === "Прозрачный" ? "#e0f2fe" :
  "#d1d5db"
          }}
        ></span>
        {color}
      </label>
    ))}
  </div>
</div>

      <div>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={showInStock} onChange={e => setShowInStock(e.target.checked)} className="rounded" />
          Только в наличии
        </label>
      </div>

      <button onClick={() => setIsFilterOpen(false)} className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-medium mt-4">
        Применить
      </button>
    </div>
  </div>
)}
    </div>
  );
}