
# react-native-spotlight-view

## Getting started

`$ npm install react-native-spotlight-view --save`


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
  viewRef={someViewReference}
  visible={true}>
  <View style={{ flex: 1 }}>
    {// Add any children here}
  </View>
</SpotLightFromRef>
```

##Supported Props:

###For SpotLight

| Name  | Type     | Description |
| :---- | :------: | :--- |
| visible | boolean   | View visibility indicator |
| opacity | number   | (optional) value between 0 to 1 for background opacity |
| diameter | number   | diameter of spotlight view |
| offsetX | number   | offset from center of screen |
| offsetY | number   |  offset from center of screen |


###For SpotLightFromRef

| Name  | Type     | Description |
| :---- | :------: | :--- |
| visible | boolean   | View visibility indicator |
| diameterOffset | number   | increase or decrease calculated diameter by this value |
| viewRef | React view   | react view reference to calculate offset |
| opacity | number   | (optional) value between 0 to 1 for background opacity |


## TroubleShooting

1. If on android using SpotLightFromRef, the spotlight is not showing then please ensure that on the reference view collapsible property is false  
  i.e. collapsable={false}


