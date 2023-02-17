import { ExpoConfig } from '@expo/config';

const config: ExpoConfig = {
  name: 'evented',
  slug: 'evented',
  version: '0.0.1',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'myapp',
  userInterfaceStyle: 'automatic',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  web: {
    favicon: './assets/images/favicon.png',
  },
  extra: {
    apiUrl: process.env.SUPABASE_API_URL ?? 'https://localhost:54321',
    supabaseAnonKey: process.env.SUPABASE_ANON_KEY
  }
};

export default config;
