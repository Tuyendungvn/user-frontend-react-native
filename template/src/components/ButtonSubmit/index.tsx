import React from 'react';
import Button, {Props as IPropsButton} from '@designs/Button';
import {useFormikContext} from 'formik';
interface Props extends Omit<IPropsButton, 'onPress'> {}
const ButtonSubmit: React.FC<Props> = props => {
  const {submitForm} = useFormikContext();
  console.log(submitForm);

  return <Button {...props} onPress={submitForm} />;
};

export default ButtonSubmit;
