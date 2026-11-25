import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PhilosophySection } from './components/PhilosophySection';
import { SolutionsSection } from './components/SolutionsSection';
import { MethodSection } from './components/MethodSection';
import { VoicesSection } from './components/VoicesSection';
import { FaqSection } from './components/FaqSection';
import { DialogueSection } from './components/DialogueSection';
import { Footer } from './components/Footer';
import { FieldStudyModal } from './components/FieldStudyModal';
import { FieldFilmModal } from './components/FieldFilmModal';
import { FluidCursor } from './components/motion/FluidCursor';
import type { SolutionItem } from './data/zauviqData';

export default function App() {
  const [selectedSolution, setSelectedSolution] = useState<SolutionItem | null>(null);
  const [fieldFilmOpen, setFieldFilmOpen] = useState(false);
  const [dialogueTopicKey, setDialogueTopicKey] = useState<{ topic: string; nonce: number } | null>(
    null
  );

  const handleDiscussChallenge = (topic: string) => {
    setDialogueTopicKey({ topic, nonce: Date.now() });
    const dialogueEl = document.getElementById('dialogue');
    if (dialogueEl) {
      dialogueEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E9EB] text-[#0B0D0E]">
      <FluidCursor />
      <Navbar />

      <main>
        <HeroSection />
        <PhilosophySection onOpenFieldFilm={() => setFieldFilmOpen(true)} />
        <SolutionsSection onSelectSolution={(solution) => setSelectedSolution(solution)} />
        <MethodSection />
        <VoicesSection />
        <FaqSection />
        <DialogueSection
          key={dialogueTopicKey ? `${dialogueTopicKey.topic}-${dialogueTopicKey.nonce}` : 'default'}
          preselectedTopic={dialogueTopicKey?.topic ?? null}
        />
      </main>

      <Footer />

      <FieldStudyModal
        solution={selectedSolution}
        onClose={() => setSelectedSolution(null)}
        onDiscussChallenge={handleDiscussChallenge}
      />

      <FieldFilmModal
        isOpen={fieldFilmOpen}
        onClose={() => setFieldFilmOpen(false)}
      />
    </div>
  );
}
