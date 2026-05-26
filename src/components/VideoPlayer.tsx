import { useEffect, useRef, useState } from 'react';

interface Props {
  videoId?: string;
  onEnded?: () => void;
}

const DEFAULT_VIDEO_ID = '4E1z9J3wpfQ';

const VideoPlayer = ({ videoId = DEFAULT_VIDEO_ID, onEnded }: Props) => {
  const [started, setStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!started || !onEnded) return;
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange' && data.info === 0) onEnded();
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
  }, [started, onEnded]);

  const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&controls=1&playsinline=1&enablejsapi=1`;

  return (
    <div
      onClick={() => !started && setStarted(true)}
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '16 / 10',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: started ? 'default' : 'pointer',
        background: '#000',
      }}
    >
      {started ? (
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          title="Vídeo"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '100%',
            height: 'calc(100% + 120px)',
            border: 'none',
          }}
        />
      ) : (
        <>
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                background: '#16a34a',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 32px rgba(22,163,74,0.7)',
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
