import 'react-native-url-polyfill/auto';
import { createClient, PostgrestError } from '@supabase/supabase-js';
import { Database } from './types';
import Constants from 'expo-constants';

const supabaseUrl = Constants.expoConfig?.extra?.apiUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

export { PostgrestError };
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
