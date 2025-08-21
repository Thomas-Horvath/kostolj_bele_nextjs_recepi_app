"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

const FavoritesContext = createContext();

export function FavoriteProvider({ children }) {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState([]);



  useEffect(() => {
    if (!session?.user?.id) {
      setFavorites([]);
      return;
    }
    // Fetch user's favorites from your API
    fetch("/api/favorites")
      .then(res => res.json())
      .then(data => setFavorites(data))
      .catch(() => setFavorites([]));
  }, [session]);

  const toggleFavorite = async (recipeId) => {
    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipeId }),
      });

      const data = await res.json();

      if (data.favorited) {
        setFavorites([...favorites, recipeId]);
      } else {
        setFavorites(favorites.filter(id => id !== recipeId));
      }
    } catch (err) {
      console.error("Hiba a favorite toggle-nál:", err);
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
