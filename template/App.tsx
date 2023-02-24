import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { RootApp } from '@routes';
import { Provider } from 'react-redux';
import store from '@redux';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@common/configs/graphql';
import { themes } from '@common/styles/themes';
import './src/utils/prototype';

import Toast from '@components/Toast';
import StatusBarComponent from '@components/StatusBar';
import NotifyComponent from '@components/NotifyComponent';

const App = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <NavigationContainer>
          <NotifyComponent />
          <NativeBaseProvider theme={themes}>
            <RootApp />
            <Toast />
            <StatusBarComponent />
          </NativeBaseProvider>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
};

export default App;
