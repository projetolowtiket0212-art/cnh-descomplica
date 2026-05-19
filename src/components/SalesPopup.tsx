import { X } from 'lucide-react';

interface Props {
  image: string;
  title: string;
  text: string;
  ctaLabel: string;
  ctaUrl: string;
  onClose: () => void;
}

const SalesPopup = ({ image, title, text, ctaLabel, ctaUrl, onClose }: Props) => {
  return (
    <div className="sales-popup-overlay" onClick={onClose}>
      <div className="sales-popup" onClick={(e) => e.stopPropagation()}>
        <button className="sales-popup-close" onClick={onClose} aria-label="Fechar">
          <X size={18} />
        </button>
        <img src={image} alt={title} className="sales-popup-img" />
        <div className="sales-popup-body">
          <h3 className="sales-popup-title">{title}</h3>
          <p className="sales-popup-text">{text}</p>
          <a className="sales-popup-cta" href={ctaUrl} target="_blank" rel="noopener noreferrer">
            {ctaLabel}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SalesPopup;
