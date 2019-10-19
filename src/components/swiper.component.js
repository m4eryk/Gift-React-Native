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
  Icon
} from 'native-base';

import fakeSwiper from '../fake/swiper.fake';

export default function Swiper(props) {
  return (
    <Container style={styles.container}>
      <View>
        <DeckSwiper
          dataSource={fakeSwiper}
          renderItem={item =>
            <Card style={{ elevation: 3 }}>
              <CardItem>
                <Left>
                  <Thumbnail source={{uri: item.image}} />
                  <Body>
                    <Text>{item.text}</Text>
                    <Text note>NativeBase</Text>
                  </Body>
                </Left>
              </CardItem>
              <CardItem cardBody>
                <Image style={{ height: 200, flex: 1 }} source={{uri: item.image}} />
              </CardItem>
              <CardItem>
                <Icon name="heart" style={{ color: '#ED4A6A' }} />
                <Text>{item.name}</Text>
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
    margin: 10
  }
});
