import { supabase } from './supabase';
import { UserProfile } from '../types';

export const authService = {
  telegramLogin: async (user: any) => {
    const { data: existingUser } = await supabase
      .from('profiles')
      .select('*')
      .eq('telegram_id', user.id)
      .maybeSingle(); 

    if (existingUser) {
      await supabase.from('profiles').update({
          first_name: user.first_name,
          username: user.username,
          avatar_url: user.photo_url
      }).eq('telegram_id', user.id);
      return existingUser as UserProfile;
    }

    const newUser = {
      telegram_id: user.id,
      first_name: user.first_name,
      username: user.username,
      avatar_url: user.photo_url,
      role_level: 1 
    };

    const { data: createdUser, error: createError } = await supabase
      .from('profiles')
      .insert([newUser])
      .select();

    if (createError) throw createError;
    return createdUser?.[0] as UserProfile;
  },
  
  getUser: async (telegramId: number) => {
      const { data } = await supabase.from('profiles').select('*').eq('telegram_id', telegramId).maybeSingle();
      return data as UserProfile;
  },

  listUsers: async () => {
    const { data, error } = await supabase.from('profiles').select('*').order('telegram_id', { ascending: false });
    if (error) throw error;
    return (data || []) as UserProfile[];
  },

  updateRole: async (telegramId: number, level: number) => {
    const { error } = await supabase.from('profiles').update({ role_level: level }).eq('telegram_id', telegramId);
    if (error) throw error;
  }
};
