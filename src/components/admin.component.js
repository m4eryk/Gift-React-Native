import React from "react";
import {
  Container,
  Header,
  Tab,
  Tabs,
  TabHeading,
  Icon,
  Text
} from 'native-base';

import CreateGift from "./create-gift.component";
import Management from "./management.component";

export default function Admin(props) {
  return (
      <Container>
        <Header hasTabs/>
        <Tabs>
          <Tab heading={ <TabHeading><Icon name="camera" /></TabHeading>}>
            <CreateGift />
          </Tab>
          <Tab heading={ <TabHeading></TabHeading>}>
            <Management />
          </Tab>
        </Tabs>
      </Container>
  );
};
