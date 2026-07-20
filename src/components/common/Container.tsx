import type { ElementType, PropsWithChildren } from 'react';
import { cn } from '../../utils/cn';

interface ContainerProps extends PropsWithChildren {
  className?: string;
  as?: ElementType;
}

export function Container({ children, className, as: Tag = 'div' }: ContainerProps) {
  return <Tag className={cn('container-app', className)}>{children}</Tag>;
}
