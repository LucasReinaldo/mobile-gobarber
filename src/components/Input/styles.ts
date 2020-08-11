import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  align-items: center;
  background: #232129;
  border-color: #232129;
  border-radius: 10px;
  border-width: 2px;
  flex-direction: row;
  height: 60px;
  margin-bottom: 8px;
  padding: 0 16px;
  width: 100%;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #dd1c1a;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #01baef;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #fff;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 12px;
`;
