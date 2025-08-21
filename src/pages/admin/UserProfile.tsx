import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, User, Mail, Calendar, Trophy, Target, Clock, TrendingUp } from 'lucide-react';

interface UserProfileData {
  id: string;
  full_name: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  total_attempts: number;
  average_score: number;
  best_score: number;
  worst_score: number;
  total_time_spent: number;
  questions_answered: number;
  accuracy: number;
  last_attempt: string | null;
  recent_attempts: Array<{
    id: string;
    score: number;
    date: string;
    questions_total: number;
    time_spent: number;
  }>;
}

const UserProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock user profile data - in real app, fetch from backend using userId
    const mockUserProfile: UserProfileData = {
      id: userId || 'user-1',
      full_name: 'John Doe',
      email: 'user@quiz.com',
      role: 'user',
      created_at: '2024-02-01',
      total_attempts: 12,
      average_score: 78,
      best_score: 95,
      worst_score: 45,
      total_time_spent: 2340, // in seconds
      questions_answered: 156,
      accuracy: 78,
      last_attempt: '2 days ago',
      recent_attempts: [
        { id: '1', score: 85, date: '2 days ago', questions_total: 13, time_spent: 240 },
        { id: '2', score: 92, date: '1 week ago', questions_total: 13, time_spent: 180 },
        { id: '3', score: 67, date: '2 weeks ago', questions_total: 13, time_spent: 300 },
        { id: '4', score: 88, date: '3 weeks ago', questions_total: 13, time_spent: 195 },
        { id: '5', score: 76, date: '1 month ago', questions_total: 13, time_spent: 275 },
      ],
    };

    // Simulate different users based on ID
    if (userId === 'user-2') {
      mockUserProfile.full_name = 'Jane Smith';
      mockUserProfile.email = 'jane.smith@email.com';
      mockUserProfile.average_score = 92;
      mockUserProfile.best_score = 100;
      mockUserProfile.total_attempts = 18;
    } else if (userId === 'admin-1') {
      mockUserProfile.full_name = 'Quiz Admin';
      mockUserProfile.email = 'admin@quiz.com';
      mockUserProfile.role = 'admin';
      mockUserProfile.total_attempts = 0;
      mockUserProfile.average_score = 0;
      mockUserProfile.recent_attempts = [];
    }

    setUserProfile(mockUserProfile);
    setLoading(false);
  }, [userId]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const getScoreColor = (score: number) => {
    if (score === 0) return 'text-muted-foreground';
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse-glow">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">User not found</p>
          <Button variant="outline" onClick={() => navigate('/admin/users')} className="mt-4">
            Back to Users
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => navigate('/admin/users')}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">User Profile</h1>
            <p className="text-muted-foreground">Detailed view of user statistics and activity</p>
          </div>
        </div>

        {/* Profile Header */}
        <Card className="p-8">
          <div className="flex items-center space-x-6">
            <div className="p-6 bg-primary/10 rounded-full">
              <User className="w-16 h-16 text-primary" />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-3xl font-bold text-foreground">{userProfile.full_name}</h2>
                <Badge variant={userProfile.role === 'admin' ? 'default' : 'secondary'} className="text-sm">
                  {userProfile.role}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Mail className="w-4 h-4" />
                  <span>{userProfile.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span>Member since {new Date(userProfile.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {userProfile.role === 'user' && (
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Last Active</p>
                <p className="text-lg font-semibold text-foreground">
                  {userProfile.last_attempt || 'Never'}
                </p>
              </div>
            )}
          </div>
        </Card>

        {userProfile.role === 'admin' ? (
          // Admin Profile
          <Card className="p-8 text-center space-y-4">
            <div className="p-6 bg-primary/10 rounded-full w-fit mx-auto">
              <Trophy className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Administrator Account</h3>
            <p className="text-muted-foreground">
              This user has administrative privileges and can manage the quiz platform.
            </p>
          </Card>
        ) : (
          // User Profile with Stats
          <>
            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center space-y-3">
                <div className="flex justify-center">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{userProfile.total_attempts}</p>
                  <p className="text-sm text-muted-foreground">Total Quizzes</p>
                </div>
              </Card>

              <Card className="p-6 text-center space-y-3">
                <div className="flex justify-center">
                  <Trophy className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <p className={`text-3xl font-bold ${getScoreColor(userProfile.average_score)}`}>
                    {userProfile.average_score}%
                  </p>
                  <p className="text-sm text-muted-foreground">Average Score</p>
                </div>
              </Card>

              <Card className="p-6 text-center space-y-3">
                <div className="flex justify-center">
                  <TrendingUp className="w-8 h-8 text-success" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-success">{userProfile.best_score}%</p>
                  <p className="text-sm text-muted-foreground">Best Score</p>
                </div>
              </Card>

              <Card className="p-6 text-center space-y-3">
                <div className="flex justify-center">
                  <Clock className="w-8 h-8 text-warning" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {formatTime(userProfile.total_time_spent)}
                  </p>
                  <p className="text-sm text-muted-foreground">Time Spent</p>
                </div>
              </Card>
            </div>

            {/* Detailed Stats & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Performance Details */}
              <Card className="p-6 space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Performance Details</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Questions Answered</span>
                    <span className="font-semibold text-foreground">{userProfile.questions_answered}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Overall Accuracy</span>
                    <span className={`font-semibold ${getScoreColor(userProfile.accuracy)}`}>
                      {userProfile.accuracy}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Best Performance</span>
                    <span className="font-semibold text-success">{userProfile.best_score}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Lowest Score</span>
                    <span className="font-semibold text-destructive">{userProfile.worst_score}%</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Average Time per Quiz</span>
                    <span className="font-semibold text-foreground">
                      {formatTime(Math.round(userProfile.total_time_spent / userProfile.total_attempts))}
                    </span>
                  </div>
                </div>
              </Card>

              {/* Recent Quiz Results */}
              <Card className="p-6 space-y-6">
                <h3 className="text-xl font-semibold text-foreground">Recent Quiz Results</h3>
                
                <div className="space-y-3">
                  {userProfile.recent_attempts.length > 0 ? (
                    userProfile.recent_attempts.map((attempt, index) => (
                      <div 
                        key={attempt.id}
                        className="flex justify-between items-center p-3 bg-muted/30 rounded-xl"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-primary/10 rounded-full">
                            <Target className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              Quiz #{userProfile.total_attempts - index}
                            </p>
                            <p className="text-xs text-muted-foreground">{attempt.date}</p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className={`text-lg font-bold ${getScoreColor(attempt.score)}`}>
                            {attempt.score}%
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatTime(attempt.time_spent)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-muted-foreground text-center">No quiz attempts yet</p>
                  )}
                </div>
              </Card>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;