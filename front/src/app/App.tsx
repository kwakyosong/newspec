import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { DetailPage } from './pages/DetailPage';
import { CommunityPage } from './pages/CommunityPage';
import { CareerMapPage } from './pages/CareerMapPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ContentsManagePage } from './pages/admin/ContentsManagePage';
import { UsersManagePage } from './pages/admin/UsersManagePage';
import { Content } from './types';

type Page = 'home' | 'detail' | 'community' | 'career-map' | 'login' | 'admin-dashboard' | 'admin-contents' | 'admin-users';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedContent, setSelectedContent] = useState<Content | null>(null);
  const { user } = useAuth();

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page as Page);
    if (page === 'detail' && data) {
      setSelectedContent(data);
    }
    // Scroll to top when navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'detail':
        return selectedContent ? (
          <DetailPage content={selectedContent} onNavigate={handleNavigate} />
        ) : (
          <HomePage onNavigate={handleNavigate} />
        );
      case 'community':
        return <CommunityPage onNavigate={handleNavigate} />;
      case 'career-map':
        return <CareerMapPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        if (!user || (user.role !== 'super_admin' && user.role !== 'company_admin')) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <DashboardPage />;
      case 'admin-contents':
        if (!user || (user.role !== 'super_admin' && user.role !== 'company_admin')) {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <ContentsManagePage />;
      case 'admin-users':
        if (!user || user.role !== 'super_admin') {
          return <LoginPage onNavigate={handleNavigate} />;
        }
        return <UsersManagePage />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  const showHeader = currentPage !== 'login';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {showHeader && (
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
      )}
      <main className="flex-grow">
        {renderPage()}
      </main>
      {showHeader && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
