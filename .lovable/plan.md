

## Fix Image Assignments + Relocate Save-Link Section

### 1. Fix image placement in upsell section

The images are currently assigned to the wrong products. Based on the user's description, each image file contains content that doesn't match its filename. The fix is to swap the `src` attributes:

| Product (position) | Currently shows | Correct image file |
|---|---|---|
| Simulado CNH R$29.90 (banner) | `simulado-banner.png` (wrong) | `psicotecnico.png` (has "Simulado" content) |
| Perco Medo do Trânsito R$15.90 | `medo-transito.png` (wrong) | `simulado-banner.png` (has "Medo Trânsito" content) |
| Perco Medo da Prova Prática R$19.90 | `medo-prova.png` (wrong) | `medo-transito.png` (has "Prova Prática" content) |
| Passe no Psicotécnico R$9.90 | `psicotecnico.png` (wrong) | `medo-prova.png` (has "Psicotécnico" content) |

### 2. Move Save-Link to top of home screen with improved design

- Move the "Salve seu acesso agora" section from below the module list to **right after the hero section** (before the progress bar)
- Redesign it as a more compact, visually appealing banner with:
  - A gradient background (green to dark green) with subtle pattern overlay
  - Centered layout with a prominent copy button and share icons
  - Rounded pill-style URL display
  - More polished typography and spacing

### Files to modify
- `src/pages/Index.tsx` — swap image sources, relocate save-link section, update its markup for better design
- `src/index.css` — update `.save-link-section` styles for the new top-of-page placement and improved visuals

