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
import {getGiftsSelector, getLikesSelector, getSearchParamsSelector} from "../state/selectors/giftSelector";
import {getGiftsAction, setSearchGiftParamsAction} from "../state/actions/giftActions";
import {deleteLikeAction, getLikeAction} from "../state/actions/likeActions";
import {Button, Icon, Right, Toast} from "native-base";
import toastStyles from "../styles/toast";

function LikeList(props) {
  useAsyncEffect(async () => {
    const focusListener = await props.navigation.addListener('didFocus', async () => {
      await props.getLikeAction();
    });
    await props.getLikeAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  const navigateToGift = id => async () => {
    await props.setSearchGiftParamsAction({id});
    props.navigation.navigate(ITEM_PAGE);
  };

  const deleteLike = id => async () => {
    const responseData = await props.deleteLikeAction(id);
    Toast.show({
      text: responseData.message,
      buttonText: 'Okay',
      style: toastStyles.success,
      position: "top",
      duration: 4000,
    });
    await props.getLikeAction();
  };

  return (
    <View>
      {props.likes.map(((item, key) => (
        <TouchableOpacity
          key={item.gift.title + key}
          onPress={navigateToGift(item.gift._id)}>
          <Row key={item.gift.title}>
            <Image
              styleName="small rounded-corners"
              source={{uri: item.gift.image}}
            />
            <View style={styles.container} styleName="vertical">
              <Subtitle numberOfLines={1} style={styles.subtitle}>{item.gift.title}</Subtitle>
              <Caption numberOfLines={1}>{item.gift.text}</Caption>
            </View>
            <Button
              transparent
              block
              onPress={deleteLike(item._id)}
            >
              <Icon
                name="trash"
              />
            </Button>
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
  likes: getLikesSelector(state)
});

const actions = {
  getLikeAction,
  setSearchGiftParamsAction,
  deleteLikeAction,
};

export default connect(mapStateToProps, actions)(LikeList)
