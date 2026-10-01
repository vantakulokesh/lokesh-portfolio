import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience, Education } from './components/Experience';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { EditProfileModal } from './components/EditProfileModal';
import { ProfileProvider } from './lib/useProfile';
import { AdminProvider, useAdmin } from './lib/useAdmin';

function AppContent() {
  const [editOpen, setEditOpen] = useState(false);
  const { adminMode } = useAdmin();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <About onEdit={adminMode ? () => setEditOpen(true) : undefined} />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <ProfileProvider>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </ProfileProvider>
  );
}
