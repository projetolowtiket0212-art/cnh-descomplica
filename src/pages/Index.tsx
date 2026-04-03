import { useState, useCallback, useRef, useEffect } from 'react';
import { modules } from '@/data/modules';
import { useProgress } from '@/hooks/useProgress';

const moduleMeta = modules.map(m => ({ id: m.id, stepCount: m.steps.length }));

const Index = () => {
  const [screen, setScreen] = useState<'home' | 'module' | 'congrats'>('home');
  const [activeModuleId, setActiveModuleId] = useState(1);
  const [activeStep, setActiveStep] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    isStepCompleted, getModuleCompletedCount, isModuleComplete,
    isModuleUnlocked, completeStep, overallProgress, allComplete,
  } = useProgress(moduleMeta);

  const activeModule = modules.find(m => m.id === activeModuleId)!;
  const pct = overallProgress();

  const openModule = useCallback((id: number) => {
    if (!isModuleUnlocked(id)) return;
    setActiveModuleId(id);
    setActiveStep(0);
    setScreen('module');
  }, [isModuleUnlocked]);

  const goHome = useCallback(() => {
    setScreen('home');
  }, []);

  const nextStep = useCallback(() => {
    completeStep(activeModuleId, activeStep);
    if (activeStep < activeModule.steps.length - 1) {
      setActiveStep(s => s + 1);
      contentRef.current?.scrollTo(0, 0);
    } else {
      // Module complete
      if (allComplete()) {
        setScreen('congrats');
      } else {
        goHome();
      }
    }
  }, [activeModuleId, activeStep, activeModule, completeStep, allComplete, goHome]);

  const prevStep = useCallback(() => {
    if (activeStep > 0) {
      setActiveStep(s => s - 1);
      contentRef.current?.scrollTo(0, 0);
    }
  }, [activeStep]);

  // Scroll to top when switching screens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  return (
    <div className="w-screen h-screen flex flex-col overflow-hidden" style={{ fontFamily: "'Open Sans', sans-serif" }}>
      {/* HEADER */}
      <header className="flex-shrink-0 bg-[hsl(var(--cnh-green))] px-3.5 py-2.5 flex items-center gap-2.5 shadow-lg relative z-20">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-[34px] h-[34px] bg-[hsl(var(--cnh-yellow))] rounded-lg flex items-center justify-center text-lg flex-shrink-0">🚗</div>
          <div>
            <div className="font-heading font-black text-[0.82rem] text-white leading-tight">CNH Sem Autoescola</div>
            <span className="font-heading text-[hsl(var(--cnh-yellow))] text-[0.65rem] font-semibold">O Que Não Estão Te Contando</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 font-heading text-[0.65rem] font-bold text-white/80">
          <div className="w-[60px] h-[5px] bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-[hsl(var(--cnh-yellow))] rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          {pct}%
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {/* HOME SCREEN */}
        {screen === 'home' && (
          <div className="flex-1 overflow-y-auto">
            {/* Hero */}
            <div className="bg-gradient-to-br from-[hsl(var(--cnh-green))] to-[hsl(152,100%,15%)] px-4 py-5 pb-6 text-center relative overflow-hidden">
              <div className="absolute inset-0" style={{ background: 'repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,215,0,0.04) 20px,rgba(255,215,0,0.04) 21px)' }} />
              <div className="relative z-10">
                <span className="inline-flex items-center gap-1.5 bg-[hsl(var(--cnh-yellow))] text-[hsl(var(--cnh-green))] font-heading font-extrabold text-[0.65rem] tracking-wider uppercase px-3 py-1 rounded-full mb-3">
                  🎉 Bem-vindo ao guia
                </span>
                <h1 className="font-heading font-black text-[1.4rem] leading-tight text-white mb-2">
                  Você está a 45 dias<br />da sua <span className="text-[hsl(var(--cnh-yellow))]">CNH</span>
                </h1>
                <p className="text-[0.83rem] text-white/80 leading-relaxed">
                  Siga os módulos em ordem. Cada passo te leva mais perto da habilitação — sem autoescola, sem complicação.
                </p>
              </div>
            </div>

            {/* Overall progress */}
            <div className="px-4 py-4 bg-white border-b border-[hsl(var(--border))]">
              <div className="flex justify-between items-center mb-2">
                <span className="font-heading font-bold text-[0.78rem] text-[hsl(var(--cnh-dark))]">Seu progresso geral</span>
                <span className="font-heading font-extrabold text-[0.78rem] text-[hsl(var(--cnh-green))]">{pct}% concluído</span>
              </div>
              <div className="h-2 bg-[hsl(var(--cnh-gray-light))] rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-gradient-to-r from-[hsl(var(--cnh-green))] to-[hsl(var(--cnh-green3))] rounded-full transition-all duration-600 relative" style={{ width: `${pct}%` }}>
                  {pct > 0 && <span className="absolute -right-1 -top-1.5 text-sm">🔥</span>}
                </div>
              </div>
              <p className="text-[0.7rem] text-[hsl(var(--cnh-gray))]">{pct === 0 ? 'Comece pelo Módulo 1 👇' : pct === 100 ? 'Guia completo! 🎉' : 'Continue de onde parou 💪'}</p>
            </div>

            {/* Module list */}
            <div className="px-3.5 py-3 pb-6 flex flex-col gap-2.5">
              {modules.map(mod => {
                const unlocked = isModuleUnlocked(mod.id);
                const done = isModuleComplete(mod.id);
                const completedCount = getModuleCompletedCount(mod.id);
                const progressPct = (completedCount / mod.steps.length) * 100;

                return (
                  <div
                    key={mod.id}
                    onClick={() => openModule(mod.id)}
                    className={`bg-white border rounded-2xl overflow-hidden shadow-sm transition-all duration-150 ${
                      done ? 'border-[hsl(var(--cnh-green))]' : 'border-[hsl(var(--border))]'
                    } ${unlocked ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-md' : 'opacity-55 cursor-not-allowed'}`}
                  >
                    <div className="flex items-center gap-3 px-4 py-3.5">
                      <div
                        className="w-[46px] h-[46px] rounded-xl flex-shrink-0 flex items-center justify-center text-[22px]"
                        style={{ backgroundColor: mod.color, color: mod.iconColor }}
                      >
                        {mod.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[0.62rem] font-heading font-bold tracking-wider uppercase mb-0.5" style={{ color: mod.iconColor }}>{mod.num}</div>
                        <div className="font-heading font-extrabold text-[0.9rem] text-[hsl(var(--cnh-dark))] leading-tight">{mod.title}</div>
                        <div className="text-[0.73rem] text-[hsl(var(--cnh-gray))] mt-0.5 leading-snug">{mod.desc}</div>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-1">
                        <span className="text-lg">{!unlocked ? '🔒' : done ? '✅' : '▶️'}</span>
                        <span className="text-[0.62rem] text-[hsl(var(--cnh-gray))] font-heading font-semibold">{mod.time}</span>
                      </div>
                    </div>
                    <div className="h-1 bg-[hsl(var(--cnh-gray-light))]">
                      <div
                        className="h-full transition-all duration-500"
                        style={{
                          width: `${progressPct}%`,
                          background: done ? 'hsl(var(--cnh-green))' : `linear-gradient(90deg, hsl(var(--cnh-green)), hsl(var(--cnh-green3)))`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* MODULE SCREEN */}
        {screen === 'module' && (
          <div className="flex-1 overflow-hidden flex flex-col">
            {/* Nav */}
            <div className="flex-shrink-0 bg-white border-b border-[hsl(var(--border))] px-3.5 py-2.5 flex items-center gap-2.5">
              <button onClick={goHome} className="w-[34px] h-[34px] rounded-lg bg-[hsl(var(--cnh-gray-light))] flex items-center justify-center text-base">←</button>
              <div className="font-heading font-extrabold text-[0.88rem] text-[hsl(var(--cnh-dark))] flex-1">{activeModule.title}</div>
              <span className="text-[0.68rem] text-[hsl(var(--cnh-gray))] font-heading font-semibold whitespace-nowrap">
                Passo {activeStep + 1} de {activeModule.steps.length}
              </span>
            </div>

            {/* Step dots */}
            <div className="flex-shrink-0 px-3.5 py-2 bg-white border-b border-[hsl(var(--border))]">
              <div className="flex gap-1.5 items-center">
                {activeModule.steps.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                      isStepCompleted(activeModuleId, i) ? 'bg-[hsl(var(--cnh-green))]' :
                      i === activeStep ? 'bg-[hsl(var(--cnh-yellow2))]' :
                      'bg-[hsl(var(--cnh-gray-light))]'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="flex-1 overflow-y-auto px-3.5 py-4 pb-24">
              <div className="animate-fade-in" key={`${activeModuleId}-${activeStep}`}>
                <div className="inline-flex items-center gap-1.5 font-heading font-bold text-[0.62rem] tracking-widest uppercase text-[hsl(var(--cnh-green))] mb-2">
                  📌 {activeModule.steps[activeStep].tag}
                </div>
                <h2 className="font-heading font-black text-[1.15rem] leading-tight text-[hsl(var(--cnh-dark))] mb-2.5">
                  {activeModule.steps[activeStep].title}
                </h2>
                {activeModule.steps[activeStep].content}
              </div>
            </div>

            {/* Bottom nav */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[hsl(var(--border))] px-3.5 py-2.5 pb-4 flex gap-2 z-20 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
              {activeStep > 0 && (
                <button onClick={prevStep} className="flex-1 py-3.5 bg-[hsl(var(--cnh-gray-light))] text-[hsl(var(--cnh-dark))] rounded-xl font-heading font-extrabold text-[0.88rem]">
                  ← Voltar
                </button>
              )}
              <button
                onClick={nextStep}
                className={`flex-1 py-3.5 rounded-xl font-heading font-extrabold text-[0.88rem] transition-all ${
                  activeStep === activeModule.steps.length - 1
                    ? 'bg-[hsl(var(--cnh-yellow))] text-[hsl(var(--cnh-green))] shadow-[0_4px_14px_rgba(255,215,0,0.4)]'
                    : 'bg-[hsl(var(--cnh-green))] text-white shadow-[0_4px_14px_rgba(0,107,60,0.3)]'
                }`}
              >
                {activeStep === activeModule.steps.length - 1 ? '✅ Concluir módulo' : 'Próximo →'}
              </button>
            </div>
          </div>
        )}

        {/* CONGRATS SCREEN */}
        {screen === 'congrats' && (
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 py-8 text-center flex flex-col items-center gap-4">
              <div className="text-[5rem] animate-bounce-slow">🏆</div>
              <h2 className="font-heading font-black text-[1.6rem] leading-tight text-[hsl(var(--cnh-green))]">
                Parabéns!<br />Você concluiu<br />o guia completo!
              </h2>
              <p className="text-[0.9rem] text-[hsl(var(--cnh-gray))] leading-relaxed max-w-xs">
                Agora você tem todo o conhecimento para tirar sua CNH sozinho, economizando até R$5.000. Vai lá! 🚗
              </p>
              <button
                onClick={goHome}
                className="w-full py-4 bg-[hsl(var(--cnh-green))] rounded-2xl text-white font-heading font-extrabold text-base mt-2"
              >
                ← Revisar os módulos
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
