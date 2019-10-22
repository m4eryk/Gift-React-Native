import React, { useState } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Textarea,
  Icon,
  Button,
  Text,
  Picker,
  Input, Toast
} from 'native-base';
import {connect} from "react-redux";

import toastStyles from "../styles/toast";
import {createGiftAction, getGiftsAction} from "../state/actions/giftActions";
import useAsyncEffect from "use-async-effect";
import { getCategoriesAction } from "../state/actions/categoryActions";
import { getCategoriesSelector } from "../state/selectors/categorySelector";

function CreateGift(props) {
  const [state, setState] = useState({
    category: '',
    hobby: '',
    forWhy: '',
    title: '',
    image: '',
    age: '',
    text: '',
    link: ''
  });

  useAsyncEffect(async () => {
    const focusListener = props.navigation.addListener('didFocus', async () => {
      await props.getCategoriesAction();
    });
    await props.getCategoriesAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  const onPickerChange = name => value => {
    setState({
      ...state,
      [name]: value
    })
  };

  const onValueChange = name => event => {
    setState({
      ...state,
      [name]: event.nativeEvent.text
    })
  };

  const submitForm = async () => {
    const responseData = await props.createGiftAction(state);
    Toast.show({
      text: responseData.message,
      buttonText: 'Okay',
      style: toastStyles.success,
      position: "top",
      duration: 4000,
    });
    await props.getGiftsAction({});
  };

  return (
    <Container>
      <Content>
        <Form>

          <Item style={{marginRight: 20}}>
            <Input
              value={state.title}
              onChange={onValueChange('title')}
              placeholder="Title"
            />
          </Item>

          <Item style={{marginRight: 20}}>
            <Input
              value={state.image}
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
              value={state.age}
              onChange={onValueChange('age')}
              placeholder="Age"
            />
          </Item>

          <Item style={{marginRight: 20}}>
            <Textarea
              value={state.text}
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
              selectedValue={state.category}
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
              selectedValue={state.forWhy}
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
              selectedValue={state.hobby}
              onValueChange={onPickerChange('hobby')}
            >
              <Picker.Item label="" value="" />
              <Picker.Item label="Computer" value="computer" />
              <Picker.Item label="Films" value="films" />
              <Picker.Item label="Music" value="music" />
            </Picker>
          </Item>

          <Button
            style={{margin: 20}}
            block
            rounded
            success
            onPress={submitForm}
          >
            <Text>Create</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  categories: getCategoriesSelector(state),
});

const actions = {
  getCategoriesAction,
  createGiftAction,
  getGiftsAction,
};

export default connect(mapStateToProps, actions)(CreateGift)
