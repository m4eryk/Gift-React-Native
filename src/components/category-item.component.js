import React from 'react';
import { StyleSheet, View } from "react-native";
import {
  Caption,
  Row,
  Image,
  Subtitle,
  TouchableOpacity,
} from '@shoutem/ui'

import { ITEM_PAGE } from "../routing/route.constants";
import fakeItems from "../fake/items.fake";

export default function CategoryItems(props) {
  return (
    <View>
      {fakeItems.map((item => (
        <TouchableOpacity
          key={item.title}
          onPress={() => props.navigation.navigate(ITEM_PAGE)}>
          <Row key={item.title}>
            <Image
              styleName="small rounded-corners"
              source={{uri: item.image}}
            />
            <View style={styles.container} styleName="vertical">
              <Subtitle numberOfLines={1} style={styles.subtitle}>{item.title}</Subtitle>
              <Caption>{item.caption}</Caption>
            </View>
          </Row>
        </TouchableOpacity>
      )))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    flex: 1
  },
  subtitle: {
    overflow: 'hidden',
  }
});
