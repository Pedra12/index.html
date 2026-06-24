import { Product } from '../types';
import { formatCurrency } from '../utils/format';
import { Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  // Define variations of slow, continuous animations for the product images
  const seed = product.id.charCodeAt(product.id.length - 1) + product.name.length;
  const animationType = seed % 4;

  const getAnimationProps = () => {
    switch (animationType) {
      case 0:
        return {
          initial: { scale: 1 },
          animate: { scale: [1, 1.2, 1] },
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        };
      case 1:
        return {
          initial: { scale: 1.2 },
          animate: { scale: [1.2, 1, 1.2] },
          transition: { duration: 10, repeat: Infinity, ease: "easeInOut" }
        };
      case 2:
        return {
          initial: { scale: 1.2, x: '0%' },
          animate: { x: ['0%', '-10%', '0%'] },
          transition: { duration: 9, repeat: Infinity, ease: "easeInOut" }
        };
      case 3:
        return {
          initial: { scale: 1.2, y: '0%' },
          animate: { y: ['0%', '-10%', '0%'] },
          transition: { duration: 11, repeat: Infinity, ease: "easeInOut" }
        };
      default:
        return {
          initial: { scale: 1 },
          animate: { scale: [1, 1.15, 1] },
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        };
    }
  };

  const animationProps = getAnimationProps();

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-zinc-100 hover:shadow-md transition-all cursor-pointer active:scale-[0.98] transform duration-200 group"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-zinc-900 leading-tight mb-1 group-hover:text-amber-600 transition-colors">{product.name}</h3>
          <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">{product.description}</p>
        </div>
        <div className="mt-3 font-bold text-amber-600 text-sm">
          {formatCurrency(product.price)}
        </div>
      </div>
      <div className="w-24 h-24 rounded-xl bg-zinc-100 shrink-0 relative overflow-hidden">
        <motion.img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover origin-center"
          initial={animationProps.initial}
          animate={animationProps.animate}
          transition={animationProps.transition}
        />
        <div className="absolute bottom-0 right-0 bg-amber-500 text-white p-1.5 rounded-tl-xl shadow-sm group-hover:bg-amber-600 transition-colors">
          <Plus size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
