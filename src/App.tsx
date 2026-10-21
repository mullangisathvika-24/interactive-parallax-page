/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { JourneyProgress } from './components/JourneyProgress';
import { SceneOpening } from './components/SceneOpening';
import { SceneMorning } from './components/SceneMorning';
import { SceneLittleThings } from './components/SceneLittleThings';
import { SceneRain } from './components/SceneRain';
import { ScenePeople } from './components/ScenePeople';
import { SceneBecoming } from './components/SceneBecoming';
import { SceneClosing } from './components/SceneClosing';
import { KindnessModal } from './components/KindnessModal';
import { PetalsCanvas } from './components/PetalsCanvas';
import { Footer } from './components/Footer';
import { soundscape } from './utils/audio';
import { INITIAL_KINDNESS_NOTES } from './data/notes';
import { KindnessNote, SceneId } from './types';
import { useScrollParallax } from './hooks/useScrollParallax';

const STORAGE_KEY_NOTES = 'ltbw_kindness_notes';
const STORAGE_KEY_MOTION = 'ltbw_reduced_motion';

export default function App() {
  const [activeScene, setActiveScene] = useState<SceneId>('opening');
  const [isMuted, setIsMuted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isKindnessOpen, setIsKindnessOpen] = useState(false);
  const [notes, setNotes] = useState<KindnessNote[]>(() => {
    if (typeof window === 'undefined') return INITIAL_KINDNESS_NOTES;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_NOTES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Fallback
    }
    return INITIAL_KINDNESS_NOTES;
  });

  // Check initial reduced motion preference
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY_MOTION);
    if (saved !== null) {
      setReducedMotion(saved === 'true');
    } else if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
    }
  }, []);

  // Parallax engine tracking scroll and mouse
  const { scrollY, viewportHeight, mouseX, mouseY } = useScrollParallax(!reducedMotion);

  const handleToggleMotion = () => {
    setReducedMotion((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_MOTION, String(next));
      return next;
    });
  };

  const handleToggleMute = () => {
    const muted = soundscape.toggleMute();
    setIsMuted(muted);
  };

  const handleAddNote = (newNote: KindnessNote) => {
    const updated = [newNote, ...notes];
    setNotes(updated);
    try {
      localStorage.setItem(STORAGE_KEY_NOTES, JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  // Scroll depth ratio and active section detection
  const docHeight = typeof document !== 'undefined'
    ? document.documentElement.scrollHeight - viewportHeight
    : 1000;
  const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;

  useEffect(() => {
    const sceneIds: SceneId[] = [
      'opening',
      'morning',
      'little-things',
      'rain',
      'people',
      'becoming',
      'closing',
    ];

    for (let i = sceneIds.length - 1; i >= 0; i--) {
      const el = document.getElementById(sceneIds[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= viewportHeight * 0.45) {
          setActiveScene(sceneIds[i]);
          break;
        }
      }
    }
  }, [scrollY, viewportHeight]);

  const scrollToScene = useCallback((id: SceneId) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const handleStartWalk = useCallback(() => {
    soundscape.playSoftChime(523.25);
    scrollToScene('morning');
  }, [scrollToScene]);

  const handleBackToTop = useCallback(() => {
    soundscape.playSoftChime(880);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="relative min-h-screen bg-[#FAF6EF] text-[#2C2825] selection:bg-[#EBDBCB] selection:text-[#382618]">
      {/* Drifting Cherry Blossom Petals Canvas */}
      <PetalsCanvas reducedMotion={reducedMotion} />

      {/* Header following the Top Bar Contract */}
      <Header
        onOpenKindness={() => setIsKindnessOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        reducedMotion={reducedMotion}
        onToggleMotion={handleToggleMotion}
      />

      {/* Floating Journey Progress indicator */}
      <JourneyProgress
        progress={scrollProgress}
        activeScene={activeScene}
        onSelectScene={scrollToScene}
      />

      {/* Main Narrative Flow with Multi-Layer Parallax */}
      <main id="main-content">
        {/* Scene 00: Opening - "Hey, you're here." */}
        <SceneOpening
          onStartWalk={handleStartWalk}
          reducedMotion={reducedMotion}
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        {/* Scene 01: The Morning - Sleeping cat, stray sock */}
        <SceneMorning
          reducedMotion={reducedMotion}
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        {/* Scene 02: The Little Things - Street scene, bicycle bell, wall notes */}
        <SceneLittleThings
          reducedMotion={reducedMotion}
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        {/* Scene 03: Rain Has Its Own Plans - Rainy window, weather toggle */}
        <SceneRain
          reducedMotion={reducedMotion}
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        {/* Scene 04: People Who Make It Better - Twilight park vignettes */}
        <ScenePeople
          reducedMotion={reducedMotion}
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        {/* Scene 05: The Things We're Still Becoming - Origami dreams, quiet wisdom */}
        <SceneBecoming
          reducedMotion={reducedMotion}
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          mouseX={mouseX}
          mouseY={mouseY}
        />

        {/* Scene 06: A Small Note Before You Go - Sunset, sleeping cat, kindness notes */}
        <SceneClosing
          onOpenKindness={() => setIsKindnessOpen(true)}
          onBackToTop={handleBackToTop}
          reducedMotion={reducedMotion}
          scrollY={scrollY}
          viewportHeight={viewportHeight}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Kindness Jar Modal */}
      <KindnessModal
        isOpen={isKindnessOpen}
        onClose={() => setIsKindnessOpen(false)}
        notes={notes}
        onAddNote={handleAddNote}
      />
    </div>
  );
}
