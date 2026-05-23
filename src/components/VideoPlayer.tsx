import { useEffect, useRef } from 'react';

interface Props {
  videoId: string;
  onEnded?: () => void;
}

const VideoPlayer = ({ videoId, onEnded }: Props) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange' && data.info === 0) {
          onEnded?.();
        }
      } catch {}
    };
    window.addEventListener('message', handleMessage);

    const timer = setInterval(() => {
      const w = iframeRef.current?.contentWindow;
      if (!w) return;
      w.postMessage(JSON.stringify({ event: 'listening' }), '*');
      w.postMessage(
        JSON.stringify({ event: 'command', func: 'addEventListener', args: ['onStateChange'] }),
        '*'
      );
    }, 1000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(timer);
    };
  }, [onEnded]);

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&enablejsapi=1&controls=1&playsinline=1&origin=${encodeURIComponent(origin)}`;

  return (
    <div className="video-player-wrap">
      <iframe
        ref={iframeRef}
        className="video-iframe"
        src={src}
        title="Vídeo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div className="video-mask-top" aria-hidden="true" />
      <div className="video-mask-bottom" aria-hidden="true" />
    </div>
  );
};

export default VideoPlayer;
