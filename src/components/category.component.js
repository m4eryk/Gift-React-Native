import React from 'react';
import { View } from "react-native";
import {
  ImageBackground,
  Title,
  ListView,
  Tile,
  TouchableOpacity,
  Subtitle,
  Divider,
  Screen,
} from '@shoutem/ui'

import { ITEMS_LIST } from "../routing/route.constants";
import useAsyncEffect from "use-async-effect";
import { connect } from "react-redux";
import { getCategoriesAction } from "../state/actions/categoryActions";
import { getCategoriesSelector } from "../state/selectors/categorySelector";
import {setSearchParamsAction} from "../state/actions/giftActions";

function Category(props) {
  useAsyncEffect(async () => {
    const focusListener = props.navigation.addListener('didFocus', async () => {
      await props.getCategoriesAction();
    });
    await props.getCategoriesAction();

    return () => {
      focusListener.remove();
    };
  }, []);

  const navigateToGiftList = (id) = async () => {
    await props.setSearchParamsAction({category: id});
    props.navigation.navigate(ITEMS_LIST);
  };

  const renderRow = category => {
    if (!category) {
      return null;
    }

    return (
      <TouchableOpacity
        onPress={navigateToGiftList}>
        <View>
          <ImageBackground
            styleName="large-banner"
            source={{ uri: category.image }}
          >
            <Tile>
              <Title styleName="md-gutter-bottom">{ category.title }</Title>
              <Subtitle styleName="sm-gutter-horizontal">{ category.text }</Subtitle>
            </Tile>
          </ImageBackground>
          <Divider styleName="line" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Screen>
      <ListView
        data={props.categories}
        renderRow={renderRow}
      />
    </Screen>
  )
}

const mapStateToProps = state => ({
  categories: getCategoriesSelector(state),
});

const actions = {
  getCategoriesAction,
  setSearchParamsAction,
};

export default connect(mapStateToProps, actions)(Category)
