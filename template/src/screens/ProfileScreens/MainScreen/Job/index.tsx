import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors, responsive, typos} from '@common/styles';
import {User} from '@apiCaller';
import {truncate} from '@common/functions';
interface IProps {
  user: User | null;
}
const Job: React.FC<IProps> = ({user}) => {
  const {code, title} = user || {};
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Mã ứng tuyển</Text>
        <Text style={styles.desc}>#{truncate(code, 20)}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Vị trí ứng tuyển</Text>
        <Text style={styles.desc}>{truncate(title, 20)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsive(20),
    backgroundColor: '#fff',
    marginTop: responsive(10),
    borderRadius: responsive(4),
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    ...typos.xs.normal,
  },
  desc: {
    ...typos.sm.bold,
    color: colors.PRIMARY,
  },
});

export default Job;
