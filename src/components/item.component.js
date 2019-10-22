import React  from "react";
import {
  InlineGallery,
  Text,
  Title
} from '@shoutem/ui'
import { Container, Icon, Button, Toast } from "native-base";
import { StyleSheet, View, Linking, ScrollView } from "react-native";
import { connect } from "react-redux";
import useAsyncEffect from "use-async-effect";

import {
  getGiftSelector,
  getSearchGiftParamsSelector,
} from "../state/selectors/giftSelector";
import { getGiftAction } from "../state/actions/giftActions";
import { setLikeAction } from "../state/actions/likeActions";
import toastStyles from "../styles/toast";
import ProtectedComponent from "./protected.component";
import { getUser } from "../state/selectors/userSelector";
import { USER_ROLE } from "../constants/user-role.contants";

function Gift(props) {
  const { ADMIN, USER } = USER_ROLE;

  useAsyncEffect(async () => {
    const focusListener = await props.navigation.addListener('didFocus', async () => {
      await props.getGiftAction();
    });
    await props.getGiftAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  const like = id => async () => {
    try {
      const responseData = await props.setLikeAction({gift: id});
      Toast.show({
        text: responseData.message,
        buttonText: 'Okay',
        style: toastStyles.success,
        position: "top",
        duration: 4000,
      });
    } catch (error) {
      const errorMsg = error.response.data.msg;
      Toast.show({
        text: errorMsg,
        buttonText: 'Okay',
        style: toastStyles.error,
        position: "top",
        duration: 4000,
      });
    }
  };

  return (
    <Container>
      <InlineGallery
        styleName="large-banner"
        data={[{source: {uri: props.gift.image}}]}
      />
      <Title
        style={styles.title}
        styleName="h-center"
      >
        {props.gift.title}
      </Title>

      <ScrollView style={{height: '100%'}}>
        <Text
          style={styles.text}
        >
          {props.gift.text}
        </Text>
      </ScrollView>

      <ProtectedComponent
        currentRole={props.user.role}
        role={[ADMIN, USER]}
      >
        <View style={styles.actionContainer}>
          <Button
            transparent
            block
            icon
            onPress={like(props.gift._id)}
          >
            <Icon
              style={{...styles.like, ...styles.icon}}
              name="heart"
            />
          </Button>

          <Button
            transparent
            block
            icon
            onPress={() => Linking.openURL(props.gift.link)}
          >
            <Icon
              style={{...styles.icon}}
              name="basket"
            />
          </Button>
        </View>
      </ProtectedComponent>
    </Container>
  )
}

const styles = StyleSheet.create({
  title: {
    margin: 20
  },
  text: {
    padding: 10
  },
  actionContainer: {
    padding: 5,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  like: {
    color: 'red',
  },
  icon: {
    fontSize: 50,
  }
});

const mapStateToProps = state => ({
  gift: getGiftSelector(state),
  searchParams: getSearchGiftParamsSelector(state),
  user: getUser(state),
});

const actions = {
  getGiftAction,
  setLikeAction,
};

export default connect(mapStateToProps, actions)(Gift)
