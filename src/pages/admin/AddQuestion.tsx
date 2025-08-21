import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const AddQuestion = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [questionData, setQuestionData] = useState({
    question_text: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correct_answer: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setQuestionData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = ['question_text', 'option_a', 'option_b', 'option_c', 'option_d', 'correct_answer'];
    const missingFields = requiredFields.filter(field => !questionData[field as keyof typeof questionData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    
    try {
      // Mock save - in real app, save to backend
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Question Added!",
        description: "The new quiz question has been successfully created.",
      });
      
      // Reset form
      setQuestionData({
        question_text: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: '',
        category: '',
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/admin')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Add New Question</h1>
              <p className="text-muted-foreground">Create a new quiz question for users to answer</p>
            </div>
          </div>

          {/* Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Question Text */}
              <div className="space-y-2">
                <Label htmlFor="question" className="text-base font-semibold">
                  Question <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="question"
                  placeholder="Enter your quiz question here..."
                  value={questionData.question_text}
                  onChange={(e) => handleInputChange('question_text', e.target.value)}
                  className="min-h-[100px] text-base"
                  required
                />
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">
                  Answer Options <span className="text-destructive">*</span>
                </Label>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="option_a" className="text-sm">Option A</Label>
                    <Input
                      id="option_a"
                      placeholder="Enter option A"
                      value={questionData.option_a}
                      onChange={(e) => handleInputChange('option_a', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="option_b" className="text-sm">Option B</Label>
                    <Input
                      id="option_b"
                      placeholder="Enter option B"
                      value={questionData.option_b}
                      onChange={(e) => handleInputChange('option_b', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="option_c" className="text-sm">Option C</Label>
                    <Input
                      id="option_c"
                      placeholder="Enter option C"
                      value={questionData.option_c}
                      onChange={(e) => handleInputChange('option_c', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="option_d" className="text-sm">Option D</Label>
                    <Input
                      id="option_d"
                      placeholder="Enter option D"
                      value={questionData.option_d}
                      onChange={(e) => handleInputChange('option_d', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Correct Answer & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-base font-semibold">
                    Correct Answer <span className="text-destructive">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleInputChange('correct_answer', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select correct answer" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A - {questionData.option_a || 'Option A'}</SelectItem>
                      <SelectItem value="B">B - {questionData.option_b || 'Option B'}</SelectItem>
                      <SelectItem value="C">C - {questionData.option_c || 'Option C'}</SelectItem>
                      <SelectItem value="D">D - {questionData.option_d || 'Option D'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-semibold">
                    Category (Optional)
                  </Label>
                  <Input
                    id="category"
                    placeholder="e.g., Science, History, Math"
                    value={questionData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                  />
                </div>
              </div>

              {/* Preview */}
              {questionData.question_text && (
                <Card className="p-6 bg-muted/30">
                  <h4 className="font-semibold text-foreground mb-4">Preview:</h4>
                  
                  <div className="space-y-3">
                    <p className="text-foreground font-medium">{questionData.question_text}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {['A', 'B', 'C', 'D'].map((option) => {
                        const optionText = questionData[`option_${option.toLowerCase()}` as keyof typeof questionData];
                        const isCorrect = questionData.correct_answer === option;
                        
                        return (
                          <div
                            key={option}
                            className={`p-3 rounded-lg border text-sm ${
                              isCorrect ? 'border-success bg-success/10' : 'border-border'
                            }`}
                          >
                            <span className="font-medium">{option}.</span> {optionText}
                            {isCorrect && <Check className="w-4 h-4 text-success inline ml-2" />}
                          </div>
                        );
                      })}
                    </div>
                    
                    {questionData.category && (
                      <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs">
                        {questionData.category}
                      </span>
                    )}
                  </div>
                </Card>
              )}

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/admin')}
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="quiz"
                  disabled={loading}
                  className="px-8"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add Question
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AddQuestion;