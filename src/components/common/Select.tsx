import { useEffect, useRef, useState } from 'react';
import { Icon } from './Icon';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder: string;
  name?: string;
}

export function Select({ value, onChange, options, placeholder, name }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <div ref={rootRef} className="relative">
      {name && <input type="hidden" name={name} value={value} />}
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className="form-input flex items-center justify-between text-left"
      >
        <span className={cn(selected ? 'text-ink-900' : 'text-ink-300')}>
          {selected ? selected.label : placeholder}
        </span>
        <Icon
          name="chevron-down"
          size={16}
          className={cn('flex-none text-ink-500 transition-transform', isOpen && 'rotate-180')}
        />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-[180px] overflow-y-auto rounded-xl2 border border-surface-line bg-white p-1.5 shadow-floating"
        >
          <li>
            <button
              type="button"
              role="option"
              aria-selected={value === ''}
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className={cn(
                'block w-full rounded-lg px-3.5 py-2.5 text-left text-sm text-ink-300 hover:bg-surface-soft',
                value === '' && 'bg-brand-blue-light text-brand-blue'
              )}
            >
              {placeholder}
            </button>
          </li>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={value === option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'block w-full rounded-lg px-3.5 py-2.5 text-left text-sm font-medium text-ink-900 hover:bg-surface-soft',
                  value === option.value && 'bg-brand-blue-light text-brand-blue'
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
