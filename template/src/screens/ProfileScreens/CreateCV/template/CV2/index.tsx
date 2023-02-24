import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, View} from 'react-native';
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

const CV2: React.FC<ICVProps> = ({user, record, isOpen, onClose}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const template = `<!DOCTYPE html>
  <html>
    <head>
      <title>Resume Design</title>
      <link rel="stylesheet" type="text/css" href="styles.css" />
      <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@100;300;400;900&display=swap');
  
        :root {
          --bgcolor: white;
          --resume-left-bgc: #fff;
          --resume-right-bgc: #232941;
          --red: #ea4e1b;
          --white: #fff;
          --primary: #232941;
        }
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Lato', sans-serif;
          list-style: none;
          text-decoration: none;
          width: '2480px';
          height: '3508px';
        }
  
        body {
          background: var(--bgcolor);
          font-size: 14px;
          color: var(--primary);
        }
  
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
  
        .resume_design {
          width: 700px;
          max-width: 100%;
          display: flex;
          box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
        }
  
        .resume_design .resume_left {
          background: var(--resume-left-bgc);
          width: 400px;
          padding: 30px;
        }
  
        .resume_design .resume_right {
          background: var(--resume-right-bgc);
          color: var(--white);
          width: 300px;
        }
  
        .resume_design .resume_left > div {
          margin-bottom: 30px;
        }
  
        .resume_design .resume_left > div:last-child {
          margin-bottom: 0;
        }
  
        .resume_design .resume_left .button {
          margin-bottom: 10px;
          text-transform: uppercase;
          border: 2px solid var(--red);
          color: var(--red);
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-weight: 900;
          letter-spacing: 2px;
          font-size: 12px;
        }
  
        .resume_design .resume_left .about_sec p {
          margin-bottom: 10px;
        }
  
        .resume_design .resume_left .about_sec p:last-child {
          margin-bottom: 0;
        }
  
        .resume_design .resume_left ul li {
          padding-left: 20px;
          padding-bottom: 20px;
          position: relative;
        }
  
        .resume_design .resume_left ul li:last-child {
          padding-bottom: 0;
        }
  
        .resume_design .resume_left ul li {
          border-left: 1px solid var(--red);
        }
  
        .resume_design .resume_left ul li:before {
          content: '';
          position: absolute;
          top: 0;
          left: -5px;
          width: 8px;
          height: 8px;
          background: var(--red);
          border-radius: 50%;
        }
  
        .resume_design .resume_left ul li .title {
          font-weight: 900;
          font-size: 16px;
          flex-wrap:  wrap;
          max-width: 50%;
          width: 50%;
        }
  
        .resume_design .resume_left ul li .sub_title {
          margin: 3px 0;
        }
  
        .resume_design .resume_left ul li .content {
          font-weight: 300;
        }
  
        .resume_design .resume_left ul li .item_grp {
          position: relative;
        }
  
        .resume_design .resume_left ul li .item_grp .timeline {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 10px;
          color: var(--red);
          font-weight: 900;
        }
  
        .resume_design .resume_right .profile_sec,
        .resume_design .resume_right .contact_sec,
        .resume_design .resume_right .skills_sec {
          padding: 30px;
        }
  
        .resume_design .resume_right .profile_sec img {
          width: 125px;
          border-radius: 9999;
        }
  
        .resume_design .resume_right .profile_sec .profile_info {
          margin-top: 20px;
        }
  
        .resume_design .resume_right .profile_sec .profile_info .first_name,
        .resume_design .resume_right .profile_sec .profile_info  {
          font-size: 20px;
          text-transform: uppercase;
          font-weight: 300;
        }
        .last_name{
          font-size: 15px;
        }
  
        .resume_design .resume_right .profile_sec .profile_info .last_name {
          font-weight: 900;
        }
  
        .resume_design .resume_right .profile_sec .profile_info .role {
          margin-top: 10px;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 2px;
        }
  
        .resume_design .resume_right .contact_sec,
        .resume_design .resume_right .skills_sec {
          position: relative;
        }
  
        .resume_design .resume_right .contact_sec {
          background: var(--red);
        }
  
        .resume_design .resume_right .button {
          text-transform: uppercase;
          background: var(--white);
          color: var(--primary);
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-weight: 900;
          letter-spacing: 2px;
          font-size: 12px;
          position: absolute;
          top: -13px;
          left: 50%;
          transform: translateX(-50%);
        }
  
        .resume_design .resume_right .contact_sec ul li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
  
        .resume_design .resume_right .contact_sec ul li:last-child {
          margin-bottom: 0;
        }
  
        .resume_design .resume_right .contact_sec ul li .icon {
          margin-right: 10px;
        }
  
        .resume_design .resume_right .contact_sec ul li .content .title {
          margin-bottom: 3px;
          font-weight: 900;
        }
  
        .resume_design .resume_right .skills_sec ul li {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }
  
        .resume_design .resume_right .skills_sec ul li:last-child {
          margin-bottom: 0;
        }
  
        .resume_design .resume_right .skills_sec ul li .content {
          width: 100px;
        }
  
        .resume_design .resume_right .skills_sec ul li .bar_wrap {
          width: calc(100% - 100px);
          height: 10px;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
        }
  
        .resume_design .resume_right .skills_sec ul li .bar_wrap .bar {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: var(--white);
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="resume_design">
          <div class="resume_left">
            <div class="about_sec">
              <div class="button">About Me</div>
              <p>
                ${record?.description || 'Không có mô tả'}
              </p>
            </div>
            <div class="exp_sec">
              <div class="button">Experience</div>
              <ul>
              ${record?.workExperience
                ?.map(
                  experience => `       <li>
              <div class="item">
                <div class="item_grp">
                  <p class="title">${
                    experience?.jobName || 'Không rõ tên công việc'
                  }</p>
                  <p class="sub_title">${
                    experience?.companyName || 'Không rõ tên công ty'
                  }</p>
                  <span class="timeline">${
                    experience.timeStart?.toString().prettyDate() || 'Không rõ'
                  } - ${
                    experience.timeEnd?.toString().prettyDate() || 'Không rõ'
                  }</span>
                </div>
                <p class="content">
                  ${experience.description || 'Không có mô tả'}
                </p>
              </div>
            </li>`,
                )
                .join('')}
              </ul>
            </div>
            <div class="edu_sec">
              <div class="button">Education</div>
              <ul>
                    ${record.education
                      ?.map(
                        education => `      <li>
                    <div class="item">
                      <div class="item_grp">
                        <p class="title">${education.schoolName}</p>
                        <p class="sub_title">${education.major}</p>
                        <span class="timeline">${
                          education.timeStart?.toString().prettyDate() ||
                          'Không rõ'
                        } - ${
                          education.timeEnd?.toString().prettyDate() ||
                          'Không rõ'
                        }</span>
                      </div>
                      <p class="content">
                         ${education.description}
                      </p>
                    </div>
                  </li>`,
                      )
                      .join('')}
              </ul>
            </div>
          </div>
          <div class="resume_right">
            <div class="profile_sec">
              <div class="img_holder">
                <img
                  src=${
                    user.urlAvt?.default ||
                    user.urlAvt?.medium ||
                    user.urlAvt?.small ||
                    'https://tuyendungvn-file.s3.ap-southeast-2.amazonaws.com/user-info/Skeleton-avatar.jpg'
                  }
                  alt="profile image"
                />
              </div>
              <div class="profile_info">
                <p class="first_name">${user?.displayName || 'Không rõ tên'}</p>
                <p class="last_name">${
                  user.title || 'Không rõ vị trí ứng tuyển'
                }</p>
              </div>
            </div>
            <div class="contact_sec">
              <div class="button">Contact me</div>
              <ul>
                <li class="item">
                  <div class="icon">
                    <i class="fas fa-phone"></i>
                  </div>
                  <div class="content">
                    <p class="title">Phone</p>
                    <p class="subtitle">${user.phoneNumber}</p>
                  </div>
                </li>
                <li class="item">
                  <div class="icon">
                    <i class="fas fa-envelope"></i>
                  </div>
                  <div class="content">
                    <p class="title">Email</p>
                    <p class="subtitle">${user.email}</p>
                  </div>
                </li>
                <li class="item">
                  <div class="icon">
                    <i class="fas fa-map-signs"></i>
                  </div>
                  <div class="content">
                    <p class="title">Address</p>
                    <p class="subtitle">
                    ${user.street?.name || ''}<br />
                    ${user.ward?.name || ''}<br />
                    ${user.district?.name || ''}<br />
                    ${user.province?.name}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
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
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal visible={isOpen} onRequestClose={onClose}>
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

export default CV2;
