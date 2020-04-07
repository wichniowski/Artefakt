import React, { Component } from "react";
import { css, cx } from "emotion";

const styles = {
  track: css`
    margin: 5px;
    cursor: pointer;
    width: 64px;
    height: 64px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
    background: black;
  `,
  thumb: css`
    border: 2px solid white;
    position: absolute;
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

interface PotiProps {
  onChange: (value: number) => void;
  onShiftClick: () => void;
  max: number;
  opaqIndex?: number;
  reverse?: boolean;
  outlineStyle?: string;
}

interface PotiState {
  locked: boolean;
  thumbWidth: string;
}

class Poti extends Component<PotiProps, PotiState> {
  inputRef: HTMLDivElement | null = null;
  static defaultProps = {
    onChange: () => {},
    onShiftClick: () => {},
    max: 100,
    label: "slider",
    opaqIndex: 0,
    outlineStyle: "solid",
  };

  state = {
    thumbWidth: "100%",
    locked: true,
  };

  getPercentageByMaxValue = (percent: number) => {
    return (this.props.max / 100) * percent;
  };

  setPercentage = (event: React.MouseEvent<HTMLElement>, direct: boolean) => {
    if (!this.inputRef) {
      return null;
    }

    if (this.state.locked && !direct) {
      return;
    }

    const node = this.inputRef;
    const bounds = node.getBoundingClientRect();
    const x = Math.round(event.clientY) - bounds.top;
    console.log(x);
    const percent = (100 * x) / event.currentTarget.offsetHeight;
    this.props.onChange(
      this.getPercentageByMaxValue(this.props.reverse ? 100 - percent : percent)
    );
    this.setState({ thumbWidth: `${percent}%` });
  };

  render() {
    return (
      <div
        ref={(ref) => {
          this.inputRef = ref;
        }}
        className={styles.track}
        onMouseMove={(event) => this.setPercentage(event, false)}
        onClick={(event) => {
          //@ts-ignore
          if (event.shiftKey) {
            this.props.onShiftClick();
          } else {
            this.setPercentage(event, true);
          }
        }}
        onMouseDown={() => this.setState({ locked: false })}
        onMouseUp={() => this.setState({ locked: true })}
        onMouseLeave={() => this.setState({ locked: true })}
      >
        {console.log(this.props.outlineStyle)}
        <div
          className={cx(styles.thumb)}
          style={{
            border: `2px ${this.props.outlineStyle} white`,
            width: this.state.thumbWidth,
            height: this.state.thumbWidth,
          }}
        ></div>
      </div>
    );
  }
}

export default Poti;
