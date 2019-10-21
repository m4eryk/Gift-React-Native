import React from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Icon
} from 'native-base';
import {
  ADMIN_PAGE,
  ITEM_PAGE,
  ITEMS_LIST,
  LOGIN_PAGE,
  MAIN_PAGE,
  PROFILE_PAGE, SEARCH_PAGE,
  SWIPE_PAGE
} from "../routing/route.constants";
import {connect} from "react-redux";

import ProtectedComponent from "./protected.component";
import { getUser } from '../state/selectors/userSelector';
import { USER_ROLE } from "../constants/user-role.contants";
import {StyleSheet} from "react-native";

function FooterTabs(props) {

  const { role } = props.user;
  const { ADMIN, GUEST, USER } = USER_ROLE;

  return (
    <Footer  tabBarPosition="bottom">
      <FooterTab  style={{backgroundColor: '#F0AD4E'}} tabBarPosition="bottom">

        <Button onPress={() => props.navigation.navigate(MAIN_PAGE)}>
          <Icon
            style={styles.icon}
            name="home" />
        </Button>

        {/*<Button onPress={() => props.navigation.navigate(ITEM_PAGE)}>*/}
        {/*  <Icon*/}
        {/*    style={styles.icon}*/}
        {/*    name="camera" />*/}
        {/*</Button>*/}

        {/*<Button onPress={() => props.navigation.navigate(ITEMS_LIST)}>*/}
        {/*  <Icon*/}
        {/*    style={styles.icon}*/}
        {/*    name="navigate" />*/}
        {/*</Button>*/}

        <Button onPress={() => props.navigation.navigate(SEARCH_PAGE)}>
          <Icon
            style={styles.icon}
            name="search" />
        </Button>

        <ProtectedComponent
          currentRole={role}
          role={[ADMIN, USER]}
        >
          <Button onPress={() => props.navigation.navigate(SWIPE_PAGE)}>
            <Icon
              style={styles.icon}
                name="gift" />
          </Button>
        </ProtectedComponent>

        <ProtectedComponent
          currentRole={role}
          role={[ADMIN, USER]}
        >
          <Button onPress={() => props.navigation.navigate(PROFILE_PAGE)}>
            <Icon
              style={styles.icon}
              name="heart" />
          </Button>
        </ProtectedComponent>

        <ProtectedComponent
          currentRole={role}
          role={[GUEST]}
        >
          <Button onPress={() => props.navigation.navigate(LOGIN_PAGE)}>
            <Icon
              style={styles.icon}
              name="gift" />
          </Button>
        </ProtectedComponent>

        <ProtectedComponent
          currentRole={role}
          role={[ADMIN]}
        >
          <Button onPress={() => props.navigation.navigate(ADMIN_PAGE)}>
            <Icon
              style={styles.icon}
              name="person" />
          </Button>
        </ProtectedComponent>

      </FooterTab>
    </Footer>
  );
};

const styles = StyleSheet.create({
  icon: {
    color: 'white'
  }
});

const mapStateToProps = (state) => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(FooterTabs);
