import React from "react";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Animated, Easing} from 'react-native'

import Category from "../components/category.component";
import ItemPage from '../components/item.component';
import CategoryItem from '../components/gifts-list.component';
import Header from '../components/header.component';
import FooterTabs from "../components/footer.component";
import Login from "../components/login.component";
import Registration from '../components/registration.component';
import {ITEM_PAGE, LOGIN_PAGE, MAIN_PAGE, REGISTRATION_PAGE} from "./route.constants";
import Swiper from "../components/swiper.component";
import Search from "../components/search.component";
import Admin from "../components/admin.component";
import Profile from "../components/profile.component";

const DashboardTabNavigator = createBottomTabNavigator({
    ITEMS_LIST: {
      screen: CategoryItem,
    },
    MAIN_PAGE: {
      screen: Category
    },
    ITEM_PAGE: {
      screen: ItemPage
    },
    LOGIN_PAGE: {
      screen: Login
    },
    REGISTRATION_PAGE: {
      screen: Registration
    },
    SWIPE_PAGE: {
      screen: Swiper
    },
    SEARCH_PAGE: {
      screen: Search
    },
    ADMIN_PAGE: {
      screen: Admin
    },
    PROFILE_PAGE: {
      screen: Profile
    },
  },
  {
    initialRouteName: MAIN_PAGE,
    unmountInactiveRoutes: true,
    tabBarComponent: props => <FooterTabs {...props} />
  }
);

const appNavigator = createStackNavigator({
    DashboardTabNavigator: DashboardTabNavigator,
  },
  {
    unmountInactiveRoutes: true,
    defaultNavigationOptions: {
      header: (props) => <Header {...props} />,
    },
    transitionConfig: () => ({
      transitionSpec: {
        duration: 0,
        timing: Animated.timing,
        easing: Easing.step0,
      },
    })
  }
);

export default createAppContainer(appNavigator);