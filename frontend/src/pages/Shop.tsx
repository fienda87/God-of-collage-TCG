import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCollectionStore } from '../store/collectionStore';
import { ALL_CARDS, type CardData, RARITY_COLORS } from '../data/cards';
import './Shop.css';

interface DuplicateItem {
  card: CardData;
  count: number;
  extra: number;
  pointsValue: number;
}

const RARITY_PRICE: Record<string, number> = {
  'Rare': 50,
  'Super Rare': 150,
  'Ultra Rare': 500,
  'Exclusive Legendary': 1500,
  'Special Mythical': 0, // Not for sale
};

const DUPLICATE_POINTS: Record<string, number> = {
  'Common': 1,
  'Rare': 5,
  'Super Rare': 15,
  'Ultra Rare': 50,
  'Exclusive Legendary': 200,
  'Special Mythical': 500,
};

export const Shop: React.FC = () => {
  const navigate = useNavigate();
  const { cards, ipPoints, addIpPoints, deductIpPoints, extractCard, setCards } = useCollectionStore();

  const [activeTab, setActiveTab] = useState<'cards' | 'items' | 'recycle'>('cards');
  const [selectedRarityFilter, setSelectedRarityFilter] = useState<string>('All');
  
  // Modals state
  const [confirmPurchase, setConfirmPurchase] = useState<{ type: 'card' | 'item'; target: any; price: number } | null>(null);
  const [extractTarget, setExtractTarget] = useState<DuplicateItem | null>(null);

  // Group cards to calculate duplicates
  const duplicateList = useMemo(() => {
    const counts: Record<string, number> = {};
    cards.forEach((c) => {
      counts[c.name] = (counts[c.name] || 0) + 1;
    });

    const list: DuplicateItem[] = [];
    Object.entries(counts).forEach(([name, count]) => {
      if (count > 1) {
        const baseCard = ALL_CARDS.find((c) => c.name === name);
        if (baseCard) {
          const extra = count - 1;
          const pointsValue = DUPLICATE_POINTS[baseCard.rarity] || 1;
          list.push({
            card: baseCard,
            count,
            extra,
            pointsValue,
          });
        }
      }
    });
    return list;
  }, [cards]);

  // Total points player can get from extracting all duplicates at once
  const totalExtractablePoints = useMemo(() => {
    return duplicateList.reduce((acc, item) => acc + (item.extra * item.pointsValue), 0);
  }, [duplicateList]);

  // Shop cards available for purchase (Rare or higher, excluding Event/Item if desired, but let's show all playable character cards)
  const shopCards = useMemo(() => {
    const excludedIds = ['event-pengkaderan', 'item-udangkeju', 'item-salwa', 'event-syukwis'];
    return ALL_CARDS.filter((c) => 
      (c.rarity === 'Rare' || c.rarity === 'Super Rare' || c.rarity === 'Ultra Rare' || c.rarity === 'Exclusive Legendary') &&
      !excludedIds.includes(c.id)
    );
  }, []);

  const filteredShopCards = useMemo(() => {
    if (selectedRarityFilter === 'All') return shopCards;
    return shopCards.filter(c => c.rarity === selectedRarityFilter);
  }, [shopCards, selectedRarityFilter]);

  const handleBuyCard = (card: CardData) => {
    const price = RARITY_PRICE[card.rarity] || 100;
    if (ipPoints < price) return;
    setConfirmPurchase({ type: 'card', target: card, price });
  };

  const handleBuyBoosterPack = (volume: number) => {
    const price = 100;
    if (ipPoints < price) return;
    setConfirmPurchase({
      type: 'item',
      target: { 
        name: `Booster Pack Vol ${volume}`, 
        description: `Buka langsung booster pack Vol ${volume} secara instan tanpa mengonsumsi energi tiket.`,
        volume 
      },
      price
    });
  };

  const executePurchase = () => {
    if (!confirmPurchase) return;
    
    const { type, target, price } = confirmPurchase;
    
    if (ipPoints < price) {
      setConfirmPurchase(null);
      return;
    }

    deductIpPoints(price);

    if (type === 'card') {
      const card = target as CardData;
      const newCardInstance = { 
        ...card, 
        id: `shop-${Date.now()}-${Math.random()}` 
      };
      setCards([...cards, newCardInstance]);
    } else {
      // Booster Pack instant gacha
      const volume = target.volume || 1;
      navigate('/gacha', { state: { volume, isShopPurchase: true } });
    }

    setConfirmPurchase(null);
  };

  const executeExtraction = () => {
    if (!extractTarget) return;
    const { card, extra, pointsValue } = extractTarget;
    
    extractCard(card.name, extra, pointsValue);
    setExtractTarget(null);
  };

  const executeExtractAll = () => {
    if (duplicateList.length === 0) return;
    
    // Create new list of cards retaining only 1 instance of duplicates
    const counts: Record<string, number> = {};
    const newCards: any[] = [];
    
    cards.forEach((c) => {
      if (!counts[c.name]) {
        counts[c.name] = 1;
        newCards.push(c);
      } else {
        // Just bypass duplicates, they are recycled
      }
    });

    setCards(newCards);
    addIpPoints(totalExtractablePoints);
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04
      }
    }
  } as const;

  const itemFade = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  } as const;

  return (
    <div className="shop-page flex flex-col min-h-screen px-4 md:px-12 pt-8 pb-20 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-[45px] md:text-[55px] text-white leading-none font-[800] m-0">KAMPUS SHOP.</h1>
          <p className="text-[16px] md:text-[18px] font-[800] text-white/50 m-0 mt-2">Tukarkan IP Points atau ekstrak kartu duplikatmu.</p>
        </div>
        
        {/* Currency Display */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2.5 rounded-full backdrop-blur-md shadow-lg">
          <span className="text-[20px]">🎓</span>
          <div className="flex flex-col text-right">
            <span className="text-[11px] font-[800] text-white/40 leading-none">IP POINTS</span>
            <span className="text-[18px] font-[900] text-[#d7b73b] leading-tight mt-0.5">{ipPoints} IP</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8 relative bg-[#121214]/80 backdrop-blur-md px-2 rounded-xl">
        <button
          onClick={() => setActiveTab('cards')}
          className={`shop-tab-btn px-6 py-4 font-[800] text-[15px] transition-all relative ${activeTab === 'cards' ? 'text-white' : 'text-white/60 hover:text-white/90'}`}
        >
          Tukarkan Kartu
          {activeTab === 'cards' && <motion.div layoutId="active-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#d7b73b]" />}
        </button>
        <button
          onClick={() => setActiveTab('items')}
          className={`shop-tab-btn px-6 py-4 font-[800] text-[15px] transition-all relative ${activeTab === 'items' ? 'text-white' : 'text-white/60 hover:text-white/90'}`}
        >
          Beli Item
          {activeTab === 'items' && <motion.div layoutId="active-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#d7b73b]" />}
        </button>
        <button
          onClick={() => setActiveTab('recycle')}
          className={`shop-tab-btn px-6 py-4 font-[800] text-[15px] transition-all relative ${activeTab === 'recycle' ? 'text-white' : 'text-white/60 hover:text-white/90'}`}
        >
          Daur Ulang ({duplicateList.length})
          {activeTab === 'recycle' && <motion.div layoutId="active-tab-indicator" className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#d7b73b]" />}
        </button>
      </div>

      {/* Content tabs */}
      <AnimatePresence mode="wait">
        {activeTab === 'cards' && (
          <motion.div
            key="tab-cards"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            {/* Rarity filter pills */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {['All', 'Rare', 'Super Rare', 'Ultra Rare', 'Exclusive Legendary'].map((rarity) => (
                <button
                  key={rarity}
                  onClick={() => setSelectedRarityFilter(rarity)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-[800] border transition-all shop-btn whitespace-nowrap ${
                    selectedRarityFilter === rarity
                      ? 'bg-white text-black border-white'
                      : 'bg-[#121214] text-white/80 border-white/15 hover:border-white/30 hover:bg-[#1e1e22]'
                  }`}
                >
                  {rarity}
                </button>
              ))}
            </div>

            {/* Grid */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
            >
              {filteredShopCards.map((card) => {
                const price = RARITY_PRICE[card.rarity] || 100;
                const canAfford = ipPoints >= price;
                
                return (
                  <motion.div
                    key={card.id}
                    variants={itemFade}
                    className="shop-card-wrapper bg-white/5 border border-white/10 rounded-[18px] p-4 flex flex-col items-center justify-between text-center relative group overflow-hidden"
                  >
                    <div className="w-full aspect-[3/4] rounded-[12px] overflow-hidden mb-4 relative" style={{ boxShadow: `0 0 15px ${RARITY_COLORS[card.rarity]}30` }}>
                      <img src={card.image_url} alt={card.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    </div>

                    <div className="w-full mb-4">
                      <h3 className="text-[16px] font-[900] text-white leading-tight truncate">{card.name}</h3>
                      <p className="text-[12px] text-white/50 mt-1 truncate">{card.skill_name || 'Tanpa Skill'}</p>
                    </div>

                    <button
                      onClick={() => handleBuyCard(card)}
                      disabled={!canAfford}
                      className={`w-full py-2.5 rounded-xl font-[800] text-[13px] border transition-all shop-btn flex items-center justify-center gap-1.5 ${
                        canAfford
                          ? 'bg-[#d7b73b] border-[#d7b73b] text-black hover:bg-[#c4a532]'
                          : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                      }`}
                    >
                      🛒 {price} IP
                    </button>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'items' && (
          <motion.div
            key="tab-items"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {/* Booster Pack Vol 1 */}
            <motion.div
              variants={itemFade}
              className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between items-center text-center relative group"
            >
              {/* Item Icon Graphic */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1b5bff] to-[#7333f1] flex items-center justify-center text-[44px] shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                <span>📦</span>
                <div className="absolute inset-[-10px] border border-dashed border-[#1b5bff]/40 rounded-full animate-spin-slow pointer-events-none" />
              </div>

              <div>
                <h3 className="text-[20px] font-[900] text-white leading-tight">Booster Pack Vol 1</h3>
                <p className="text-[13px] text-white/60 mt-2 max-w-[220px] leading-relaxed">
                  Beli dan buka Booster Pack Volume 1 secara langsung tanpa mengonsumsi tiket energi harian.
                </p>
              </div>

              <button
                onClick={() => handleBuyBoosterPack(1)}
                disabled={ipPoints < 100}
                className={`w-full py-3 rounded-xl font-[900] text-[14px] border mt-8 transition-all shop-btn ${
                  ipPoints >= 100
                    ? 'bg-[#d7b73b] border-[#d7b73b] text-black hover:bg-[#c4a532]'
                    : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                🛒 100 IP
              </button>
            </motion.div>

            {/* Booster Pack Vol 2 */}
            <motion.div
              variants={itemFade}
              className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between items-center text-center relative group"
            >
              {/* Item Icon Graphic */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#fe2f2f] to-[#7333f1] flex items-center justify-center text-[44px] shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                <span>📦</span>
                <div className="absolute inset-[-10px] border border-dashed border-[#fe2f2f]/40 rounded-full animate-spin-reverse pointer-events-none" />
              </div>

              <div>
                <h3 className="text-[20px] font-[900] text-white leading-tight">Booster Pack Vol 2</h3>
                <p className="text-[13px] text-white/60 mt-2 max-w-[220px] leading-relaxed">
                  Beli dan buka Booster Pack Volume 2 secara langsung tanpa mengonsumsi tiket energi harian.
                </p>
              </div>

              <button
                onClick={() => handleBuyBoosterPack(2)}
                disabled={ipPoints < 100}
                className={`w-full py-3 rounded-xl font-[900] text-[14px] border mt-8 transition-all shop-btn ${
                  ipPoints >= 100
                    ? 'bg-[#d7b73b] border-[#d7b73b] text-black hover:bg-[#c4a532]'
                    : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                🛒 100 IP
              </button>
            </motion.div>

            {/* Booster Pack Vol 3 */}
            <motion.div
              variants={itemFade}
              className="bg-white/5 border border-white/10 rounded-[24px] p-6 flex flex-col justify-between items-center text-center relative group"
            >
              {/* Item Icon Graphic */}
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#d7b73b] to-[#7333f1] flex items-center justify-center text-[44px] shadow-lg mb-6 group-hover:scale-105 transition-transform duration-300 relative">
                <span>📦</span>
                <div className="absolute inset-[-10px] border border-dashed border-[#d7b73b]/40 rounded-full animate-spin-slow pointer-events-none" />
              </div>

              <div>
                <h3 className="text-[20px] font-[900] text-white leading-tight">Booster Pack Vol 3</h3>
                <p className="text-[13px] text-white/60 mt-2 max-w-[220px] leading-relaxed">
                  Beli dan buka Booster Pack Volume 3 secara langsung tanpa mengonsumsi tiket energi harian.
                </p>
              </div>

              <button
                onClick={() => handleBuyBoosterPack(3)}
                disabled={ipPoints < 100}
                className={`w-full py-3 rounded-xl font-[900] text-[14px] border mt-8 transition-all shop-btn ${
                  ipPoints >= 100
                    ? 'bg-[#d7b73b] border-[#d7b73b] text-black hover:bg-[#c4a532]'
                    : 'bg-white/5 border-white/10 text-white/30 cursor-not-allowed'
                }`}
              >
                🛒 100 IP
              </button>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'recycle' && (
          <motion.div
            key="tab-recycle"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-6"
          >
            {/* Summary Banner */}
            <div className="bg-gradient-to-r from-[#7333f1]/20 to-[#fe2f2f]/20 border border-white/10 rounded-[20px] p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 backdrop-blur-md">
              <div>
                <h3 className="text-[18px] md:text-[20px] font-[900] text-white leading-tight">Daur Ulang Massal</h3>
                <p className="text-[13px] md:text-[14px] text-white/60 mt-1">Hancurkan semua kartu duplikat berlebih dan simpan menyisakan masing-masing 1 kartu di koleksi.</p>
              </div>
              <button
                onClick={executeExtractAll}
                disabled={duplicateList.length === 0}
                className={`px-6 py-3 rounded-xl font-[900] text-[14px] transition-all shop-btn whitespace-nowrap ${
                  duplicateList.length > 0
                    ? 'bg-[#fe2f2f] text-white hover:bg-[#e02626] shadow-lg shadow-[#fe2f2f]/20'
                    : 'bg-white/5 border-white/10 text-white/20 cursor-not-allowed'
                }`}
              >
                ♻️ Ekstrak Semua (+{totalExtractablePoints} IP)
              </button>
            </div>

            {/* List duplicate grid */}
            {duplicateList.length === 0 ? (
              <div className="text-center py-12 bg-white/5 border border-dashed border-white/10 rounded-[20px] flex flex-col items-center justify-center text-white/40">
                <span className="text-[48px] mb-2">📭</span>
                <p className="font-[800] text-[15px]">Tidak ada kartu duplikat yang tersedia.</p>
                <p className="text-[12px] mt-1 max-w-[250px] leading-relaxed">Kumpulkan kartu baru lewat gacha untuk mendapatkan duplikat!</p>
              </div>
            ) : (
              <motion.div 
                variants={staggerContainer}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
              >
                {duplicateList.map((item) => (
                  <motion.div
                    key={item.card.id}
                    variants={itemFade}
                    className="recycle-card-item"
                  >
                    <div className="flex gap-3 items-center min-w-0">
                      <div className="recycle-card-thumb">
                        <img src={item.card.image_url} alt={item.card.name} />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[14px] font-[900] text-white leading-tight truncate">{item.card.name}</h4>
                        <span className="inline-block px-1.5 py-0.5 rounded text-[9px] font-[900] text-black mt-1" style={{ backgroundColor: RARITY_COLORS[item.card.rarity] }}>
                          {item.card.rarity}
                        </span>
                        <p className="text-[11px] text-white/50 mt-1 font-semibold">Dupe: {item.extra} ({item.count} total)</p>
                      </div>
                    </div>

                    <button
                      onClick={() => setExtractTarget(item)}
                      className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-[800] text-[12px] transition-all shop-btn whitespace-nowrap"
                    >
                      ♻️ +{item.extra * item.pointsValue} IP
                    </button>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal Purchase */}
      <AnimatePresence>
        {confirmPurchase && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
              onClick={() => setConfirmPurchase(null)}
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-[400px] bg-[#0c0c0e] border border-white/10 rounded-[28px] p-6 shadow-2xl z-10 text-center flex flex-col items-center"
            >
              <span className="text-[44px] mb-4">🛒</span>
              <h3 className="text-[22px] font-[900] text-white leading-tight">Konfirmasi Pembelian</h3>
              <p className="text-[14px] text-white/60 mt-2 leading-relaxed">
                Apakah Anda yakin ingin membeli <strong className="text-white">{confirmPurchase.target.name}</strong> seharga <span className="text-[#d7b73b] font-[900]">{confirmPurchase.price} IP Points</span>?
              </p>

              <div className="flex gap-4 w-full mt-8">
                <button
                  onClick={() => setConfirmPurchase(null)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-[800] text-[14px] transition-all shop-btn"
                >
                  Batal
                </button>
                <button
                  onClick={executePurchase}
                  className="flex-1 py-3 bg-[#d7b73b] hover:bg-[#c4a532] text-black rounded-xl font-[900] text-[14px] transition-all shop-btn"
                >
                  Beli Sekarang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal Single Extract */}
      <AnimatePresence>
        {extractTarget && (
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-[6px]"
              onClick={() => setExtractTarget(null)}
            />

            {/* Content box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-[400px] bg-[#0c0c0e] border border-white/10 rounded-[28px] p-6 shadow-2xl z-10 text-center flex flex-col items-center"
            >
              <span className="text-[44px] mb-4">♻️</span>
              <h3 className="text-[22px] font-[900] text-white leading-tight">Konfirmasi Ekstraksi</h3>
              <p className="text-[14px] text-white/60 mt-2 leading-relaxed">
                Apakah Anda yakin ingin mendaur ulang <strong className="text-white">{extractTarget.extra} kartu</strong> dari <strong className="text-white">{extractTarget.card.name}</strong>?<br/>
                Kamu akan mendapatkan <span className="text-[#d7b73b] font-[900]">+{extractTarget.extra * extractTarget.pointsValue} IP Points</span>.
              </p>

              <div className="flex gap-4 w-full mt-8">
                <button
                  onClick={() => setExtractTarget(null)}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl font-[800] text-[14px] transition-all shop-btn"
                >
                  Batal
                </button>
                <button
                  onClick={executeExtraction}
                  className="flex-1 py-3 bg-[#fe2f2f] hover:bg-[#e02626] text-white rounded-xl font-[900] text-[14px] transition-all shop-btn"
                >
                  Daur Ulang
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
