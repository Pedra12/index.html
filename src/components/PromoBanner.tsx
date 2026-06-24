import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import imgComboCasal from '../assets/images/combo_casal_1782257767822.jpg';
import imgAcai from '../assets/images/acai_copo_1782257652238.jpg';
import imgHeineken from '../assets/images/cerveja_heineken_nova.jpg';

const PROMOS = [
  {
    id: 1,
    title: 'Combo Casal em Dobro!',
    subtitle: 'Compre 1 Combo Casal e leve o refrigerante por nossa conta.',
    bgImage: imgComboCasal,
    color: 'from-black/90 via-black/50 to-transparent',
  },
  {
    id: 2,
    title: 'Açaí Turbinado',
    subtitle: 'Todos os complementos liberados por apenas R$ 20.',
    bgImage: imgAcai,
    color: 'from-black/90 via-black/50 to-transparent',
  },
  {
    id: 3,
    title: 'Hora da Cerveja Gelada',
    subtitle: 'Heineken e Brahma com 10% de desconto.',
    bgImage: imgHeineken,
    color: 'from-black/90 via-black/50 to-transparent',
  }
];

export function PromoBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + PROMOS.length) % PROMOS.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 6000); // 6 seconds
    return () => clearInterval(timer);
  }, [currentIndex]); // reset interval on manual change

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = offset.x;
    if (swipe < -50) {
      paginate(1);
    } else if (swipe > 50) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      z: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      z: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  return (
    <div className="relative w-full h-56 md:h-64 rounded-2xl overflow-hidden shadow-lg mt-2 mb-4 bg-zinc-900">
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.5}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 cursor-grab active:cursor-grabbing w-full h-full"
        >
          {/* Background Image with slow zoom animation */}
          <motion.div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${PROMOS[currentIndex].bgImage})` }}
            initial={{ scale: 1.0, backgroundPosition: "50% 50%" }}
            animate={{ scale: 1.2, backgroundPosition: "60% 50%" }}
            transition={{ duration: 6, ease: "linear" }}
          />
          {/* Gradient Overlay */}
          <div className={`absolute inset-0 pointer-events-none bg-gradient-to-r ${PROMOS[currentIndex].color}`} />
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-center text-white pointer-events-none">
            <span className="bg-white/30 backdrop-blur-sm text-white text-[10px] uppercase font-black tracking-wider py-1 px-2 rounded w-fit mb-3">
              Oferta Especial
            </span>
            <h3 className="text-2xl sm:text-3xl font-black mb-2 leading-tight drop-shadow-md">
              {PROMOS[currentIndex].title}
            </h3>
            <p className="text-sm sm:text-base text-white/90 font-medium max-w-[85%] sm:max-w-[70%] drop-shadow-md">
              {PROMOS[currentIndex].subtitle}
            </p>
            <div className="mt-5 flex items-center text-sm font-bold bg-white text-zinc-900 w-fit px-4 py-2 rounded-full shadow-md pointer-events-auto">
              Aproveitar <ChevronRight size={18} className="ml-1" />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {PROMOS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all shadow-sm ${
              idx === currentIndex ? 'bg-white w-5' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
