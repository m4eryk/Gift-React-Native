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
import useAsyncEffect from "use-async-effect";
import { connect } from "react-redux";
import {getGiftsSelector, getSearchParamsSelector} from "../state/selectors/giftSelector";
import { getGiftsAction } from "../state/actions/giftActions";

function CategoryItems(props) {
  const { searchParams } = props;

  useAsyncEffect(async () => {
    const focusListener = await props.navigation.addListener('didFocus', async () => {
      await props.getGiftsAction(searchParams);
    });
    await props.getGiftsAction(searchParams);

    return () => {
      focusListener.remove();
    };
  }, []);

  const navigateToGift = id => () => {

  };

  return (
    <View>
      {props.gifts.map(((gift, key) => (
        <TouchableOpacity
          key={gift.title + key}
          onPress={navigateToGift(gift._id)}>
          <Row key={gift.title}>
            <Image
              styleName="small rounded-corners"
              source={{uri: gift.image}}
            />
            <View style={styles.container} styleName="vertical">
              <Subtitle numberOfLines={1} style={styles.subtitle}>{gift.title}</Subtitle>
              <Caption>{gift.caption}</Caption>
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

const mapStateToProps = state => ({
  gifts: getGiftsSelector(state),
  searchParams: getSearchParamsSelector(state),
});

const actions = {
  getGiftsAction,
};

export default connect(mapStateToProps, actions)(CategoryItems)
