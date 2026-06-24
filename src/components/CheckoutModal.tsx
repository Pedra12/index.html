import React, { useState } from 'react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/format';
import { X, Check, MapPin, CreditCard, Banknote, SmartphoneNfc } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  cartTotal: number;
  clearCart: () => void;
  onOrderComplete: (items: CartItem[], total: number) => void;
}

type PaymentMethod = 'PIX' | 'CARTAO' | 'DINHEIRO';

const PIX_KEY = '5527998987359'; // Example PIX key

export function CheckoutModal({ isOpen, onClose, cartItems, cartTotal, clearCart, onOrderComplete }: CheckoutModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    street: '',
    number: '',
    neighborhood: '',
    complement: '',
    reference: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('PIX');
  const [needsChange, setNeedsChange] = useState(false);
  const [changeFor, setChangeFor] = useState('');
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isFormValid = () => {
    const { name, phone, street, number, neighborhood } = formData;
    if (!name || !phone || !street || !number || !neighborhood) return false;
    if (paymentMethod === 'DINHEIRO' && needsChange && !changeFor) return false;
    return true;
  };

  const generateWhatsAppMessage = () => {
    const { name, phone, street, number, neighborhood, complement, reference } = formData;
    
    let itemsText = cartItems.map(item => {
      let text = `🔸 ${item.quantity}x ${item.product.name}`;
      if (item.isAcai) {
        text += `\n   Tamanho: ${item.acaiSize?.name}`;
        if (item.acaiComplements?.length) {
          text += `\n   Comp: ${item.acaiComplements.map(c => c.name).join(', ')}`;
        }
      } else if (item.addons.length > 0) {
        text += `\n   Add: ${item.addons.map(a => a.name).join(', ')}`;
      }
      return text;
    }).join('\n\n');

    let paymentText = paymentMethod;
    if (paymentMethod === 'DINHEIRO' && needsChange) {
      paymentText += `\n   Troco para: R$ ${changeFor}`;
    }

    const message = `🍔 *PEDIDO BARRIL* 🍔\n
👤 *Cliente:* ${name}
📞 *Tel:* ${phone}\n
📍 *Endereço para Entrega:*
${street}, ${number} - ${neighborhood}
${complement ? `Complemento: ${complement}\n` : ''}${reference ? `Referência: ${reference}\n` : ''}
🛒 *Resumo do Pedido:*\n
${itemsText}\n
💳 *Forma de Pagamento:* ${paymentText}
💰 *Total a pagar:* *${formatCurrency(cartTotal)}*\n
Obrigado pela preferência!`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5527998987359?text=${encodedMessage}`, '_blank');
    
    // Save order, clear cart and close after sending order
    onOrderComplete(cartItems, cartTotal);
    clearCart();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 sm:inset-x-auto sm:right-0 sm:w-full sm:max-w-md z-[60] bg-white sm:rounded-l-3xl flex flex-col overflow-hidden shadow-2xl"
          >
            <div className="bg-white p-5 flex items-center justify-between border-b border-zinc-100 shrink-0">
              <h2 className="text-xl font-bold text-zinc-900">Finalizar Pedido</h2>
              <button 
                onClick={onClose}
                className="bg-zinc-100 hover:bg-zinc-200 text-zinc-600 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              
              {/* Seção Dados Pessoais */}
              <section>
                <div className="flex items-center gap-2 mb-3 text-zinc-800">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">1</div>
                  <h3 className="font-bold">Seus Dados</h3>
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome completo *"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="WhatsApp / Telefone *"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                  />
                </div>
              </section>

              {/* Seção Endereço */}
              <section>
                <div className="flex items-center gap-2 mb-3 text-zinc-800">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">2</div>
                  <h3 className="font-bold">Endereço de Entrega</h3>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      name="street"
                      placeholder="Rua / Avenida *"
                      value={formData.street}
                      onChange={handleInputChange}
                      className="col-span-2 w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    />
                    <input
                      type="text"
                      name="number"
                      placeholder="Número *"
                      value={formData.number}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                    />
                  </div>
                  <input
                    type="text"
                    name="neighborhood"
                    placeholder="Bairro *"
                    value={formData.neighborhood}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                  <input
                    type="text"
                    name="complement"
                    placeholder="Complemento (Ap, Bloco, etc)"
                    value={formData.complement}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                  <input
                    type="text"
                    name="reference"
                    placeholder="Ponto de referência"
                    value={formData.reference}
                    onChange={handleInputChange}
                    className="w-full bg-zinc-50 border border-zinc-200 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                  />
                </div>
              </section>

              {/* Seção Pagamento */}
              <section>
                <div className="flex items-center gap-2 mb-3 text-zinc-800">
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-sm">3</div>
                  <h3 className="font-bold">Pagamento na Entrega</h3>
                </div>
                
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <button
                    onClick={() => setPaymentMethod('PIX')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'PIX' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 bg-white text-zinc-500'}`}
                  >
                    <SmartphoneNfc size={20} />
                    <span className="text-xs font-bold">PIX</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('CARTAO')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'CARTAO' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 bg-white text-zinc-500'}`}
                  >
                    <CreditCard size={20} />
                    <span className="text-xs font-bold">Cartão</span>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('DINHEIRO')}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${paymentMethod === 'DINHEIRO' ? 'border-amber-500 bg-amber-50 text-amber-700' : 'border-zinc-200 bg-white text-zinc-500'}`}
                  >
                    <Banknote size={20} />
                    <span className="text-xs font-bold">Dinheiro</span>
                  </button>
                </div>

                {paymentMethod === 'PIX' && (
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl text-sm text-blue-800 flex flex-col gap-2">
                    <p>Nossa chave PIX CNPJ é:</p>
                    <div className="font-mono font-bold bg-white px-3 py-2 rounded-lg border border-blue-200 text-center text-lg tracking-widest select-all">
                      {PIX_KEY}
                    </div>
                    <p className="text-xs opacity-80 mt-1">O motoboy também levará o QR Code na máquina.</p>
                  </div>
                )}

                {paymentMethod === 'DINHEIRO' && (
                  <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl space-y-3">
                    <p className="text-sm font-medium text-zinc-700 mb-2">Precisa de troco?</p>
                    <div className="flex gap-4 mb-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="troco" 
                          checked={needsChange} 
                          onChange={() => setNeedsChange(true)}
                          className="text-amber-500 focus:ring-amber-500 h-4 w-4"
                        />
                        <span className="text-sm">Sim</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="radio" 
                          name="troco" 
                          checked={!needsChange} 
                          onChange={() => {
                            setNeedsChange(false);
                            setChangeFor('');
                          }}
                          className="text-amber-500 focus:ring-amber-500 h-4 w-4"
                        />
                        <span className="text-sm">Não</span>
                      </label>
                    </div>
                    
                    {needsChange && (
                      <input
                        type="text"
                        placeholder="Troco para quanto? (Ex: 100)"
                        value={changeFor}
                        onChange={(e) => setChangeFor(e.target.value)}
                        className="w-full bg-white border border-zinc-300 text-zinc-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
                      />
                    )}
                  </div>
                )}
              </section>

              <div className="pb-8 text-xs text-center text-zinc-400">
                Os campos com * são obrigatórios.
              </div>
            </div>

            <div className="bg-white border-t border-zinc-100 p-5 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] shrink-0">
              <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-600 font-medium">Total a pagar</span>
                <span className="text-2xl font-black text-amber-600">{formatCurrency(cartTotal)}</span>
              </div>
              <button 
                disabled={!isFormValid()}
                onClick={generateWhatsAppMessage}
                className={`w-full rounded-xl py-4 font-bold flex justify-center items-center gap-2 transition-all ${
                  isFormValid() 
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20 active:scale-[0.98]' 
                  : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
                }`}
              >
                Enviar Pedido por WhatsApp
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
