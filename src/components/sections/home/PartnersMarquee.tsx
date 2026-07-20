import { useTranslation } from 'react-i18next';
import { Icon } from '../../common/Icon';

const courseIds = ['1', '2', '3', '4', '5', '6'];

export function PartnersMarquee() {
  const { t } = useTranslation();
  const ribbonItems = courseIds.map((id) => t(`courseNames.${id}`));
  const items = [...ribbonItems, ...ribbonItems];

  return (
    <div className="marquee-row relative mt-16 -rotate-1 overflow-hidden bg-ribbon-gradient py-4 sm:mt-24">
      <div className="marquee-track">
        {items.map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center gap-3 px-6 text-white">
            <span className="whitespace-nowrap text-sm font-semibold tracking-wide">{item}</span>
            <Icon name="star" size={12} className="text-white/70" />
          </div>
        ))}
      </div>
    </div>
  );
}
