import React from 'react';
// ui
import {View, StyleSheet, ActivityIndicator} from 'react-native';

// services
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  Operation,
} from '@apollo/client';
import SInfo from 'react-native-sensitive-info';
import {createUploadLink} from 'apollo-upload-client';
import {createNetworkStatusNotifier} from 'react-apollo-network-status';
import {setContext} from '@apollo/client/link/context';

import {SInfoOptions, SINFOR_PROFILE} from '@common/constants/Sinfo';
import {colors} from '@common/styles';

import {API_BASE} from '@env';
import {JwtPayload} from '@apiCaller';

const {link: loadingLink, useApolloNetworkStatus} =
  createNetworkStatusNotifier();

const IGNORE_LOADING_OPERATION: string[] = [
  // 'getProvinces',
  // 'getDistrictsByProvince',
  // 'getWardsByDistrict',
];
export const GlobalLoadingIndicator = () => {
  const status = useApolloNetworkStatus({
    shouldHandleOperation: (operation: Operation) =>
      !IGNORE_LOADING_OPERATION.includes(operation.operationName),
  });
  if (status.numPendingQueries > 0 || status.numPendingMutations > 0) {
    return (
      <View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
        }}>
        <ActivityIndicator size="large" color={colors.PRIMARY} />
      </View>
    );
  }
  return null;
};

// Config apollo here
// LOGGER LINK
const loggerLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    return response;
  });
});

// AUTH LINK
const authLink = setContext(async (_, {headers}) => {
  try {
    const useInfor: JwtPayload = JSON.parse(
      await SInfo.getItem(SINFOR_PROFILE, SInfoOptions),
    );
    return {
      headers: {
        ...headers,
        Authorization: useInfor?.accessToken
          ? `Bearer ${useInfor?.accessToken}`
          : '',
      },
    };
  } catch (error) {
    console.log('GraphQL Error', {error});
    return;
  }
});

// TERMINATING LINK
const terminatingLink = createUploadLink({
  uri: 'https://api-v1.tuyendungvn.com/graphql',
}) as unknown as ApolloLink;

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([loggerLink, loadingLink, authLink, terminatingLink]),
  cache: new InMemoryCache(),
});
