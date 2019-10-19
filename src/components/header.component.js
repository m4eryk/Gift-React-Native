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
        source={{uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-3.png'}}
        style={{ height: 50 }}
      >
        <NavigationBar
          styleName="clear"
          centerComponent={<Title>GIFTS</Title>}
        >
        </NavigationBar>
      </ImageBackground>
    </>
  )
}

const styles = StyleSheet.create({
  headerItem: {
    marginTop: 20
  }
});