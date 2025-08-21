import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { LogOut, User, Shield, Brain } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-card border-b border-border p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">QuizMaster</h1>
          </div>
          
          <div className="flex space-x-2">
            {user.role === 'admin' && (
              <>
                <Button
                  variant={location.pathname === '/admin' ? 'default' : 'ghost'}
                  onClick={() => navigate('/admin')}
                >
                  <Shield className="w-4 h-4" />
                  Dashboard
                </Button>
                <Button
                  variant={location.pathname === '/admin/users' ? 'default' : 'ghost'}
                  onClick={() => navigate('/admin/users')}
                >
                  Users
                </Button>
                <Button
                  variant={location.pathname === '/admin/add-question' ? 'default' : 'ghost'}
                  onClick={() => navigate('/admin/add-question')}
                >
                  Add Question
                </Button>
              </>
            )}
            
            {user.role === 'user' && (
              <>
                <Button
                  variant={location.pathname === '/' ? 'default' : 'ghost'}
                  onClick={() => navigate('/')}
                >
                  Dashboard
                </Button>
                <Button
                  variant={location.pathname === '/profile' ? 'default' : 'ghost'}
                  onClick={() => navigate('/profile')}
                >
                  Profile
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm">
            <User className="w-4 h-4" />
            <span className="text-muted-foreground">{user.full_name}</span>
            <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs">
              {user.role}
            </span>
          </div>
          
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;