import React from 'react';
import { BarChart3, Users, Calendar, TrendingUp, Trophy, GraduationCap } from 'lucide-react';
import { mockContents, mockCommunityPosts } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const stats = [
  {
    label: '전체 콘텐츠',
    value: mockContents.length,
    icon: Calendar,
    color: 'bg-blue-500',
    change: '+12%',
  },
  {
    label: '진행중',
    value: mockContents.filter(c => c.status === 'ongoing').length,
    icon: TrendingUp,
    color: 'bg-green-500',
    change: '+5%',
  },
  {
    label: '총 참가자',
    value: mockContents.reduce((sum, c) => sum + c.currentParticipants, 0),
    icon: Users,
    color: 'bg-purple-500',
    change: '+23%',
  },
  {
    label: '커뮤니티 게시글',
    value: mockCommunityPosts.length,
    icon: BarChart3,
    color: 'bg-orange-500',
    change: '+8%',
  },
];

export function DashboardPage() {
  const recentContents = mockContents.slice(0, 5);
  const categoryStats = [
    { category: '공모전', count: mockContents.filter(c => c.category === 'contest').length, icon: Trophy },
    { category: '이벤트', count: mockContents.filter(c => c.category === 'event').length, icon: Calendar },
    { category: '교육', count: mockContents.filter(c => c.category === 'education').length, icon: GraduationCap },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">대시보드</h1>
        <p className="text-muted-foreground">플랫폼 현황을 한눈에 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-y-0 pb-2">
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <span className="text-green-600 text-xs font-bold">{stat.change}</span>
                </div>
                <div className="flex items-center gap-4 pt-4">
                  <div className={`${stat.color} p-2 rounded-lg`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Stats */}
        <Card>
          <CardHeader>
            <CardTitle>카테고리별 현황</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categoryStats.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted p-2 rounded-full">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-medium">{item.category}</span>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    {item.count}개
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>상태별 분포</CardTitle>
            <CardDescription>전체 콘텐츠의 진행 상태입니다.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">진행중</span>
                <span className="text-muted-foreground">
                  {mockContents.filter(c => c.status === 'ongoing').length}개
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(mockContents.filter(c => c.status === 'ongoing').length / mockContents.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">예정</span>
                <span className="text-muted-foreground">
                  {mockContents.filter(c => c.status === 'upcoming').length}개
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(mockContents.filter(c => c.status === 'upcoming').length / mockContents.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">종료</span>
                <span className="text-muted-foreground">
                  {mockContents.filter(c => c.status === 'ended').length}개
                </span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div
                  className="bg-gray-500 h-2 rounded-full transition-all duration-500"
                  style={{
                    width: `${(mockContents.filter(c => c.status === 'ended').length / mockContents.length) * 100}%`
                  }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Contents */}
      <Card>
        <CardHeader>
          <CardTitle>최근 등록된 콘텐츠</CardTitle>
          <CardDescription>가장 최근에 등록된 5개의 콘텐츠입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">제목</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">카테고리</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">상태</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">참가자</th>
                  <th className="px-4 py-3 text-left font-medium text-muted-foreground">등록일</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentContents.map((content) => (
                  <tr key={content.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium">{content.title}</td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className="font-normal">
                        {content.category === 'contest' ? '공모전' : 
                         content.category === 'event' ? '이벤트' :
                         content.category === 'education' ? '교육' : '커뮤니티'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant="secondary" 
                        className={`font-normal ${
                          content.status === 'ongoing' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                          content.status === 'upcoming' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' :
                          'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {content.status === 'ongoing' ? '진행중' :
                         content.status === 'upcoming' ? '예정' : '종료'}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {content.currentParticipants}
                      {content.maxParticipants && ` / ${content.maxParticipants}`}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{content.createdAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
