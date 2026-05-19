import { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiLoadingPromise: Promise<void> | null = null;
const loadYouTubeAPI = (): Promise<void> => {
  if (apiLoadingPromise) return apiLoadingPromise;
  apiLoadingPromise = new Promise((resolve) => {
    if (window.YT && window.YT.Player) {
      resolve();
      return;
    }
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.head.appendChild(tag);
  });
  return apiLoadingPromise;
};

interface Props {
  videoId: string;
  onEnded?: () => void;
}

const VideoPlayer = ({ videoId, onEnded }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let mounted = true;
    let interval: number | undefined;

    loadYouTubeAPI().then(() => {
      if (!mounted || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          showinfo: 0,
          iv_load_policy: 3,
          enablejsapi: 1,
          playsinline: 1,
          fs: 0,
          disablekb: 1,
        },
        events: {
          onReady: () => setReady(true),
          onStateChange: (e: any) => {
            // 1 playing, 2 paused, 0 ended
            if (e.data === 1) setPlaying(true);
            else if (e.data === 2) setPlaying(false);
            else if (e.data === 0) {
              setPlaying(false);
              onEnded?.();
            }
          },
        },
      });
    });

    interval = window.setInterval(() => {
      const p = playerRef.current;
      if (p && p.getDuration && p.getCurrentTime) {
        const d = p.getDuration();
        const c = p.getCurrentTime();
        if (d > 0) setProgress((c / d) * 100);
      }
    }, 250);

    return () => {
      mounted = false;
      if (interval) clearInterval(interval);
      try { playerRef.current?.destroy?.(); } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  const togglePlay = () => {
    const p = playerRef.current;
    if (!p) return;
    if (playing) p.pauseVideo(); else p.playVideo();
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const p = playerRef.current;
    if (!p) return;
    if (muted) { p.unMute(); setMuted(false); } else { p.mute(); setMuted(true); }
  };

  const goFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const el = containerRef.current?.parentElement;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  return (
    <div className="video-player-wrap">
      <div className="video-player-inner">
        <div ref={containerRef} className="video-iframe" />
        {/* Top mask to hide YouTube branding */}
        <div className="video-mask-top" />
        {/* Click overlay for play/pause */}
        <div className="video-overlay" onClick={togglePlay}>
          {(!playing || !ready) && (
            <button className="video-play-btn" aria-label="Play">
              {playing ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
            </button>
          )}
          <div className="video-controls" onClick={(e) => e.stopPropagation()}>
            <button className="video-ctrl-btn" onClick={toggleMute} aria-label="Mute">
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            <button className="video-ctrl-btn" onClick={goFullscreen} aria-label="Fullscreen">
              <Maximize size={18} />
            </button>
          </div>
          <div className="video-progress">
            <div className="video-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
