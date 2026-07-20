import { useState } from 'react';
import { Icon } from './Icon';
import { cn } from '../../utils/cn';
import type { FaqItem } from '../../types/faq.types';

interface AccordionProps {
  items: FaqItem[];
  defaultOpenId?: string;
}

export function Accordion({ items, defaultOpenId }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="flex flex-col gap-3">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            key={item.id}
            className={cn(
              'rounded-2xl border border-transparent bg-surface-soft px-5 py-4 transition-colors',
              isOpen && 'border-surface-line bg-white shadow-card'
            )}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="text-sm font-semibold text-ink-900 sm:text-base">
                {item.question}
              </span>
              <span
                className={cn(
                  'flex h-8 w-8 flex-none items-center justify-center rounded-full bg-white text-brand-blue shadow-card transition-transform duration-200',
                  isOpen && 'rotate-45'
                )}
              >
                <Icon name="plus" size={14} />
              </span>
            </button>
            <div className="accordion-panel" data-open={isOpen}>
              <div>
                <p className="pt-3 text-sm leading-relaxed text-ink-500">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
