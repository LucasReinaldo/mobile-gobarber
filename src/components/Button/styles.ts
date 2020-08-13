import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled(RectButton)`
  align-items: center;
  background: #01baef;
  border-radius: 10px;
  flex-direction: row;
  height: 60px;
  justify-content: center;
  margin-top: 18px;
  width: 100%;
`;

export const ButtonText = styled.Text`
  color: #312e38;
  flex: 1;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  text-align: center;
  /* position: relative; */
`;

export const IconContainer = styled.View`
  background-color: #87d1f5;
  padding: 20px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  /* position: absolute;
  right: 0; */
`;

export const Icon = styled(MaterialIcon)``;
