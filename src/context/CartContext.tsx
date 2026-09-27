'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, CartCustomization } from '@/types/product';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, customization: CartCustomization, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  shippingPrice: number;
  grandTotal: number;
  freeShippingThreshold: number;
  hasMadeToOrderItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'pokeprintedball_cart_v1';
const FREE_SHIPPING_THRESHOLD = 40.0;
const STANDARD_SHIPPING_PRICE = 5.90;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  // Synchronize state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const generateItemId = (productId: string, customization: CartCustomization) => {
    return `${productId}__${customization.selectedSupport.id}__${customization.selectedFinish.id}__${
      customization.customEngravingText?.trim().toLowerCase() || 'none'
    }`;
  };

  const calculateUnitItemPrice = (product: Product, customization: CartCustomization) => {
    let unit = product.price;
    unit += customization.selectedSupport.price;
    if (customization.customEngravingText && customization.customEngravingText.trim().length > 0) {
      unit += product.engravingPrice;
    }
    return Math.round(unit * 100) / 100;
  };

  const addItem = (product: Product, customization: CartCustomization, quantity = 1) => {
    const itemId = generateItemId(product.id, customization);
    const unitPrice = calculateUnitItemPrice(product, customization);

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          itemTotalPrice: Math.round(unitPrice * newQty * 100) / 100,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: itemId,
            product,
            quantity,
            customization,
            itemTotalPrice: Math.round(unitPrice * quantity * 100) / 100,
          },
        ];
      }
    });

    setIsOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }

    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const unitPrice = calculateUnitItemPrice(item.product, item.customization);
          return {
            ...item,
            quantity,
            itemTotalPrice: Math.round(unitPrice * quantity * 100) / 100,
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = Math.round(items.reduce((acc, item) => acc + item.itemTotalPrice, 0) * 100) / 100;
  const shippingPrice = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_PRICE;
  const grandTotal = Math.round((subtotal + shippingPrice) * 100) / 100;
  const hasMadeToOrderItems = items.some((item) => item.product.stockStatus === 'made_to_order');

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        openCart,
        closeCart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        shippingPrice,
        grandTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        hasMadeToOrderItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
