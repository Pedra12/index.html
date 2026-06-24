import { useState, useEffect } from 'react';
import { Order, CartItem } from '../types';

export function useOrderHistory() {
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('barril_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('barril_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (items: CartItem[], total: number) => {
    const newOrder: Order = {
      id: Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      items,
      total
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return { orders, addOrder };
}
