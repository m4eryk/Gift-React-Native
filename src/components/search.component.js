import React from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input
} from 'native-base';

export default function Search(props) {
  return (
    <Container>
      <Header />
      <Content>
        <Form>
          <Item>
            <Input placeholder="Username" />
          </Item>
          <Item last>
            <Input placeholder="Password" />
          </Item>
        </Form>
      </Content>
    </Container>
  );
};
