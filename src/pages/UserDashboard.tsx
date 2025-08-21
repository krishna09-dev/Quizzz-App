import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Brain, Play, Trophy, Target, Clock } from 'lucide-react';
import { Attempt } from '@/lib/supabase';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userStats, setUserStats] = useState({
    totalAttempts: 0,
    averageScore: 0,
    bestScore: 0,
    lastAttempt: null as string | null,
  });

  useEffect(() => {
    // Mock user stats - in real app, fetch from backend
    const mockStats = {
      totalAttempts: 12,
      averageScore: 78,
      bestScore: 95,
      lastAttempt: '2 days ago',
    };
    setUserStats(mockStats);
  }, []);

  const startQuiz = () => {
    navigate('/take-quiz');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Welcome Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-6 bg-quiz-gradient rounded-full shadow-glow-primary">
              <Brain className="w-16 h-16 text-white" />
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-bold text-foreground">
              Welcome back, {user?.full_name}!
            </h1>
            <p className="text-xl text-muted-foreground">Ready to test your knowledge?</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{userStats.totalAttempts}</p>
              <p className="text-sm text-muted-foreground">Total Attempts</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Trophy className="w-8 h-8 text-accent" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{userStats.averageScore}%</p>
              <p className="text-sm text-muted-foreground">Average Score</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Trophy className="w-8 h-8 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{userStats.bestScore}%</p>
              <p className="text-sm text-muted-foreground">Best Score</p>
            </div>
          </Card>

          <Card className="p-6 text-center space-y-3 hover:bg-card-hover transition-smooth">
            <div className="flex justify-center">
              <Clock className="w-8 h-8 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{userStats.lastAttempt || 'Never'}</p>
              <p className="text-sm text-muted-foreground">Last Attempt</p>
            </div>
          </Card>
        </div>

        {/* Start Quiz Section */}
        <Card className="p-8 text-center space-y-6 bg-quiz-gradient">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Ready for a Challenge?</h2>
            <p className="text-white/80 text-lg">
              Test your knowledge with our curated quiz questions
            </p>
          </div>
          
          <Button 
            variant="secondary" 
            size="lg" 
            onClick={startQuiz}
            className="text-lg px-8 py-6 hover:scale-105 transition-smooth"
          >
            <Play className="w-6 h-6" />
            Start Quiz Now
          </Button>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <Trophy className="w-5 h-5 mr-2 text-primary" />
              Recent Performance
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Quiz Score:</span>
                <span className="font-semibold text-success">85%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Questions Answered:</span>
                <span className="font-semibold text-foreground">156</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Accuracy Rate:</span>
                <span className="font-semibold text-accent">78%</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center">
              <Brain className="w-5 h-5 mr-2 text-primary" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={() => navigate('/profile')}
              >
                View Full Profile
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start" 
                onClick={startQuiz}
              >
                Take Practice Quiz
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;