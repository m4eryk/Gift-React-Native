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
  Icon, Toast, Item, Input, Textarea, Form
} from 'native-base'
import { withNavigation } from "react-navigation";
import { TouchableOpacity, View } from "react-native";
import { connect } from "react-redux";
import Dialog from "react-native-dialog";
import toastStyles from "../styles/toast";
import useAsyncEffect from "use-async-effect";

import { ITEM_PAGE } from "../routing/route.constants";
import { getCategoriesSelector } from "../state/selectors/categorySelector";
import {
  deleteCategoryAction,
  getCategoriesAction,
  updateCategoryAction,
} from "../state/actions/categoryActions";

function CategoryManagement(props) {
  useAsyncEffect(async () => {
    const focusListener = props.navigation.addListener('didFocus', async () => {
      await props.getCategoriesAction();
    });
    await props.getCategoriesAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  const [state, setState] = useState({
    isModalVisible: false,
    currentCategory: {
      title: '',
      image: '',
      text: '',
      _id: '',
    },
  });

  const deleteGift = (id) => async () => {
    const responseData = await props.deleteCategoryAction(id);
    Toast.show({
      text: responseData.message,
      buttonText: 'Okay',
      style: toastStyles.success,
      position: "top",
      duration: 4000,
    });
    await props.getCategoriesAction();
  };

  const toggleModal = category => () => {
    if (category) {
      setState({
        ...state,
        isModalVisible: !state.isModalVisible,
        currentCategory: category
      });
    } else {
      setState({
        ...state,
        isModalVisible: !state.isModalVisible,
      });
    }
  };

  const updateCategory = async () => {
    const responseData = await props.updateCategoryAction(
      state.currentCategory._id,
      state.currentCategory,
    );
    setState({
      ...state,
      isModalVisible: false,
    });
    await props.getCategoriesAction();
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
      currentCategory: {
        ...state.currentCategory,
        [name]: event.nativeEvent.text
      }
    })
  };

  return (
    <>
      <View>
        <Dialog.Container visible={state.isModalVisible}>
          <Dialog.Title>Redact category</Dialog.Title>

            <Form>
              <Item style={{marginRight: 20}}>
                <Input
                  value={state.currentCategory.title}
                  placeholder="Title"
                  onChange={onValueChange('title')}
                />
              </Item>

              <Item style={{marginRight: 20}}>
                <Input
                  value={state.currentCategory.image}
                  placeholder="Image"
                  onChange={onValueChange('image')}
                />
              </Item>

              <Item style={{marginRight: 20}}>
                <Textarea
                  value={state.currentCategory.text}
                  style={{flex: 1}}
                  rowSpan={5}
                  bordered
                  placeholder="Text"
                  onChange={onValueChange('text')}
                />
              </Item>
            </Form>

          <Dialog.Button label="Cancel" onPress={toggleModal()} />
          <Dialog.Button label="Change" onPress={updateCategory} />
        </Dialog.Container>
      </View>

      <Container>
        <Content>
          <List>
            {props.categories.map((category, key) => (
              <TouchableOpacity
                key={category.title + key}
              >
                <ListItem
                  thumbnail
                >
                  <Left>
                    <Thumbnail
                      square
                      source={{ uri: category.image }}
                    />
                  </Left>
                  <Body>
                    <Text
                      numberOfLines={2}
                    >{category.title}</Text>
                  </Body>
                  <Right
                    style={{display: "flex", flexDirection: "row", padding: 0}}
                  >
                    <Button
                      transparent
                      block
                      onPress={deleteGift(category._id)}
                    >
                      <Icon
                        name="trash"
                      />
                    </Button>
                    <Button
                      onPress={toggleModal(category)}
                      transparent
                      block
                    >
                      <Icon
                        name="create"
                      />
                    </Button>
                    <Button
                      onPress={() => props.navigation.navigate(ITEM_PAGE)}
                      transparent
                      block
                    >
                      <Icon
                        name="information-circle-outline"
                      />
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

const mapStateToProps = state => ({
  categories: getCategoriesSelector(state),
});

const actions = {
  getCategoriesAction,
  updateCategoryAction,
  deleteCategoryAction,
};

export default connect(mapStateToProps, actions)(withNavigation(CategoryManagement));
