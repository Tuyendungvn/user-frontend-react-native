import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors, responsive } from '@common/styles';

//redux
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';

interface IGeneralInformationProps {}

const JobRequires: React.FC<IGeneralInformationProps> = () => {
  const { currentJob } = useAppSelector((state: IRootState) => state.job);
  const jobDescription = currentJob?.requirement;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: jobDescription || '' }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        nestedScrollEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsive(400),
    paddingHorizontal: responsive(5),
    paddingVertical: responsive(20),
    backgroundColor: colors.WHITE,
  },
});

export default JobRequires;
