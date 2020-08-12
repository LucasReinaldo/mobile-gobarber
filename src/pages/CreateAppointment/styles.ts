import styled from 'styled-components/native';
import { FlatList, RectButton } from 'react-native-gesture-handler';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Provider } from './index';

interface ProviderContainerProps {
  selected: boolean;
}

interface ProviderNameProps {
  selected: boolean;
}

interface HourProps {
  available: boolean;
  selected: boolean;
}

interface HourTextProps {
  selected: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Main = styled.ScrollView``;

export const Header = styled.View`
  align-items: center;
  background: #28262e;
  flex-direction: row;
  justify-content: space-between;
  padding: 24px 24px 14px;
  padding-top: ${getStatusBarHeight() + 24}px;
`;

export const BackButton = styled.TouchableOpacity`
  padding-top: 5px;
`;

export const HeaderTitle = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 22px;
  margin-left: 16px;
`;

export const UserAvatar = styled.Image`
  border-radius: 32px;
  height: 64px;
  margin-left: auto;
  width: 64px;
`;

export const ProvidersListContainer = styled.View`
  height: 108px;
`;

export const ProvidersList = styled(FlatList as new () => FlatList<Provider>)`
  padding: 28px 24px;
`;

export const ProviderContainer = styled(RectButton)<ProviderContainerProps>`
  align-items: center;
  background: ${(props) => (props.selected ? '#01baef' : '#3e3b47')};
  border-radius: 10px;
  flex-direction: row;
  margin-right: 16px;
  padding: 8px 12px;
`;

export const ProviderAvatar = styled.Image`
  border-radius: 21px;
  height: 42px;
  width: 42px;
`;

export const ProviderName = styled.Text<ProviderNameProps>`
  color: ${(props) => (props.selected ? '#232121' : '#f4ede8')};
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  margin-left: 8px;
`;

export const CalendarContainer = styled.View``;

export const Title = styled.Text`
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  margin: 0 24px 12px;
`;

export const Calendar = styled.View`
  background: #3e3b47;
  color: #f4ede8;
  border-radius: 10px;
  width: 95%;
  margin: 0 auto;
`;

export const Schedule = styled.View`
  padding: 24px 0 16px;
`;

export const Section = styled.View`
  margin-bottom: 18px;
`;

export const SectionTitle = styled.Text`
  font-size: 18px;
  color: #999591;
  font-family: 'RobotoSlab-Regular';
  margin: 0 24px 12px;
`;

export const SectionContent = styled.ScrollView.attrs({
  contentContainerStyle: { paddingHorizontal: 24 },
  horizontal: true,
  showsHorizontalScrollIndicator: false,
})``;

export const Hour = styled(RectButton)<HourProps>`
  padding: 12px;
  background: ${(props) => (props.selected ? '#01baef' : '#3e3b47')};
  border-radius: 10px;
  margin-right: 8px;

  opacity: ${(props) => (props.available ? 1 : 0.3)};
`;

export const HourText = styled.Text<HourTextProps>`
  color: ${(props) => (props.selected ? '#232129' : '#f4ede8')};
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;

export const CreateAppointmentButton = styled(RectButton)`
  height: 48px;
  background: #01baef;
  border-radius: 10px;
  margin: 0 24px 24px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-bottom: ${getBottomSpace() + 24}px;
`;

export const CreateAppointmentButtonText = styled.Text`
  color: #232129;
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
`;
