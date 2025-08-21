import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import { Search, User, Eye, ArrowLeft, UserCheck, Shield } from 'lucide-react';

interface UserData {
  id: string;
  full_name: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  total_attempts: number;
  average_score: number;
  last_attempt: string | null;
}

const Users = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<UserData[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock users data - in real app, fetch from backend
    const mockUsers: UserData[] = [
      {
        id: 'admin-1',
        full_name: 'Quiz Admin',
        email: 'admin@quiz.com',
        role: 'admin',
        created_at: '2024-01-15',
        total_attempts: 0,
        average_score: 0,
        last_attempt: null,
      },
      {
        id: 'user-1',
        full_name: 'John Doe',
        email: 'user@quiz.com',
        role: 'user',
        created_at: '2024-02-01',
        total_attempts: 12,
        average_score: 78,
        last_attempt: '2 days ago',
      },
      {
        id: 'user-2',
        full_name: 'Jane Smith',
        email: 'jane.smith@email.com',
        role: 'user',
        created_at: '2024-01-28',
        total_attempts: 18,
        average_score: 92,
        last_attempt: '1 day ago',
      },
      {
        id: 'user-3',
        full_name: 'Mike Johnson',
        email: 'mike.j@email.com',
        role: 'user',
        created_at: '2024-02-10',
        total_attempts: 8,
        average_score: 67,
        last_attempt: '1 week ago',
      },
      {
        id: 'user-4',
        full_name: 'Sarah Wilson',
        email: 'sarah.w@email.com',
        role: 'user',
        created_at: '2024-01-20',
        total_attempts: 25,
        average_score: 85,
        last_attempt: '3 hours ago',
      },
      {
        id: 'user-5',
        full_name: 'Alex Chen',
        email: 'alex.chen@email.com',
        role: 'user',
        created_at: '2024-02-05',
        total_attempts: 15,
        average_score: 91,
        last_attempt: '5 days ago',
      },
    ];

    setUsers(mockUsers);
    setFilteredUsers(mockUsers);
    setLoading(false);
  }, []);

  useEffect(() => {
    // Filter users based on search term
    if (searchTerm.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/admin')}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Users Management</h1>
              <p className="text-muted-foreground">Manage all registered users and their activities</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{users.length}</p>
            <p className="text-sm text-muted-foreground">Total Users</p>
          </div>
        </div>

        {/* Search */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Users List */}
        <div className="space-y-4">
          {filteredUsers.length === 0 ? (
            <Card className="p-8 text-center">
              <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No users found matching your search.</p>
            </Card>
          ) : (
            filteredUsers.map((user) => (
              <Card key={user.id} className="p-6 hover:bg-card-hover transition-smooth">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      {user.role === 'admin' ? (
                        <Shield className="w-6 h-6 text-primary" />
                      ) : (
                        <User className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className="text-lg font-semibold text-foreground">{user.full_name}</h3>
                        <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground">{user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Member since {new Date(user.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-8">
                    {user.role === 'user' && (
                      <>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-foreground">{user.total_attempts}</p>
                          <p className="text-xs text-muted-foreground">Attempts</p>
                        </div>
                        
                        <div className="text-center">
                          <p className={`text-2xl font-bold ${getScoreColor(user.average_score)}`}>
                            {user.average_score || 0}%
                          </p>
                          <p className="text-xs text-muted-foreground">Avg Score</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="text-sm font-medium text-foreground">
                            {user.last_attempt || 'Never'}
                          </p>
                          <p className="text-xs text-muted-foreground">Last Active</p>
                        </div>
                      </>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/admin/users/${user.id}`)}
                    >
                      <Eye className="w-4 h-4" />
                      View Profile
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-primary">
              {users.filter(u => u.role === 'admin').length}
            </p>
            <p className="text-sm text-muted-foreground">Admins</p>
          </Card>
          
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-accent">
              {users.filter(u => u.role === 'user').length}
            </p>
            <p className="text-sm text-muted-foreground">Quiz Takers</p>
          </Card>
          
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-success">
              {users.filter(u => u.total_attempts > 0).length}
            </p>
            <p className="text-sm text-muted-foreground">Active Users</p>
          </Card>
          
          <Card className="p-4 text-center">
            <p className="text-2xl font-bold text-warning">
              {Math.round(users.filter(u => u.role === 'user').reduce((acc, u) => acc + u.average_score, 0) / users.filter(u => u.role === 'user').length) || 0}%
            </p>
            <p className="text-sm text-muted-foreground">Global Avg</p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Users;