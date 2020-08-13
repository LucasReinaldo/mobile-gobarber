import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, ButtonText, IconContainer, Icon } from './styles';

interface ButtonProps extends RectButtonProperties {
  children: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({ children, icon, ...rest }) => (
  <Container {...rest}>
    <ButtonText>{children}</ButtonText>
    {icon && (
      <IconContainer>
        <Icon name={icon} size={20} color="#312e38" />
      </IconContainer>
    )}
  </Container>
);

export default Button;
