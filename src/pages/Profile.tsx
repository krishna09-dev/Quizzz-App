import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Trophy, Target, Clock, TrendingUp, Calendar } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    worstScore: 0,
    totalTimeSpent: 0,
    questionsAnswered: 0,
    accuracy: 0,
    lastAttempt: null as string | null,
    recentAttempts: [] as any[],
  });

  useEffect(() => {
    // Mock user detailed stats - in real app, fetch from backend
    const mockDetailedStats = {
      totalAttempts: 12,
      averageScore: 78,
      bestScore: 95,
      worstScore: 45,
      totalTimeSpent: 2340, // in seconds
      questionsAnswered: 156,
      accuracy: 78,
      lastAttempt: '2 days ago',
      recentAttempts: [
        { id: 1, score: 85, date: '2 days ago', questionsTotal: 13 },
        { id: 2, score: 92, date: '1 week ago', questionsTotal: 13 },
        { id: 3, score: 67, date: '2 weeks ago', questionsTotal: 13 },
        { id: 4, score: 88, date: '3 weeks ago', questionsTotal: 13 },
        { id: 5, score: 76, date: '1 month ago', questionsTotal: 13 },
      ],
    };
    setUserStats(mockDetailedStats);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <Card className="p-8">
          <div className="flex items-center space-x-6">
            <div className="p-6 bg-primary/10 rounded-full">
              <User className="w-16 h-16 text-primary" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground">{user?.full_name}</h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {user?.role === 'admin' ? 'Administrator' : 'Quiz Taker'}
                </span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-sm text-muted-foreground">Member since</p>
              <p className="text-foreground font-medium">
                {new Date(user?.created_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{userStats.totalAttempts}</p>
              <p className="text-sm text-muted-foreground">Total Quizzes</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{userStats.averageScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{userStats.bestScore}%</p>
              <p className="text-sm text-muted-foreground">Best Score</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Clock className="w-8 h-8 text-warning" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">
                {formatTime(userStats.totalTimeSpent)}
              </p>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </div>
          </Card>
        </div>

        {/* Detailed Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Overview */}
          <Card className="p-6 space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Performance Overview</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Questions Answered</span>
                <span className="font-semibold text-foreground">{userStats.questionsAnswered}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Overall Accuracy</span>
                <span className={`font-semibold ${getScoreColor(userStats.accuracy)}`}>
                  {userStats.accuracy}%
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Best Performance</span>
                <span className="font-semibold text-success">{userStats.bestScore}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Lowest Score</span>
                <span className="font-semibold text-destructive">{userStats.worstScore}%</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Activity</span>
                <span className="font-semibold text-foreground">{userStats.lastAttempt}</span>
              </div>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 space-y-6">
            <h3 className="text-xl font-semibold text-foreground">Recent Quiz Results</h3>
            
            <div className="space-y-3">
              {userStats.recentAttempts.map((attempt, index) => (
                <div 
                  key={attempt.id}
                  className="flex justify-between items-center p-3 bg-muted/30 rounded-xl"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Quiz #{userStats.totalAttempts - index}</p>
                      <p className="text-xs text-muted-foreground">{attempt.date}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
                      {attempt.score}%
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {attempt.questionsTotal} questions
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Achievement Badges */}
        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Achievements</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`p-4 rounded-xl text-center ${userStats.totalAttempts >= 10 ? 'bg-success/10 border border-success/20' : 'bg-muted/30'}`}>
              <Trophy className={`w-8 h-8 mx-auto mb-2 ${userStats.totalAttempts >= 10 ? 'text-success' : 'text-muted-foreground'}`} />
              <p className="font-medium text-sm">Quiz Master</p>
              <p className="text-xs text-muted-foreground">Complete 10 quizzes</p>
            </div>
            
            <div className={`p-4 rounded-xl text-center ${userStats.bestScore >= 90 ? 'bg-accent/10 border border-accent/20' : 'bg-muted/30'}`}>
              <Target className={`w-8 h-8 mx-auto mb-2 ${userStats.bestScore >= 90 ? 'text-accent' : 'text-muted-foreground'}`} />
              <p className="font-medium text-sm">Perfectionist</p>
              <p className="text-xs text-muted-foreground">Score 90% or higher</p>
            </div>
            
            <div className={`p-4 rounded-xl text-center ${userStats.averageScore >= 75 ? 'bg-primary/10 border border-primary/20' : 'bg-muted/30'}`}>
              <TrendingUp className={`w-8 h-8 mx-auto mb-2 ${userStats.averageScore >= 75 ? 'text-primary' : 'text-muted-foreground'}`} />
              <p className="font-medium text-sm">Consistent</p>
              <p className="text-xs text-muted-foreground">75% average score</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;