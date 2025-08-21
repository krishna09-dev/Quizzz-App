import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/FormInput';
import { Card } from '@/components/ui/card';
import { Brain, Mail, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      navigate('/');
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Try admin@quiz.com / user@quiz.com with password 'password'",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="p-4 bg-primary/10 rounded-full">
              <Brain className="w-12 h-12 text-primary" />
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-muted-foreground">Sign in to your QuizMaster account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <FormInput
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <FormInput
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="quiz"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Lock className="w-4 h-4" />
                Sign In
              </>
            )}
          </Button>
        </form>

        <div className="text-center space-y-4">
          <div className="bg-muted p-4 rounded-xl space-y-2">
            <p className="text-sm font-semibold text-muted-foreground">Demo Accounts:</p>
            <div className="text-xs space-y-1">
              <p><strong>Admin:</strong> admin@quiz.com</p>
              <p><strong>User:</strong> user@quiz.com</p>
              <p><strong>Password:</strong> password</p>
            </div>
          </div>

          <div className="text-sm">
            <span className="text-muted-foreground">Don't have an account? </span>
            <Link to="/register" className="text-primary hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Login;