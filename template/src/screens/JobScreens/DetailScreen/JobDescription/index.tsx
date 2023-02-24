import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

//redux
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';

import { colors, responsive } from '@common/styles';

interface IJobDescriptionProps {}

const JobDescription: React.FC<IJobDescriptionProps> = () => {
  const { currentJob } = useAppSelector((state: IRootState) => state.job);
  const jobDescription = currentJob?.description;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: jobDescription || '' }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        nestedScrollEnabled
        style={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsive(400),
    paddingHorizontal: responsive(10),
    paddingVertical: responsive(20),
    backgroundColor: colors.WHITE,
  },
});

export default JobDescription;
