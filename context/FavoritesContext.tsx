"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface FavoriteItem {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
}

interface FavoritesContextType {
  items: FavoriteItem[];
  addToFavorites: (product: FavoriteItem) => void;
  removeFromFavorites: (id: number) => void;
  isFavorite: (id: number) => boolean;
  totalFavorites: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<FavoriteItem[]>([]);

  // Загрузка из localStorage при старте
  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setItems(JSON.parse(saved));
    }
  }, []);

  // Сохранение в localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(items));
  }, [items]);

  const addToFavorites = (product: FavoriteItem) => {
    setItems(prev => {
      if (prev.some(item => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromFavorites = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const isFavorite = (id: number) => {
    return items.some(item => item.id === id);
  };

  const totalFavorites = items.length;

  return (
    <FavoritesContext.Provider
      value={{ items, addToFavorites, removeFromFavorites, isFavorite, totalFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within FavoritesProvider");
  }
  return context;
}