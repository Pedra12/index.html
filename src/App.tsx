import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { AcaiModal } from './components/AcaiModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderHistoryDrawer } from './components/OrderHistoryDrawer';
import { CATEGORIES, PRODUCTS } from './data';
import { useCart } from './hooks/useCart';
import { useOrderHistory } from './hooks/useOrderHistory';
import { Product, CartItem } from './types';
import { ShoppingBag, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { formatCurrency } from './utils/format';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isAcaiModalOpen, setIsAcaiModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  
  const [toastMsg, setToastMsg] = useState('');

  const { cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  const { orders, addOrder } = useOrderHistory();

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    if (product.categoryId === 'acai') {
      setIsAcaiModalOpen(true);
    } else {
      setIsProductModalOpen(true);
    }
  };

  const handleAddToCart = (item: CartItem) => {
    addToCart(item);
    showToast(`${item.quantity}x ${item.product.name} adicionado!`);
  };

  const handleOrderComplete = (items: CartItem[], total: number) => {
    addOrder(items, total);
    showToast('Pedido realizado e salvo no histórico!');
  };

  const handleReorder = (items: CartItem[]) => {
    items.forEach(item => {
      // Create new cartItemId to avoid conflicts
      addToCart({ ...item, cartItemId: Math.random().toString(36).substring(2, 9) });
    });
    showToast('Itens adicionados ao carrinho!');
    setIsHistoryOpen(false);
    setIsCartOpen(true);
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const filteredProducts = PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Auto-select first category based on search results if searching
  useEffect(() => {
    if (searchQuery && filteredProducts.length > 0) {
      setActiveCategory(filteredProducts[0].categoryId);
    }
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-zinc-50 pb-24 font-sans selection:bg-amber-200">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onOpenHistory={() => setIsHistoryOpen(true)}
      />

      {/* Sticky Categories Navigation */}
      <div className="sticky top-0 z-40 bg-zinc-50/90 backdrop-blur-md shadow-sm border-b border-zinc-200 py-3 mt-4">
        <div className="flex overflow-x-auto hide-scrollbar px-4 gap-2 pb-1">
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                document.getElementById(`cat-${category.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-medium text-sm transition-all active:scale-95 ${
                activeCategory === category.id 
                ? 'bg-zinc-900 text-white shadow-md' 
                : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 mt-6 space-y-12">
        {searchQuery ? (
          <section>
            <h2 className="text-xl font-black text-zinc-900 mb-4">Resultados da busca</h2>
            {filteredProducts.length === 0 ? (
              <p className="text-zinc-500 text-center py-10">Nenhum produto encontrado.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                ))}
              </div>
            )}
          </section>
        ) : (
          CATEGORIES.map(category => {
            const catProducts = PRODUCTS.filter(p => p.categoryId === category.id);
            if (catProducts.length === 0) return null;
            
            return (
              <section key={category.id} id={`cat-${category.id}`} className="scroll-mt-24">
                <h2 className="text-2xl font-black text-zinc-900 mb-4 px-1">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {catProducts.map(product => (
                    <ProductCard key={product.id} product={product} onClick={handleProductClick} />
                  ))}
                </div>
              </section>
            );
          })
        )}
      </main>

      {/* Floating Cart Button (Mobile & Desktop) */}
      <AnimatePresence>
        {totalItems > 0 && !isCartOpen && !isCheckoutOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-6 inset-x-4 md:inset-x-auto md:right-6 md:w-80 z-40"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white rounded-2xl p-4 shadow-xl shadow-amber-500/25 flex items-center justify-between transition-transform active:scale-[0.98]"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <ShoppingBag size={24} />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full border-2 border-amber-500">
                    {totalItems}
                  </span>
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-xs font-medium text-amber-100 uppercase tracking-wide">Ver sacola</span>
                  <span className="font-black text-lg leading-none">{formatCurrency(cartTotal)}</span>
                </div>
              </div>
              <ChevronRight size={24} className="text-amber-100" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMsg && (
          <motion.div
            initial={{ y: -50, opacity: 0, x: '-50%' }}
            animate={{ y: 0, opacity: 1, x: '-50%' }}
            exit={{ y: -50, opacity: 0, x: '-50%' }}
            className="fixed top-6 left-1/2 z-[100] bg-zinc-900 text-white px-6 py-3 rounded-full shadow-2xl font-medium text-sm whitespace-nowrap"
          >
            {toastMsg}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals & Drawers */}
      <ProductModal 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)} 
        product={selectedProduct} 
        onAdd={handleAddToCart} 
      />
      
      <AcaiModal 
        isOpen={isAcaiModalOpen} 
        onClose={() => setIsAcaiModalOpen(false)} 
        product={selectedProduct} 
        onAdd={handleAddToCart} 
      />

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        clearCart={clearCart}
        onOrderComplete={handleOrderComplete}
      />

      <OrderHistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        orders={orders}
        onReorder={handleReorder}
      />

      {/* Global CSS for hiding scrollbar */}
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
