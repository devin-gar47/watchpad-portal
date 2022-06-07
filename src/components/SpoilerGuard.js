import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import {Alert} from 'antd'

class SpoilerGuard extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {ShowSpoiler: true};
  }

  handleClick() {
    this.setState({ShowSpoiler:!this.state.showSpoiler});
  }

   SpoilerAlert () {

    return(
        <Alert
        message="Spoiler Warning!"
        showIcon
        description="This Content contains a spoiler"
        type="warning"
        closable
        closeText = "View anyway"
        onClose={this.handleClick()}
      />
    )

  }


  render() {
    const { showSpoiler } = this.state;
    let title=this.state.showSpoiler? "ON":"OFF";
    
    return (
      <button onClick={this.handleClick}>{title}</button>
    );
  }
}

ReactDOM.render(
  <ToggleButtonOnOff />,
  document.getElementById('root')
);