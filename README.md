<h1 align="center">GoBarber App</h1>
<p align="center">A React Native App that allows users to book appointments with their favourite barber.</p>


<h1 align="center">
    <img src="https://github.com/LucasReinaldo/mobile-gobarber/blob/master/assets/Login.png" alt="Login" width="250" />
    <img src="https://github.com/LucasReinaldo/mobile-gobarber/blob/master/assets/Register.png" alt="Register" width="250" />
    <img src="https://github.com/LucasReinaldo/mobile-gobarber/blob/master/assets/Home-app.png" alt="Home" width="250" />
    <img src="https://github.com/LucasReinaldo/mobile-gobarber/blob/master/assets/Profile.png" alt="Profile" width="250" />
    <img src="https://github.com/LucasReinaldo/mobile-gobarber/blob/master/assets/CreateAppointment.png" alt="SignIn" width="250" />
    <img src="https://github.com/LucasReinaldo/mobile-gobarber/blob/master/assets/AppointmentCreated.png" alt="SignIn" width="250" />
</h1>

## 💻 Project

The idea of using a calendar to pick the appointment date instead of the native picker is to bring the same user experience for both users (Android/iOS). Also, the only reason for using date-fns and momentJS, is because react-native-calendar-picker uses momentJS.

## 🚀 Technologies

The project was developed during the GoStack Bootcamp by RocketSeat, developed mainly with the following technologies:

```
dependencies:
  "@unform/core": "^2.1.0",
  "@unform/mobile": "^2.1.0",
  "axios": "^0.19.2",
  "date-fns": "^2.15.0",
  "moment": "^2.27.0",
  "react-native-calendar-picker": "^7.0.0",
  "react-native-gesture-handler": "^1.6.1",
  "react-native-image-picker": "^2.3.3",
  "react-native-iphone-x-helper": "^1.2.1",
  "react-native-reanimated": "^1.8.0",
  "react-native-safe-area-context": "^0.7.3",
  "react-native-screens": "^2.7.0",
  "react-native-vector-icons": "^7.0.0",
  "styled-components": "^5.1.0",
  "yup": "^0.28.5"

devDependencies:
  "@typescript-eslint/eslint-plugin": "^2.31.0",
  "@typescript-eslint/parser": "^2.31.0",
  "babel-jest": "^24.9.0",
  "eslint": "^6.8.0",
  "eslint-config-airbnb": "^18.1.0",
  "eslint-config-prettier": "^6.11.0",
  "eslint-import-resolver-typescript": "^2.0.0",
  "eslint-plugin-import": "^2.20.1",
  "eslint-plugin-jsx-a11y": "^6.2.3",
  "eslint-plugin-prettier": "^3.1.3",
  "eslint-plugin-react": "^7.19.0",
  "eslint-plugin-react-hooks": "^2.5.0",
  "jest": "^24.9.0",
  "metro-react-native-babel-preset": "^0.58.0",
  "prettier": "^2.0.5",
  "react-test-renderer": "16.11.0",
  "typescript": "^3.8.3"

VS Code with EditorConfig and ESLint
```

## 📚 How To Use

To clone and run this application, we will need NodeJS + Yarn (or NPM) installed on computer and the [GoBarber Backend API](https://github.com/LucasReinaldo/backend-gobarber). 

After this clone the repository, from our command line:

```
# Clone this repository
$ git clone https://github.com/LucasReinaldo/mobile-gobarber.git

# Go into the repository
$ cd mobile-gobarber

# Install dependencies
$ yarn install

# Start
$ yarn start

# Run the app (iOS)
$ cd ios && pod install && cd ..
$ react-native run-ios --simulator="iPhone 11"

# Run the app (Android)
$ react-native run-android
```

## 📖 License

This project is under MIT license [LICENSE](LICENSE.md) to know more.
