import React from "react";
import {
  Container,
  Header,
  SwipeRow,
  Content,
  Button,
  Icon,
  View,
  Text
} from 'native-base'

export default function Management(props) {
  return (
    <Container>
      <Header />
      <Content scrollEnabled={false}>
        <SwipeRow
          leftOpenValue={75}
          rightOpenValue={-75}
          left={
            <Button success onPress={() => alert('Add')}>
              <Icon active name="add" />
            </Button>
          }
          body={
            <View>
              <Text>SwipeRow Body Text</Text>
            </View>
          }
          right={
            <Button danger onPress={() => alert('Trash')}>
              <Icon active name="trash" />
            </Button>
          }
        />
      </Content>
    </Container>
  );
};
