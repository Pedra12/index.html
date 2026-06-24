import { useState } from 'react';
import { Product, Addon, CartItem } from '../types';
import { ADDONS } from '../data';
import { formatCurrency } from '../utils/format';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: CartItem) => void;
}

export function ProductModal({ product, isOpen, onClose, onAdd }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedAddons, setSelectedAddons] = useState<Addon[]>([]);

  if (!product) return null;

  const isBurger = product.categoryId === 'tradicionais' || product.categoryId === 'gourmet' || product.categoryId === 'cachorro_quente';
  
  const toggleAddon = (addon: Addon) => {
    setSelectedAddons(prev => 
      prev.find(a => a.id === addon.id)
        ? prev.filter(a => a.id !== addon.id)
        : [...prev, addon]
    );
  };

  const handleAdd = () => {
    const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
    const unitPrice = product.price + addonsTotal;
    const totalPrice = unitPrice * quantity;

    onAdd({
      cartItemId: Math.random().toString(36).substring(2, 9),
      product,
      isAcai: false,
      quantity,
      addons: selectedAddons,
      totalPrice
    });

    // Reset state
    setQuantity(1);
    setSelectedAddons([]);
    onClose();
  };

  const addonsTotal = selectedAddons.reduce((sum, addon) => sum + addon.price, 0);
  const currentTotal = (product.price + addonsTotal) * quantity;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="relative h-48 sm:h-64 shrink-0 bg-zinc-100">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur text-zinc-900 p-2 rounded-full shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-32">
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">{product.name}</h2>
              <p className="text-zinc-500 text-sm mb-4 leading-relaxed">{product.description}</p>
              <div className="text-amber-600 font-bold text-xl mb-6">
                {formatCurrency(product.price)}
              </div>

              {isBurger && (
                <div className="mb-6">
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="font-bold text-zinc-800">Turbine seu lanche</h3>
                    <span className="text-xs text-zinc-400 font-medium bg-zinc-100 px-2 py-1 rounded">Opcional</span>
                  </div>
                  <div className="space-y-3">
                    {ADDONS.map(addon => {
                      const isSelected = selectedAddons.some(a => a.id === addon.id);
                      return (
                        <label 
                          key={addon.id} 
                          className={`flex items-center justify-between p-3 rounded-xl border-2 transition-colors cursor-pointer select-none ${isSelected ? 'border-amber-500 bg-amber-50/50' : 'border-zinc-100 bg-white'}`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-zinc-300'}`}>
                              {isSelected && <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3"><path d="M3 7.5L5.5 10L11 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <span className={`font-medium ${isSelected ? 'text-zinc-900' : 'text-zinc-600'}`}>{addon.name}</span>
                          </div>
                          <span className="text-sm font-medium text-amber-600">
                            + {formatCurrency(addon.price)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Footer fixed */}
            <div className="absolute bottom-0 left-0 w-full bg-white border-t border-zinc-100 p-4 pb-safe flex items-center gap-4">
              <div className="flex items-center bg-zinc-100 rounded-full border border-zinc-200 p-1">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-white hover:shadow-sm rounded-full transition-all"
                >
                  <Minus size={18} />
                </button>
                <span className="w-8 text-center font-bold text-zinc-900">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center text-zinc-600 hover:bg-white hover:shadow-sm rounded-full transition-all"
                >
                  <Plus size={18} />
                </button>
              </div>

              <button 
                onClick={handleAdd}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white rounded-full py-4 px-6 font-bold flex justify-between items-center transition-colors shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <ShoppingBag size={18} />
                  Adicionar
                </span>
                <span>{formatCurrency(currentTotal)}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
