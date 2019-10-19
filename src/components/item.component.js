import React  from "react";
import {
  InlineGallery,
  Text,
  Title
} from '@shoutem/ui'
import { Container } from "native-base";
import { StyleSheet } from "react-native";

import fakeItem from '../fake/item';

export default function (props) {
  return (
    <Container>
      <InlineGallery
        styleName="large-banner"
        data={fakeItem.photos}
      />
      <Title
        style={styles.title}
        styleName="h-center"
      >
        {fakeItem.title}
      </Title>
      <Text
        style={styles.text}
      >
        {fakeItem.text}
      </Text>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    margin: 10
  },
  text: {
    padding: 10
  }
});
