import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';

import { LandingPage, AboutPage, FeaturesPage, LoginPage, RegisterPage } from './pages/LandingPage';
import { AIMentorPage } from './pages/AIMentorPage';
import { DashboardPage, CareerAssessmentPage } from './pages/DashboardPage';
import { CareerExplorerPage, SkillGapPage, LearningRoadmapPage } from './pages/CareerExplorerPage';
import { ResumeBuilderPage, ResumeAnalyzerPage } from './pages/ResumeBuilderPage';
import { InterviewPrepPage, ScholarshipsPage, CollegePredictorPage } from './pages/InterviewPrepPage';
import { InternshipsPage, CommunityPage, ProfilePage } from './pages/InternshipsPage';
import { SettingsPage, NotificationsPage, AdminPage, ContactPage, FAQPage } from './pages/SettingsPage';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isPublic = ['/', '/about', '/features', '/contact', '/faq', '/login', '/register'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-dark-bg text-slate-100 flex flex-col font-sans">
      <Navbar />
      <div className="flex-1 flex">
        {!isPublic && <Sidebar />}
        <main className="flex-1 w-full overflow-x-hidden">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<FAQPage />} />

            {/* Dedicated SaaS Feature Routes */}
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/ai-mentor" element={<AIMentorPage />} />
            <Route path="/career-assessment" element={<CareerAssessmentPage />} />
            <Route path="/career-explorer" element={<CareerExplorerPage />} />
            <Route path="/skill-gap" element={<SkillGapPage />} />
            <Route path="/learning-roadmap" element={<LearningRoadmapPage />} />
            <Route path="/resume-builder" element={<ResumeBuilderPage />} />
            <Route path="/resume-analyzer" element={<ResumeAnalyzerPage />} />
            <Route path="/interview-prep" element={<InterviewPrepPage />} />
            <Route path="/scholarships" element={<ScholarshipsPage />} />
            <Route path="/college-predictor" element={<CollegePredictorPage />} />
            <Route path="/internships" element={<InternshipsPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <AppContent />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
