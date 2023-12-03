import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import Welcome from './src/pages/Welcome';
import CreateExercises from './src/pages/Welcome/CreateExercises';
import StyleGroups from './src/pages/Welcome/StyleGroups';
import Workout from './src/pages/Workout';
import Home from './src/pages/Home';
import Configuration from './src/pages/Configuration';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Suspense>
      <RecoilRoot>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home'>
            <Stack.Group screenOptions={{ headerShown: false }}>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Workout' component={Workout} options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Treino" }}/>
              <Stack.Screen name='Configuration' options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Configuração" }}
                component={Configuration} />
              <Stack.Screen name='Welcome' component={Welcome} />
              <Stack.Screen name='CreateExercises' component={CreateExercises} />
              <Stack.Screen name='StyleGroups' component={StyleGroups} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </Suspense>
  );
}
