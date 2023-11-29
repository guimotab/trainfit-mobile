import { StyleSheet, Switch } from 'react-native';
import Home from './src/pages/Home';
import { RecoilRoot } from 'recoil';
import { Suspense } from 'react';
import { NativeRouter, Route, Router, Routes } from 'react-router-native';
import Configuration from './src/pages/Configuration';
import Welcome from './src/pages/Welcome';
import CreateExercises from './src/pages/Welcome/CreateExercises';
import Pagination from './src/pages/Welcome/Pagination';
import StyleGroups from './src/pages/Welcome/StyleGroups';
import Workout from './src/pages/Workout';
import Header from './src/components/Header';
import React from 'react';
export default function App() {
  React.useEffect(() => {
    console.log("oi");
    
}, [])
  return (
    <Suspense>
      <RecoilRoot>
        <NativeRouter>
          <Routes>
            <Route path="inicializar/" element={<Pagination />} >
              <Route path="criarGrupos" element={<Welcome />} />
              <Route path="criarExercicios" element={<CreateExercises />} />
              <Route path="estilizarGrupos" element={<StyleGroups />} />
            </Route>
            <Route path='/' element={<Header />}>
              <Route index element={<Home />} />
              <Route path='treino/:id' element={<Workout />} />
              <Route path='configuracoes' element={<Configuration />} />
            </Route>
          </Routes>
        </NativeRouter>
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
