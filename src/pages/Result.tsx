import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trophy, CheckCircle, XCircle, Home, RotateCcw, Clock } from 'lucide-react';

const Result = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const { 
    score, 
    results, 
    totalQuestions,
    timeSpent 
  } = location.state || { 
    score: 0, 
    results: [], 
    totalQuestions: 0,
    timeSpent: 0 
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { title: "Outstanding!", message: "You're a true quiz master!" };
    if (score >= 80) return { title: "Excellent!", message: "Great job on this quiz!" };
    if (score >= 70) return { title: "Well Done!", message: "Good performance overall!" };
    if (score >= 60) return { title: "Not Bad!", message: "Room for improvement, keep practicing!" };
    return { title: "Keep Learning!", message: "Don't give up, practice makes perfect!" };
  };

  const correctAnswers = results.filter((r: any) => r.is_correct).length;
  const scoreMessage = getScoreMessage(score);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Results Header */}
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className={`p-8 rounded-full ${score >= 80 ? 'bg-success/10' : score >= 60 ? 'bg-warning/10' : 'bg-destructive/10'}`}>
                <Trophy className={`w-20 h-20 ${getScoreColor(score)}`} />
              </div>
            </div>
            
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-2">
                {scoreMessage.title}
              </h1>
              <p className="text-xl text-muted-foreground">
                {scoreMessage.message}
              </p>
            </div>
          </div>

          {/* Score Summary */}
          <Card className="p-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold text-foreground">Your Score</h2>
                <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
                  {score}%
                </div>
                <p className="text-muted-foreground">
                  {correctAnswers} out of {totalQuestions} questions correct
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-success">{correctAnswers}</div>
                  <p className="text-sm text-muted-foreground">Correct</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-destructive">{totalQuestions - correctAnswers}</div>
                  <p className="text-sm text-muted-foreground">Incorrect</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent">{formatTime(timeSpent)}</div>
                  <p className="text-sm text-muted-foreground">Time Taken</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Detailed Results */}
          <Card className="p-6 space-y-4">
            <h3 className="text-xl font-semibold text-foreground mb-4">Question Review</h3>
            
            <div className="space-y-4">
              {results.map((result: any, index: number) => (
                <div 
                  key={index}
                  className={`p-4 rounded-xl border ${
                    result.is_correct 
                      ? 'border-success/20 bg-success/5' 
                      : 'border-destructive/20 bg-destructive/5'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-1 rounded-full ${
                      result.is_correct ? 'bg-success/10' : 'bg-destructive/10'
                    }`}>
                      {result.is_correct ? (
                        <CheckCircle className="w-5 h-5 text-success" />
                      ) : (
                        <XCircle className="w-5 h-5 text-destructive" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <p className="font-medium text-foreground">
                        Question {index + 1}
                      </p>
                      <div className="text-sm text-muted-foreground mt-1">
                        Your answer: <span className="font-medium">{result.selected_answer}</span>
                        {!result.is_correct && (
                          <span className="ml-4">
                            Correct answer: <span className="font-medium text-success">
                              {/* In real app, you'd show the correct answer text */}
                              {result.correct_answer}
                            </span>
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="quiz"
              size="lg"
              onClick={() => navigate('/take-quiz')}
              className="px-8"
            >
              <RotateCcw className="w-4 h-4" />
              Take Another Quiz
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/')}
              className="px-8"
            >
              <Home className="w-4 h-4" />
              Back to Dashboard
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/profile')}
              className="px-8"
            >
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;