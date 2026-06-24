import { Product } from '../types';
import { formatCurrency } from '../utils/format';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  key?: string | number;
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm border border-zinc-100 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.98] transform duration-200"
    >
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-zinc-900 leading-tight mb-1">{product.name}</h3>
          <p className="text-zinc-500 text-xs line-clamp-2 leading-relaxed">{product.description}</p>
        </div>
        <div className="mt-3 font-bold text-amber-600 text-sm">
          {formatCurrency(product.price)}
        </div>
      </div>
      <div className="w-24 h-24 rounded-xl bg-zinc-100 shrink-0 relative overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 right-0 bg-amber-500 text-white p-1.5 rounded-tl-xl">
          <Plus size={16} strokeWidth={3} />
        </div>
      </div>
    </div>
  );
}
