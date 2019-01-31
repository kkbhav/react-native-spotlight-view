
## react-native-spotlight-view [![npm version](https://badge.fury.io/js/react-native-spotlight-view.svg)](http://badge.fury.io/js/react-native-spotlight-view)

### Getting started

`$ npm install react-native-spotlight-view --save`

### Example 

![alt text](./example.png?raw=true "Example")


## Usage
```javascript
import { SpotLight, SpotLightFromRef } from 'react-native-spotlight-view';

<SpotLight
  diameter={100}
  offsetX={100}
  offsetY={100}
  visible={true}>
  <View style={{ flex: 1 }}>
    {// Add any children here}
  </View>
</SpotLight>
````
**Or** 
```javascript
<SpotLightFromRef
  ref={ref => this.spotLightRef = ref}
  viewRef={someViewReference}
  visible={true}>
  <View style={{ flex: 1 }}>
    {// Add any children here}
  </View>
</SpotLightFromRef>

// Method for SpotLightFromRef
this.spotLightRef.setViewReference(someViewReference);
```

###Supported Props:

####For SpotLight

| Name  | Type     | Description |
| :---- | :------: | :--- |
| visible | boolean   | View visibility indicator |
| diameter | number   | diameter of spotlight view |
| offsetX | number   | offset from center of screen |
| offsetY | number   |  offset from center of screen |
| opacity | number   | (optional) value between 0 to 1 for background opacity |
| duration | number   | (optional)animation duration to show or hide in ms |
| circleImage | number or { uri: string }   | (optional) image for circle |
| renderCircle | function(style)   |  (optional)function to render inner circle of spotlight |
| onRequestClose | function()   |  (optional)called when hardware back button is pressed on android |


####For SpotLightFromRef

| Name  | Type     | Description |
| :---- | :------: | :--- |
| visible | boolean   | View visibility indicator |
| viewRef | React view   | react view reference to calculate offset |
| diameterOffset | number   | (optional)increase or decrease calculated diameter by this value |
| circleImage | number or { uri: string }   |  (optional)image for circle |
| opacity | number   | (optional) value between 0 to 1 for background opacity |
| duration | number   | (optional)animation duration to show or hide in ms |
| renderCircle | function(style)   |  (optional)function to render inner circle of spotlight |
| onRequestClose | function()   |  (optional)called when hardware back button is pressed on android |

**Methods for SpotLightFromRef**

=> setViewReference(anyViewRef);


## TroubleShooting

1. If on android using SpotLightFromRef, the spotlight is not showing then please ensure that on the reference view collapsible property is false  
  i.e. collapsable={false}


