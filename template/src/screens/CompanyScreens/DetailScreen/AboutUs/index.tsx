import React from 'react';
import StaticInSideTabLayotu from '@layouts/StaticInsdieTabLayout';
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';
import WebView from 'react-native-webview';
import { responsive } from '@common/styles';

interface IAboutUsProps {}

const AboutUs: React.FC<IAboutUsProps> = () => {
  const { currentCompany } = useAppSelector(
    (state: IRootState) => state.company
  );

  return (
    <StaticInSideTabLayotu>
      <WebView
        originWhitelist={['*']}
        source={{ html: currentCompany?.description || '' }}
        injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=device-width, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
        scalesPageToFit={false}
        nestedScrollEnabled
        overScrollMode="content"
        containerStyle={{
          paddingBottom: responsive(180),
        }}
        style={{
          paddingHorizontal: responsive(20),
          height: '100%',
        }}
      />
    </StaticInSideTabLayotu>
  );
};

export default AboutUs;
