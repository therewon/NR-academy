import type { ReactElement, SVGProps } from 'react';

export type IconName =
  | 'arrow-up-right'
  | 'arrow-right'
  | 'arrow-left'
  | 'chevron-down'
  | 'chevron-left'
  | 'chevron-right'
  | 'users'
  | 'star'
  | 'play'
  | 'clock'
  | 'help-circle'
  | 'target'
  | 'phone'
  | 'map-pin'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'check'
  | 'plus'
  | 'language'
  | 'primary'
  | 'improve'
  | 'preschool'
  | 'exam'
  | 'olympiad';

const paths: Record<IconName, ReactElement> = {
  'arrow-up-right': (
    <path d="M7 17 17 7M7 7h10v10" strokeLinecap="round" strokeLinejoin="round" />
  ),
  'arrow-right': <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />,
  'arrow-left': <path d="M19 12H5M11 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />,
  'chevron-down': <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />,
  'chevron-left': <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />,
  'chevron-right': <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />,
  users: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  star: (
    <path
      d="M12 2.5l2.9 6.1 6.6.7-4.9 4.5 1.3 6.6L12 17l-5.9 3.4L7.4 13.8 2.5 9.3l6.6-.7L12 2.5z"
      strokeLinejoin="round"
    />
  ),
  play: <path d="M8 5v14l11-7L8 5z" strokeLinejoin="round" fill="currentColor" stroke="none" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'help-circle': (
    <>
      <circle cx="12" cy="12" r="9" />
      <path
        d="M9.5 9.2a2.5 2.5 0 1 1 3.6 2.3c-.9.5-1.6 1-1.6 2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  phone: (
    <path
      d="M6.6 3h3l1.5 4.5-2.2 1.6a12 12 0 0 0 5.5 5.5l1.6-2.2L20.4 14v3a2 2 0 0 1-2.2 2A18 18 0 0 1 4.6 5.2 2 2 0 0 1 6.6 3z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  'map-pin': (
    <>
      <path d="M12 21s7-6.6 7-11.5A7 7 0 0 0 5 9.5C5 14.4 12 21 12 21z" strokeLinejoin="round" />
      <circle cx="12" cy="9.5" r="2.3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <path
      d="M14 8h2.5V4.5H14A4 4 0 0 0 10 8.5V11H8v3.5h2V21h3.5v-6.5h2.6l.4-3.5h-3V8.8c0-.6.3-.8.8-.8z"
      strokeLinejoin="round"
    />
  ),
  tiktok: (
    <path
      d="M13 3v10.6a2.6 2.6 0 1 1-2-2.5M13 3a5 5 0 0 0 5 5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  check: <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />,
  plus: <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />,
  language: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" strokeLinecap="round" />
    </>
  ),
  primary: (
    <path
      d="M12 4 3 8.5 12 13l9-4.5L12 4zM3 13l9 4.5 9-4.5M3 8.5V16M21 8.5V16"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  improve: <path d="M4 19V13M10 19V9M16 19V5M4 13l6-4 6-4" strokeLinecap="round" strokeLinejoin="round" />,
  preschool: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 21c1-4 3.5-6 7-6s6 2 7 6" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  exam: (
    <>
      <path d="M6 3h9l3 3v15H6z" strokeLinejoin="round" />
      <path d="M9 12h6M9 16h6M9 8h3" strokeLinecap="round" />
    </>
  ),
  olympiad: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="M9 12.5 7.5 21 12 18.5 16.5 21 15 12.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number;
}

export function Icon({ name, size = 20, strokeWidth = 1.8, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      aria-hidden="true"
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
