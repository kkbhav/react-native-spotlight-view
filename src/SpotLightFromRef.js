import React from 'react';
import { View } from 'react-native';
import SpotLightOverlay from './SpotLightOverlay';

type Props = {
  duration?: number,
  visible: boolean,
  viewRef: React.ReactNode,
  opacity: number,
  children?: typeof React.Children,
  diameterOffset?: number,
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

    const { width, height } = Dimensions.get('window');
    this.width = width;
    this.height = height;
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
      viewRef.measure((frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const offsetX = -(centerX - ((width / 2) + pageOffsetX));
        const offsetY = -(centerY - ((height / 2) + pageOffsetY));

        this.setState({
          visible: this.props.visible,
          viewRef: viewRef,
          spotParams: {
            diameter: (width > height) ? (width + this.props.diameterOffset) : (height + this.props.diameterOffset),
            offsetX,
            offsetY,
          }
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

SpotLightFromRef.defaultProps = {
  diameterOffset: 0,
};

export default SpotLightFromRef;
