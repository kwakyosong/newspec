'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/app/contexts/AuthContext';

export function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isAdminPage = pathname.startsWith('/admin');

  const userNavItems = [
    { href: '/', label: '홈' },
    { href: '/community', label: '커뮤니티' },
    { href: '/career-map', label: '커리어 맵' },
  ];

  const adminNavItems = [
    { href: '/admin/dashboard', label: '대시보드' },
    { href: '/admin/contents', label: '콘텐츠 관리' },
    ...(user?.role === 'super_admin'
      ? [{ href: '/admin/users', label: '사용자 관리' }]
      : []),
  ];

  const navItems = isAdminPage ? adminNavItems : userNavItems;

  const handleNavigate = (href: string) => {
    router.push(href);
    setMobileMenuOpen(false);
  };
  
  return (
    <header className="bg-white/90 backdrop-blur-md border-b sticky top-0 z-50">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={isAuthenticated && (user?.role === 'super_admin' || user?.role === 'company_admin') ? '/admin/dashboard' : '/'} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
            <span className="font-bold text-xl">PLATFORM</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition-colors ${
                  pathname === item.href
                    ? 'text-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-sm">
                  <User className="w-4 h-4" />
                  <span>{user?.name}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                    {user?.role === 'super_admin'
                      ? '슈퍼관리자'
                      : user?.role === 'company_admin'
                      ? '기업관리자'
                      : '사용자'}
                  </span>
                </div>
                {(user?.role === 'super_admin' || user?.role === 'company_admin') && !isAdminPage && (
                  <button
                    onClick={() => router.push('/admin/dashboard')}
                    className="flex items-center space-x-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>관리자</span>
                  </button>
                )}
                {isAdminPage && (
                  <Link
                    href="/"
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    사용자 페이지
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>로그아웃</span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                로그인
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavigate(item.href)}
                className={`block w-full text-left px-4 py-2 rounded-lg ${
                  pathname === item.href
                    ? 'bg-blue-50 text-blue-600'
                    : 'hover:bg-gray-50'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 text-sm text-gray-600">
                  {user?.name} ({user?.role === 'super_admin' ? '슈퍼관리자' : user?.role === 'company_admin' ? '기업관리자' : '사용자'})
                </div>
                {(user?.role === 'super_admin' || user?.role === 'company_admin') && !isAdminPage && (
                  <button
                    onClick={() => handleNavigate('/admin/dashboard')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    관리자 페이지
                  </button>
                )}
                {isAdminPage && (
                  <button
                    onClick={() => handleNavigate('/')}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 rounded-lg"
                  >
                    사용자 페이지
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigate('/login')}
                className="block w-full text-left px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                로그인
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}