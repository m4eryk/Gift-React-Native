import React, {useState} from 'react';
import { StyleSheet } from 'react-native';
import * as Font from 'expo-font';
import {useAsyncEffect} from 'use-async-effect'
import { Spinner } from '@shoutem/ui'
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import store from './src/state/store';
import Header from './src/components/header.component';
import RubikFont from './src/fonts/rubik.font';
import RobotoFont from './src/fonts/roboto.font';
import Category from "./src/components/category.component";
import CategoryItem from "./src/components/category-item.component";
import FooterTabs from "./src/components/footer.component";
import {Button, FooterTab, Icon, Content, Container} from "native-base";
import Route from './src/routing/route'

export default function App(props) {
  const [state, setState] = useState({
    fontsAreLoaded: false,
    isDrawerOpen: true,
  });

  useAsyncEffect(async () => {
    await Font.loadAsync({
      ...RubikFont,
      ...RobotoFont,
    });
    setState({
      ...state,
      fontsAreLoaded: true
    })
  }, []);
  //console.log(props)

  return (
    <>
      {state.fontsAreLoaded
        ? (
          <Provider store={store}>
            <Container style={{height: '100%'}}>
              <Route />
            </Container>
          </Provider>
        )
        : <Spinner
            color="#00BEF7"
            size="large"
          />
      }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedBox: {
    flex: 1,
    backgroundColor: "#38C8EC",
  },
});

