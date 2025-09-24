import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Settings, Shield, Key, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SettingsAdmin = () => {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleGrantAdminAccess = async (email: string) => {
    if (!email.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter an email address',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Note: In a real application, you'd want to create an edge function for this
      // This is a simplified approach for demo purposes
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
      
      if (userError) throw userError;

      const targetUser = userData.users.find(u => u.email === email);
      
      if (!targetUser) {
        toast({
          title: 'Error',
          description: 'User not found',
          variant: 'destructive',
        });
        return;
      }

      // Check if user already has admin role
      const { data: existingRole } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', targetUser.id)
        .eq('role', 'admin')
        .single();

      if (existingRole) {
        toast({
          title: 'Info',
          description: 'User already has admin access',
        });
        return;
      }

      // Grant admin role
      const { error } = await supabase
        .from('user_roles')
        .insert([{ user_id: targetUser.id, role: 'admin' }]);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Admin access granted successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-netflix-text-secondary">
          Manage your account and system settings
        </p>
      </div>

      {/* Account Information */}
      <Card className="bg-netflix-dark border-netflix-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Account Information
          </CardTitle>
          <CardDescription className="text-netflix-text-secondary">
            Your current account details and permissions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-netflix-text-primary">Email</Label>
              <div className="mt-1 p-3 bg-netflix-gray rounded-md text-white">
                {user?.email}
              </div>
            </div>
            <div>
              <Label className="text-netflix-text-primary">Role</Label>
              <div className="mt-1">
                <Badge className={isAdmin ? 'netflix-badge-featured' : 'netflix-badge-category'}>
                  {isAdmin ? 'Administrator' : 'User'}
                </Badge>
              </div>
            </div>
          </div>
          <div>
            <Label className="text-netflix-text-primary">User ID</Label>
            <div className="mt-1 p-3 bg-netflix-gray rounded-md text-white font-mono text-sm">
              {user?.id}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Admin Controls */}
      {isAdmin && (
        <Card className="bg-netflix-dark border-netflix-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Admin Controls
            </CardTitle>
            <CardDescription className="text-netflix-text-secondary">
              Administrative functions and user management
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Grant Admin Access</h3>
              <div className="flex gap-4">
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="user@example.com"
                  className="bg-netflix-gray border-netflix-light-gray text-white"
                />
                <Button
                  onClick={() => {
                    const email = (document.getElementById('admin-email') as HTMLInputElement)?.value;
                    handleGrantAdminAccess(email);
                  }}
                  disabled={isSubmitting}
                  className="netflix-btn-primary"
                >
                  {isSubmitting ? 'Granting...' : 'Grant Access'}
                </Button>
              </div>
              <p className="text-sm text-netflix-text-muted mt-2">
                Enter the email address of a user to grant them admin privileges
              </p>
            </div>

            <Separator className="bg-netflix-gray" />

            <div>
              <h3 className="text-lg font-medium text-white mb-4">Database Access</h3>
              <div className="flex items-center justify-between p-4 border border-netflix-gray rounded-lg">
                <div>
                  <p className="text-white font-medium">Supabase Dashboard</p>
                  <p className="text-sm text-netflix-text-secondary">
                    Direct access to your database and configuration
                  </p>
                </div>
                <Button
                  asChild
                  variant="outline"
                  className="border-netflix-gray text-netflix-text-secondary hover:text-white"
                >
                  <a
                    href="https://supabase.com/dashboard/project/rdwqfzskgtpscyzopvnj"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Database className="w-4 h-4 mr-2" />
                    Open Dashboard
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* System Information */}
      <Card className="bg-netflix-dark border-netflix-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Key className="w-5 h-5" />
            System Information
          </CardTitle>
          <CardDescription className="text-netflix-text-secondary">
            Technical details and configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="text-netflix-text-primary">Project ID</Label>
              <div className="mt-1 p-3 bg-netflix-gray rounded-md text-white font-mono text-sm">
                rdwqfzskgtpscyzopvnj
              </div>
            </div>
            <div>
              <Label className="text-netflix-text-primary">Environment</Label>
              <div className="mt-1">
                <Badge className="netflix-badge-live">Production</Badge>
              </div>
            </div>
          </div>
          
          <div>
            <Label className="text-netflix-text-primary">Features Enabled</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              <Badge className="netflix-badge-category">Authentication</Badge>
              <Badge className="netflix-badge-category">Database</Badge>
              <Badge className="netflix-badge-category">Row Level Security</Badge>
              <Badge className="netflix-badge-category">Real-time</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsAdmin;