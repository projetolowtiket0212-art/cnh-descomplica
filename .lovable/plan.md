

## Add Save-Link, Upsell Sections, and Toast Notifications

The user wants to add marketing/upsell sections and toast notifications to the app without changing existing content, design, or logic.

### What will be added

1. **Save Link Section** - A green gradient card below the module list on the home screen with the app URL, copy button, and share options (WhatsApp, Email)
2. **Upsell Section** - A "Complete sua jornada" section with:
   - Featured banner: "Simulado CNH até Passar 2026" with payment link
   - 3 smaller upsell cards (Medo do Trânsito, Prova Prática, Psicotécnico) with payment links
3. **Toast Notifications** - Rotating promotional toasts that appear every 30-60 seconds after initial 20s delay, linking to payment pages
4. **Module Upsell Strip CSS** - Styles for a contextual upsell strip (CSS only, HTML placement TBD)
5. **Uploaded images** - Copy the 4 uploaded images to use as banner/card images in the upsell section

### Technical approach

- **Copy images** to `public/images/` for use in the upsell cards/banners
- **Add CSS** to `src/index.css` for all new class styles (save-link, upsell, toast, module-upsell-strip)
- **Update `src/pages/Index.tsx`**:
  - Add Save Link section after module list in home screen
  - Add Upsell section after save link
  - Add Toast container (fixed positioned) with a `useEffect` timer to cycle through upsell toasts
  - `copyAccess` function for the copy button
  - Toast show/hide logic with state management

### Files to modify
- `src/index.css` — append all new CSS classes
- `src/pages/Index.tsx` — add save-link section, upsell section, toast system
- Copy 4 uploaded images to `public/images/`

