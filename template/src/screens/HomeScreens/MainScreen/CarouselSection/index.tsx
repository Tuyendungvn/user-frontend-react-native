import {responsive} from '@common/styles';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Image,
  Linking,
  Alert,
  TouchableOpacity,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import LoadingBox from '@components/LoadingBox';
import {colors} from '@common/styles';

//api
import {useGetAdsAll, Ads} from '@apiCaller';
import {fragmentGetAllAds} from '@services/ads';

interface ICarouselSection {}

const CarouselSection: React.FC<ICarouselSection> = () => {
  const [getAllRecruitment, {data, loading}] = useGetAdsAll(fragmentGetAllAds);
  const [listAds, setListAds] = useState<Ads[]>([]);

  useEffect(() => {
    getAllRecruitment({variables: {}});
  }, []);

  const handleOpenUrl = async (url: string) => {
    if (url.isValidUrl()) {
      await Linking.openURL(url);
    } else {
      Alert.alert('Không thể mở vì đường dẫn không hợp lệ');
    }
  };

  useEffect(() => {
    if (data) {
      setListAds(data.getAdsAll as Ads[]);
    }
  }, [data]);

  const renderingItem = ({item, index}) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slide}
        onPress={() => {
          handleOpenUrl(item.link);
        }}>
        <Image
          style={styles.image}
          source={{
            uri:
              item.urlImage.default ||
              item.urlImage.medium ||
              item.urlImage.small ||
              'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/whiteLogo_content_website/2847b727-a959-458f-8578-b6606973f58c-Untitled%20design.jpg',
          }}
          resizeMode="cover"
          loadingIndicatorSource={{
            uri: 'https://i.pinimg.com/originals/10/b2/f6/10b2f6d95195994fca386842dae53bb2.png',
          }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loading ? (
        <LoadingBox width={335} height={180} spinnerSize="large" />
      ) : (
        <Carousel
          data={listAds}
          renderItem={renderingItem}
          sliderWidth={responsive(335)}
          itemWidth={responsive(335)}
          slideStyle={{width: responsive(335)}}
          layout={'default'}
          scrollEnabled={true}
          autoplay={true}
          pagingEnabled={true}
          autoplayInterval={10000}
          loop={true}
        />
      )}
    </>
  );
};

export default CarouselSection;

const styles = StyleSheet.create({
  slide: {
    height: responsive(180),
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
  image: {
    width: responsive(335),
    height: responsive(180),
    borderRadius: 8,
    shadowColor: colors.BLACK,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
