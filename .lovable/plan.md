## Barra de progresso falsa verde sobre o iframe

Adicionar, dentro do container do player (apenas depois do clique, junto com o iframe), uma camada absoluta no rodapé com gradiente preto→transparente e uma barra verde com bolinha, cobrindo visualmente a barra vermelha do YouTube. `pointer-events: none` para não bloquear cliques.

### Mudanças

**`src/components/VideoPlayer.tsx`**
- No bloco `started` (já existente), envolver o `<iframe>` num fragmento e adicionar logo após ele a div da barra falsa:
  - container: `position:absolute; bottom:0; left:0; width:100%; height:48px; pointer-events:none; z-index:10; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);`
  - trilho: `position:absolute; bottom:10px; left:12px; right:12px; height:4px; background: rgba(255,255,255,0.3); border-radius:999px;`
  - preenchimento verde: `height:100%; background:#16a34a; border-radius:999px; position:relative;` com largura controlada por estado `progress` (0–100%).
  - bolinha verde: `position:absolute; right:-6px; top:50%; transform:translateY(-50%); width:12px; height:12px; background:#16a34a; border-radius:50%; box-shadow:0 0 6px rgba(22,163,74,0.8);`
- Sincronizar a largura com o progresso real do vídeo usando a YouTube IFrame API já habilitada (`enablejsapi=1`):
  - reaproveitar o `useEffect` que faz `postMessage`; além de `addEventListener onStateChange`, enviar `{event:'command', func:'getCurrentTime'}` e `{event:'command', func:'getDuration'}` em intervalo (~500 ms).
  - no `handleMessage`, ler `data.info` quando `data.event === 'infoDelivery'` (campos `currentTime` e `duration`) e atualizar `progress = currentTime / duration * 100`.
  - manter `onEnded` ao receber `onStateChange` info=0.

### Fora de escopo
Qualquer outro elemento da página, estilos globais ou comportamento do estado inicial (thumbnail + botão play).
