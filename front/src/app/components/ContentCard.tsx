import React from 'react';
import { Calendar, Users, Tag, ArrowUpRight } from 'lucide-react';
import { Content } from '../types';
import { Badge } from './ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

interface ContentCardProps {
  content: Content;
  onClick: () => void;
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

const statusConfig: Record<string, { className: string }> = {
  upcoming: { className: 'bg-blue-50 text-blue-700 border-blue-100' },
  ongoing: { className: 'bg-green-50 text-green-700 border-green-100' },
  ended: { className: 'bg-gray-100 text-gray-500 border-gray-200' },
};

export function ContentCard({ content, onClick }: ContentCardProps) {
  const status = statusConfig[content.status] || statusConfig.ended;

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
        <img
          src={content.image}
          alt={content.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="absolute top-4 left-4 flex gap-2">
          <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm border-none font-medium">
            {categoryLabels[content.category]}
          </Badge>
          <Badge variant="outline" className={`${status.className} border bg-white/90 backdrop-blur-sm`}>
            {statusLabels[content.status]}
          </Badge>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-white text-gray-900 rounded-full p-2 shadow-lg">
            <ArrowUpRight className="w-5 h-5" />
          </div>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {content.title}
        </h3>
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow">
          {content.description}
        </p>
        
        <div className="space-y-3 pt-4 border-t border-gray-50 mt-auto">
          <div className="flex items-center text-sm text-gray-500 font-medium">
            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
            {content.startDate} ~ {content.endDate}
          </div>
          {content.maxParticipants && (
            <div className="flex items-center text-sm text-gray-500 font-medium">
              <Users className="w-4 h-4 mr-2 text-gray-400" />
              {content.currentParticipants} / {content.maxParticipants}명 참여중
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1.5 mt-4">
          {content.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2.5 py-1 bg-gray-50 text-gray-600 rounded-md text-xs font-medium border border-gray-100 flex items-center">
              <Tag className="w-3 h-3 mr-1.5 text-gray-400" />
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
