import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { colors, responsive, typos } from '@common/styles';
import { Upload } from '@assets/svg';
import { genSVGProps } from '@common/utils/base';
import Button from '@designs/Button';
import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import { File } from '@assets/svg';

type IFileType =
  | 'image/*' // Image
  | 'application/msword' // .doc
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' // .dox
  | 'application/pdf' // .pdf
  | 'text/plain'; // .txt
interface IProps {
  title: string;
  description: string;
  type: IFileType[];
  file: DocumentPickerResponse | null;
  onChange: (file: DocumentPickerResponse) => void;
}
const SingleUploadFile: React.FC<IProps> = ({
  description,
  title,
  type,
  file,
  onChange,
}) => {
  const [loading, setLoading] = useState(false);
  const handleUpload = async () => {
    try {
      setLoading(true);
      const data = await DocumentPicker.pick({
        type: type,
      });
      onChange(data[0]);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Upload {...genSVGProps(responsive(30), responsive(30))} />
      <Button
        title={title}
        stylesCustom={{
          marginVertical: responsive(16),
        }}
        onPress={handleUpload}
        loading={loading}
      />
      {file && (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: responsive(16),
          }}>
          <File {...genSVGProps(responsive(14), responsive(14))} />
          <Text style={{ ...typos.sm.normal, marginLeft: responsive(10) }}>
            {file.name}
          </Text>
        </View>
      )}
      <Text style={styles.description}>{description}</Text>
    </View>
  );
};

export default SingleUploadFile;

const styles = StyleSheet.create({
  container: {
    padding: responsive(20),
    borderStyle: 'dashed',
    borderColor: colors.LINE,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsive(4),
  },
  description: {
    ...typos.sm.normal,
    color: colors.BODY,
    textAlign: 'center',
  },
});
