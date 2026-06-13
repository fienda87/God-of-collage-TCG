import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, GripHorizontal, Trash2, X } from 'lucide-react';
import { type CardData, ELEMENT_COLORS } from '../../data/cards';

interface BinderSlotProps {
  id: string; // The dnd-kit unique id, e.g., 'slot-0'
  slotPosition: number;
  card: CardData | null;
  onAddClick: (slotPosition: number) => void;
  onRemoveClick: (slotPosition: number) => void;
  isOverlay?: boolean;
}

export const BinderSlot: React.FC<BinderSlotProps> = ({
  id,
  slotPosition,
  card,
  onAddClick,
  onRemoveClick,
  isOverlay = false,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 50 : 1,
  };

  if (!card) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="aspect-[2.5/3.5] bg-black/40 border-2 border-dashed border-gray-600 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black/60 hover:border-gray-400 transition-colors"
        onClick={() => onAddClick(slotPosition)}
      >
        <Plus size={32} className="text-gray-500" />
      </div>
    );
  }

  const elementColor = ELEMENT_COLORS[card.element as keyof typeof ELEMENT_COLORS] || '#ffffff';

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative aspect-[2.5/3.5] bg-zinc-950 rounded-xl shadow-lg border-2 border-black overflow-hidden group cursor-grab active:cursor-grabbing select-none ${
        isOverlay ? 'scale-105 shadow-2xl z-50' : ''
      }`}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${card.image_url || card.imageUrl}')` }}
      />
      
      {/* Element Accent */}
      <div 
        className="absolute top-0 left-0 w-full h-1"
        style={{ backgroundColor: elementColor }}
      />

      {/* Top-Right Remove Button for Mobile (Instant Tap) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemoveClick(slotPosition);
        }}
        className="absolute top-2 right-2 z-30 p-1 bg-red-500 text-white rounded-full shadow-lg border border-black hover:bg-red-600 transition-colors md:hidden flex items-center justify-center"
        title="Remove card"
      >
        <X size={14} />
      </button>

      {/* Hover overlay actions (Desktop only / hidden on mobile) */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex flex-col items-center justify-center p-4">
        <h4 className="text-white font-[800] uppercase text-sm text-center mb-4 leading-tight">
          {card.name}
        </h4>
        
        <div className="flex space-x-3">
          <div
            className="p-3 bg-white text-black rounded-full hover:bg-gray-200 cursor-grab active:cursor-grabbing"
            title="Drag to reorder"
          >
            <GripHorizontal size={20} />
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemoveClick(slotPosition);
            }}
            className="p-3 bg-red-500 text-white rounded-full hover:bg-red-600"
            title="Remove card"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
