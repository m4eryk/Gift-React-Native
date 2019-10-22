import React from "react";
import { Image, StyleSheet } from 'react-native';
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Text,
  H2,
} from 'native-base';
import useAsyncEffect from "use-async-effect";
import { connect } from "react-redux";

import { ITEM_PAGE } from "../routing/route.constants";
import { getRandomGiftSelector } from "../state/selectors/giftSelector";
import {
  getRandomGiftAction,
  setSearchGiftParamsAction,
} from "../state/actions/giftActions";

function Swiper(props) {
  useAsyncEffect(async () => {
    const focusListener = props.navigation.addListener('didFocus', async () => {
      await props.getRandomGiftAction();
    });
    await props.getRandomGiftAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  const navigateToGift = async gift =>  {
    await props.setSearchGiftParamsAction({id: gift._id});
    props.navigation.navigate(ITEM_PAGE);
  };

  const nextGift = async () => {
    await props.getRandomGiftAction();
  };

  return (
    <Container style={styles.container}>
      <H2 style={{textAlign: 'center', marginBottom: 20}}>Random gift</H2>
      <View>
        {props.randomGift
        ? (
            <DeckSwiper
              dataSource={props.randomGift}
              onSwipeRight={navigateToGift}
              onSwipeLeft={nextGift}
              renderItem={item =>
                <Card style={{ elevation: 1 }}>
                  <CardItem
                    style={{display: 'flex', justifyContent: 'center'}}
                  >
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
          )
        : null}
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

const mapStateToProps = state => ({
  randomGift: getRandomGiftSelector(state)
});

const actions = {
  getRandomGiftAction,
  setSearchGiftParamsAction
};

export default connect(mapStateToProps, actions)(Swiper)
