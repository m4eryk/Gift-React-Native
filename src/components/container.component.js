import React from "react";
import { connect } from 'react-redux';
import { Root } from "native-base";

import Route from "../routing/route";
import Spinner from '../components/spinner.component';

function ContainerRoute(props) {
  return(
    <>
      {props.isSpinnerVisible ? <Spinner /> : null}
      <Root>
        <Route />
      </Root>
    </>
  )
}

const mapStateToProps = state => ({
  isSpinnerVisible: state.appReducer.isSpinnerVisible,
});

export default connect(mapStateToProps)(ContainerRoute);