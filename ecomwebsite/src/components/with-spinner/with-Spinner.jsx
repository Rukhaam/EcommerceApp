import React from "react";
import {SpinnerContainer,SpinnerOverlay}from './withSpinner.styles';

 const WithSpinner = WrappedComponent => {
    const Spinner = ({isLoading, ...otherProps})=>{
  
    return  isLoading ? (
      <SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
      </SpinnerOverlay>
   ): (
 <WrappedComponent {...otherProps}></WrappedComponent>
   )
}     
return Spinner;
}
export default WithSpinner;