import styled from 'styled-components/native';
import { Platform } from 'react-native';

import { getBottomSpace } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const TitleText = styled.Text`
  font-size: 16px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin-top: 64px;
`;

export const AnimatedView = styled.View`
  align-items: center;
`;

export const BackToSignIn = styled.TouchableOpacity`
  align-items: center;
  background: #312e38;
  border-color: #232129;
  border-top-width: 1px;
  bottom: 0;
  flex-direction: row;
  justify-content: center;
  left: 0;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  position: absolute;
  right: 0;
`;

export const BackToSignInText = styled.Text`
  font-size: 18px;
  color: #fff;
  font-family: 'RobotoSlab-Medium';
  margin-left: 14px;
`;
