import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  align-items: center;
  flex: 1;
  justify-content: center;
  padding: 0 24px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 28px;
  margin-top: 48px;
  text-align: center;
`;

export const Description = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  margin-top: 16px;
  text-align: center;
  margin-bottom: 24px;
`;

export const OkButton = styled(RectButton)`
  background: #01baef;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  margin-top: 24px;
  padding: 12px 20px;

  flex-direction: row;
`;

export const OkButtonText = styled.Text`
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  margin-right: 10px;
`;
