import React from 'react';
import { Dimensions } from 'react-native';
import SpotLightOverlay from './SpotLightOverlay';

type Props = {
  duration?: number,
  visible: boolean,
  viewRef: React.ReactNode,
  opacity: number,
  children?: typeof React.Children,
  renderCircle?: (style: {}) => any,
  diameterOffset?: number,
  onRequestClose: () => void,
  circleImage: number | { uri: string },
};
type State = {
  spotParams: {
    diameter: number,
    offsetX: number,
    offsetY: number,
  },
  visible: boolean,
};

class SpotLightFromRef extends React.Component<Props, State> {
  viewRef: any;

  constructor(props: Props) {
    super(props);

    this.viewRef = null;
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
    };
  }

  componentDidMount() {
    this.setViewReference(this.props.viewRef);
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    if (this.viewRef !== this.props.viewRef) {
      this.setViewReference(this.props.viewRef);
    }
  }

  setViewReference(viewRef: any) {
    this.viewRef = viewRef;
    this.handleRefChanges(this.viewRef);
  }

  handleRefChanges(viewRef: React.ReactNode, repeatValue?: number = 0) {
    if (viewRef) {
      viewRef.measure((frameOffsetX, frameOffsetY, width, height, pageOffsetX, pageOffsetY) => {
        if (width > 0 || height > 0) {
          const centerX = this.width / 2;
          const centerY = this.height / 2;
          const offsetX = Math.round(-(centerX - ((width / 2) + pageOffsetX)));
          const offsetY = Math.round(-(centerY - ((height / 2) + pageOffsetY)));
          this.setState({
            visible: this.props.visible,
            spotParams: {
              diameter: (width > height) ? (width + this.props.diameterOffset) : (height + this.props.diameterOffset),
              offsetX,
              offsetY,
            }
          });
        } else if (width === 0 && height === 0 && repeatValue < 1) {
          setTimeout(() => this.handleRefChanges(viewRef, repeatValue + 1), 1000);
        }
      });
    }
  }

  render() {
    const { viewRef, visible, ...props } = this.props;
    return (
      <SpotLightOverlay
        {...props}
        {...this.state.spotParams}
        visible={this.state.visible && visible}/>
    );
  }
}

SpotLightFromRef.defaultProps = {
  diameterOffset: 10,
};

export default SpotLightFromRef;
