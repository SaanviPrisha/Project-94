import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Header, Icon, Badge } from 'react-native-elements'

import db from '../Config'
import firebase from 'firebase'

export default class MyHeader extends React.Component {
  render() {
    return (
      <Header 
        centerComponent={{
            text: this.props.title,
            style: {fontSize: 28, fontFamily: "Fantasy"}
        }}
        backgroundColor="#c1e0b4"
    />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
