import { colors, responsive } from '@common/styles';
import React, { ReactNode, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import EventEmitter from 'events';
import { X, CheckedSolid } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';

const alertBarEvent = new EventEmitter();

interface IAlertBarProps {
  id: string;
}

const openAlertBarEventName = (id: string) => `open-alert-bar-${id}`;

type IAlertBarPayload = {
  type: 'error' | 'success' | 'info';
  message: ReactNode;
};

export const alertBar = (id: string, payload: IAlertBarPayload) => {
  new Promise(resolve => {
    alertBarEvent.emit(openAlertBarEventName(id), payload);
  });
};

const AlertBar: React.FC<IAlertBarProps> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<IAlertBarPayload | null>(null);

  useEffect(() => {
    alertBarEvent.on(openAlertBarEventName(id), payload => {
      setPayload(payload);
      setOpen(true);
    });
  }, []);

  if (!open || !payload) return null;

  const { message, type } = payload;

  return (
    <View
      style={{
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor:
          type === 'error' ? colors.ERROR_LIGHT : colors.SUCCESS_LIGHT,
        borderRadius: 4,
        borderColor:
          type === 'error' ? colors.ERROR_LIGHT : colors.SUCCESS_LIGHT,
        marginVertical: 10,
      }}>
      {type === 'error' ? (
        <X
          {...genSVGProps(12, 12, colors.ERROR, {
            marginRight: responsive(10),
          })}
        />
      ) : (
        <CheckedSolid
          {...genSVGProps(12, 12, colors.PRIMARY, {
            marginRight: responsive(10),
          })}
        />
      )}
      <Text
        style={{
          color: type === 'error' ? colors.ERROR : colors.SUCCESS,
        }}>
        {message}
      </Text>
    </View>
  );
};

export default AlertBar;
