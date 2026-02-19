'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { BahanDeductionHistory } from '@/types/resep-history';

type BahanDeductionDisplayProps = {
  deductionsJson: string;
};

export default function BahanDeductionDisplay({ deductionsJson }: BahanDeductionDisplayProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  let deductions: BahanDeductionHistory[] = [];
  try {
    deductions = JSON.parse(deductionsJson);
  } catch (error) {
    return <span className="text-xs text-gray-500">Invalid data</span>;
  }

  if (!Array.isArray(deductions) || deductions.length === 0) {
    return <span className="text-xs text-gray-500">No ingredients</span>;
  }

  const summary = `${deductions.length} ingredient${deductions.length > 1 ? 's' : ''} used`;

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="flex items-center gap-1 text-sm text-primary hover:underline"
      >
        {summary}
        <ChevronDown size={14} />
      </button>
    );
  }

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(false)}
        className="flex items-center gap-1 text-sm text-primary hover:underline"
      >
        {summary}
        <ChevronUp size={14} />
      </button>
      <div className="space-y-1 text-xs">
        {deductions.map((item, index) => (
          <div key={index} className="flex items-center gap-2 pl-4">
            <span className="text-gray-400">•</span>
            <span className="font-medium">{item.name}:</span>
            <span className="text-gray-600">
              {item.beforeJumlah} {item.satuan}
            </span>
            <span className="text-gray-400">→</span>
            <span className="text-gray-600">
              {item.afterJumlah} {item.satuan}
            </span>
            <span className="text-danger">
              (-{item.usedJumlah} {item.satuan})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
