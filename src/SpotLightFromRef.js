import React from 'react';
import { View } from 'react-native';
import SpotLightOverlay from './SpotLightOverlay';

type Props = {
  duration?: number,
  visible: boolean,
  viewRef: React.ReactNode,
  opacity: number,
  children?: typeof React.Children,
};
type State = {
  spotParams: {
    diameter: number,
    offsetX: number,
    offsetY: number,
  },
  visible: boolean,
  viewRef: React.ReactNode,
};

class SpotLightFromRef extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      spotParams: {
        diameter: 0,
        offsetX: 0,
        offsetY: 0,
      },
      visible: false,
      viewRef: null,
    };
  }

  componentDidMount() {
    this.handleRefChanges(this.props.viewRef);
  }

  componentWillReceiveProps(nextProps) {
    if (!React.version || React.version.localeCompare('16.3') < 0) {
      if (nextProps.viewRef !== this.props.viewRef) {
        this.setState({ visible: false });
      }
    }
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (React.version && React.version.localeCompare('16.3') >= 0) {
      if (nextProps.viewRef !== prevState.viewRef) {
        return { visible: false };
      }
    }
    return null;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevProps.viewRef !== this.props.viewRef) {
      this.handleRefChanges(this.props.viewRef);
    }
  }

  handleRefChanges(viewRef: React.ReactNode) {
    if (viewRef) {
      viewRef.measure((frameOffsetX, frameOffsetY, width1, height1, pageOffsetX, pageOffsetY) => {
        this.setState({
          visible: this.props.visible,
          viewRef: viewRef,
        });
      });
    }
  }

  render() {
    const { viewRef, ...props } = this.props;
    return (
      <SpotLightOverlay
        {...props}
        {...this.state.spotParams}
        visible={this.state.visible}/>
    );
  }
}

export default SpotLightFromRef;
