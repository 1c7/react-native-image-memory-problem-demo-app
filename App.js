/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Image,
} from 'react-native';
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
