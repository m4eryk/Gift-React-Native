import React, {useState} from "react";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Icon, Toast, Form, Item, Input, Textarea, Picker
} from 'native-base'
import { withNavigation } from "react-navigation";
import {ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import useAsyncEffect from "use-async-effect";
import { connect } from "react-redux";

import { ITEM_PAGE } from "../routing/route.constants";
import {
  deleteGiftAction,
  getGiftsAction,
  setSearchGiftParamsAction,
  updateGiftAction
} from "../state/actions/giftActions";
import {getGiftsSelector, getSearchParamsSelector} from "../state/selectors/giftSelector";
import toastStyles from "../styles/toast";
import Dialog from "react-native-dialog";
import {getCategoriesAction} from "../state/actions/categoryActions";
import {getCategoriesSelector} from "../state/selectors/categorySelector";

function GiftManagement(props) {
  useAsyncEffect(async () => {
    const focusListener = props.navigation.addListener('didFocus', async () => {
      await props.getGiftsAction({});
      await props.getCategoriesAction();
    });
    await props.getGiftsAction({});
    await props.getCategoriesAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  const [state, setState] = useState({
    isModalVisible: false,
    currentGift: {
      category: '',
      hobby: '',
      forWhy: '',
      title: '',
      image: '',
      age: '',
      text: '',
      link: '',
    },
  });

  const deleteGift = id => async () => {
    const responseData = await props.deleteGiftAction(id);
    Toast.show({
      text: responseData.message,
      buttonText: 'Okay',
      style: toastStyles.success,
      position: "top",
      duration: 4000,
    });
    await props.getGiftsAction({});
  };

  const updateGift = async () => {
    const responseData = await props.updateGiftAction(
      state.currentGift._id,
      state.currentGift,
    );
    setState({
      ...state,
      isModalVisible: false,
    });
    await props.getGiftsAction({});
    Toast.show({
      text: responseData.message,
      buttonText: 'Okay',
      style: toastStyles.success,
      position: "top",
      duration: 4000,
    });
  };

  const onValueChange = name => event => {
    setState({
      ...state,
      currentGift: {
        ...state.currentGift,
        [name]: event.nativeEvent.text
      }
    })
  };

  const onPickerChange = name => value => {
    setState({
      ...state,
      currentGift: {
        ...state.currentGift,
        [name]: value
      }
    })
  };

  const toggleModal = gift => () => {
    if (gift) {
      setState({
        ...state,
        isModalVisible: !state.isModalVisible,
        currentGift: gift
      });
    } else {
      setState({
        ...state,
        isModalVisible: !state.isModalVisible,
      });
    }
  };

  const navigateToGift = id => async () => {
    await props.setSearchGiftParamsAction({id});
    props.navigation.navigate(ITEM_PAGE);
  };

  return (
    <>
      <View>
        <ScrollView>
        <Dialog.Container style={styles.modal} visible={state.isModalVisible}>
          <ScrollView style={styles.modal} alwaysBounceVertical>
          <Dialog.Title>Redact gift</Dialog.Title>

          <Form>

            <Item style={{marginRight: 20}}>
              <Input
                value={state.currentGift.title}
                onChange={onValueChange('title')}
                placeholder="Title"
              />
            </Item>

            <Item style={{marginRight: 20}}>
              <Input
                value={state.currentGift.image}
                onChange={onValueChange('image')}
                placeholder="Image"
              />
            </Item>

            <Item style={{marginRight: 20}}>
              <Input
                value={state.link}
                onChange={onValueChange('link')}
                placeholder="Link on gift"
              />
            </Item>

            <Item style={{marginRight: 20}}>
              <Input
                last
                value={state.currentGift.age}
                onChange={onValueChange('age')}
                placeholder="Age"
              />
            </Item>

            <Item style={{marginRight: 20}}>
              <Textarea
                value={state.currentGift.text}
                onChange={onValueChange('text')}
                style={{flex: 1}}
                rowSpan={10}
                bordered
                placeholder="Text"
              />
            </Item>

            <Text  style={{marginLeft: 20}}>Category</Text>
            <Item style={{marginRight: 20, marginLeft: 20}} picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Category"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={state.currentGift.category}
                onValueChange={onPickerChange('category')}
              >
                <Picker.Item label="" value="" />
                {props.categories.map((category, key) => (
                  <Picker.Item
                    key={category.title + key}
                    label={category.title}
                    value={category._id}
                  />
                ))}
              </Picker>
            </Item>

            <Text  style={{marginLeft: 20}}>For why</Text>
            <Item style={{marginRight: 20, marginLeft: 20}} picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="For why"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={state.currentGift.forWhy}
                onValueChange={onPickerChange('forWhy')}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Girl" value="girl" />
                <Picker.Item label="Family" value="family" />
                <Picker.Item label="Child" value="child" />
              </Picker>
            </Item>

            <Text style={{marginLeft: 20}}>Hobby</Text>
            <Item style={{marginRight: 20, marginLeft: 20}} picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Hobby"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={state.currentGift.hobby}
                onValueChange={onPickerChange('hobby')}
              >
                <Picker.Item label="" value="" />
                <Picker.Item label="Computer" value="computer" />
                <Picker.Item label="Films" value="films" />
                <Picker.Item label="Music" value="music" />
              </Picker>
            </Item>
          </Form>

          <Dialog.Button label="Cancel" onPress={toggleModal()} />
          <Dialog.Button label="Change" onPress={updateGift} />
          </ScrollView>
        </Dialog.Container>
        </ScrollView>
      </View>

      <Container>
        <Content>
          <List>
            {props.gifts.map((gift, key) => (
              <TouchableOpacity
                key={gift.title + key}
              >
                <ListItem
                  thumbnail
                >
                  <Left>
                    <Thumbnail square source={{ uri: gift.image }} />
                  </Left>
                  <Body>
                    <Text numberOfLines={1}>{gift.title}</Text>
                    <Text note numberOfLines={1}>{gift.text}</Text>
                  </Body>
                  <Right style={{display: "flex", flexDirection: "row"}}>

                    <Button
                      onPress={deleteGift(gift._id)}
                      style={{padding: 0}}
                      transparent
                      block
                    >
                      <Icon style={{padding: 0}} name="trash"/>
                    </Button>

                    <Button
                      onPress={toggleModal(gift)}
                      transparent
                      block
                      style={{padding: 0}}
                    >
                      <Icon style={{padding: 0}} name="create"/>
                    </Button>

                    <Button
                      onPress={navigateToGift(gift._id)}
                      transparent
                      block
                      style={{padding: 0}}
                    >
                      <Icon style={{padding: 0}} name="information-circle-outline"/>
                    </Button>

                  </Right>
                </ListItem>
              </TouchableOpacity>
            ))}
          </List>
        </Content>
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    height: 400
  }
});

const mapStateToProps = state => ({
  gifts: getGiftsSelector(state),
  categories: getCategoriesSelector(state),
});

const actions = {
  getGiftsAction,
  updateGiftAction,
  getCategoriesAction,
  setSearchGiftParamsAction,
  deleteGiftAction,
};

export default connect(mapStateToProps, actions)(withNavigation(GiftManagement))


