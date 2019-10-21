import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Button,
  Text,
  Input,
  Toast,
} from 'native-base'
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

import { registrationUserAction } from "../state/actions/userActions";
import toastStyles from '../styles/toast';

function Registration(props) {
  const [state, setState] = useState({
    loginName: '',
    password: '',
  });

  useEffect(() => {
    const playAnimation = props.navigation.addListener('didFocus', () => {
      this.registrationBgAnimation.play()
    });
    this.registrationBgAnimation.play();

    return () => {
      this.registrationBgAnimation.reset();
      playAnimation.remove();
    }
  }, []);

  const submitForm = async () => {
    try {
      const responseData = await props.registrationUserAction(state);
      Toast.show({
        text: responseData.message,
        buttonText: 'Okay',
        style: toastStyles.success,
        position: "top",
        duration: 4000,
      });
    } catch (error) {
      const errorMsg = error.response.data.errors[0].msg;
      Toast.show({
        text: errorMsg,
        buttonText: 'Okay',
        style: toastStyles.error,
        position: "top",
        duration: 4000,
      });
    }
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
          this.registrationBgAnimation = animation;
        }}
        style={{position: 'absolute', flex: 1}}
        source={require('../../assets/animation/balloons')}
        resizeMode="cover"
        loop
      />

      <Content>
        <Form style={styles.container}>
          <View style={styles.formContainer}>

            <Text style={styles.title}>Registration</Text>

            <Item>
              <Input
                value={state.loginName}
                onChange={onValueChange('loginName')}
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
              <Text>Registration</Text>
            </Button>
          </View>
        </Form>
      </Content>
    </Container>
  );
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
    marginBottom: 10
  },
  button: {
    marginTop: 30,
  },
  input: {
    marginTop: 10,
    marginBottom: 10
  },
  title: {
    marginBottom: 10,
    fontSize: 23,
    textAlign: 'center'
  }
});

const actions = {
  registrationUserAction
};

export default connect(null, actions)(Registration)