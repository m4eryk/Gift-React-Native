import React, { useEffect, useState } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Button,
  Text,
  Input, Toast,
} from 'native-base'
import { connect } from "react-redux";
import LottieView from "lottie-react-native";
import { StyleSheet, View } from "react-native";

import { MAIN_PAGE, REGISTRATION_PAGE } from "../routing/route.constants";
import toastStyles from "../styles/toast";
import { loginUserAction } from "../state/actions/userActions";

function Login(props) {
  const [state, setState] = useState({
    loginName: '',
    password: '',
    isSpinnerShow: false,
  });

  useEffect(() => {
    const playAnimation = props.navigation.addListener('didFocus', () => {
      //this.dino.play();
      this.loginBgAnimation.play();
    });
    this.loginBgAnimation.play();

    return () => {
      this.loginBgAnimation.reset();
      playAnimation.remove();
      setState({isSpinnerShow: false});
    }
  }, []);

  const submitForm = async () => {
    try {
      await props.loginUserAction(state);
      props.navigation.navigate(MAIN_PAGE);
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
        ref={animation  => {
          this.loginBgAnimation = animation;
        }}
        style={{position: 'absolute', flex: 1}}
        source={require('../../assets/animation/balloons')}
        resizeMode="cover"
        loop
      />

      {state.isSpinnerShow
      ? (
          <View
            style={{height: '100%', backgroundColor: "rgba(0,0,0,.7)", width: '100%', position: 'absolute', zIndex: 2, display: 'flex'}}
          >
            <LottieView
              ref={animation  => {
                this.dino = animation;
              }}
              style={{}}
              source={require('../../assets/animation/dino-dance')}
              resizeMode="cover"
              loop
            />
            <Text style={{textAlign: 'center'}}>Waiting...</Text>
          </View>
        )
      : null}

      <Content>
        <Form style={styles.container}>
          <View style={styles.formContainer}>

            <Text style={styles.title}>Log in</Text>

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
              <Text>Log in</Text>
            </Button>
          </View>
          <View>
            <Button
              block
              transparent
              onPress={() => props.navigation.navigate(REGISTRATION_PAGE)}
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
  loginUserAction,
};

export default connect(null, actions)(Login)
