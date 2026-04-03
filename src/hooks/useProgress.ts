import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'cnh-guide-progress';

interface ProgressState {
  completedSteps: Record<number, number[]>; // moduleId -> stepIndices completed
}

function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedSteps: {} };
}

function saveProgress(state: ProgressState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function useProgress(totalModules: { id: number; stepCount: number }[]) {
  const [progress, setProgress] = useState<ProgressState>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const isStepCompleted = useCallback((moduleId: number, stepIndex: number) => {
    return progress.completedSteps[moduleId]?.includes(stepIndex) ?? false;
  }, [progress]);

  const getModuleCompletedCount = useCallback((moduleId: number) => {
    return progress.completedSteps[moduleId]?.length ?? 0;
  }, [progress]);

  const isModuleComplete = useCallback((moduleId: number) => {
    const mod = totalModules.find(m => m.id === moduleId);
    if (!mod) return false;
    return getModuleCompletedCount(moduleId) >= mod.stepCount;
  }, [progress, totalModules, getModuleCompletedCount]);

  const isModuleUnlocked = useCallback((moduleId: number) => {
    if (moduleId === 1) return true;
    const prevMod = totalModules.find(m => m.id === moduleId - 1);
    if (!prevMod) return true;
    return isModuleComplete(prevMod.id);
  }, [totalModules, isModuleComplete]);

  const completeStep = useCallback((moduleId: number, stepIndex: number) => {
    setProgress(prev => {
      const existing = prev.completedSteps[moduleId] ?? [];
      if (existing.includes(stepIndex)) return prev;
      return {
        completedSteps: {
          ...prev.completedSteps,
          [moduleId]: [...existing, stepIndex],
        },
      };
    });
  }, []);

  const overallProgress = useCallback(() => {
    const totalSteps = totalModules.reduce((sum, m) => sum + m.stepCount, 0);
    if (totalSteps === 0) return 0;
    const completed = totalModules.reduce((sum, m) => sum + getModuleCompletedCount(m.id), 0);
    return Math.round((completed / totalSteps) * 100);
  }, [progress, totalModules, getModuleCompletedCount]);

  const allComplete = useCallback(() => {
    return totalModules.every(m => isModuleComplete(m.id));
  }, [totalModules, isModuleComplete]);

  const resetProgress = useCallback(() => {
    setProgress({ completedSteps: {} });
  }, []);

  return {
    isStepCompleted,
    getModuleCompletedCount,
    isModuleComplete,
    isModuleUnlocked,
    completeStep,
    overallProgress,
    allComplete,
    resetProgress,
  };
}
