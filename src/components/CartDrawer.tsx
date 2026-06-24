import { CartItem } from '../types';
import { formatCurrency } from '../utils/format';
import { X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  updateQuantity: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  onCheckout: () => void;
}

export function CartDrawer({ 
  isOpen, onClose, cartItems, cartTotal, 
  updateQuantity, removeFromCart, clearCart, onCheckout 
}: CartDrawerProps) {
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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[400px] z-50 bg-zinc-50 shadow-2xl flex flex-col"
          >
            <div className="bg-white p-4 flex items-center justify-between border-b border-zinc-100 shadow-sm z-10">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                Seu Pedido
                <span className="bg-amber-100 text-amber-700 text-xs py-0.5 px-2 rounded-full font-bold">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} itens
                </span>
              </h2>
              <div className="flex items-center gap-3">
                {cartItems.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-xs text-red-500 font-medium hover:text-red-600 transition-colors"
                  >
                    Limpar
                  </button>
                )}
                <button 
                  onClick={onClose}
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-zinc-300">
                    <ShoppingBag size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-800 mb-2">Seu carrinho está vazio</h3>
                  <p className="text-zinc-500 text-sm">Adicione os melhores lanches da cidade para matar sua fome!</p>
                  <button 
                    onClick={onClose}
                    className="mt-6 font-bold text-amber-600 hover:text-amber-700"
                  >
                    Ver cardápio
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.cartItemId} className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
                    <div className="flex justify-between mb-2">
                      <div className="flex-1 pr-3">
                        <h4 className="font-bold text-zinc-900 text-sm leading-tight">
                          {item.quantity}x {item.product.name}
                        </h4>
                        
                        {item.isAcai ? (
                          <div className="mt-1 space-y-0.5">
                            <p className="text-xs text-purple-600 font-medium">Tam: {item.acaiSize?.name}</p>
                            {item.acaiComplements && item.acaiComplements.length > 0 && (
                              <p className="text-xs text-zinc-500 line-clamp-2">
                                + {item.acaiComplements.map(c => c.name).join(', ')}
                              </p>
                            )}
                          </div>
                        ) : (
                          item.addons.length > 0 && (
                            <div className="mt-1">
                              <p className="text-xs text-zinc-500 line-clamp-2">
                                + {item.addons.map(a => a.name).join(', ')}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                      
                      <div className="text-right shrink-0">
                        <span className="font-bold text-amber-600 block text-sm">
                          {formatCurrency(item.totalPrice)}
                        </span>
                        <button 
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="text-zinc-400 hover:text-red-500 transition-colors mt-2"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center mt-3 bg-zinc-50 w-fit rounded-lg border border-zinc-200">
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, -1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 rounded-l-lg transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold text-zinc-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId, 1)}
                        className="w-8 h-8 flex items-center justify-center text-zinc-600 hover:bg-zinc-200 rounded-r-lg transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="bg-white border-t border-zinc-100 p-5 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between text-zinc-500 text-sm mb-2">
                  <span>Subtotal</span>
                  <span>{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-zinc-900 font-black text-lg mb-4">
                  <span>Total</span>
                  <span className="text-amber-600">{formatCurrency(cartTotal)}</span>
                </div>
                
                <button 
                  onClick={onCheckout}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-xl py-4 font-bold flex justify-center items-center gap-2 transition-colors shadow-lg shadow-amber-500/20 active:scale-[0.98]"
                >
                  Finalizar Pedido <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
