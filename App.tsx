import { RecoilRoot } from 'recoil';
import Welcome from './src/pages/Welcome';
import CreateExercises from './src/pages/Welcome/CreateExercises';
import StyleGroups from './src/pages/Welcome/StyleGroups';
import Workout from './src/pages/Workout';
import Home from './src/pages/Home';
import Presets from './src/pages/Presets';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Configuration from './src/pages/Configuration';
import EditWorkout from './src/pages/Presets/EditWorkout';
export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <RecoilRoot>
        <NavigationContainer>
          <StatusBar backgroundColor="#111827" style='light' />
          <Stack.Navigator screenOptions={{ gestureDirection: 'horizontal', gestureEnabled: true }} initialRouteName='Home'>
            <Stack.Group screenOptions={{ headerShown: false, animation: 'default' }} >
              <Stack.Screen name='Home' component={Home} />
              <Stack.Screen name='Workout' component={Workout} options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Treinos" }} />
              <Stack.Screen name='EditWorkout' component={EditWorkout} options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Editar Treino" }} />
              <Stack.Screen name='Presets' options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Predefinições" }}
                component={Presets} />
              <Stack.Screen name='Configuration' options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Configurações" }}
                component={Configuration} />
              <Stack.Screen name='Welcome' component={Welcome} />
              <Stack.Screen name='CreateExercises' component={CreateExercises} />
              <Stack.Screen name='StyleGroups' component={StyleGroups} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </RecoilRoot>
    </SafeAreaProvider>

    // <Suspense>
    //   <RecoilRoot>
    //     <NavigationContainer>
    //       <Stack.Navigator initialRouteName='Teste'>
    //           <Stack.Screen name='Teste' component={Teste} />
    //         <Stack.Group screenOptions={{ headerShown: false , animation: 'default'}} >
    //           <Stack.Screen name='Home' component={Home} />
    //           <Stack.Screen name='Workout' component={Workout} options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Treinos" }}/>
    //           <Stack.Screen name='Presets' options={{ headerShown: true, headerStyle: { backgroundColor: "#111827" }, headerTintColor: '#fff', title: "Configurações" }}
    //             component={Presets} />
    //           <Stack.Screen name='Welcome' component={Welcome} />
    //           <Stack.Screen name='CreateExercises' component={CreateExercises} />
    //           <Stack.Screen name='StyleGroups' component={StyleGroups} />
    //         </Stack.Group>
    //       </Stack.Navigator>
    //     </NavigationContainer>
    //   </RecoilRoot>
    // </Suspense>
  );
}
