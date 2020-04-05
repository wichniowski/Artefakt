import React, { Component } from "react";
import { css } from "emotion";

const styles = {
  container: css``,
  track: css`
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
    background: red;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  `,
};

interface PotiProps {
  onChange: (value: number) => void;
  max: number;
  opaqIndex?: number;
  reverse?: boolean;
}

interface PotiState {
  locked: boolean;
  thumbWidth: string;
}

class Poti extends Component<PotiProps, PotiState> {
  static defaultProps = {
    onChange: () => {},
    max: 100,
    label: "slider",
    opaqIndex: 0,
  };

  state = {
    thumbWidth: "100%",
    locked: true,
  };

  getPercentageByMaxValue = (percent: number) => {
    return (this.props.max / 100) * percent;
  };

  setPercentage = (event: React.MouseEvent<HTMLElement>, direct: boolean) => {
    if (this.state.locked && !direct) {
      return;
    }

    const node = event.target as HTMLElement;
    const bounds = node.getBoundingClientRect();
    const x = Math.ceil(event.clientY) - bounds.top;
    const percent = (100 * x) / event.currentTarget.offsetWidth;

    this.props.onChange(
      this.getPercentageByMaxValue(this.props.reverse ? 100 - percent : percent)
    );
    this.setState({ thumbWidth: `${percent}%` });
  };

  render() {
    return (
      <div className={styles.container}>
        <div
          className={styles.track}
          onMouseMove={(event) => this.setPercentage(event, false)}
          onClick={(event) => this.setPercentage(event, true)}
          onMouseDown={() => this.setState({ locked: false })}
          onMouseUp={() => this.setState({ locked: true })}
          onMouseLeave={() => this.setState({ locked: true })}
        >
          <div
            className={styles.thumb}
            style={{
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
