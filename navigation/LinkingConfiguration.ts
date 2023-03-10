/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.createURL('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Customers: {
            path: 'customers',
            screens: {
              CustomerDetails: {
                path: ":id",
              }
            }
          },
          Companies: {
            path: 'companies',
          },
          Events: {
            path: 'events',
            screens: {
              EventDetails: {
                path: ":id",
              }
            }
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
    },
  },
};

export default linking;
