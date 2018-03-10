import React, { Component } from "react";

class Filter extends Component {
  constructor(props) {
    super(props);
    const { context, frequency, masterGain } = props;
    this.biquadFilter = context.createBiquadFilter();
    this.biquadFilter.type = props.type;
    this.biquadFilter.frequency.value = frequency;
    this.biquadFilter.connect(masterGain);
  }

  render() {
    const { children, context } = this.props;
    const childrenWithContext = React.Children.map(children, child =>
      React.cloneElement(child, {
        context: context,
        masterGain: this.biquadFilter
      })
    );

    return (
      <div className="filter">
        <p>Filter</p>
        {childrenWithContext}
      </div>
    );
  }
}

export default Filter;
