import React from "react";
import {
  Container,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text,
  ScrollableTab,
} from 'native-base';

import CreateGift from "./create-gift.component";
import Management from "./gift-management.component";
import CreateCategory from "./create-category.component";
import CategoryManagement from './category-management.component.js';

export default function Admin(props) {
  return (
      <Container>
        <Tabs
          renderTabBar={()=> <ScrollableTab />}
        >
          <Tab
            heading={ <TabHeading style={{ backgroundColor: '#F0AD4E' }}>
            <Icon name="ios-add" /><Text>Create gift</Text></TabHeading>}>
            <CreateGift />
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: '#F0AD4E' }}>
            <Icon name="ios-analytics" /><Text>Manage gift</Text></TabHeading>}>
            <Management />
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: '#F0AD4E' }}>
            <Icon name="ios-add" /><Text>Create category</Text></TabHeading>}>
            <CreateCategory />
          </Tab>
          <Tab heading={ <TabHeading style={{ backgroundColor: '#F0AD4E' }}>
            <Icon name="ios-add" /><Text>Manage category</Text></TabHeading>}>
            <CategoryManagement />
          </Tab>
        </Tabs>
      </Container>
  );
};
