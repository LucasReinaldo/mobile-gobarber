import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { useNavigation, useRoute } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-vector-icons/Feather';

import moment, { Moment } from 'moment';

import { format } from 'date-fns';
import { Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';

import api from '../../services/api';

import {
  BackButton,
  Calendar,
  CalendarContainer,
  Container,
  CreateAppointmentButton,
  CreateAppointmentButtonText,
  Header,
  HeaderTitle,
  Hour,
  HourText,
  Main,
  ProviderAvatar,
  ProviderContainer,
  ProviderName,
  ProvidersList,
  ProvidersListContainer,
  Schedule,
  Section,
  SectionContent,
  SectionTitle,
  Title,
  UserAvatar,
} from './styles';

export interface Provider {
  id: string;
  name: string;
  avatar_url: string;
}

interface RouteParams {
  providerId: string;
}

interface MonthAvailability {
  day: number;
  available: boolean;
}

interface DayAvailability {
  hour: number;
  available: boolean;
}

const CreateAppointment: React.FC = () => {
  const { user } = useAuth();
  const route = useRoute();
  const { providerId } = route.params as RouteParams;

  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProvider, setSelectedProvider] = useState(providerId);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));
  const [currentMonth, setCurrentMonth] = useState(moment(new Date()));
  const [selectedHour, setSelectedHour] = useState(0);
  const [dayAvailability, setDayAvailability] = useState<DayAvailability[]>([]);
  const [monthAvailability, setMonthAvailability] = useState<
    MonthAvailability[]
  >([]);

  const { goBack, navigate } = useNavigation();

  useEffect(() => {
    api.get('/providers').then((response) => {
      setProviders(response.data);
    });
  }, []);

  const handleDateChange = useCallback(
    (date: Moment) => {
      setSelectedDate(date);

      dayAvailability.map(({ available, hour }) => {
        if (hour === selectedHour && available === false) {
          setSelectedHour(0);
        }
        return selectedHour;
      });
    },
    [dayAvailability, selectedHour],
  );

  const handleMonthChange = useCallback((month: Moment) => {
    setCurrentMonth(month);
  }, []);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/day-availability`, {
        params: {
          year: selectedDate.year(),
          month: currentMonth.month() + 1,
          day: selectedDate.date(),
        },
      })
      .then((response) => {
        setDayAvailability(response.data);
      });
  }, [currentMonth, selectedDate, selectedProvider]);

  useEffect(() => {
    api
      .get(`/providers/${selectedProvider}/month-availability`, {
        params: {
          year: currentMonth.year(),
          month: currentMonth.month() + 1,
        },
      })
      .then((response) => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, selectedProvider]);

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const handleSelectedProvider = useCallback((id: string) => {
    setSelectedProvider(id);
  }, []);

  const handleSelectedHour = useCallback((hour: number) => {
    setSelectedHour(hour);
  }, []);

  const handleCreateAppointment = useCallback(async () => {
    try {
      const date = moment(selectedDate);
      date.hours(selectedHour);
      date.minutes(0);

      await api.post('/appointments', {
        provider_id: selectedProvider,
        date,
      });

      const providerName = providers
        .filter((provider) => provider.id === selectedProvider)
        .map((el) => el.name);

      navigate('AppointmentCreated', { date: date.valueOf(), providerName });
    } catch (err) {
      Alert.alert('Error', 'Please try again.');
    }
  }, [navigate, providers, selectedDate, selectedHour, selectedProvider]);

  const morningAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour < 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvailability]);

  const afternoonAvailability = useMemo(() => {
    return dayAvailability
      .filter(({ hour }) => hour >= 12)
      .map(({ hour, available }) => ({
        hour,
        available,
        hourFormatted: format(new Date().setHours(hour), 'HH:00'),
      }));
  }, [dayAvailability]);

  const disabledDays = useMemo(() => {
    const datesTaken = monthAvailability
      .filter((monthDays) => monthDays.available === false)
      .map((days) => {
        const year = currentMonth.year();
        const month = currentMonth.month();
        return new Date(year, month, days.day);
      });

    const startDate = moment([currentMonth.year(), currentMonth.month()]);
    const endDate = moment(startDate).endOf('month');

    if (startDate.day(0)) {
      datesTaken.push(startDate.toDate());
    }

    while (startDate.day(7).isBefore(endDate)) {
      datesTaken.push(startDate.toDate());
    }

    return datesTaken;
  }, [currentMonth, monthAvailability]);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#999591" />
        </BackButton>
        <HeaderTitle>Barbers</HeaderTitle>

        <UserAvatar source={{ uri: user.avatar_url }} />
      </Header>

      <Main>
        <ProvidersListContainer>
          <ProvidersList
            horizontal
            data={providers}
            keyExtractor={(provider) => provider.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: provider }) => (
              <ProviderContainer
                selected={provider.id === selectedProvider}
                onPress={() => handleSelectedProvider(provider.id)}
              >
                <ProviderAvatar source={{ uri: provider.avatar_url }} />
                <ProviderName selected={provider.id === selectedProvider}>
                  {provider.name}
                </ProviderName>
              </ProviderContainer>
            )}
          />
        </ProvidersListContainer>

        <CalendarContainer>
          <Title>Pick your best date</Title>
          <Calendar>
            <CalendarPicker
              disabledDates={[...disabledDays]}
              minDate={new Date()}
              onDateChange={handleDateChange}
              onMonthChange={handleMonthChange}
              nextComponent={
                <Icon name="chevron-right" size={18} color="#f4ede8" />
              }
              previousComponent={
                <Icon name="chevron-left" size={18} color="#f4ede8" />
              }
              restrictMonthNavigation
              selectedDayColor="#01baef"
              selectedDayTextColor="#232129"
              textStyle={{
                color: '#f4ede8',
                fontSize: 16,
              }}
              todayBackgroundColor="gray"
              todayTextStyle={{ fontWeight: 'bold' }}
              weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
            />
          </Calendar>
        </CalendarContainer>

        <Schedule>
          <Title>Pick your best time</Title>
          <Section>
            <SectionTitle>Morning</SectionTitle>
            <SectionContent>
              {morningAvailability.map(({ hourFormatted, available, hour }) => (
                <Hour
                  enabled={available}
                  key={hourFormatted}
                  available={available}
                  onPress={() => handleSelectedHour(hour)}
                  selected={selectedHour === hour && available === true}
                >
                  <HourText
                    selected={selectedHour === hour && available === true}
                  >
                    {hourFormatted}
                  </HourText>
                </Hour>
              ))}
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Afternoon</SectionTitle>
            <SectionContent>
              {afternoonAvailability.map(
                ({ hourFormatted, available, hour }) => (
                  <Hour
                    enabled={available}
                    key={hourFormatted}
                    available={available}
                    onPress={() => handleSelectedHour(hour)}
                    selected={selectedHour === hour && available === true}
                  >
                    <HourText
                      selected={selectedHour === hour && available === true}
                    >
                      {hourFormatted}
                    </HourText>
                  </Hour>
                ),
              )}
            </SectionContent>
          </Section>
        </Schedule>

        <CreateAppointmentButton onPress={handleCreateAppointment}>
          <CreateAppointmentButtonText>Book</CreateAppointmentButtonText>
        </CreateAppointmentButton>
      </Main>
    </Container>
  );
};

export default CreateAppointment;
