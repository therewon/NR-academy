import type { PropsWithChildren } from 'react';

export function SectionBadge({ children }: PropsWithChildren) {
  return <span className="section-badge">{children}</span>;
}
