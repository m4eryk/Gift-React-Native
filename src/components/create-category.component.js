import React, {useState} from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Textarea,
  Button,
  Text,
  Input, Toast
} from 'native-base';
import { connect } from "react-redux";

import { createCategoryAction, getCategoriesAction } from "../state/actions/categoryActions";
import toastStyles from "../styles/toast";

function CreateCategory(props) {
  const [state, setState] = useState({
    title: '',
    image: '',
    text: ''
  });

  const onValueChange = name => event => {
    setState({
      ...state,
      [name]: event.nativeEvent.text
    })
  };

  const submitForm = async () => {
    const responseData = await props.createCategoryAction(state);
    Toast.show({
      text: responseData.message,
      buttonText: 'Okay',
      style: toastStyles.success,
      position: "top",
      duration: 4000,
    });
    await props.getCategoriesAction();
  };


  return (
    <Container>
      <Content>
        <Form>

          <Item style={{marginRight: 20}}>
            <Input
              value={state.title}
              placeholder="Title"
              onChange={onValueChange('title')}
            />
          </Item>

          <Item style={{marginRight: 20}}>
            <Input
              value={state.image}
              placeholder="Image"
              onChange={onValueChange('image')}
            />
          </Item>

          <Item style={{marginRight: 20}}>
            <Textarea
              value={state.text}
              style={{flex: 1}}
              rowSpan={10}
              bordered
              placeholder="Text"
              onChange={onValueChange('text')}
            />
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

const actions = {
  getCategoriesAction,
  createCategoryAction,
};

export default connect(null, actions)(CreateCategory)
