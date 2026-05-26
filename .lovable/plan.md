## Player de vídeo — fachada com clique

Substituir o `VideoPlayer.tsx` atual pela técnica da fachada, mantendo a integração no `Index.tsx`.

### Mudanças

**`src/components/VideoPlayer.tsx`**
- Remover poster customizado via prop, overlay com botão SVG customizado, lógica de `postMessage`/`addEventListener` do YouTube e `useEffect` de listener.
- Renderizar um único `<div>` container clicável (`aspect-ratio: 16/10`, `border-radius: 16px`, `overflow: hidden`, `background:#000`).
- Estado inicial: `<img>` da thumbnail oficial `https://img.youtube.com/vi/{videoId}/maxresdefault.jpg` em `object-fit: cover` + botão play verde central (72px, `#16a34a`, glow verde, SVG triângulo branco). Sem texto, sem outros overlays.
- Ao clicar: trocar conteúdo por `<iframe>` com:
  - `src=https://www.youtube-nocookie.com/embed/{videoId}?autoplay=1&mute=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&controls=1&playsinline=1`
  - estilo absoluto centralizado, `width:100%`, `height: calc(100% + 120px)`, `border:none`
  - `allow="autoplay; fullscreen"`, `allowFullScreen`
- Manter `onEnded` opcional via listener mínimo de `postMessage` somente após o iframe montar (sem overlays adicionais), para não quebrar o comportamento de popup atual em `Index.tsx`.

**`src/index.css`**
- Limpar classes não usadas relacionadas ao player antigo (`.video-poster`, `.video-play-overlay`, `.video-play-btn`, `.video-iframe`, `.video-player-wrap`) — ou simplificar para apenas o necessário, já que o novo componente usa estilos inline conforme a especificação.

**`src/pages/Index.tsx`**
- Sem mudanças além de garantir que `<VideoPlayer videoId="4E1z9J3wpfQ" onEnded={handleVideoEnded} />` continue funcionando (remover prop `poster`, que não é mais usada).

### Fora de escopo
Qualquer outro elemento da página (módulos, popup, progresso, upsells, layout geral).
