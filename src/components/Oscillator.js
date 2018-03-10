import React, {Component} from 'react';

class Oscillator extends Component {
    constructor(props) {
        super(props);
        this.oscillator = props.context.createOscillator();
        this.oscillator.type = props.type || 'sine';
        this.oscillator.frequency.setValueAtTime(props.frequency, props.context.currentTime);
        this.oscillator.connect(props.masterGain)
        props.start && this.oscillator.start();
    }

    componentWillReceiveProps(newProps) {
        this.oscillator.frequency.setValueAtTime(newProps.note, this.props.context.currentTime);
    }

    render() {
        return(<div/>)
    }
}

export default Oscillator;