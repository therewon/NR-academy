import { useEffect } from 'react';
import { Icon } from './Icon';

interface VideoModalProps {
  videoUrl: string;
  title: string;
  onClose: () => void;
}

export function VideoModal({ videoUrl, title, onClose }: VideoModalProps) {
  const isYouTube = videoUrl.includes('youtube.com/embed');

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/80 p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl overflow-hidden rounded-xl3 bg-black shadow-floating"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-ink-900 transition-colors hover:bg-white"
        >
          <Icon name="plus" size={18} className="rotate-45" />
        </button>

        {isYouTube ? (
          <iframe
            key={videoUrl}
            src={`${videoUrl}?autoplay=1&rel=0`}
            title={title}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video key={videoUrl} src={videoUrl} controls autoPlay className="aspect-video w-full">
            Brauzeriniz video oxutmağı dəstəkləmir.
          </video>
        )}
      </div>
    </div>
  );
}
