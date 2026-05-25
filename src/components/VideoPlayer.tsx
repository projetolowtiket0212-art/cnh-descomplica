import { useState } from 'react';

interface Props {
  src?: string;
  poster?: string;
  onEnded?: () => void;
}

const VideoPlayer = ({ src, poster, onEnded }: Props) => {
  const [started, setStarted] = useState(false);
  const [error, setError] = useState(false);

  const showFallback = !src || error;

  return (
    <div className="video-player-wrap">
      {showFallback ? (
        <div className="video-fallback">
          <span>Vídeo indisponível no momento</span>
        </div>
      ) : !started ? (
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
      ) : (
        <video
          className="video-el"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          controlsList="nodownload noremoteplayback"
          disablePictureInPicture
          onEnded={onEnded}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
