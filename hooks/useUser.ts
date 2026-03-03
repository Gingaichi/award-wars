// hooks/useUser.ts
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { User } from '@supabase/supabase-js';

export function useUser() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      
      // Update localStorage when auth state changes
      if (session?.user) {
        localStorage.setItem('userId', session.user.id);
        if (session.user.user_metadata?.username) {
          localStorage.setItem('username', session.user.user_metadata.username);
        }
      } else {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
      }
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  return { user, loading };
}