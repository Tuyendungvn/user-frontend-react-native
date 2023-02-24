import React, {useState} from 'react';
import {View, Text, Alert, Modal, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {User, Record} from '@apiCaller';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {colors, responsive} from '@common/styles';
import Button from '@designs/Button';
import {Download} from '@assets/svg';

interface ICVProps {
  user: User;
  record: Record;
  isOpen: boolean;
  onClose: () => void;
}

const CV1: React.FC<ICVProps> = ({user, record, isOpen, onClose}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const template = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <title>Responsive Resume UI Design in HTML and CSS</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="stylesheet" type="text/css" href="./styles.css" />
  
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
  
        * {
          margin: 0;
          padding: 0;
          list-style: none;
          font-family: 'Roboto', sans-serif;
        }
  
        body {
          background: white;
          font-size: 14px;
          line-height: 20px;
        }
  
        .resume_wrapper {
          display: flex;
          width: 800px;
          margin: 50px auto;
          background: #fff;
          padding: 10px;
        }
  
        .resume_wrapper .resume_left {
          width: 35%;
          background: #26252d;
        }
  
        .resume_wrapper .resume_left .resume_image {
          width: 100%;
        }
  
        .resume_wrapper .resume_left .resume_image img {
          width: 100%;
          display: block;
        }
  
        .resume_wrapper .resume_title {
          color: #fff;
          text-transform: uppercase;
          font-weight: 700;
          font-size: 16px;
          margin-bottom: 10px;
          letter-spacing: 4px;
        }
  
        .resume_wrapper .resume_left .resume_info {
          color: #84838b;
        }
  
        .resume_wrapper .resume_left .resume_bottom {
          padding: 20px 30px;
        }
  
        .resume_wrapper .resume_item {
          padding: 20px 0;
          border-bottom: 1px solid #ea4e1b;
        }
  
        .resume_wrapper .resume_item:last-child {
          border-bottom: 0;
        }
  
        .resume_wrapper .resume_left .resume_namerole {
          display: none;
        }
  
        .resume_wrapper .resume_namerole .name {
          font-size: 20px;
          color: #fff;
          font-weight: 700;
          margin-bottom: 5px;
          letter-spacing: 4px;
        }
  
        .resume_wrapper .resume_left .resume_namerole .role {
          color: #84838b;
        }
  
        .resume_wrapper .resume_left .resume_contact .resume_info:last-child {
          margin-top: 10px;
        }
  
        .resume_wrapper .resume_left .resume_contact .resume_subtitle {
          color: #fff;
          margin-bottom: 2px;
        }
  
        .resume_wrapper .resume_left .resume_skills .skills_list {
          display: flex;
          justify-content: space-between;
          margin-bottom: 5px;
        }
  
        .resume_wrapper .resume_left .resume_skills .skills_list .skills_bar p {
          position: relative;
          width: 125px;
          height: 20px;
          background: #fff;
        }
  
        .resume_wrapper
          .resume_left
          .resume_skills
          .skills_list
          .skills_bar
          p
          span {
          position: absolute;
          top: 0;
          left: 0;
          background: #ea4e1b;
          width: 100%;
          height: 100%;
        }
  
        .resume_wrapper .resume_right {
          width: 65%;
          padding: 20px 40px;
          color: #26252d;
        }
  
        .resume_wrapper .resume_right .resume_namerole .name {
          color: #26252d;
          font-size: 24px;
        }
  
        .resume_wrapper .resume_right .resume_namerole .role {
          font-size: 14px;
          text-transform: uppercase;
        }
  
        .resume_wrapper .resume_right .resume_item .resume_title {
          color: #26252d;
        }
  
        .resume_wrapper .resume_right .resume_data {
          display: flex;
        }
  
        .resume_wrapper .resume_right .resume_data .year {
          padding-right: 35px;
          width: 125px;
          position: relative;
        }
  
        .resume_wrapper .resume_right .resume_data .content {
          padding-left: 35px;
          margin-bottom: 20px;
          width: calc(100% - 115px);
        }
  
        .resume_wrapper .resume_right .resume_data .year:before {
          content: '';
          position: absolute;
          top: 5px;
          right: 0;
          width: 10px;
          height: 10px;
          background: #fff;
          border: 1px solid #26252d;
          border-radius: 50%;
        }
  
        .resume_wrapper .resume_right .resume_data .year:after {
          content: '';
          position: absolute;
          top: 17px;
          right: 4px;
          width: 3px;
          height: 90%;
          background: #ea4e1b;
        }
  
        .resume_wrapper .resume_right .resume_data:last-child .year:after {
          display: none;
        }
  
        .resume_wrapper .resume_right .resmue_interests .resume_info {
          display: flex;
          justify-content: space-between;
          text-align: center;
        }
  
        .resume_wrapper .resume_right .resmue_interests .interests .int_icon {
          font-size: 38px;
          color: #ea4e1b;
          margin-bottom: 10px;
        }
      </style>
    </head>
    <body>
      <div class="resume_wrapper">
        <div class="resume_left">
          <div class="resume_image">
            <img
              src=${
                user.urlAvt?.default ||
                user.urlAvt?.medium ||
                user.urlAvt?.small ||
                'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg'
              }
              alt="Resume_image"
            />
          </div>
          <div class="resume_bottom">
            <div class="resume_item resume_namerole">
              <div class="name">${
                user?.firstName ||
                '' + user?.lastName + '' ||
                user.displayName ||
                'Không rõ tên'
              }</div>
              <div class="role">${
                user?.title || 'Không rõ vị trí ứng tuyển'
              }</div>
            </div>
            <div class="resume_item resume_profile">
              <div class="resume_title">About me</div>
              <div class="resume_info">
              ${record?.description || 'Không có tiểu sử'}
                
              </div>
            </div>
            <div class="resume_item resume_address">
              <div class="resume_title">Address</div>
              <div class="resume_info">
                ${user.street?.name || ''}<br />
                ${user.ward?.name || ''}<br />
                ${user.district?.name || ''}<br />
                ${user.province?.name}
              </div>
            </div>
            <div class="resume_item resume_contact">
              <div class="resume_title">Contact</div>
              <div class="resume_info">
                <div class="resume_subtitle">Phone</div>
                <div class="resume_subinfo">${user?.phoneNumber || ''}</div>
              </div>
              <div class="resume_info">
                <div class="resume_subtitle">Email</div>
                <div class="resume_subinfo">${user?.email || ''}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="resume_right">
          <div class="resume_item resume_namerole">
            <div class="name">${user.displayName || 'Không rõ tên'}</div>
            <div class="role">${
              user?.title || 'Không rõ vị trí ứng tuyển'
            }</div>
          </div>
          <div class="resume_item resume_education">
            <div class="resume_title">Education</div>
            <div class="resume_info">
                ${record?.education
                  ?.map(
                    education => `<div class="resume_data">
                <div class="year">${
                  education?.timeStart?.toString().substring(0, 4) || 'Không rõ'
                } - ${
                      education?.timeEnd?.toString().substring(0, 4) ||
                      'Không rõ'
                    }</div>
                <div class="content">
                  <p>${education?.major || ''}</p>
                  <p>
                    ${education?.description || 'Không có mô tả'}
                  </p>
                </div>
              </div>`,
                  )
                  .join('')}
            </div>
          </div>
          <div class="resume_item resume_experience">
            <div class="resume_title">Experience</div>
            <div class="resume_info">
            ${record?.workExperience
              ?.map(
                experience => `<div class="resume_data">
            <div class="year">${
              experience?.timeStart?.toString().substring(0, 4) || 'Không rõ'
            } - ${
                  experience?.timeEnd?.toString().substring(0, 4) || 'Không rõ'
                }</div>
            <div class="content">
              <p>${experience?.jobName || ''}</p>
              <p>
                ${experience?.description || 'Không có mô tả'}
              </p>
            </div>
          </div>`,
              )
              .join('')}
            </div>
          </div>
  
      </div>
    </body>
  </html>
  `;

  const handleCreatePDF = async (htmlContent: string) => {
    try {
      setLoading(true);
      let options = {
        html: htmlContent,
        fileName: 'TuyenDungVN-CV',
        directory: '../../../../Download',
      };
      let file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Chúng tôi đã tải file PDF này về thư mục download của bạn');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isOpen} onRequestClose={onClose} style={styles.container}>
      <View style={styles.container}>
        <WebView
          originWhitelist={['*']}
          source={{
            html: template || '',
          }}
          setDisplayZoomControls={true}
          containerStyle={{justifyContent: 'center'}}
          control
        />
        <View style={styles.buttonWraper}>
          <Button
            onPress={() => handleCreatePDF(template)}
            loading={loading}
            type="primary"
            title="Lưu CV về máy"
            Icon={Download}
          />
          <Button
            stylesCustom={styles.button}
            onPress={() => onClose()}
            type="outline"
            title="Đóng"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: responsive(20),
    backgroundColor: colors.WHITE,
    height: '100%',
  },
  buttonWraper: {
    marginTop: responsive(40),
  },

  button: {
    marginTop: responsive(10),
  },
});

export default CV1;
