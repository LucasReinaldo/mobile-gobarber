import React, { useCallback, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import enGB from 'date-fns/locale/en-GB';

import {
  Container,
  Title,
  Description,
  OkButton,
  OkButtonText,
} from './styles';

interface RouteParams {
  date: number;
  providerName: string;
}

const AppointmentCreated: React.FC = () => {
  const { reset } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as RouteParams;

  const handleOkPressed = useCallback(() => {
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [reset]);

  const formattedDate = useMemo(() => {
    return format(
      routeParams.date,
      "EEEE', the 'do' of 'MMMM', 'yyyy' at 'HH:mm a",
      { locale: enGB },
    );
  }, [routeParams.date]);

  return (
    <Container>
      <Icon name="check-circle" size={80} color="#04d361" />

      <Title>Appointment scheduled</Title>
      <Description>
        {formattedDate} with {routeParams.providerName}.
      </Description>

      <OkButton onPress={handleOkPressed}>
        <OkButtonText>Done</OkButtonText>
        <Icon name="check" size={18} />
      </OkButton>
    </Container>
  );
};

export default AppointmentCreated;
