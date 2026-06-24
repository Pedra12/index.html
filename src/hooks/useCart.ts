import { useState, useEffect } from 'react';
import { CartItem } from '../types';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('barril_cart');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Failed to parse cart', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('barril_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: CartItem) => {
    setCartItems(prev => [...prev, item]);
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const newQuantity = Math.max(1, item.quantity + delta);
        // Calculate new total based on single item price
        const singleItemPrice = item.totalPrice / item.quantity;
        return { ...item, quantity: newQuantity, totalPrice: singleItemPrice * newQuantity };
      }
      return item;
    }));
  };

  const clearCart = () => setCartItems([]);

  const cartTotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal };
}
