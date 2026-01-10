import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useFavoriteRecipes } from './useFavoriteRecipes';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('useFavoriteRecipes', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('should initialize with empty favorites', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('should add a recipe to favorites', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.favorites[0].id).toBe('recipe-1');
    expect(result.current.isFavorite('recipe-1')).toBe(true);
    expect(result.current.favoritesCount).toBe(1);
  });

  it('should not add duplicate favorites', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    expect(result.current.favorites).toHaveLength(1);
  });

  it('should remove a recipe from favorites', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    act(() => {
      result.current.addFavorite('recipe-2');
    });
    
    expect(result.current.favorites).toHaveLength(2);
    
    act(() => {
      result.current.removeFavorite('recipe-1');
    });
    
    expect(result.current.favorites).toHaveLength(1);
    expect(result.current.isFavorite('recipe-1')).toBe(false);
    expect(result.current.isFavorite('recipe-2')).toBe(true);
  });

  it('should toggle favorite status', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    // Toggle on
    act(() => {
      result.current.toggleFavorite('recipe-1');
    });
    expect(result.current.isFavorite('recipe-1')).toBe(true);
    
    // Toggle off
    act(() => {
      result.current.toggleFavorite('recipe-1');
    });
    expect(result.current.isFavorite('recipe-1')).toBe(false);
  });

  it('should return favorite IDs', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    act(() => {
      result.current.addFavorite('recipe-2');
    });
    
    act(() => {
      result.current.addFavorite('recipe-3');
    });
    
    const ids = result.current.getFavoriteIds();
    expect(ids).toContain('recipe-1');
    expect(ids).toContain('recipe-2');
    expect(ids).toContain('recipe-3');
    expect(ids).toHaveLength(3);
  });

  it('should clear all favorites', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    act(() => {
      result.current.addFavorite('recipe-2');
    });
    
    expect(result.current.favoritesCount).toBe(2);
    
    act(() => {
      result.current.clearFavorites();
    });
    
    expect(result.current.favorites).toEqual([]);
    expect(result.current.favoritesCount).toBe(0);
  });

  it('should persist favorites to localStorage', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'khora_favorite_recipes',
      expect.stringContaining('recipe-1')
    );
  });

  it('should load favorites from localStorage on mount', async () => {
    const existingFavorites = [
      { id: 'recipe-1', addedAt: '2025-01-01T00:00:00.000Z' },
      { id: 'recipe-2', addedAt: '2025-01-02T00:00:00.000Z' },
    ];
    localStorageMock.getItem.mockReturnValueOnce(JSON.stringify(existingFavorites));
    
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    expect(localStorageMock.getItem).toHaveBeenCalledWith('khora_favorite_recipes');
  });

  it('should store addedAt timestamp when adding favorite', async () => {
    const { result } = renderHook(() => useFavoriteRecipes());
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    
    act(() => {
      result.current.addFavorite('recipe-1');
    });
    
    expect(result.current.favorites[0].addedAt).toBeDefined();
    expect(new Date(result.current.favorites[0].addedAt).getTime()).toBeLessThanOrEqual(Date.now());
  });
});
