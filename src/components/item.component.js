import React  from "react";
import {
  InlineGallery,
  Text,
  Title
} from '@shoutem/ui'
import { Container } from "native-base";
import { StyleSheet } from "react-native";

import useAsyncEffect from "use-async-effect";
import {getGiftsSelector, getSearchGiftParamsSelector} from "../state/selectors/giftSelector";
import {getGiftAction} from "../state/actions/giftActions";
import {connect} from "react-redux";

function Gift(props) {
  const { searchParams } = props;

  useAsyncEffect(async () => {
    const focusListener = await props.navigation.addListener('didFocus', async () => {
      await props.getGiftAction();
    });
    await props.getGiftAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  return (
    <Container>
      <InlineGallery
        styleName="large-banner"
        data={props.gift.image}
      />
      <Title
        style={props.gift.title}
        styleName="h-center"
      >
        {props.gift.title}
      </Title>
      <Text
        style={styles.text}
      >
        {props.gift.text}
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

const mapStateToProps = state => ({
  gift: getGiftsSelector(state),
  searchParams: getSearchGiftParamsSelector(state),
});

const actions = {
  getGiftAction,
};

export default connect(mapStateToProps, actions)(Gift)
