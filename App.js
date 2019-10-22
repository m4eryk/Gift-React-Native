import React, {useState} from 'react';
import * as Font from 'expo-font';
import {useAsyncEffect} from 'use-async-effect'
import { Provider } from 'react-redux';
import { Container } from "native-base";

import store from './src/state/store';
import RubikFont from './src/fonts/rubik.font';
import RobotoFont from './src/fonts/roboto.font';
import { getUserAction } from "./src/state/actions/userActions";
import ContainerRoute from "./src/components/container.component";

function App() {
  const [state, setState] = useState({
    fontsAreLoaded: false,
    isAppLoaded: false,
  });

  useAsyncEffect(async () => {
    await Font.loadAsync({
      ...RubikFont,
      ...RobotoFont,
    });
    await store.dispatch(getUserAction());
    setState({
      ...state,
      isAppLoaded: true
    })
  }, []);

  return (
    <>
      {state.isAppLoaded
        ? (
          <Provider store={store}>
            <Container style={{height: '100%'}}>
              <ContainerRoute />
            </Container>
          </Provider>
        )
        : null}
    </>
  );
}

export default App
