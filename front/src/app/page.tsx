'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, Trophy, Calendar, GraduationCap, MessageSquare } from 'lucide-react';
import { ContentCard } from '@/app/components/ContentCard';
import { mockContents } from '@/app/data/mockData';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Content } from '@/app/types';

const categories = [
  { id: 'all', label: '전체', icon: Filter },
  { id: 'contest', label: '공모전', icon: Trophy },
  { id: 'event', label: '이벤트', icon: Calendar },
  { id: 'education', label: '교육', icon: GraduationCap },
];

export default function HomePage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page: string, data?: any) => {
    if (page === 'detail' && data) {
      router.push(`/detail/${data.id}`);
    } else {
      router.push(`/${page}`);
    }
  };
  
  const filteredContents = mockContents.filter((content) => {
    const matchesCategory = selectedCategory === 'all' || content.category === selectedCategory;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         content.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1764263996452-d8498c9b0ce8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhYnN0cmFjdCUyMHRlY2hub2xvZ3klMjBiYWNrZ3JvdW5kJTIwYmx1ZSUyMHB1cnBsZXxlbnwxfHx8fDE3NjY0NDg4NTN8MA&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm bg-white/20 text-white hover:bg-white/30 border-none backdrop-blur-sm">
            Total Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            새로운 기회를 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">발견하세요</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            공모전, 이벤트, 교육 프로그램까지.<br className="hidden md:block"/>
            당신의 성장을 위한 모든 기회가 여기 있습니다.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
            <div className="relative bg-white rounded-full shadow-xl flex items-center p-2">
              <Search className="ml-4 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="관심있는 분야나 주제를 검색해보세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-4 py-3 bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
              />
              <Button 
                className="rounded-full px-6 bg-gray-900 hover:bg-gray-800 text-white"
                onClick={() => {}}
              >
                검색
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-grow w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories & Filter */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 sticky top-20 z-30 bg-gray-50/95 backdrop-blur-sm py-4 border-b border-gray-200/50">
          <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
            {categories.map((category) => {
              const Icon = category.icon;
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                    isSelected
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-200 scale-105'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-300' : 'text-gray-400'}`} />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="text-sm text-gray-500 mt-4 md:mt-0 font-medium">
            총 <span className="text-gray-900">{filteredContents.length}</span>개의 기회
          </div>
        </div>

        {/* Content Grid */}
        {filteredContents.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500">다른 검색어나 카테고리를 선택해보세요.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredContents.map((content) => (
              <ContentCard
                key={content.id}
                content={content}
                onClick={() => handleNavigate('detail', content)}
              />
            ))}
          </div>
        )}

        {/* Community Banner - Full Width Style */}
        <div className="mt-20">
          <div className="relative rounded-3xl overflow-hidden bg-gray-900 text-white">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-blue-900/90 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80" 
              className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale"
              alt="Community"
            />
            
            <div className="relative z-20 px-8 py-16 md:px-16 md:py-20 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">함께 성장하는 커뮤니티</h3>
                <p className="text-gray-300 text-lg max-w-xl">
                  혼자 준비하기 막막하신가요? 팀원 모집부터 합격 후기까지,<br className="hidden md:block" />
                  비슷한 목표를 가진 사람들과 정보를 공유해보세요.
                </p>
              </div>
              <Button 
                onClick={() => handleNavigate('community')}
                className="h-14 px-8 text-lg rounded-full bg-white text-gray-900 hover:bg-gray-100 border-none"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                커뮤니티 입장하기
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}