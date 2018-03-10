import React, { Component } from "react";

class Filter extends Component {
  constructor(props) {
    super(props);
    this.biquadFilter = props.context.createBiquadFilter();
    this.biquadFilter.type = props.type;
    this.biquadFilter.frequency.value = props.frequency;
    this.biquadFilter.connect(props.masterGain);
  }

  render() {
    const childrenWithContext = React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        context: this.props.context,
        masterGain: this.biquadFilter
      })
    );

    return <div>{childrenWithContext}</div>;
  }
}

export default Filter;
