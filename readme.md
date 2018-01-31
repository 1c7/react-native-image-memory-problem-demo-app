## This demo app is for issue:
https://github.com/facebook/react-native/issues/17801
using React Native 0.52     

## Report issue:
`<Image>` take up too much memory

## How to reproduce the problem
```
git clone git@github.com:1c7/react-native-image-memory-problem-demo-app.git
cd react-native-image-memory-problem-demo-app
npm install
react-native run-android
```
by the way, you can just drag image into Android Emulator.  

## Youtube video of this demo app:      
**Still uploading**  

## since `App.js` only have 58 line, I just paste code here 
```javascript
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, Button, FlatList, Image} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class App extends Component<{}> {
  constructor(props){
    super(props);
    this.state = {
      img_list: []
    }
  }
  chooseImage() {
    ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
    }).then(images => {
      console.log(images);
      for (var i = 0; i < images.length; i++) {
        this.setState({ img_list: [images[i], ...this.state.img_list] })
      }
    }).catch((error)=>{
      alert('something wrong');
    })
  };
  _renderItem(item, index){
    return (
      <View key={index} style={styles.listItemContainer}>
      <Image
        style={{ height: 77, width: 77, borderRadius: 6 }}
        source={{ isStatic: true, uri: item.item.path }}
        resizeMode='cover'
      />
      </View>
    )
  }
  render() {
    return (
      <View style={styles.container}>
        <Button uppercase={false} title='chose image' onPress={() => this.chooseImage()}></Button>
        <Text>total {this.state.img_list.length} image</Text>
        <FlatList data={this.state.img_list} renderItem={this._renderItem} style={{flex: 1}}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listItemContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    borderColor:'red',
    borderBottomWidth: 1,  
  }
});
```

### Image for this issue:   
When App start, it take about 50MB memory  
![1](/demo-image/1.png)  
Let's select one image    
![1](/demo-image/2.png) 
now it take 64.5MB. What?   
![1](/demo-image/3.png)  
3 image == 79.75MB
![1](/demo-image/4.png)  
Let's select 63 more image  
![1](/demo-image/5.png)  
growing..  
![1](/demo-image/6.png)  
now it take 375MB memory  
![1](/demo-image/7.png)  
let's crash this app by select more image  
![1](/demo-image/8.png)  
379MB  
![1](/demo-image/9.png)  
617MB  
![1](/demo-image/11.png)  
650mb 
![1](/demo-image/12.png)  
it Crash adround 700MB memory  
![1](/demo-image/13.png)  