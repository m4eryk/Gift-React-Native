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
  ITEMS_LIST, LOGIN_PAGE,
  MAIN_PAGE, PROFILE_PAGE,
  SWIPE_PAGE
} from "../routing/route.constants";
import {connect} from "react-redux";

import ProtectedComponent from "./protected.component";
import { getUser } from '../state/selectors/userSelector';
import { USER_ROLE } from "../constants/user-role.contants";

function FooterTabs(props) {

  const { role } = props.user;
  const { ADMIN, GUEST, USER } = USER_ROLE;

  return (
    <Footer tabBarPosition="bottom">
      <FooterTab style={{backgroundColor: '#F0AD4E'}} tabBarPosition="bottom">

        <Button onPress={() => props.navigation.navigate(MAIN_PAGE)}>
          <Icon name="home" />
        </Button>

        <Button onPress={() => props.navigation.navigate(ITEM_PAGE)}>
          <Icon name="camera" />
        </Button>

        <Button active onPress={() => props.navigation.navigate(ITEMS_LIST)}>
          <Icon active name="navigate" />
        </Button>

        <ProtectedComponent
          currentRole={role}
          role={[ADMIN, USER]}
        >
          <Button onPress={() => props.navigation.navigate(SWIPE_PAGE)}>
            <Icon name="person" />
          </Button>
        </ProtectedComponent>

        <ProtectedComponent
          currentRole={role}
          role={[ADMIN, USER]}
        >
          <Button onPress={() => props.navigation.navigate(PROFILE_PAGE)}>
            <Icon name="person" />
          </Button>
        </ProtectedComponent>

        <ProtectedComponent
          currentRole={role}
          role={[GUEST]}
        >
          <Button onPress={() => props.navigation.navigate(LOGIN_PAGE)}>
            <Icon name="person" />
          </Button>
        </ProtectedComponent>

        <ProtectedComponent
          currentRole={role}
          role={[ADMIN]}
        >
          <Button onPress={() => props.navigation.navigate(ADMIN_PAGE)}>
            <Icon name="person" />
          </Button>
        </ProtectedComponent>

      </FooterTab>
    </Footer>
  );
};

const mapStateToProps = (state) => ({
  user: getUser(state)
});

export default connect(mapStateToProps)(FooterTabs);
