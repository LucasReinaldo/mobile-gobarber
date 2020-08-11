import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
  margin-top: 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const AnimatedView = styled.View`
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 24px;
  top: 64px;
`;

export const UserAvatarButton = styled(RectButton)``;

export const UserAvatar = styled.Image`
  width: 186px;
  height: 186px;
  border-radius: 93px;
`;

export const SignOutButton = styled(RectButton)`
  align-items: center;
  justify-content: center;
  margin-top: 28px;
  flex-direction: row;
`;

export const SignOutButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  color: #ef3601;
  font-size: 18px;
  margin-left: 10px;
`;
