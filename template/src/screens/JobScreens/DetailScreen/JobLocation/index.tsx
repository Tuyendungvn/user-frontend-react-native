import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, responsive } from '@common/styles';

//redux
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';

const JobLocation: React.FC = () => {
  const { currentJob } = useAppSelector((state: IRootState) => state.job);
  const location = `${currentJob?.location?.map(
    location => location.location
  )}`;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Địa điểm làm việc</Text>
      <Text style={styles.locationText}>
        {location || 'Không có thông tin'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: responsive(400),
    paddingHorizontal: responsive(20),
    paddingVertical: responsive(20),
    backgroundColor: colors.WHITE,
  },
  heading: {
    fontWeight: '600',
    color: colors.BLACK,
    fontSize: 16,
  },
  locationText: {
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 16,
    marginTop: responsive(8),
    opacity: 0.8,
  },
});

export default JobLocation;
