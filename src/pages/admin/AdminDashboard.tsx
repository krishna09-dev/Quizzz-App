import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Users, Brain, Target, TrendingUp, Plus, UserCheck } from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalQuestions: 0,
    totalAttempts: 0,
    averageScore: 0,
    recentAttempts: [] as any[],
    topPerformers: [] as any[],
  });

  useEffect(() => {
    // Mock admin stats - in real app, fetch from backend
    const mockStats = {
      totalUsers: 156,
      totalQuestions: 45,
      totalAttempts: 1247,
      averageScore: 73,
      recentAttempts: [
        { id: 1, userName: 'John Doe', score: 85, time: '2 minutes ago' },
        { id: 2, userName: 'Jane Smith', score: 92, time: '5 minutes ago' },
        { id: 3, userName: 'Mike Johnson', score: 67, time: '12 minutes ago' },
        { id: 4, userName: 'Sarah Wilson', score: 88, time: '25 minutes ago' },
        { id: 5, userName: 'Tom Brown', score: 76, time: '1 hour ago' },
      ],
      topPerformers: [
        { id: 1, name: 'Jane Smith', avgScore: 94, attempts: 15 },
        { id: 2, name: 'Alex Chen', avgScore: 91, attempts: 12 },
        { id: 3, name: 'Sarah Wilson', avgScore: 89, attempts: 18 },
        { id: 4, name: 'Mike Johnson', avgScore: 87, attempts: 20 },
        { id: 5, name: 'Lisa Davis', avgScore: 85, attempts: 14 },
      ],
    };
    setStats(mockStats);
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Admin Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your quiz platform</p>
          </div>
          
          <Button 
            variant="quiz" 
            onClick={() => navigate('/admin/add-question')}
            className="px-6"
          >
            <Plus className="w-4 h-4" />
            Add Question
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth cursor-pointer"
                onClick={() => navigate('/admin/users')}>
            <div className="flex justify-center">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Brain className="w-12 h-12 text-accent" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{stats.totalQuestions}</p>
              <p className="text-sm text-muted-foreground">Quiz Questions</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Target className="w-12 h-12 text-success" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{stats.totalAttempts}</p>
              <p className="text-sm text-muted-foreground">Total Attempts</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <TrendingUp className="w-12 h-12 text-warning" />
            </div>
            <div>
              <p className="text-3xl font-bold text-foreground">{stats.averageScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Quick Actions</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => navigate('/admin/add-question')}
            >
              <Plus className="w-6 h-6" />
              <span>Add New Question</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
              onClick={() => navigate('/admin/users')}
            >
              <Users className="w-6 h-6" />
              <span>Manage Users</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-20 flex-col space-y-2"
            >
              <Target className="w-6 h-6" />
              <span>View Analytics</span>
            </Button>
          </div>
        </Card>

        {/* Recent Activity & Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Quiz Attempts */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Recent Quiz Attempts</h3>
            
            <div className="space-y-3">
              {stats.recentAttempts.map((attempt) => (
                <div key={attempt.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <UserCheck className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium text-foreground">{attempt.userName}</p>
                      <p className="text-xs text-muted-foreground">{attempt.time}</p>
                    </div>
                  </div>
                  
                  <div className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
                    {attempt.score}%
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full">
              View All Attempts
            </Button>
          </Card>

          {/* Top Performers */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Top Performers</h3>
            
            <div className="space-y-3">
              {stats.topPerformers.map((performer, index) => (
                <div key={performer.id} className="flex justify-between items-center p-3 bg-muted/30 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      index === 0 ? 'bg-success text-success-foreground' :
                      index === 1 ? 'bg-warning text-warning-foreground' :
                      index === 2 ? 'bg-accent text-accent-foreground' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{performer.name}</p>
                      <p className="text-xs text-muted-foreground">{performer.attempts} attempts</p>
                    </div>
                  </div>
                  
                  <div className="text-lg font-bold text-success">
                    {performer.avgScore}%
                  </div>
                </div>
              ))}
            </div>
            
            <Button variant="ghost" className="w-full" onClick={() => navigate('/admin/users')}>
              View All Users
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;