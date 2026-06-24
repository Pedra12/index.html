import { Clock, Search, MapPin, ScrollText } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenHistory: () => void;
}

export function Header({ searchQuery, setSearchQuery, onOpenHistory }: HeaderProps) {
  // Check if it's within working hours (18:00 to 04:00)
  const hour = new Date().getHours();
  const isOpen = hour >= 18 || hour < 4; 

  return (
    <header className="relative bg-zinc-900 text-white pb-4 rounded-b-3xl shadow-lg">
      <div 
        className="h-20 bg-cover bg-center opacity-40 rounded-b-3xl"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=80")' }}
      ></div>
      
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-t from-zinc-900 to-transparent"></div>

      <button 
        onClick={onOpenHistory}
        className="absolute top-3 right-3 bg-zinc-800/80 backdrop-blur text-white p-2 rounded-full shadow-sm hover:bg-zinc-700 transition-colors z-20"
        title="Histórico de Pedidos"
      >
        <ScrollText size={18} />
      </button>

      <div className="px-4 -mt-10 relative z-10 flex flex-col items-center">
        <div className="w-16 h-16 bg-zinc-800 rounded-full border-[3px] border-amber-500 shadow-xl overflow-hidden flex items-center justify-center p-1 mb-2">
          <img 
            src="https://api.dicebear.com/7.x/shapes/svg?seed=barril&backgroundColor=f59e0b" 
            alt="Barril Logo" 
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        
        <h1 className="text-2xl font-black tracking-tight mb-0.5 text-center">BARRIL</h1>
        <p className="text-zinc-400 text-xs mb-2 flex items-center gap-1">
          <MapPin size={12} /> Guarapari, ES
        </p>
        
        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isOpen ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {isOpen ? '● ABERTO AGORA' : '● FECHADO'}
          </span>
          <span className="text-zinc-400 text-[10px] flex items-center gap-1 bg-zinc-800 px-2 py-0.5 rounded-full">
            <Clock size={10} /> 18:00 às 04:00
          </span>
        </div>

        <div className="w-full max-w-md relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={18} className="text-zinc-400" />
          </div>
          <input
            type="text"
            placeholder="O que você deseja pedir hoje?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all placeholder:text-zinc-500 shadow-inner"
          />
        </div>
      </div>
    </header>
  );
}
