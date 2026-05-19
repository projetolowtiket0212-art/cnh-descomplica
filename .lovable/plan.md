## Mudanças no app CNH Sem Autoescola

Toda a lógica de progresso, conteúdo dos módulos, cores gerais e checkouts existentes ficam intactos.

### 1. Header — novo ícone SVG
Em `src/pages/Index.tsx`, remover o emoji/ícone atual ao lado de "CNH Sem Autoescola" e substituir por um SVG inline minimalista (carro/volante estilizado com traços finos, formas geométricas) usando as cores verde (`var(--green)`) e amarelo do tema. Mesmo tamanho do anterior, sem alterar o layout do header.

### 2. Remover seção "Salve seu acesso"
Em `src/pages/Index.tsx`, deletar todo o bloco `.save-link-section` (texto, link, botões WhatsApp/E-mail/Copiar). Em `src/index.css`, remover (ou deixar órfãs) as classes correspondentes. O conteúdo seguinte sobe naturalmente.

### 3. Vídeo do YouTube com controles customizados
No lugar onde estava o save-link, criar um componente `VideoPlayer` (novo arquivo `src/components/VideoPlayer.tsx`) com:
- `<iframe>` para `https://www.youtube.com/embed/4E1z9J3wpfQ?rel=0&modestbranding=1&controls=0&showinfo=0&iv_load_policy=3&enablejsapi=1`
- Wrapper 16:9, `border-radius: 12px`, sombra suave, largura 100%
- Overlay absoluto cobrindo toda a área do iframe com:
  - Botão play/pause central (ícone verde via lucide-react)
  - Barra de progresso fina no rodapé (verde), atualizada via `setInterval` lendo `getCurrentTime`/`getDuration`
  - Botões de volume (mute/unmute) e fullscreen (branco/cinza) no canto inferior direito
- Carregamento dinâmico de `https://www.youtube.com/iframe_api` via script tag (uma vez)
- `window.onYouTubeIframeAPIReady` cria o `YT.Player` com `events.onStateChange` exposto via prop `onEnded` para o pai
- Camadas absolutas extras (topo e cantos) escondem qualquer branding do YouTube
- Cliques no overlay (fora dos botões) fazem play/pause

### 4. Texto abaixo do vídeo
Logo abaixo do `VideoPlayer`, adicionar bloco com:
- Título em negrito (verde escuro): "📖 Prefere ler? O guia completo está aqui embaixo"
- Subtítulo menor (cinza): "Este produto foi 100% pensado em você. Além do vídeo, todos os módulos estão disponíveis em formato de leitura detalhada logo abaixo — no seu ritmo, quando quiser."

CSS dedicado em `src/index.css` (`.video-intro-text`).

### 5. Bordas coloridas nos módulos
Na lista de módulos em `src/pages/Index.tsx`, aplicar `border-left: 4px solid {cor}` inline por índice:
- 0 → `#3B82F6` · 1 → `#8B5CF6` · 2 → `#F59E0B` · 3 → `#EF4444` · 4 → `#10B981`

Resto do card inalterado.

### 6. Novo card "App do Instrutor" na seção Upsell
- Copiar a imagem enviada para `public/images/app-instrutor.png`
- Inserir ACIMA do card "Simulado CNH até Passar 2026", com a mesma estrutura/markup do card do Simulado:
  - Badge amarela "MAIS VENDIDO"
  - Imagem `app-instrutor.png`
  - Título: "App do Instrutor — Aulas Práticas Sem Pagar Caro"
  - Descrição: "Encontre instrutores particulares certificados perto de você e economize até 60% nas aulas práticas."
  - Preço: R$ 47,00 · sublinha "acesso vitalício"
  - Botão verde escuro "Quero agora" → `https://go.pepperpay.com.br/0vign`

### 7. Popups de venda
Novo componente `src/components/SalesPopup.tsx` reutilizável (imagem, título, texto, CTA label/URL, onClose). CSS em `src/index.css`:
- Overlay preto 60%, popup centralizado, `border-radius: 16px`, animação fade+scale (keyframes CSS — animação one-shot na montagem, ok pois é só apresentação)
- Mobile: 90% da largura
- Botão X no canto superior direito

Em `Index.tsx`, dois `useState` + lógica:
- **Popup 1 (Simulado)**: `setTimeout` 30s no mount; flag `sessionStorage` `popup_simulado_shown`. CTA usa o mesmo link de checkout do Simulado já presente no arquivo.
- **Popup 2 (App do Instrutor)**: disparado pelo callback `onEnded` do `VideoPlayer` (state = 0 do YT API); flag `sessionStorage` `popup_instrutor_shown`. CTA → `https://go.pepperpay.com.br/0vign`.

### Arquivos
- `src/pages/Index.tsx` — header icon, remover save-link, inserir VideoPlayer + texto, bordas dos módulos, novo card upsell, montar popups
- `src/components/VideoPlayer.tsx` — novo
- `src/components/SalesPopup.tsx` — novo
- `src/index.css` — estilos do video player, intro-text, popup; remover save-link
- `public/images/app-instrutor.png` — imagem do produto (a partir do upload)
