import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';
import ScrollableTabLayout from '@layouts/ScrollableTabLayout';
import { useAppSelector } from '@hooks/useRedux';
import { IRootState } from '@redux';
import { responsive } from '@common/styles';
import EmptyTab from '@components/EmptyTab';

interface IImageProps {}

const ImageTab: React.FC<IImageProps> = () => {
  const { currentCompany } = useAppSelector(
    (state: IRootState) => state.company
  );
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    (currentCompany?.images?.length as number) > 0 &&
      setImages(
        currentCompany?.images?.map(image => image.default as string) || []
      );
  }, [currentCompany]);

  return (
    <ScrollableTabLayout
      horizontal
      isEmpty={images.length === 0}
      emptyComponent={<EmptyTab title="Không có hình ảnh để hiển thị" />}>
      {images.map((e, i) => (
        <Image
          resizeMethod="auto"
          loadingIndicatorSource={{
            uri: 'https://www.freeiconspng.com/images/load-icon-png',
            width: responsive(160),
            height: responsive(160),
          }}
          source={{
            uri: e,
          }}
          style={styles.image}
          height={responsive(160)}
          width={responsive(160)}
        />
      ))}
    </ScrollableTabLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: responsive(600),
  },
  imageWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  image: {
    width: responsive(160),
    height: responsive(160),
    marginTop: responsive(20),
  },
});

export default ImageTab;
