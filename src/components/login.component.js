import React, {useEffect, useState} from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Button,
  Text,
  Input,
} from 'native-base'
import {connect} from "react-redux";
import {loginUserAction} from "../state/actions/userActions";
import LottieView from "lottie-react-native";
import {StyleSheet, View} from "react-native";

function Login(props) {
  const [state, setState] = useState({
    userName: '',
    password: '',
  });

  useEffect(() => {
    console.log(2)
    this.animation.play();
    return () => {
      this.animation.reset()
    }
  });

  const submitForm = async () => {
    await props.loginUserAction(state);
  };

  const onValueChange = name => event => {
    setState({
      ...state,
      [name]: event.nativeEvent.text
    });
  };

  return (
    <Container style={{height: '100%'}}>
      <LottieView
        ref={animation => {
          this.animation = animation;
        }}
        style={{position: 'absolute', flex: 1}}
        source={require('../../assets/animation/balloons')}
        resizeMode="cover"
        loop
      />

      <Content>
        <Form style={styles.container}>
          <View style={styles.formContainer}>
            <Item>
              <Input
                value={state.userName}
                onChange={onValueChange('userName')}
                placeholder="Username"
              />
            </Item>

            <Item>
              <Input
                style={styles.input}
                value={state.password}
                onChange={onValueChange('password')}
                placeholder="Password"
              />
            </Item>

            <Button
              block
              warning
              rounded
              style={styles.button}
              onPress={submitForm}
            >
              <Text>Log in</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
};

const actions = {
  loginUserAction,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: '35%',
    display: 'flex',
    justifyContent: 'center',
    flex: 1,
    height: '100%'
  },
  formContainer: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 30
  },
  button: {
    marginTop: 30,
  },
  input: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default connect(null, actions)(Login)