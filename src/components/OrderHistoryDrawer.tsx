import { Order, CartItem } from '../types';
import { formatCurrency } from '../utils/format';
import { X, RotateCcw, Clock, ScrollText } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface OrderHistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onReorder: (items: CartItem[]) => void;
}

export function OrderHistoryDrawer({ isOpen, onClose, orders, onReorder }: OrderHistoryDrawerProps) {
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[70] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-full md:w-[400px] z-[70] bg-zinc-50 shadow-2xl flex flex-col"
          >
            <div className="bg-white p-4 flex items-center justify-between border-b border-zinc-100 shadow-sm z-10">
              <h2 className="text-xl font-bold text-zinc-900 flex items-center gap-2">
                Histórico de Pedidos
              </h2>
              <button 
                onClick={onClose}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  <div className="w-24 h-24 bg-zinc-100 rounded-full flex items-center justify-center mb-4 text-zinc-300">
                    <ScrollText size={40} />
                  </div>
                  <h3 className="text-lg font-bold text-zinc-800 mb-2">Nenhum pedido anterior</h3>
                  <p className="text-zinc-500 text-sm">Seus pedidos finalizados aparecerão aqui.</p>
                </div>
              ) : (
                orders.map((order) => (
                  <div key={order.id} className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-100">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b border-zinc-100">
                      <div className="flex items-center gap-2 text-zinc-500 text-sm">
                        <Clock size={14} />
                        <span>{formatDate(order.date)}</span>
                      </div>
                      <span className="font-bold text-amber-600">
                        {formatCurrency(order.total)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="font-bold text-zinc-700">{item.quantity}x</span>{' '}
                          <span className="text-zinc-600">{item.product.name}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => onReorder(order.items)}
                      className="w-full bg-amber-50 hover:bg-amber-100 text-amber-700 font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <RotateCcw size={16} />
                      Pedir Novamente
                    </button>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
