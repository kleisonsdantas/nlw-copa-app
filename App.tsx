import { NativeBaseProvider, StatusBar} from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';

import { THEME } from './src/styles/theme';
import { Loading } from './src/components/Loading';
import { SignIn } from './src/screens/SignIn';
import { AppProvider } from "./src/hooks";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return ;
  }

  return (
    <NativeBaseProvider theme={THEME}>
      <AppProvider>
        <StatusBar
          barStyle="light-content"
          backgroundColor='transparent'
          translucent
          />
        { !fontsLoaded  ?  <Loading /> : <SignIn/> }
      </AppProvider>
    </NativeBaseProvider>
  );
}