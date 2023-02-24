import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import ScrollableTabLayout from '@layouts/ScrollableTabLayout';
import {colors, responsive} from '@common/styles';
import Button from '@designs/Button';

//hooks
import {useGetAppliedRecruitment} from '@hooks/useGetAppliedRecruitment';

//api
import {Notify, InvitationApply, useGetInvitationApplyById} from '@apiCaller';
import {fragmentGetInvitationById} from '@services/notify';

interface IInvitationTabProps {
  notify: Notify;
  recruitmentId: string;
  onSuccess: () => void;
  navigateToRecruiment: (recruitmentId: string) => void;
}

const InvitationTab: React.FC<IInvitationTabProps> = ({
  notify,
  recruitmentId,
  navigateToRecruiment,
}) => {
  const [isConfirmed, setIsConfirmed] = useState<boolean>(false);
  const [getInvitation, {data}] = useGetInvitationApplyById(
    fragmentGetInvitationById,
  );
  const [invitation, setInvitation] = useState<InvitationApply | null>(null);
  const {recruitments, loading} = useGetAppliedRecruitment();

  useEffect(() => {
    if (recruitments) {
      recruitments.map(recruiment => {
        if (recruiment._id === notify.recruitmentId) {
          setIsConfirmed(true);
        }
      });
    }
  }, [recruitments]);

  useEffect(() => {
    data && setInvitation(data.getInvitationApplyById as InvitationApply);
  }, [data]);

  useEffect(() => {
    getInvitation({
      variables: {
        id: notify.invitationApply?._id || '',
      },
    });
  }, []);

  return (
    <ScrollableTabLayout>
      <Text style={styles.header}>Lời mời ứng tuyển</Text>
      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Tên công ty</Text>
        <Text style={styles.itemContent}>
          {invitation?.company?.name || 'Không rõ tên công ty'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Vị trí ứng tuyển</Text>
        <Text style={styles.itemContent}>
          {invitation?.positionApply || 'Không rõ vị trí ứng tuyển'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Địa điểm làm việc</Text>
        <Text style={styles.itemContent}>
          {invitation?.address || 'Không rõ địa điểm làm việc'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Số điện thoại liên hệ</Text>
        <Text style={styles.itemContent}>
          {invitation?.senderPhone || 'Không rõ số điện thoại liên hệ'}
        </Text>
      </View>

      <View style={styles.itemWrapper}>
        <Text style={styles.itemTitle}>Email liên hệ</Text>
        <Text style={styles.itemContent}>
          {invitation?.senderEmail || 'Không rõ email liên hệ'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title={isConfirmed ? 'Đã ứng tuyển' : 'Xem chi tiết'}
          disabled={isConfirmed}
          type={isConfirmed ? 'disabled' : 'primary'}
          stylesCustom={{
            marginTop: responsive(10),
            width: responsive(335),
          }}
          onPress={() => navigateToRecruiment(recruitmentId)}
          loading={loading}
        />
      </View>
    </ScrollableTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {},

  header: {
    color: colors.PRIMARY,
    fontWeight: '700',
    fontSize: 20,
    textAlign: 'center',
    width: '100%',
    marginBottom: responsive(5),
  },

  itemWrapper: {
    marginTop: responsive(25),
  },

  itemTitle: {
    color: colors.BLACK,
    fontSize: 15,
    fontWeight: '600',
  },

  itemContent: {
    borderWidth: 0.5,
    borderColor: colors.BODY,
    color: colors.BLACK,
    fontSize: 14,
    paddingHorizontal: responsive(15),
    paddingVertical: responsive(15),
    marginTop: responsive(10),
    maxWidth: '100%',
    height: responsive(50),
    maxHeight: responsive(70),
  },
  buttonContainer: {
    padding: responsive(20),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsive(20),
  },
});

export default InvitationTab;
