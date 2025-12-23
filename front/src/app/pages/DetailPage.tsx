import React from 'react';
import { Calendar, Users, Tag, MapPin, Share2, ArrowLeft, CheckCircle } from 'lucide-react';
import { Content } from '../types';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';

interface DetailPageProps {
  content: Content;
  onNavigate: (page: string) => void;
}

const categoryLabels: Record<string, string> = {
  contest: '공모전',
  event: '이벤트',
  education: '교육',
  community: '커뮤니티',
};

const statusLabels: Record<string, string> = {
  upcoming: '예정',
  ongoing: '진행중',
  ended: '종료',
};

export function DetailPage({ content, onNavigate }: DetailPageProps) {
  return (
    <div className="min-h-screen bg-white pb-20">
      {/* Hero Banner with Image */}
      <div className="relative h-[40vh] min-h-[400px] w-full overflow-hidden">
        <img
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover filter blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gray-900/60" />
        
        {/* Header Content */}
        <div className="absolute inset-0 flex flex-col justify-end pb-12">
          <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => onNavigate('home')}
              className="absolute top-8 left-4 sm:left-8 flex items-center space-x-2 text-white/80 hover:text-white transition-colors bg-black/20 px-4 py-2 rounded-full backdrop-blur-md"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>목록으로</span>
            </button>
            
            <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-500">
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="px-3 py-1 bg-white/20 hover:bg-white/30 text-white border-none backdrop-blur-md">
                  {categoryLabels[content.category]}
                </Badge>
                <Badge variant="outline" className="px-3 py-1 text-white border-white/40 backdrop-blur-md">
                  {statusLabels[content.status]}
                </Badge>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight max-w-4xl">
                {content.title}
              </h1>
              
              <div className="flex items-center text-gray-200 text-lg">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="font-medium">{content.organizer}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Description (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center">
                <span className="w-1.5 h-8 bg-blue-600 rounded-full mr-3"></span>
                상세 정보
              </h2>
              <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed whitespace-pre-line">
                {content.description}
                <p className="mt-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="mt-4">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-bold mb-6 text-gray-900">태그</h2>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700">
                    <Tag className="w-3.5 h-3.5 mr-2 text-gray-500" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="border-none shadow-xl bg-white/50 backdrop-blur-sm ring-1 ring-gray-200">
                <CardContent className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="p-3 bg-blue-50 rounded-lg mr-4">
                        <Calendar className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">진행 기간</p>
                        <p className="text-lg font-semibold text-gray-900">{content.startDate} ~ {content.endDate}</p>
                      </div>
                    </div>
                    
                    {content.maxParticipants && (
                      <div className="flex items-start">
                        <div className="p-3 bg-purple-50 rounded-lg mr-4">
                          <Users className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">참가 현황</p>
                          <p className="text-lg font-semibold text-gray-900">
                            {content.currentParticipants} <span className="text-gray-400 font-normal">/ {content.maxParticipants}명</span>
                          </p>
                          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
                            <div 
                              className="bg-purple-600 h-2 rounded-full" 
                              style={{ width: `${(content.currentParticipants / content.maxParticipants) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator />
                  
                  <div className="grid gap-3">
                    <Button className="w-full h-12 text-lg font-medium bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200">
                      지금 신청하기
                    </Button>
                    <Button variant="outline" className="w-full h-12 text-lg font-medium">
                      <Share2 className="w-4 h-4 mr-2" />
                      공유하기
                    </Button>
                  </div>

                  <p className="text-xs text-center text-gray-400">
                    신청 마감일까지 3일 남았습니다
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                    <span className="font-semibold">참여 혜택</span>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center">• 수료증 발급</li>
                    <li className="flex items-center">• 우수 참여자 시상</li>
                    <li className="flex items-center">• 실무 멘토링 기회</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
