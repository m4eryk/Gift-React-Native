import React, {useEffect} from "react";
import {connect} from "react-redux";
import LottieView from "lottie-react-native";
import {Text} from "native-base";
import {View} from "react-native";

function Spinner(props) {
  useEffect(() => {
    this.dino.play();
  }, []);

  return (
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
}

export default connect()(Spinner)