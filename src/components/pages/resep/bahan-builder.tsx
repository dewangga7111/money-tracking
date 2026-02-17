'use client';

import { useState, useEffect } from 'react';
import { DragDropProvider, useDraggable, useDroppable } from '@dnd-kit/react';
import { Card, CardBody, Chip } from '@heroui/react';
import type { BahanData } from '@/types/bahan';
import type { SelectedBahanItem } from '@/types/resep';
import { X } from 'lucide-react';

type BahanBuilderProps = {
  availableBahan: BahanData[];
  initialValue?: string;
  onChange: (value: string) => void;
  name: string;
};

type DraggableBahanProps = {
  bahan: BahanData;
  isSelected: boolean;
  onClick: () => void;
};

function DraggableBahan({ bahan, isSelected, onClick }: DraggableBahanProps) {
  const { ref } = useDraggable({ id: bahan.bahanId, disabled: isSelected });

  return (
    <div ref={ref}>
      <Chip
        color={isSelected ? 'default' : 'primary'}
        variant="flat"
        className={
          isSelected
            ? 'opacity-50 cursor-not-allowed'
            : 'cursor-grab active:cursor-grabbing hover:opacity-80'
        }
        onClick={() => !isSelected && onClick()}
      >
        {bahan.name} ({bahan.jumlah} {bahan.satuan})
      </Chip>
    </div>
  );
}

function SelectedBahanChip({
  item,
  onRemove,
  onQuantityChange
}: {
  item: SelectedBahanItem;
  onRemove: () => void;
  onQuantityChange: (value: number) => void;
}) {
  const [localValue, setLocalValue] = useState(item.usedJumlah.toString());
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalValue(value);

    const numValue = parseFloat(value);
    if (isNaN(numValue) || numValue <= 0) {
      setError(true);
      return;
    }

    if (numValue > item.jumlah) {
      setError(true);
      return;
    }

    setError(false);
    onQuantityChange(numValue);
  };

  return (
    <div className="flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1.5">
      <span className="text-sm">{item.name}:</span>
      <div className="relative inline-flex items-center">
        <input
          type="number"
          value={localValue}
          onChange={handleChange}
          step="0.01"
          min="0.01"
          max={item.jumlah}
          className={`w-20 pr-8 pl-2 py-0.5 text-sm bg-white/20 rounded border ${
            error ? 'border-danger' : 'border-white/40'
          } focus:outline-none focus:border-white/60`}
        />
        <span className="absolute right-2 text-xs pointer-events-none opacity-70">
          {item.satuan}
        </span>
      </div>
      <button
        type="button"
        onClick={onRemove}
        className="ml-1 hover:opacity-70 transition-opacity"
        aria-label="Remove ingredient"
      >
        <X size={17}/>
      </button>
    </div>
  );
}

export default function BahanBuilder({
  availableBahan,
  initialValue,
  onChange,
  name,
}: BahanBuilderProps) {
  const [selectedBahan, setSelectedBahan] = useState<SelectedBahanItem[]>([]);
  const { ref: droppableRef } = useDroppable({ id: 'selected-ingredients' });

  // Deserialize initialValue on mount
  useEffect(() => {
    if (initialValue) {
      try {
        const parsed = JSON.parse(initialValue);
        if (Array.isArray(parsed)) {
          const normalizedData = parsed.map((bahan) => {
            const exist = availableBahan.find((p: any) => p.bahanId === bahan.bahanId);
            return {
              ...exist,
              usedJumlah: bahan.usedJumlah,
            };
          });
          setSelectedBahan(normalizedData);
        }
      } catch (e) {
        console.error('Failed to parse initial bahan value:', e);
      }
    }
  }, [initialValue]);

  // Serialize and emit changes
  useEffect(() => {
    const serialized = JSON.stringify(selectedBahan.map((item) => ({
      bahanId: item.bahanId,
      usedJumlah: item.usedJumlah,
    })));
    onChange(serialized);
  }, [selectedBahan, onChange]);

  const handleAddBahan = (bahan: BahanData) => {
    // Check if already selected
    if (selectedBahan.some((item) => item.bahanId === bahan.bahanId)) {
      return;
    }

    const newItem: SelectedBahanItem = {
      bahanId: bahan.bahanId,
      name: bahan.name,
      jumlah: bahan.jumlah,
      usedJumlah: bahan.jumlah, // Default to full quantity
      satuan: bahan.satuan,
    };

    setSelectedBahan([...selectedBahan, newItem]);
  };

  const handleRemoveBahan = (bahanId: string) => {
    setSelectedBahan(selectedBahan.filter((item) => item.bahanId !== bahanId));
  };

  const handleUpdateQuantity = (bahanId: string, usedJumlah: number) => {
    setSelectedBahan(
      selectedBahan.map((item) =>
        item.bahanId === bahanId ? { ...item, usedJumlah } : item
      )
    );
  };

  const handleDragEnd = (event: any) => {
    console.log('DragEnd event:', event);

    if (event.canceled) return;

    // The source is the dragged item
    const draggedBahanId = event.operation?.source?.id;

    if (draggedBahanId) {
      const bahan = availableBahan.find((b) => b.bahanId === draggedBahanId);
      if (bahan) {
        // Just add it when drag ends - the droppable area detection isn't working as expected
        handleAddBahan(bahan);
      }
    }
  };

  return (
    <DragDropProvider onDragEnd={handleDragEnd}>
      <div className="space-y-4 flex gap-4 border border-gray-200 p-4 rounded-xl">
        {/* Hidden input for form submission */}
        <input type="hidden" name={name} value={JSON.stringify(selectedBahan)} />

        {/* Available Bahan */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Available Bahan (click or drag to add)
          </label>
          <Card className="border border-gray-200">
            <CardBody className="max-h-96 overflow-y-auto">
              <div className="flex flex-wrap gap-2">
                {availableBahan.length === 0 ? (
                  <p className="text-sm text-gray-500">No bahan available</p>
                ) : (
                  availableBahan.map((bahan) => {
                    const isSelected = selectedBahan.some(
                      (item) => item.bahanId === bahan.bahanId
                    );
                    return (
                      <DraggableBahan
                        key={bahan.bahanId}
                        bahan={bahan}
                        isSelected={isSelected}
                        onClick={() => handleAddBahan(bahan)}
                      />
                    );
                  })
                )}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Selected Ingredients */}
        <div className="flex-3">
          <label className="block text-sm font-medium mb-2">
            Selected Ingredients
          </label>
          <Card className="border border-gray-200">
            <CardBody ref={droppableRef} className="min-h-[120px]">
              {selectedBahan.length === 0 ? (
                <div className="flex items-center justify-center h-full min-h-[100px]">
                  <p className="text-sm text-gray-500">
                    Click or drag bahan above to add to your recipe
                  </p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedBahan.map((item) => (
                    <SelectedBahanChip
                      key={item.bahanId}
                      item={item}
                      onRemove={() => handleRemoveBahan(item.bahanId)}
                      onQuantityChange={(value) => handleUpdateQuantity(item.bahanId, value)}
                    />
                  ))}
                </div>
              )}
            </CardBody>
          </Card>
        </div>
      </div>
    </DragDropProvider>
  );
}
