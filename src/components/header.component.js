import React, {useEffect} from 'react';
import {
  NavigationBar,
  ImageBackground,
  Title,
} from '@shoutem/ui'
import {StyleSheet, View} from "react-native";

export default function Header(props) {
  return (
    <>
      <ImageBackground
        style={{ height: 25, backgroundColor: '#F0AD4E' }}
      >
        {/*<NavigationBar*/}
        {/*  styleName="clear"*/}
        {/*  centerComponent={<Title>GIFTS</Title>}*/}
        {/*>*/}
        {/*</NavigationBar>*/}
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  headerItem: {
    marginTop: 20
  }
});