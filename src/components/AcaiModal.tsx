import { useState } from 'react';
import { Product, AcaiSize, AcaiComplement, CartItem } from '../types';
import { ACAI_SIZES, ACAI_COMPLEMENTS } from '../data';
import { formatCurrency } from '../utils/format';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AcaiModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: CartItem) => void;
}

const MAX_COMPLEMENTS = 4;

export function AcaiModal({ product, isOpen, onClose, onAdd }: AcaiModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<AcaiSize>(ACAI_SIZES[0]);
  const [selectedComplements, setSelectedComplements] = useState<AcaiComplement[]>([]);

  if (!product) return null;

  const toggleComplement = (comp: AcaiComplement) => {
    setSelectedComplements(prev => {
      if (prev.find(c => c.id === comp.id)) {
        return prev.filter(c => c.id !== comp.id);
      }
      if (prev.length < MAX_COMPLEMENTS) {
        return [...prev, comp];
      }
      return prev; // Max reached
    });
  };

  const handleAdd = () => {
    const unitPrice = selectedSize.price;
    const totalPrice = unitPrice * quantity;

    onAdd({
      cartItemId: Math.random().toString(36).substring(2, 9),
      product,
      isAcai: true,
      quantity,
      addons: [],
      acaiSize: selectedSize,
      acaiComplements: selectedComplements,
      totalPrice
    });

    // Reset state
    setQuantity(1);
    setSelectedSize(ACAI_SIZES[0]);
    setSelectedComplements([]);
    onClose();
  };

  const currentTotal = selectedSize.price * quantity;

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
            <div className="relative h-48 sm:h-64 shrink-0 bg-purple-900">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-90" />
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur text-zinc-900 p-2 rounded-full shadow-sm"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 pb-32">
              <h2 className="text-2xl font-bold text-zinc-900 mb-2">{product.name}</h2>
              <p className="text-zinc-500 text-sm mb-6 leading-relaxed">{product.description}</p>
              
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-bold text-zinc-800 text-lg">1. Escolha o tamanho</h3>
                  <span className="text-xs text-red-500 font-bold bg-red-50 px-2 py-1 rounded">Obrigatório</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {ACAI_SIZES.map(size => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${selectedSize.id === size.id ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-zinc-200 bg-white text-zinc-600 hover:border-purple-300'}`}
                    >
                      <span className="font-bold">{size.name}</span>
                      <span className="text-sm">{formatCurrency(size.price)}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-end mb-2">
                  <h3 className="font-bold text-zinc-800 text-lg">2. Complementos</h3>
                  <span className="text-xs text-zinc-500 font-medium bg-zinc-100 px-2 py-1 rounded">
                    Até {MAX_COMPLEMENTS}
                  </span>
                </div>
                <p className="text-sm text-purple-600 mb-4 font-medium">
                  Selecionados: {selectedComplements.length}/{MAX_COMPLEMENTS}
                </p>
                
                <div className="grid grid-cols-2 gap-2">
                  {ACAI_COMPLEMENTS.map(comp => {
                    const isSelected = selectedComplements.some(c => c.id === comp.id);
                    const isDisabled = !isSelected && selectedComplements.length >= MAX_COMPLEMENTS;
                    
                    return (
                      <button
                        key={comp.id}
                        disabled={isDisabled}
                        onClick={() => toggleComplement(comp)}
                        className={`p-3 text-sm text-left rounded-xl border-2 transition-all flex items-center justify-between
                          ${isSelected ? 'border-purple-600 bg-purple-50 text-purple-900 font-medium' : 
                            isDisabled ? 'border-zinc-100 bg-zinc-50 text-zinc-400 opacity-50 cursor-not-allowed' : 
                            'border-zinc-200 bg-white text-zinc-700 hover:border-purple-200'}`}
                      >
                        <span className="truncate">{comp.name}</span>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-purple-600 shrink-0"></div>}
                      </button>
                    );
                  })}
                </div>
              </div>
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
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-full py-4 px-6 font-bold flex justify-between items-center transition-colors shadow-lg shadow-purple-600/20 active:scale-[0.98]"
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
