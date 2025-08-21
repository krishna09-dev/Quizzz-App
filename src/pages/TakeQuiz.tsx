import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Question, mockQuestions } from '@/lib/supabase';
import { Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const TakeQuiz = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [questions] = useState<Question[]>(mockQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  useEffect(() => {
    if (quizStarted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            // Time's up - auto submit
            finishQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizStarted, timeRemaining]);

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const selectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    // Calculate results
    const results = questions.map((question, index) => ({
      question_id: question.id,
      selected_answer: selectedAnswers[index] || '',
      is_correct: selectedAnswers[index] === question.correct_answer,
    }));

    const score = results.filter(r => r.is_correct).length;
    const percentage = Math.round((score / questions.length) * 100);

    // In real app, save to backend
    navigate('/result', { 
      state: { 
        score: percentage, 
        results,
        totalQuestions: questions.length,
        timeSpent: 300 - timeRemaining 
      } 
    });
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto p-6">
          <div className="max-w-2xl mx-auto">
            <Card className="p-8 text-center space-y-6">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Quiz Instructions</h1>
                <p className="text-muted-foreground">
                  Welcome to the QuizMaster challenge! Here's what you need to know:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">Questions</h3>
                  <p className="text-sm text-muted-foreground">{questions.length} multiple choice questions</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">Time Limit</h3>
                  <p className="text-sm text-muted-foreground">5 minutes to complete</p>
                </div>
                <div className="p-4 bg-success/10 rounded-xl">
                  <h3 className="font-semibold text-foreground mb-2">Scoring</h3>
                  <p className="text-sm text-muted-foreground">1 point per correct answer</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Choose the best answer for each question</p>
                  <p>• You cannot go back to previous questions</p>
                  <p>• Quiz will auto-submit when time runs out</p>
                </div>
                
                <Button 
                  variant="quiz" 
                  size="lg" 
                  onClick={startQuiz}
                  className="text-lg px-8"
                >
                  Start Quiz
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Quiz Header */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </span>
                <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm ${
                  timeRemaining > 60 ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'
                }`}>
                  <Clock className="w-4 h-4" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>
            </div>
            
            <Progress value={progress} className="mb-4" />
          </Card>

          {/* Question Card */}
          <Card className="p-8 space-y-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <span className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                  {currentQuestionIndex + 1}
                </span>
                <h2 className="text-xl font-semibold text-foreground leading-relaxed">
                  {currentQuestion?.question_text}
                </h2>
              </div>

              {currentQuestion?.category && (
                <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm">
                  {currentQuestion.category}
                </span>
              )}
            </div>

            {/* Answer Options */}
            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map((option) => {
                const optionText = currentQuestion?.[`option_${option.toLowerCase()}` as keyof Question] as string;
                const isSelected = selectedAnswers[currentQuestionIndex] === option;

                return (
                  <button
                    key={option}
                    onClick={() => selectAnswer(option)}
                    className={`w-full p-4 text-left rounded-xl border transition-smooth ${
                      isSelected
                        ? 'border-primary bg-primary/10 text-primary'
                        : 'border-border bg-background hover:border-primary/50 hover:bg-card-hover'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                        isSelected 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted text-muted-foreground'
                      }`}>
                        {option}
                      </span>
                      <span className="text-foreground">{optionText}</span>
                      {isSelected && <CheckCircle className="w-5 h-5 text-primary ml-auto" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <div className="text-sm text-muted-foreground">
                {selectedAnswers[currentQuestionIndex] 
                  ? 'Answer selected' 
                  : 'Select an answer to continue'
                }
              </div>
              
              <Button
                onClick={nextQuestion}
                disabled={!selectedAnswers[currentQuestionIndex]}
                variant="quiz"
                size="lg"
              >
                {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TakeQuiz;