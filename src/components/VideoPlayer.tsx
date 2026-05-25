import { useEffect, useRef, useState } from 'react';

interface Props {
  videoId?: string;
  poster?: string;
  onEnded?: () => void;
}

const DEFAULT_VIDEO_ID = '4E1z9J3wpfQ';

const VideoPlayer = ({ videoId = DEFAULT_VIDEO_ID, poster, onEnded }: Props) => {
  const [started, setStarted] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!started) return;
    const handleMessage = (event: MessageEvent) => {
      if (typeof event.data !== 'string') return;
      try {
        const data = JSON.parse(event.data);
        if (data.event === 'onStateChange' && data.info === 0) onEnded?.();
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

  const params = [
    'autoplay=1',
    'mute=1',
    'controls=0',
    'modestbranding=1',
    'rel=0',
    'showinfo=0',
    'playsinline=1',
    'fs=0',
    'iv_load_policy=3',
    'disablekb=1',
    'enablejsapi=1',
  ].join('&');
  const src = `https://www.youtube-nocookie.com/embed/${videoId}?${params}`;

  return (
    <div className="video-player-wrap">
      {started ? (
        <iframe
          ref={iframeRef}
          className="video-iframe"
          src={src}
          title="Vídeo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <>
          {poster && (
            <img
              src={poster}
              alt="Capa do vídeo"
              className="video-poster"
              width={1920}
              height={1080}
            />
          )}
          <button
            type="button"
            className="video-play-overlay"
            onClick={() => setStarted(true)}
            aria-label="Reproduzir vídeo"
          >
            <span className="video-play-btn">
              <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true">
                <path d="M8 5.5v13l11-6.5-11-6.5z" fill="#fff" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
