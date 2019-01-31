// @flow
import React from 'react';
import { View, Dimensions, Platform, StatusBar, Image, Animated, Easing, Modal } from 'react-native';
import front_circle1 from './front_circle1.png';

type Props = {
  duration?: number,
  visible: boolean,
  diameter: number,
  offsetX: number,
  offsetY: number,
  opacity: number,
  circleImage: number | { uri: string },
  children: typeof React.Children,
  renderCircle?: (style: {}) => any,
  onRequestClose: () => void,
};
type State = {
  visAnim: Animated.Value,
};

const opacityTiming = (toValue: number | Animated.Value | Animated.ValueXY, duration?: number = 270, delay?: number = 0) => ({
  duration,
  toValue,
  delay,
  easing: Easing.inOut(Easing.ease),
  useNativeDriver: true,
});

class SpotLightOverlay extends React.Component<Props, State> {
  static defaultProps: {};
  imageRef: any;
  setImageRef: Function;

  constructor(props: any) {
    super(props);
    this.imageRef = null;
    this.setImageRef = this.setImageRef.bind(this);
    this.state = {
      visAnim: new Animated.Value(0),
    };
  }

  componentDidMount(): void {
    if (this.props.visible && this.imageRef) this.startAnimation();
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.visible && this.props.visible) {
      if (this.imageRef) this.startAnimation();
    } else if (prevProps.visible && !this.props.visible) {
      this.imageRef = null;
      Animated.timing(this.state.visAnim, opacityTiming(0, this.props.duration)).start();
    }
  }

  setImageRef(ref: any) {
    this.imageRef = ref;
    if (ref && this.props.visible) {
      this.startAnimation();
    }
  }

  startAnimation() {
    Animated.timing(this.state.visAnim, opacityTiming(1, this.props.duration)).start();
  }

  renderImage(style: any) {
    if (this.props.renderCircle) {
      return this.props.renderCircle(style);
    }
    const imageSource = this.props.circleImage;
    return (
      <Image
        ref={this.setImageRef}
        capInsets={{ left: 0.1, top: 0.1, right: 0.1, bottom: 0.1 }} // on iOS, use capInsets to avoid image downsampling
        style={style}
        source={imageSource}
        resizeMode="stretch" />
    );
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const { width, height } = Dimensions.get('window');
    const { diameter, offsetX, offsetY } = this.props;

    const commonStyle = {
      backgroundColor: 'black',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: this.props.opacity,
    };
    const topViewStyle = { ...commonStyle, width, height: Math.round((height - diameter) / 2 + offsetY) };
    const bottomViewStyle = { ...commonStyle, width, height: Math.round((height - diameter) / 2 - offsetY) };
    const leftViewStyle = { ...commonStyle, width: Math.round((width - diameter) / 2 + offsetX), height: diameter };
    const rightViewStyle = { ...commonStyle, width: Math.round((width - diameter) / 2 - offsetX), height: diameter };
    const mainViewStyle = { ...commonStyle, width: diameter, height: diameter, backgroundColor: 'transparent', opacity: this.state.visAnim };
    const imageStyle = {
      opacity: this.props.opacity,
      ...Platform.select({
        ios: {
          width: (this.props.diameter),
          height: (this.props.diameter),
        },
        android: {
          width: Math.round(this.props.diameter),
          height: Math.round(this.props.diameter),
        },
      }),
    };
    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={this.props.visible}
        onRequestClose={() => {
          if (this.props.onRequestClose) {
            this.props.onRequestClose();
          }
        }}>
        <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', opacity: this.state.visAnim }}>
          <StatusBar
            animated
            backgroundColor={`rgba(0,0,0,${this.props.opacity})`}
            barStyle="light-content" />
          <View collapsable={false} style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 }}>
            <View style={topViewStyle}/>
            <View style={{ flexDirection: 'row' }}>
              <View style={leftViewStyle}/>
              <Animated.View collapsable={false} style={mainViewStyle}>
                {this.renderImage(imageStyle)}
              </Animated.View>
              <View style={rightViewStyle}/>
            </View>
            <View style={bottomViewStyle}/>
          </View>
          <Animated.View style={{ flex: 1 }}>
            {this.props.visible && this.props.children}
          </Animated.View>
        </Animated.View>
      </Modal>
    );
  }
}

SpotLightOverlay.defaultProps = {
  diameter: 100,
  offsetX: 50,
  offsetY: 0,
  opacity: 0.8,
  children: null,
  visible: false,
  renderCircle: null,
  circleImage: front_circle1,
  onRequestClose: null,
  duration: 300,
};

export default SpotLightOverlay;
