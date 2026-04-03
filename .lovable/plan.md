
## CNH Sem Autoescola — Guia Completo (React App)

### Overview
Faithful recreation of the mobile-first Brazilian driver's license guide as a React app with progress tracking, module/step navigation, and localStorage persistence.

### Screens & Features

**1. Home Screen**
- Green gradient hero with welcome message and progress summary
- Overall progress bar with percentage and fire emoji
- List of 5 module cards with icons, descriptions, time estimates, progress bars, and lock/done states

**2. Module Screen**
- Back navigation with module title and step counter
- Step progress dots (done/active/pending)
- Rich step content: info boxes (green/yellow/red/blue), numbered how-to lists, link boxes with copy buttons, checklists, mock screens, price tables, warning banners
- Bottom navigation with Previous/Next/Finish buttons

**3. Congrats Screen**
- Celebration animation when all modules are completed
- Option to go back and review modules

### Content Modules (all from the HTML)
1. **Conta Gov.br** — Creating account, leveling to Prata (3 steps)
2. **App CNH do Brasil** — Download, RENACH, free course (3 steps)
3. **Biometria, Exame Médico e Psicotécnico** — Scheduling and preparation (3 steps)
4. **Prova Teórica** — Study guide and exam tips (3 steps)
5. **Aulas Práticas** — Finding affordable instructors (steps from provided content)

### Progress System
- Track completed steps per module in localStorage
- Modules unlock sequentially (must complete previous to unlock next)
- Overall progress percentage calculated from total completed steps
- Header mini progress bar always visible

### Design
- Exact color scheme from the HTML (green/yellow/white palette)
- Montserrat + Open Sans fonts
- Mobile-first layout, full-screen app shell with fixed header and bottom nav
- All custom components: info boxes, how-lists, link boxes, mock screens, price tables, warning banners, checklists
