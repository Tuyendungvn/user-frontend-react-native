import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Layout from '@layouts/StaticInsdieTabLayout';
import {colors, responsive, typos} from '@common/styles';
import {Notify} from '@apiCaller';

interface ICancelTabProps {
  notify: Notify;
}

const CanceledTab: React.FC<ICancelTabProps> = ({notify}) => {
  return (
    <Layout>
      <Text style={styles.day}>
        {notify.createdAt?.prettyDate() || 'Không rõ ngày '}
      </Text>
      <Text style={styles.description}>
        {notify.description || 'Không rõ mô tả'}
      </Text>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {},

  heading: {
    ...typos.lg.bold,
  },

  description: {
    marginTop: responsive(20),
    ...typos.sm.medium,
  },

  day: {
    marginTop: responsive(10),
    ...typos.sm.normal,
    color: colors.PRIMARY,
    flexDirection: 'row-reverse',
  },
});

export default CanceledTab;
