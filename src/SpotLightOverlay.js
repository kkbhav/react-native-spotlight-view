// @flow
import React from 'react';
import { View, Dimensions, Platform, StatusBar, Image, Animated, Easing } from 'react-native';
import front_circle1 from './front_circle1.png';

type Props = {
  duration?: number,
  visible: boolean,
  diameter: number,
  offsetX: number,
  offsetY: number,
  opacity: number,
  children: typeof React.Children,
};
type State = {
  visAnim: Animated.Value,
  translate: Animated.Value,
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

  constructor(props: any) {
    super(props);
    this.state = {
      visAnim: new Animated.Value(this.props.visible ? 1 : 0),
      translate: new Animated.Value(this.props.visible ? 0 : 0),
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (!prevProps.visible && this.props.visible) {
      Animated.timing(this.state.visAnim, opacityTiming(1, this.props.duration)).start();
    } else if (prevProps.visible && !this.props.visible) {
      Animated.timing(this.state.visAnim, opacityTiming(0, this.props.duration)).start();
    }
  }

  render() {
    if (!this.props.visible) {
      return null;
    }
    const { width, height } = Dimensions.get('window');
    const style = {
      position: 'absolute',
      backgroundColor: 'transparent',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      ...Platform.select({
        ios: {
          borderBottomWidth: Math.round(((height - this.props.diameter) / 2) - this.props.offsetY),
          borderTopWidth: Math.round(((height - this.props.diameter) / 2) + this.props.offsetY),
          borderRightWidth: Math.round((((width - this.props.diameter) / 2) - this.props.offsetX)),
          borderLeftWidth: Math.round((((width - this.props.diameter) / 2) + this.props.offsetX)),
        },
        android: {
          borderBottomWidth: Math.round(((height - this.props.diameter - StatusBar.currentHeight) / 2) - (this.props.offsetY)),
          borderTopWidth: Math.round(((height - this.props.diameter - StatusBar.currentHeight) / 2) + (this.props.offsetY)),
          borderRightWidth: ((((width - this.props.diameter) / 2) - this.props.offsetX)),
          borderLeftWidth: ((((width - this.props.diameter) / 2) + this.props.offsetX)),
        },
      }),
      borderColor: 'black',
      opacity: (this.props.opacity || 0.8),
      justifyContent: 'center',
      alignItems: 'center',
    };
    const childStyle = {
      ...Platform.select({
        ios: {
          width: (this.props.diameter),
          height: (this.props.diameter),
        },
        android: {
          width: (this.props.diameter),
          height: (this.props.diameter),
        },
      }),
      backgroundColor: 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      // opacity: 0,
    };
    if (style.borderLeftWidth < 0) {
      childStyle.left = style.borderLeftWidth / 2;
    }
    if (style.borderRightWidth < 0) {
      childStyle.right = style.borderRightWidth / 2;
    }
    const imageStyle = {
      ...Platform.select({
        ios: {
          width: (this.props.diameter + 13),
          height: (this.props.diameter + 13),
        },
        android: {
          width: Math.round(this.props.diameter + 13),
          height: Math.round(this.props.diameter + 13),
        },
      }),
    };
    return (
      <Animated.View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'transparent', opacity: this.state.visAnim }}>
        <View style={style}>
          <View style={childStyle}>
            <Image style={imageStyle} source={front_circle1} resizeMode="stretch" />
          </View>
        </View>
        <Animated.View style={{ flex: 1, transform: [{ translateY: this.state.translate }] }}>
          {this.props.visible && this.props.children}
        </Animated.View>
      </Animated.View>
    );
  }
}

SpotLightOverlay.defaultProps = {
  diameter: 100,
  offsetX: 50,
  offsetY: 0,
  opacity: null,
  children: null,
  visible: false,
};

export default SpotLightOverlay;
