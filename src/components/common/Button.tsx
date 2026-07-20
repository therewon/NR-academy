import type { AnchorHTMLAttributes, ButtonHTMLAttributes, PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils/cn';
import { Icon } from './Icon';

type Variant = 'primary' | 'outline' | 'ghost-arrow';

interface BaseProps extends PropsWithChildren {
  variant?: Variant;
  className?: string;
  showArrow?: boolean;
}

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    to?: undefined;
  };

type ButtonAsLink = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
    to: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClass: Record<Variant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  'ghost-arrow': 'btn-ghost-arrow',
};

export function Button({ variant = 'primary', className, showArrow, children, to, ...rest }: ButtonProps) {
  const classes = cn(variantClass[variant], className);
  const content = (
    <>
      {children}
      {showArrow && <Icon name="arrow-up-right" size={16} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
