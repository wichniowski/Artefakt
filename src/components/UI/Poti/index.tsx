import React, { Component } from "react";
import { css } from "emotion";

const styles = {
  container: css``,
  track: css`
    background: white;
    margin: 5px;
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 100%;
    overflow: hidden;
    position: relative;
  `,
  thumb: css`
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
  color: string;
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
    color: "red",
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
      <div className={styles.container}>
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
          <div
            className={styles.thumb}
            style={{
              background: this.props.color,
              width: this.state.thumbWidth,
              height: this.state.thumbWidth,
            }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Poti;
