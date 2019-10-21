import React from "react";
import {Image, StyleSheet} from 'react-native';
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  H2,
  Icon
} from 'native-base';

import fakeSwiper from '../fake/swiper.fake';
import {ITEM_PAGE} from "../routing/route.constants";

export default function Swiper(props) {
  return (
    <Container style={styles.container}>
      <View>
        <DeckSwiper
          dataSource={fakeSwiper}
          onSwipeRight={() => props.navigation.navigate(ITEM_PAGE)}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <H2
                  numberOfLines={1}
                >
                  {item.title}
                </H2>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 200, flex: 1 }} source={{uri: item.image}} />
              </CardItem>
              <CardItem>
                <Text numberOfLines={3}>{item.text}</Text>
              </CardItem>
            </Card>
          }
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
    marginTop: '25%'
  }
});
