import { StyleSheet } from 'react-native';
import Home from './src/pages/Home';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import Configuration from './src/pages/Configuration';
import Welcome from './src/pages/Welcome';
import CreateExercises from './src/pages/Welcome/CreateExercises';
import StyleGroups from './src/pages/Welcome/StyleGroups';
import Workout from './src/pages/Workout';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Suspense>
      <RecoilRoot>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Workout' 
              component={Workout} />
              {/* path='treino/:id'  */}
              <Stack.Screen name='Configuration' component={Configuration} />
              <Stack.Screen name='Welcome'  component={Welcome} />
              <Stack.Screen name='CreateExercises' component={CreateExercises} />
              <Stack.Screen name='StyleGroups' component={StyleGroups} />
        </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </Suspense>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
