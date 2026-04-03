import React from 'react';

export interface ModuleStep {
  tag: string;
  title: string;
  content: React.ReactNode;
}

export interface Module {
  id: number;
  icon: string;
  color: string;
  iconColor: string;
  num: string;
  title: string;
  desc: string;
  time: string;
  steps: ModuleStep[];
}

// Reusable content components
const InfoBox = ({ type, icon, title, children }: { type: 'green' | 'yellow' | 'red' | 'blue'; icon: string; title: string; children: React.ReactNode }) => {
  const colors = {
    green: 'bg-[hsl(var(--cnh-green-pale))] border-[hsl(var(--cnh-green)/0.2)]',
    yellow: 'bg-[hsl(var(--cnh-yellow-pale))] border-[hsl(48,100%,50%,0.3)]',
    red: 'bg-[hsl(0,86%,97%)] border-[hsl(var(--cnh-red)/0.2)]',
    blue: 'bg-[hsl(217,100%,97%)] border-[hsl(var(--cnh-blue)/0.2)]',
  };
  const titleColors = {
    green: 'text-[hsl(var(--cnh-green))]',
    yellow: 'text-[hsl(33,69%,31%)]',
    red: 'text-[hsl(var(--cnh-red))]',
    blue: 'text-[hsl(var(--cnh-blue))]',
  };
  return (
    <div className={`rounded-xl p-3.5 my-3 flex items-start gap-2.5 border ${colors[type]}`}>
      <span className="text-xl flex-shrink-0 mt-0.5">{icon}</span>
      <div className="flex-1">
        <div className={`font-heading font-extrabold text-[0.8rem] mb-1 ${titleColors[type]}`}>{title}</div>
        <div className="text-[0.79rem] leading-relaxed text-[hsl(var(--cnh-dark))]">{children}</div>
      </div>
    </div>
  );
};

const HowList = ({ items }: { items: { title: string; desc: string }[] }) => (
  <div className="flex flex-col gap-0 my-3 relative">
    <div className="absolute left-[17px] top-[18px] bottom-[18px] w-0.5 bg-gradient-to-b from-[hsl(var(--cnh-green))] to-[hsl(var(--cnh-green3))] opacity-25" />
    {items.map((item, i) => (
      <div key={i} className="flex gap-3 py-2.5">
        <div className="w-[34px] h-[34px] rounded-lg flex-shrink-0 bg-[hsl(var(--cnh-green-pale))] border-2 border-[hsl(var(--cnh-green))] font-heading font-black text-[0.82rem] text-[hsl(var(--cnh-green))] flex items-center justify-center relative z-10">
          {i + 1}
        </div>
        <div className="flex-1 pt-0.5">
          <div className="font-heading font-bold text-[0.88rem] text-[hsl(var(--cnh-dark))] mb-0.5">{item.title}</div>
          <div className="text-[0.79rem] text-[hsl(var(--cnh-gray))] leading-normal">{item.desc}</div>
        </div>
      </div>
    ))}
  </div>
);

const LinkBox = ({ icon, label, url }: { icon: string; label: string; url: string }) => (
  <div className="flex items-center gap-2.5 bg-[hsl(var(--cnh-green-pale))] border-[1.5px] border-[hsl(var(--cnh-green))] rounded-xl p-3 my-2.5">
    <span className="text-xl flex-shrink-0">{icon}</span>
    <div className="flex-1 min-w-0">
      <div className="font-heading font-bold text-[0.78rem] text-[hsl(var(--cnh-green))] mb-0.5">{label}</div>
      <div className="text-[0.72rem] text-[hsl(var(--cnh-gray))] break-all leading-snug">{url}</div>
    </div>
    <button
      onClick={() => navigator.clipboard.writeText(url)}
      className="flex-shrink-0 px-2.5 py-1.5 bg-[hsl(var(--cnh-green))] rounded-lg text-white font-heading font-bold text-[0.68rem] hover:opacity-85 transition-opacity"
    >
      Copiar
    </button>
  </div>
);

const CheckItem = ({ icon, title, desc }: { icon: string; title: string; desc: string }) => (
  <div className="flex items-start gap-2.5 p-3 bg-white border border-[hsl(var(--border))] rounded-xl">
    <span className="text-lg flex-shrink-0 mt-0.5">{icon}</span>
    <div className="flex-1">
      <div className="font-heading font-bold text-[0.85rem] text-[hsl(var(--cnh-dark))] mb-0.5">{title}</div>
      <div className="text-[0.75rem] text-[hsl(var(--cnh-gray))] leading-snug">{desc}</div>
    </div>
  </div>
);

const PriceTable = ({ title, rows }: { title: string; rows: { label: string; value: string; isTotal?: boolean }[] }) => (
  <div className="bg-white border border-[hsl(var(--border))] rounded-xl overflow-hidden my-3">
    <div className="bg-[hsl(var(--cnh-green))] px-3.5 py-2.5 font-heading font-extrabold text-[0.8rem] text-white">{title}</div>
    {rows.map((row, i) => (
      <div key={i} className={`flex justify-between items-center px-3.5 py-2.5 border-b border-[hsl(var(--border))] last:border-b-0 ${row.isTotal ? 'bg-[hsl(var(--cnh-green-pale))]' : ''}`}>
        <span className="text-[0.82rem] text-[hsl(var(--cnh-dark))]">{row.label}</span>
        <span className={`font-heading font-bold ${row.isTotal ? 'text-base text-[hsl(var(--cnh-red))]' : 'text-[0.85rem] text-[hsl(var(--cnh-green))]'}`}>{row.value}</span>
      </div>
    ))}
  </div>
);

const WarnBanner = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gradient-to-br from-[hsl(45,90%,88%)] to-[hsl(45,93%,82%)] border-[1.5px] border-[hsl(var(--cnh-yellow2))] rounded-xl p-3.5 my-3 flex gap-2.5 items-start">
    <span className="text-2xl flex-shrink-0">⚠️</span>
    <div className="text-[0.8rem] leading-relaxed text-[hsl(33,69%,31%)]">{children}</div>
  </div>
);

const Tip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[hsl(var(--cnh-yellow-pale))] border border-[hsl(48,100%,50%,0.3)] rounded-xl p-3.5 my-3 flex items-start gap-2.5">
    <span className="text-xl flex-shrink-0">💡</span>
    <div className="text-[0.8rem] leading-relaxed text-[hsl(33,69%,31%)]">{children}</div>
  </div>
);

const MockScreen = ({ fields, buttonText }: { fields: { label: string; value: string; focus?: boolean }[]; buttonText: string }) => (
  <div className="bg-[hsl(var(--cnh-dark))] rounded-2xl p-3 my-3.5 border-[3px] border-[hsl(220,17%,28%)]">
    <div className="flex items-center gap-1.5 mb-2.5">
      <div className="w-2 h-2 rounded-full bg-[hsl(0,72%,51%)]" />
      <div className="w-2 h-2 rounded-full bg-[hsl(45,93%,47%)]" />
      <div className="w-2 h-2 rounded-full bg-[hsl(142,71%,45%)]" />
      <div className="flex-1 bg-[hsl(220,17%,28%)] rounded-md px-2 py-1 text-[0.65rem] text-[hsl(var(--cnh-gray2))] font-mono">acesso.gov.br</div>
    </div>
    <div className="bg-white rounded-lg p-3.5 flex flex-col gap-2">
      {fields.map((f, i) => (
        <div key={i} className="flex flex-col gap-0.5">
          <span className="text-[0.65rem] text-[hsl(var(--cnh-gray))] font-heading font-semibold">{f.label}</span>
          <div className={`bg-[hsl(var(--cnh-gray-light))] rounded-md px-2.5 py-2 text-[0.78rem] text-[hsl(var(--cnh-dark))] border-[1.5px] ${f.focus ? 'border-[hsl(var(--cnh-green))]' : 'border-[hsl(var(--border))]'}`}>
            {f.value}
          </div>
        </div>
      ))}
      <div className="bg-[hsl(var(--cnh-green))] text-white rounded-lg py-2.5 text-center font-heading font-extrabold text-[0.8rem] mt-1">{buttonText}</div>
    </div>
  </div>
);

export const modules: Module[] = [
  {
    id: 1,
    icon: '🔐',
    color: 'hsl(var(--cnh-green-pale))',
    iconColor: 'hsl(var(--cnh-green))',
    num: 'Módulo 01',
    title: 'Conta Gov.br — Sua chave de acesso',
    desc: 'Como criar sua conta Gov.br e subir para nível Prata.',
    time: '5 min',
    steps: [
      {
        tag: 'Módulo 01 · Passo 1',
        title: 'Por que você precisa do Gov.br?',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">
                A conta <strong className="text-[hsl(var(--cnh-green))] font-bold">Gov.br</strong> é como seu "login único" para todos os serviços do governo federal. Sem ela, você <strong className="text-[hsl(var(--cnh-green))] font-bold">não consegue abrir o processo da CNH</strong> pelo app.
              </p>
              <p className="mb-3">
                O nível da conta importa: existem Bronze, Prata e Ouro. Para a CNH, você precisa no mínimo do <strong className="text-[hsl(var(--cnh-green))] font-bold">nível Prata</strong>.
              </p>
            </div>
            <InfoBox type="green" icon="✅" title="Gratuito e rápido">
              Criar a conta e subir de nível não custa nada. Você faz tudo pelo celular em menos de 10 minutos.
            </InfoBox>
            <InfoBox type="yellow" icon="📱" title="O que você vai precisar">
              CPF, e-mail válido, celular com câmera (para selfie de reconhecimento facial) e um documento com foto (RG ou CNH antiga).
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 01 · Passo 2',
        title: 'Criando sua conta Gov.br — passo a passo',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">Siga exatamente esses passos no seu celular ou computador:</p>
            </div>
            <HowList items={[
              { title: 'Acesse acesso.gov.br', desc: 'Abra o navegador e digite acesso.gov.br. Clique em "Crie sua conta".' },
              { title: 'Informe seu CPF', desc: 'Digite seu CPF. O sistema vai verificar se já existe uma conta. Se já tiver, faça login.' },
              { title: 'Preencha seus dados', desc: 'Nome completo, data de nascimento, e-mail e celular.' },
              { title: 'Crie uma senha forte', desc: 'Mínimo 8 caracteres, com letra maiúscula, número e símbolo. Ex: Cnh@2024! — Anote em lugar seguro.' },
              { title: 'Valide pelo e-mail ou SMS', desc: 'Um código de verificação será enviado. Digite no site para confirmar.' },
              { title: 'Confirme o e-mail', desc: 'Um código chega no seu e-mail. Digite ele no site. Verifique o spam se não aparecer.' },
            ]} />
            <MockScreen
              fields={[
                { label: 'CPF', value: '000.000.000-00', focus: true },
                { label: 'Senha', value: '••••••••' },
              ]}
              buttonText="Criar conta Gov.br"
            />
            <LinkBox icon="🔗" label="Site oficial Gov.br" url="https://acesso.gov.br" />
            <InfoBox type="red" icon="🚫" title="Cuidado com golpes!">
              O site oficial é apenas acesso.gov.br ou gov.br. Nunca forneça sua senha para ninguém, nem por telefone.
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 01 · Passo 3',
        title: 'Subindo para nível Prata — obrigatório para CNH',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">Depois de criar a conta, você começa no nível Bronze. Para abrir o processo da CNH, precisa subir para Prata. Veja as formas mais fáceis:</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="📱" title="Reconhecimento facial pelo app (mais fácil)" desc="Baixe o app Gov.br → Toque em 'Aumentar nível' → Faça a selfie. O sistema compara com sua foto no TSE ou na CNH. Leva 2 minutos." />
              <CheckItem icon="🏦" title="Validação pelo internet banking" desc="Se tiver conta em banco credenciado (Bradesco, Santander, Itaú, BB, Caixa, Nubank e outros) → Acesse gov.br → 'Aumentar nível' → Escolha seu banco → Confirme pelo app do banco." />
              <CheckItem icon="🪪" title="QR Code da nova Carteira de Identidade (CIN)" desc="Se você já emitiu a nova identidade com QR Code → No app Gov.br → 'Aumentar nível' → 'Ler QR Code da CIN' → Aponte a câmera para o QR Code do documento." />
            </div>
            <LinkBox icon="📲" label="App Gov.br — Google Play" url="https://play.google.com/store/apps/details?id=br.gov.meugovbr" />
            <LinkBox icon="🍎" label="App Gov.br — App Store (iPhone)" url="https://apps.apple.com/br/app/gov-br/id1455085657" />
            <Tip>
              <strong>Dica de ouro:</strong> Se a biometria facial falhar 3 vezes, o sistema bloqueia por 24 horas. Tire foto em ambiente bem iluminado, sem óculos, olhando direto para a câmera.
            </Tip>
          </>
        ),
      },
    ],
  },
  {
    id: 2,
    icon: '📲',
    color: 'hsl(217,100%,97%)',
    iconColor: 'hsl(var(--cnh-blue))',
    num: 'Módulo 02',
    title: 'App CNH do Brasil — Abrindo seu processo',
    desc: 'Como baixar, configurar e gerar seu RENACH.',
    time: '8 min',
    steps: [
      {
        tag: 'Módulo 02 · Passo 1',
        title: 'Baixando o app CNH do Brasil',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">O app <strong className="text-[hsl(var(--cnh-green))] font-bold">CNH do Brasil</strong> é onde tudo acontece. Ele foi lançado pelo governo federal em dezembro de 2025 e substitui a antiga Carteira Digital de Trânsito (CDT) para quem vai tirar a primeira habilitação.</p>
              <p className="mb-3">É pelo app que você vai: abrir o processo, fazer o curso teórico gratuito, acompanhar cada etapa e receber sua CNH digital quando for aprovado.</p>
            </div>
            <InfoBox type="green" icon="✅" title="Gratuito e oficial">
              O app é completamente gratuito. Baixe apenas nas lojas oficiais — App Store ou Google Play. Não baixe por link de terceiros.
            </InfoBox>
            <LinkBox icon="📲" label="App CNH do Brasil — Google Play (Android)" url="https://play.google.com/store/search?q=cnh+do+brasil" />
            <LinkBox icon="🍎" label="App CNH do Brasil — App Store (iPhone)" url="https://apps.apple.com/br/app/cnh-digital/id1479608874" />
            <WarnBanner>
              Ao abrir o app pela primeira vez, faça login com sua conta Gov.br (que você criou no módulo anterior). Use o CPF e a senha que você criou.
            </WarnBanner>
          </>
        ),
      },
      {
        tag: 'Módulo 02 · Passo 2',
        title: 'Abrindo o processo — gerando seu RENACH',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">O <strong className="text-[hsl(var(--cnh-green))] font-bold">RENACH</strong> (Registro Nacional de Carteiras de Habilitação) é o número de protocolo oficial que identifica seu processo no DETRAN. Sem ele, nada anda. Veja como gerar:</p>
            </div>
            <HowList items={[
              { title: 'Abra o app e faça login com Gov.br', desc: 'Toque em "Entrar com Gov.br" e use seu CPF e senha.' },
              { title: 'Toque em "Requerer 1ª Habilitação"', desc: 'Essa opção fica na tela inicial do app. Pode aparecer também como "Primeira Habilitação".' },
              { title: 'Escolha a categoria', desc: 'Categoria A = moto. Categoria B = carro. Se quiser as duas, escolha AB — mas custa mais e demora mais.' },
              { title: 'Selecione seu estado', desc: 'Escolha o estado onde você mora e vai tirar a CNH. É onde ficará registrado seu processo.' },
              { title: 'Confirme os dados e envie', desc: 'Revise tudo. Nome, CPF, categoria, estado. Clique em "Confirmar" ou "Abrir processo".' },
              { title: 'Pronto! Seu RENACH foi gerado', desc: 'Salve esse número. Você vai precisar dele em todas as etapas seguintes.' },
            ]} />
            <InfoBox type="blue" icon="📸" title="Salve o número do RENACH!">
              Tire uma foto da tela ou anote o número. Guarde em local seguro — você vai usar várias vezes durante o processo.
            </InfoBox>
            <InfoBox type="green" icon="📊" title="Acompanhe pelo app">
              Na aba "Condutor" do app, você consegue ver em tempo real quais etapas já concluiu e quais ainda estão pendentes.
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 02 · Passo 3',
        title: 'O curso teórico gratuito — como funciona',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">Assim que o RENACH for gerado, você já pode começar o <strong className="text-[hsl(var(--cnh-green))] font-bold">curso teórico gratuito</strong> oferecido pelo Ministério dos Transportes, disponível dentro do próprio app.</p>
              <p className="mb-3">O material cobre tudo que cai na prova: legislação de trânsito, direção defensiva, primeiros socorros e meio ambiente.</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="🎥" title="Videoaulas curtas e objetivas" desc="Conteúdo dividido em vídeos de 5 a 15 minutos. Dá pra estudar no transporte, no intervalo, onde quiser." />
              <CheckItem icon="🎧" title="Podcasts de trânsito" desc="Ouvir enquanto faz outra coisa também conta! Ideal pra quem não tem muito tempo." />
              <CheckItem icon="📖" title="Material complementar em PDF" desc="Você pode baixar o conteúdo e estudar offline quando não tiver internet." />
              <CheckItem icon="📝" title="Simulados integrados" desc="O app oferece questões no estilo exato da prova do DETRAN. Treine até se sentir confiante." />
            </div>
            <InfoBox type="green" icon="🏁" title="Sem carga horária mínima!">
              Com a nova lei, não existe mais obrigação de X horas de aula teórica. Você estuda no seu ritmo e decide quando está pronto para a prova.
            </InfoBox>
          </>
        ),
      },
    ],
  },
  {
    id: 3,
    icon: '🏥',
    color: 'hsl(355,100%,97%)',
    iconColor: 'hsl(var(--cnh-red))',
    num: 'Módulo 03',
    title: 'Biometria, Exame Médico e Psicotécnico',
    desc: 'Como agendar, onde ir e o que levar no dia.',
    time: '10 min',
    steps: [
      {
        tag: 'Módulo 03 · Passo 1',
        title: 'Biometria — gratuita e obrigatória',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">A biometria é a coleta da sua foto, assinatura digital e impressões digitais. Ela é usada para confirmar que é você mesmo fazendo cada etapa do processo.</p>
              <p className="mb-3">A boa notícia: <strong className="text-[hsl(var(--cnh-green))] font-bold">é gratuita!</strong> Você pode fazer em qualquer CFC (Centro de Formação de Condutores — as autoescolas) credenciado, mesmo sem contratar aulas lá.</p>
            </div>
            <HowList items={[
              { title: 'Procure um CFC perto de você', desc: 'Busque no Google: "CFC credenciado [sua cidade]" ou acesse o site do DETRAN do seu estado.' },
              { title: 'Leve seu documento com foto', desc: 'RG, CNH (se tiver de outra categoria) ou passaporte. E o número do seu RENACH.' },
              { title: 'Faça a coleta', desc: 'Leva em média 15 minutos. Sem agendamento na maioria dos CFCs — pode chegar e fazer.' },
              { title: 'Confirmação no app', desc: 'Após a coleta, o status "Biometria" no seu app CNH do Brasil fica verde em até 48h.' },
            ]} />
            <InfoBox type="blue" icon="🔍" title="Como achar CFC na sua cidade">
              Acesse o site do DETRAN do seu estado e procure "CFCs credenciados" ou "lista de autoescolas". Todos os CFCs registrados podem fazer sua biometria gratuitamente.
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 03 · Passo 2',
        title: 'Exame médico — o que é avaliado',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">O exame médico avalia se você tem condições físicas para dirigir com segurança. É feito por médico credenciado pelo DETRAN.</p>
              <p className="mb-3">O que é avaliado:</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="👁️" title="Acuidade visual" desc="Você lê letras em diferentes distâncias. Óculos e lentes de contato são permitidos." />
              <CheckItem icon="🎵" title="Audição" desc="Teste simples para ver se você ouve sons básicos. A maioria passa sem problemas." />
              <CheckItem icon="💓" title="Saúde geral" desc="Pressão arterial, mobilidade dos membros, condições que possam afetar a direção." />
              <CheckItem icon="📋" title="Declaração de saúde" desc="Você informa se tem doenças crônicas, usa medicamentos ou tem limitações. Seja honesto." />
            </div>
            <InfoBox type="yellow" icon="💰" title="Quanto custa o exame médico?">
              Varia por estado. Em média, R$80 a R$150. O pagamento é direto para a clínica, no dia do exame. Pode ser dinheiro, cartão ou Pix.
            </InfoBox>
            <InfoBox type="blue" icon="🔍" title="Como encontrar clínicas credenciadas">
              Acesse o site do DETRAN do seu estado e busque "clínicas credenciadas para exame médico" ou "médicos credenciados CNH".
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 03 · Passo 3',
        title: 'Exame psicotécnico — desmistificando',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">O psicotécnico é a avaliação psicológica feita por psicólogo credenciado pelo DETRAN. Muita gente tem medo, mas com as dicas certas é tranquilo.</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="🧠" title="Atenção e concentração" desc="Exercícios de marcar figuras, riscar padrões ou seguir sequências. Foque, não se apresse." />
              <CheckItem icon="⚡" title="Tempo de reação" desc="Testes em computador onde você aperta botão quando vê estímulo. Relaxe." />
              <CheckItem icon="😌" title="Equilíbrio emocional" desc="Questionário sobre comportamentos e situações do dia a dia. Responda com sinceridade." />
              <CheckItem icon="🎯" title="Capacidade de tomada de decisão" desc="Situações onde você precisa decidir rapidamente. Confie no seu instinto." />
            </div>
            <Tip>
              <strong>Dicas para passar:</strong> Durma bem na noite anterior. Não beba álcool 24h antes. Chegue no horário e descansado. Leia cada instrução com calma. A maioria das pessoas passa normalmente.
            </Tip>
            <InfoBox type="red" icon="❌" title="Se reprovar no psicotécnico...">
              Não é o fim! Você pode solicitar uma segunda avaliação. Em alguns estados, pode contestar o resultado. Procure o DETRAN do seu estado.
            </InfoBox>
            <PriceTable
              title="💰 Custos médios dos exames"
              rows={[
                { label: 'Exame médico', value: 'R$ 80 – R$ 150' },
                { label: 'Psicotécnico', value: 'R$ 100 – R$ 200' },
                { label: 'Biometria', value: 'Gratuito' },
                { label: 'Total estimado', value: 'R$ 180 – R$ 350', isTotal: true },
              ]}
            />
          </>
        ),
      },
    ],
  },
  {
    id: 4,
    icon: '📝',
    color: 'hsl(var(--cnh-yellow-pale))',
    iconColor: 'hsl(33,69%,31%)',
    num: 'Módulo 04',
    title: 'Prova Teórica — Como passar de primeira',
    desc: 'O que cai, como estudar e como agendar.',
    time: '12 min',
    steps: [
      {
        tag: 'Módulo 04 · Passo 1',
        title: 'Como funciona a prova teórica do DETRAN',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">A prova teórica é obrigatória e você precisa acertar pelo menos <strong className="text-[hsl(var(--cnh-green))] font-bold">70% das questões</strong> para ser aprovado. São 30 questões no total — você precisa acertar no mínimo 21.</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="📊" title="30 questões de múltipla escolha" desc="4 alternativas por questão. Apenas uma resposta correta. Sem pegadinhas — seja direto." />
              <CheckItem icon="⏱️" title="30 minutos para responder" desc="1 minuto por questão em média. Não existe 'resposta em branco' — sempre marque algo." />
              <CheckItem icon="✅" title="Mínimo 21 acertos (70%)" desc="Se errar 10 ou mais, reprovou. Sem drama — pode remarcar sem custo extra na 2ª tentativa." />
              <CheckItem icon="🔄" title="Pode repetir quantas vezes precisar" desc="A 2ª tentativa é gratuita. Da 3ª em diante, pode ter taxa. Mas com estudo, você passa de primeira." />
            </div>
            <InfoBox type="blue" icon="📱" title="Como agendar a prova">
              Depois de concluir o curso teórico no app, o botão de "Agendar prova teórica" fica disponível. Escolha a data, horário e local no app ou site do DETRAN do seu estado.
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 04 · Passo 2',
        title: 'O que mais cai na prova — estude isso primeiro',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">Com base nas provas dos últimos anos, esses são os temas que mais aparecem:</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="🚦" title="Sinalização de trânsito (25%)" desc="Placas de regulamentação (fundo branco/vermelho), advertência (fundo amarelo) e indicação (fundo azul/verde). Decore os grupos." />
              <CheckItem icon="🛑" title="Infrações e penalidades (20%)" desc="Quais são infrações leves, médias, graves e gravíssimas. Pontuação na carteira. A Lei Seca (tolerância zero)." />
              <CheckItem icon="🚗" title="Regras de circulação (20%)" desc="Velocidade máxima por tipo de via, ultrapassagem, preferência de passagem, uso correto de faixas." />
              <CheckItem icon="🛡️" title="Direção defensiva (15%)" desc="Como agir em situações de risco, distância segura, chuva, neblina, noite." />
              <CheckItem icon="🚑" title="Primeiros socorros (10%)" desc="O que fazer em caso de acidente: não mover vítima, acionar socorro, sinalizar o local." />
              <CheckItem icon="🌿" title="Meio ambiente (10%)" desc="Poluição sonora e do ar, descarte de óleo usado, impacto ambiental dos veículos." />
            </div>
            <InfoBox type="green" icon="🎯" title="Estratégia campeã">
              Faça pelo menos 200 simulados antes da prova. O banco de questões do DETRAN é fixo — as mesmas questões se repetem. Quanto mais você treina, maior a chance de ver questões conhecidas na prova real.
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 04 · Passo 3',
        title: 'Erros que mais reprovam — evite esses!',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">Esses são os erros mais comuns de quem reprova. Fique de olho:</p>
            </div>
            <InfoBox type="red" icon="❌" title="Não estudar sinalização">
              25% da prova é sobre placas. Muita gente acha que "já conhece" mas erra por não saber o significado exato de cada uma. Estude todas as categorias.
            </InfoBox>
            <InfoBox type="red" icon="❌" title="Confundir velocidades máximas">
              Via urbana = 60 km/h padrão. Via rural = 100 km/h (carros). Rodovia = 110 km/h. Essas questões sempre aparecem e muita gente confunde.
            </InfoBox>
            <InfoBox type="red" icon="❌" title="Errar questões de primeiros socorros">
              A resposta correta quase sempre é: não mova a vítima, sinalize o local, ligue para o socorro (192 ou 193 ou 190). Questões sobre mover vítima são pegadinhas clássicas.
            </InfoBox>
            <Tip>
              <strong>Dica final:</strong> Na dúvida entre duas alternativas, escolha a que prioriza a segurança e o respeito às leis. O DETRAN sempre favorece a alternativa mais conservadora e segura.
            </Tip>
          </>
        ),
      },
    ],
  },
  {
    id: 5,
    icon: '🚗',
    color: 'hsl(138,76%,97%)',
    iconColor: 'hsl(152,62%,24%)',
    num: 'Módulo 05',
    title: 'Aulas Práticas — Sem gastar fortuna',
    desc: 'Como achar instrutor barato e se preparar.',
    time: '10 min',
    steps: [
      {
        tag: 'Módulo 05 · Passo 1',
        title: 'A nova regra das aulas práticas',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">Antes da nova lei, você era obrigado a fazer 20 horas de aula prática em autoescola. Agora, com a Resolução Contran 1.020/2025, o <strong className="text-[hsl(var(--cnh-green))] font-bold">mínimo é de apenas 2 horas</strong>.</p>
              <p className="mb-3">Mas atenção: 2 horas é o mínimo legal. Se você nunca dirigiu na vida, provavelmente vai precisar de mais. Seja honesto consigo mesmo.</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="🏫" title="Autoescola tradicional (CFC)" desc="Você contrata apenas as aulas práticas, sem precisar do pacote completo. Negocie — diga que o teórico você já fez pelo app." />
              <CheckItem icon="👨‍🏫" title="Instrutor autônomo credenciado" desc="A nova lei permite contratar instrutores independentes credenciados pelo DETRAN. Geralmente mais barato." />
              <CheckItem icon="🚙" title="Usando seu próprio carro" desc="A nova lei permite usar seu carro nas aulas práticas, desde que o instrutor autorize e o carro tenha pedal duplo ou adaptação." />
            </div>
          </>
        ),
      },
      {
        tag: 'Módulo 05 · Passo 2',
        title: 'Quanto custam as aulas práticas?',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">Os preços variam muito de região para região. Aqui está uma média nacional:</p>
            </div>
            <PriceTable
              title="💰 Custo médio de aulas práticas"
              rows={[
                { label: 'Aula avulsa (autoescola)', value: 'R$ 80 – R$ 150/h' },
                { label: 'Instrutor autônomo', value: 'R$ 50 – R$ 100/h' },
                { label: 'Mínimo legal (2h)', value: 'R$ 100 – R$ 300' },
                { label: 'Recomendado (10h)', value: 'R$ 500 – R$ 1.500' },
              ]}
            />
            <Tip>
              <strong>Dica para economizar:</strong> Pergunte se o CFC faz preço especial para alunos que só precisam das aulas práticas. Muitos dão desconto de 20-30% nesse caso.
            </Tip>
            <InfoBox type="green" icon="💡" title="Comparação: com vs sem autoescola">
              Pacote completo de autoescola: R$2.500 a R$5.000. Fazendo por conta própria (curso gratuito + aulas avulsas): R$500 a R$1.500. Economia de até 70%!
            </InfoBox>
          </>
        ),
      },
      {
        tag: 'Módulo 05 · Passo 3',
        title: 'Prova prática — o que é avaliado',
        content: (
          <>
            <div className="text-[0.88rem] leading-[1.7] text-[hsl(var(--cnh-dark))]">
              <p className="mb-3">A prova prática é a última etapa. Você vai dirigir com um examinador do DETRAN ao lado. Saiba o que ele avalia:</p>
            </div>
            <div className="flex flex-col gap-2 my-3">
              <CheckItem icon="🪞" title="Verificações antes de ligar" desc="Ajustar espelhos, banco, cinto de segurança. Muita gente esquece e já perde ponto antes de sair." />
              <CheckItem icon="🚦" title="Sinalização e observação" desc="Dar seta antes de curvas e conversões. Olhar retrovisor antes de mudar de faixa." />
              <CheckItem icon="🅿️" title="Baliza (estacionamento)" desc="Estacionar entre balizas sem encostar. Treino é a chave — peça ao instrutor para praticar muito isso." />
              <CheckItem icon="🏔️" title="Rampa / Aclive" desc="Arrancar em subida sem deixar o carro morrer ou descer. Ponto de embreagem é fundamental." />
              <CheckItem icon="🛣️" title="Percurso em via pública" desc="Dirigir em rua com tráfego real. Respeitar placas, pedestres, velocidade máxima." />
            </div>
            <WarnBanner>
              <strong>Erro eliminatório:</strong> avançar sinal vermelho, subir na calçada, exceder velocidade, ou cometer qualquer infração grave reprova na hora. Dirija com calma e atenção.
            </WarnBanner>
            <InfoBox type="green" icon="🏆" title="Passou? Parabéns!">
              Após aprovação na prova prática, sua CNH digital fica disponível no app em até 5 dias úteis. A CNH física pode ser solicitada pelo app ou retirada no DETRAN.
            </InfoBox>
          </>
        ),
      },
    ],
  },
];
