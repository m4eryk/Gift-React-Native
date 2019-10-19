import React, {useState} from 'react';
import { StyleSheet, View } from "react-native";
import {
  ImageBackground,
  Title,
  ListView,
  Tile,
  TouchableOpacity,
  Subtitle,
  Divider,
  Screen,
} from '@shoutem/ui'

import fakeCategory from '../fake/category.fake';
import { ITEMS_LIST } from "../routing/route.constants";

export default function Category(props) {
  const [state, setState] = useState({
    restaurants: fakeCategory,
  });

  const { restaurants } = state;

  const renderRow = restaurant => {
    if (!restaurant) {
      return null;
    }

    return (
      <TouchableOpacity onPress={() => props.navigation.navigate(ITEMS_LIST)}>
        <View>
          <ImageBackground
            styleName="large-banner"
            source={{ uri: restaurant.image.url }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{ restaurant.name }</Title>
              <Subtitle styleName="sm-gutter-horizontal">{ restaurant.address }</Subtitle>
            </Tile>
          </ImageBackground>
          <Divider styleName="line" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <ListView
        data={restaurants}
        renderRow={renderRow}
      />
    </Screen>
  )
}
