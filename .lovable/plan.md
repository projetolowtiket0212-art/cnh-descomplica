## Corrigir player de vídeo (remover tarjas pretas)

### Problema
O `VideoPlayer.tsx` atual usa divs `.video-mask-top` e `.video-mask-bottom` para esconder a marca do YouTube, mas elas cobrem partes do vídeo. Também há overlays customizados (`.video-start-overlay`, `.video-controls`, `.video-progress`) que ficam sobre o iframe.

### Solução
Substituir o componente `VideoPlayer.tsx` por uma versão simples baseada em iframe nativo, usando os parâmetros da URL do YouTube para suprimir branding.

### Arquivos a alterar

**`src/components/VideoPlayer.tsx`**
- Remover toda a integração com YouTube IFrame API, estado de play/mute/progress e botões customizados.
- Renderizar apenas:
  ```tsx
  <div className="video-player-wrap">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&enablejsapi=1&controls=1`}
      title="Vídeo"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="video-iframe"
    />
  </div>
  ```
- Manter a prop `onEnded` na assinatura para não quebrar `Index.tsx`, mas implementá-la via `postMessage` listener do YouTube (escutar `onStateChange` data=0). Isso preserva o trigger do popup "App do Instrutor" sem qualquer overlay visual.

**`src/index.css`**
- Remover regras: `.video-mask-top`, `.video-mask-bottom`, `.video-start-overlay`, `.video-start-btn`, `.video-click-area`, `.video-controls`, `.video-ctrl-btn`, `.video-progress`, `.video-progress-fill`, `.video-player-inner`.
- Manter/ajustar `.video-player-wrap` e `.video-iframe`:
  ```css
  .video-player-wrap {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .video-iframe {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }
  ```

### Fora de escopo
Texto "Prefere ler?", módulos, progresso, popups (apenas mantemos o gatilho `onEnded` funcional), demais seções da página.