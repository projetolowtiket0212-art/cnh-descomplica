## Refatorar player para HTML5 nativo (sem YouTube)

### Decisões (usuário pulou perguntas)
- **MP4**: usar prop `src` configurável no componente. Como o projeto não tem MP4 hospedado, vou criar o player aceitando uma URL via prop e definir um placeholder em `Index.tsx` que pode ser trocado depois. Sem URL real, o player exibe automaticamente o fallback discreto ("Vídeo indisponível no momento").
- **Capa**: gerar uma imagem premium escura via IA (`src/assets/video-cover.jpg`) — minimalista, tema CNH/direção, paleta escura combinando com a página.
- **Evento fim**: manter `onEnded` (popup "App do Instrutor") usando o evento nativo `ended` do `<video>`.

### Mudanças

**`src/components/VideoPlayer.tsx`** — Reescrita completa:
- Props: `src?: string`, `poster?: string`, `onEnded?: () => void`. Remove `videoId`.
- Estado: `started` (boolean), `error` (boolean).
- Antes do play: `<img>` com poster cobrindo a área + botão play central (72px, círculo verde `#16a34a`, ícone SVG triângulo branco, sombra neon verde, hover scale 1.06). Sem barras, sem marca.
- Ao clicar no botão: `setStarted(true)` → renderiza `<video controls autoPlay playsInline preload="metadata" onEnded={onEnded} onError={() => setError(true)}>` ocupando 100% da área.
- Fallback se `!src` ou `error`: bloco escuro centralizado com texto curto "Vídeo indisponível no momento" em `text-white/60`, sem botão.
- `controlsList="nodownload noremoteplayback"`, `disablePictureInPicture`, sem `download`/share.

**`src/index.css`** — Substituir classes do player:
- `.video-player-wrap`: `position:relative; width:calc(100% - 16px); margin:14px auto 0; aspect-ratio:16/9; border-radius:16px; overflow:hidden; background:#0a0a0f; box-shadow:0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06);`
- `.video-poster`: `position:absolute; inset:0; width:100%; height:100%; object-fit:cover;`
- `.video-play-overlay`: `position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg, rgba(0,0,0,0.15), rgba(0,0,0,0.45));`
- `.video-play-btn`: círculo 72px, gradiente verde, sombra glow, transição `transform .2s`.
- `.video-el`: `width:100%; height:100%; display:block; background:#000;`
- `.video-fallback`: centralizado, texto discreto.
- Remover `.video-iframe`, `.video-mask-top`, `.video-mask-bottom`.

**`src/pages/Index.tsx`** — Atualizar chamada `<VideoPlayer videoId="4E1z9J3wpfQ" onEnded={...} />` para `<VideoPlayer src={undefined} poster={videoCover} onEnded={...} />` com import de `video-cover.jpg`. Quando o usuário fornecer a URL MP4, basta substituir.

**`src/assets/video-cover.jpg`** — Gerar via IA: cena minimalista escura, volante de carro em ambiente noturno com luzes verdes sutis, sem texto, estilo cinematográfico premium 1920x1080.

### Fora de escopo
Outros elementos da página, módulos, popup do simulado, progresso, upsells.

### Observação ao usuário
Sem uma URL MP4 real, o player exibirá o fallback "Vídeo indisponível no momento". Me envie a URL do MP4 quando tiver, que eu pluga em uma linha.
