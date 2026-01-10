/*
 * KHORA Favorite Recipes Hook
 * Manages favorite recipes with localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'khora_favorite_recipes';

export interface FavoriteRecipe {
  id: string;
  addedAt: string;
}

export function useFavoriteRecipes() {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as FavoriteRecipe[];
        setFavorites(parsed);
      }
    } catch (error) {
      console.error('Error loading favorite recipes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save favorites to localStorage
  const saveFavorites = useCallback((newFavorites: FavoriteRecipe[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Error saving favorite recipes:', error);
    }
  }, []);

  // Add a recipe to favorites
  const addFavorite = useCallback((recipeId: string) => {
    const exists = favorites.some(f => f.id === recipeId);
    if (!exists) {
      const newFavorite: FavoriteRecipe = {
        id: recipeId,
        addedAt: new Date().toISOString(),
      };
      saveFavorites([...favorites, newFavorite]);
    }
  }, [favorites, saveFavorites]);

  // Remove a recipe from favorites
  const removeFavorite = useCallback((recipeId: string) => {
    const newFavorites = favorites.filter(f => f.id !== recipeId);
    saveFavorites(newFavorites);
  }, [favorites, saveFavorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback((recipeId: string) => {
    const isFav = favorites.some(f => f.id === recipeId);
    if (isFav) {
      removeFavorite(recipeId);
    } else {
      addFavorite(recipeId);
    }
  }, [favorites, addFavorite, removeFavorite]);

  // Check if a recipe is in favorites
  const isFavorite = useCallback((recipeId: string) => {
    return favorites.some(f => f.id === recipeId);
  }, [favorites]);

  // Get all favorite recipe IDs
  const getFavoriteIds = useCallback(() => {
    return favorites.map(f => f.id);
  }, [favorites]);

  // Get favorites count
  const favoritesCount = favorites.length;

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    saveFavorites([]);
  }, [saveFavorites]);

  return {
    favorites,
    isLoading,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    isFavorite,
    getFavoriteIds,
    favoritesCount,
    clearFavorites,
  };
}

export default useFavoriteRecipes;
