import React, { useEffect } from "react";
import OldMatadorImg from "./OldMatador/oldMatador.png";

interface OldMatadorInterface {
  applause?: number;
  matadorPosition?: number;
  setMatarodPosition?: Function;
}

export class OldMatador extends React.Component<OldMatadorInterface> {
  listenerFunc = (e: Event) => {
    const ev = e as CustomEvent<{ position: number }>;
    if (ev.detail.position === this.props.matadorPosition) {
      let randomNum: number;
      do {
        randomNum = Math.floor(Math.random() * 9);
      } while (randomNum === this.props.matadorPosition);

      console.log(
        `Matador is moving from ${this.props.matadorPosition} to ${randomNum}`
      );
      this.props.setMatarodPosition?.(randomNum);
    }
  };

  componentDidMount(): void {
    document.addEventListener("bullRun", this.listenerFunc);
  }

  componentWillUnmount(): void {
    document.removeEventListener("bullRun", this.listenerFunc);
  }

  componentDidUpdate(prevProps: OldMatadorInterface) {
    if (this.props.applause === 2 && prevProps.applause !== 2) {
      let a = new Audio("../../public/applause.wav");
      a.volume = 0.3;
      a.play();
    }
  }

  shouldComponentUpdate(nextProps: OldMatadorInterface) {
    return nextProps.applause === 2;
  }

  render() {
    return (
      <div>
        <img src={OldMatadorImg} height="200px"></img>
      </div>
    );
  }
}
