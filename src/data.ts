import { Product, Addon, AcaiSize, AcaiComplement } from './types';
import imgAcai from './assets/images/acai_copo_1782257652238.jpg';
import imgPudim from './assets/images/pudim_leite_1782257663255.jpg';
import imgComboCasal from './assets/images/combo_casal_1782257767822.jpg';
import imgGorgonzola from './assets/images/gorgonzola_premium_1782257780407.jpg';
import imgXTudo from './assets/images/x_tudo_1782258121501.jpg';
import imgCachorroQuente from './assets/images/cachorro_quente_1782258132275.jpg';
import imgFantaUva from './assets/images/fanta_uva_real.jpeg';
import imgFantaLaranja from './assets/images/fanta_laranja_real.webp';
import imgGuaravita from './assets/images/guaravita_real.jpeg';
import imgAmstel from './assets/images/amstel_real.jpg';
import imgHeineken from './assets/images/cerveja_heineken_nova.jpg';
import imgBrahma from './assets/images/cerveja_brahma.jpeg';
import imgHamburguerSimples from './assets/images/hamburguer_simples_1782258204237.jpg';
import imgCoroaCola from './assets/images/coroa_cola_1782258216125.jpg';

export const CATEGORIES = [
  { id: 'tradicionais', name: 'Hambúrgueres Tradicionais' },
  { id: 'cachorro_quente', name: 'Cachorros Quentes' },
  { id: 'gourmet', name: 'Hambúrgueres Gourmet' },
  { id: 'combos', name: 'Combos' },
  { id: 'bebidas', name: 'Bebidas' },
  { id: 'acai', name: 'Açaí' },
  { id: 'sobremesas', name: 'Sobremesas' }
];

export const PRODUCTS: Product[] = [
  { id: 'p0', categoryId: 'tradicionais', name: 'Hambúrguer', description: 'Pão de hambúrguer, carne bovina tradicional 56g, alface, tomate e batata palha.', price: 15.90, image: imgHamburguerSimples },
  { id: 'p1', categoryId: 'tradicionais', name: 'X-Burger', description: 'Pão de hambúrguer, carne bovina tradicional 56g, queijo prato derretido, alface, tomate e batata palha.', price: 18.90, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=80' },
  { id: 'p2', categoryId: 'tradicionais', name: 'X-Salada', description: 'Pão de hambúrguer, carne bovina tradicional 56g, queijo prato, alface americana, tomate fresco e batata palha.', price: 21.90, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=500&q=80' },
  { id: 'p3', categoryId: 'tradicionais', name: 'X-Bacon', description: 'Pão de hambúrguer, carne bovina tradicional 56g, queijo prato, muito bacon crocante, alface, tomate e batata palha.', price: 25.90, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_xegg', categoryId: 'tradicionais', name: 'X-Egg', description: 'Pão de hambúrguer, carne bovina tradicional 56g, ovo frito, queijo prato, alface, tomate e batata palha.', price: 22.90, image: imgHamburguerSimples },
  { id: 'p_xeggbacon', categoryId: 'tradicionais', name: 'X-Egg Bacon', description: 'Pão de hambúrguer, carne bovina tradicional 56g, ovo frito, bacon crocante, queijo prato, alface, tomate e batata palha.', price: 27.90, image: 'https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_xtudo', categoryId: 'tradicionais', name: 'X-Tudo', description: 'Pão de hambúrguer, carne bovina tradicional 56g, queijo prato, bacon, ovo, calabresa, presunto, alface, tomate e batata palha.', price: 32.90, image: imgXTudo },
  
  { id: 'cq1', categoryId: 'cachorro_quente', name: 'Cachorro Quente Tradicional', description: 'Pão macio, salsicha, molho de tomate, milho, batata palha e queijo ralado.', price: 12.00, image: imgCachorroQuente },
  { id: 'cq2', categoryId: 'cachorro_quente', name: 'Cachorro Quente Duplo', description: 'Pão macio, 2 salsichas, muito molho, milho, batata palha e queijo ralado.', price: 16.00, image: imgCachorroQuente },
  
  { id: 'p4', categoryId: 'gourmet', name: 'Barril Duplo', description: 'Pão australiano, 2 blends de 150g, duplo cheddar, bacon e cebola caramelizada.', price: 38.90, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?auto=format&fit=crop&w=500&q=80' },
  { id: 'p5', categoryId: 'gourmet', name: 'Gorgonzola Premium', description: 'Pão brioche, blend 150g, generoso creme de gorgonzola e rúcula.', price: 34.90, image: imgGorgonzola },
  
  { id: 'p6', categoryId: 'combos', name: 'Combo Casal', description: '2 X-Bacon + Fritas Grande com Cheddar e Bacon + Guaraná 1L', price: 79.90, image: imgComboCasal },
  
  { id: 'p7', categoryId: 'bebidas', name: 'Coca-Cola Lata', description: '350ml - Geladinha', price: 6.50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80' },
  { id: 'p_juninho', categoryId: 'bebidas', name: 'Coroa Cola (Juninho)', description: 'Mini refrigerante 250ml.', price: 4.50, image: imgCoroaCola },
  { id: 'p_fanta_uva', categoryId: 'bebidas', name: 'Fanta Uva Lata', description: '350ml - Geladinha', price: 6.00, image: imgFantaUva },
  { id: 'p_fanta_lar', categoryId: 'bebidas', name: 'Fanta Laranja Lata', description: '350ml - Geladinha', price: 6.00, image: imgFantaLaranja },
  { id: 'p_guaravita', categoryId: 'bebidas', name: 'Guaravita', description: 'Copo 290ml', price: 3.50, image: imgGuaravita },
  { id: 'p_brahma', categoryId: 'bebidas', name: 'Brahma Latão', description: '473ml - Estupidamente gelada', price: 8.00, image: imgBrahma },
  { id: 'p_amstel', categoryId: 'bebidas', name: 'Amstel Latão', description: '473ml - Puro malte gelada', price: 8.50, image: imgAmstel },
  { id: 'p_heineken', categoryId: 'bebidas', name: 'Heineken Latão', description: '473ml - Premium gelada', price: 10.00, image: imgHeineken },
  { id: 'p8', categoryId: 'bebidas', name: 'Suco de Laranja', description: 'Natural 500ml', price: 10.00, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&w=500&q=80' },
  
  { id: 'acai-custom', categoryId: 'acai', name: 'Açaí Personalizado', description: 'Monte do seu jeito! Escolha o tamanho e até 4 complementos favoritos.', price: 15.00, image: imgAcai },
  { id: 'p9', categoryId: 'sobremesas', name: 'Pudim de Leite', description: 'Pudim caseiro com calda de caramelo.', price: 14.00, image: imgPudim },
];

export const ADDONS: Addon[] = [
  { id: 'a1', name: 'Bacon', price: 4.50 },
  { id: 'a2', name: 'Cheddar', price: 4.00 },
  { id: 'a3', name: 'Catupiry', price: 4.00 },
  { id: 'a4', name: 'Ovo', price: 2.50 },
  { id: 'a5', name: 'Calabresa', price: 3.50 },
  { id: 'a6', name: 'Batata Palha', price: 2.00 },
];

export const ACAI_SIZES: AcaiSize[] = [
  { id: 's1', name: '300ml', price: 15.00 },
  { id: 's2', name: '500ml', price: 20.00 },
  { id: 's3', name: '700ml', price: 26.00 },
  { id: 's4', name: '1 Litro', price: 32.00 },
];

export const ACAI_COMPLEMENTS: AcaiComplement[] = [
  { id: 'c1', name: 'Leite Condensado' },
  { id: 'c2', name: 'Leite em Pó' },
  { id: 'c3', name: 'Nutella' },
  { id: 'c4', name: 'Paçoca' },
  { id: 'c5', name: 'Granola' },
  { id: 'c6', name: 'Banana' },
  { id: 'c7', name: 'Morango' },
  { id: 'c8', name: 'Kiwi' },
  { id: 'c9', name: 'Ovomaltine' },
  { id: 'c10', name: 'Sucrilhos' },
];
