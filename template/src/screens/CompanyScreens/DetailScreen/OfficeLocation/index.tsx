import React from 'react';
import { useAppSelector } from '@hooks/useRedux';
import StaticInsideTabLayout from '@layouts/StaticInsdieTabLayout';
import { IRootState } from '@redux';
import { Text, StyleSheet } from 'react-native';
import { responsive, colors } from '@common/styles';

interface IOfficeLocation {}

const OfficeLocation: React.FC<IOfficeLocation> = () => {
  const { currentCompany } = useAppSelector(
    (state: IRootState) => state.company
  );

  return (
    <StaticInsideTabLayout>
      <Text style={styles.heading}>Địa điểm làm việc</Text>
      <Text style={styles.locationText}>
        {currentCompany?.location || 'Không có thông tin'}
      </Text>
    </StaticInsideTabLayout>
  );
};

export default OfficeLocation;

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
