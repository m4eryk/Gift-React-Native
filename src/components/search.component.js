import React, {useState} from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input, Textarea, Text, Picker, Icon, Button
} from 'native-base';
import {ITEMS_LIST, SEARCH_PAGE} from "../routing/route.constants";
import {getGiftsSelector, getSearchParamsSelector} from "../state/selectors/giftSelector";
import {deleteGiftAction, getGiftsAction, setSearchParamsAction} from "../state/actions/giftActions";
import {connect} from "react-redux";
import useAsyncEffect from "use-async-effect";
import {getCategoriesAction} from "../state/actions/categoryActions";
import {getCategoriesSelector} from "../state/selectors/categorySelector";

function Search(props) {
  const [state, setState] = useState({
    category: '',
    hobby: '',
    forWhy: '',
    age: '',
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

  const search = async () => {
    setState({
      category: '',
      hobby: '',
      age: '',
      forWhy: '',
    });
    await props.setSearchParamsAction(state);
    props.navigation.navigate(ITEMS_LIST);
  };

  return (
    <Container>
      <Content>
        <Form>

          {/*<Item style={{marginRight: 20}}>*/}
          {/*  <Input placeholder="Title"/>*/}
          {/*</Item>*/}

          <Item style={{marginRight: 20}}>
            <Input
              last
              value={state.age}
              onChange={onValueChange('age')}
              placeholder="Age"
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
              <Picker.Item label="Girl" value="key0" />
              <Picker.Item label="Family" value="key1" />
              <Picker.Item label="Child" value="key2" />
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
              <Picker.Item label="Computer" value="key0" />
              <Picker.Item label="Films" value="key1" />
              <Picker.Item label="Music" value="key2" />
            </Picker>
          </Item>

          <Button
            style={{margin: 20}}
            block
            rounded
            success
            onPress={search}
          >
            <Text>Search</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

const mapStateToProps = state => ({
  gifts: getGiftsSelector(state),
  searchParams: getSearchParamsSelector(state),
  categories: getCategoriesSelector(state),
});

const actions = {
  getGiftsAction,
  getCategoriesAction,
  setSearchParamsAction,
  deleteGiftAction,
};

export default connect(mapStateToProps, actions)(Search)
