## Mudanças

### 1. Player de vídeo (src/components/VideoPlayer.tsx + src/index.css)
- Reforçar máscaras para esconder título do topo e barra inferior do YouTube (overlays absolutos cobrindo top ~60px e bottom ~60px do iframe, `pointer-events:none` exceto onde precisamos clicar).
- Parâmetros iframe: `rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&enablejsapi=1&playsinline=1&fs=0&disablekb=1` (já presentes — manter).
- Estado inicial: overlay escuro semitransparente cobre todo iframe + botão play central (círculo verde #16a34a, ícone branco 64px). Ao clicar, overlay desaparece e vídeo dá play.
- Barra de progresso: 4px, verde #16a34a, sem branding YouTube, fixada no fundo do player.
- Controles inferiores direita: volume e fullscreen em branco/cinza, sempre visíveis enquanto tocando.
- Wrapper: largura 100%, aspect-ratio 16:9, border-radius 16px, box-shadow premium. Reduzir padding lateral do container pai em Index.tsx.

### 2. Links de checkout (src/pages/Index.tsx)
Substituir nos cards do upsell:
- "Simulado CNH até Passar 2026" → `https://go.pepperpay.com.br/cdd0x`
- "Perco Medo do Trânsito" → `https://go.pepperpay.com.br/y1f6a`
- "Perco Medo da Prova Prática" → `https://go.pepperpay.com.br/p5w2x`
- "Passe no Psicotécnico" → `https://go.pepperpay.com.br/xvkf2`

Também atualizar a constante de checkout do SalesPopup do Simulado para o novo link. Manter App do Instrutor (`0vign`) intacto e não tocar nos toasts promocionais (links separados de avisos, não checkout direto).

### 3. Redesign visual (src/index.css + Index.tsx, sem mexer em lógica)
Aplicar tema cinematográfico neon glassmorphism:

**Fundo global**
- `body`: background `#050505` com gradiente radial roxo `#1a0033` no centro.
- Camada fixa de partículas via CSS puro (pseudo-elementos com `radial-gradient` repetido + `@keyframes float` lento, opacidade baixa).

**Header**
- `rgba(255,255,255,0.05)` + `backdrop-filter: blur(20px)`, borda `rgba(255,255,255,0.1)`.
- Ícone SVG já presente recolorido para gradiente neon azul→roxo (`#6366f1`→`#8b5cf6`).
- Progress bar do header em gradiente azul-roxo.

**Cards dos módulos**
- Fundo `rgba(255,255,255,0.04)`, blur 12px, borda `rgba(255,255,255,0.08)`, box-shadow `0 8px 32px rgba(0,0,0,0.4)`.
- Mantém borda esquerda colorida por módulo.
- Hover 3D: `perspective(1000px) rotateX(2deg) rotateY(2deg)` com transição 0.3s.
- Título branco, subtítulo `#9ca3af`.

**Cards de upsell ("Complete sua Jornada")**
- Mesmo glass + borda `1px solid rgba(99,102,241,0.3)`.
- Hover: `box-shadow 0 0 20px rgba(99,102,241,0.2)`.
- Separador sutil entre banners grandes e grid pequeno.
- Título de seção com gradiente neon via `background-clip:text`.

**Botões**
- Gradiente `linear-gradient(135deg,#6366f1,#8b5cf6)`, radius 10px, texto branco.
- Hover: brilho + `scale(1.03)`.

**Tipografia**
- Fonte Inter/system-ui. Headings `#fff` peso 700, body `#d1d5db`, preços com gradiente neon.

**Animações**
- Keyframe `float` 6s ease-in-out infinite para cards.
- IntersectionObserver leve em Index.tsx adiciona classe `.in-view` para fade+translateY nos blocos principais.
- Transições gerais 0.3s ease.

**Seção "Bem-vindo ao guia"**
- Badge com glass + borda neon roxo.
- Destaque "CNH" no título com gradiente.

### Arquivos
- `src/components/VideoPlayer.tsx` — máscaras + estado overlay inicial.
- `src/pages/Index.tsx` — trocar 4 URLs, atualizar link do popup Simulado, adicionar IntersectionObserver, recolorir ícone SVG do header.
- `src/components/SalesPopup.tsx` — apenas se contiver URL hardcoded do Simulado.
- `src/index.css` — redesign completo (fundo, partículas, header glass, cards glass, botões, tipografia, animações).

### Fora de escopo
Lógica de progresso, conteúdo dos módulos, navegação, popups (apenas link), tela de conclusão, link do App do Instrutor.
