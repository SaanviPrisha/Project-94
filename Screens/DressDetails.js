import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, TextInput } from 'react-native';

import db from '../Config'
import firebase from 'firebase'

export default class DressDetails extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          info: this.props.navigation.getParam("Data"),
          docId: '',
          woreText: 'Wore',
          modalVisibility: false,
          price: 0,
      }
  }
  getDocId = async () => {
    var docId = ""
      await db.collection("Outfits").where("image_id","==",this.state.info.image_id).get().then(doc => {
          doc.docs.map(data => {
            docId = data.id
          })
          this.setState({
              docId: docId
          })
      })
  }
  woreOutfit = async () => {
      db.collection("Outfits").doc(this.state.docId).update({
          date: firebase.firestore.FieldValue.serverTimestamp(),
          wore_text: "Wear Again!",
      })
      alert("Database was succesfully updated!")
      
  }
  rent = () => {
      db.collection("Outfits").doc(this.state.docId).update({
          forRent: true,
          price: this.state.price
      })
  }
  sold = () => {
      db.collection("Outfits").doc(this.state.docId).delete()
  }
  showModal = () => {
    return(
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisibility}
        >
          <View>
          <TextInput 
            placeholder={"Price of Clothing"}
            onChangeText={(text) => {
              this.setState({
                price: text
              })
            }}
          />
          <TouchableOpacity onPress={() => {
                this.rent() 
              }}>
                <Text>Rent</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                this.setState({
                  modalVisibility: false
                })}}>
                <Text>Cancel</Text>
                </TouchableOpacity>
                </View>
        </Modal>
      )
  }
  componentDidMount() {
      this.getDocId()
  }
    render() {
        if(this.state.modalVisibility == true) {
            return(
                <View style={styles.container}>
                    {this.showModal()}
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <Image 
                        source={{uri: this.state.info.image_uri}}
                        style={styles.image}
                    />
                    <Text>Type: {this.state.info.type}</Text>
                    <TouchableOpacity onPress={() => {
                        this.woreOutfit()
                    }}>
                        <Text>{this.state.info.wore_text}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity disabled={
              this.state.info.forRent == true ? true : false
          } onPress={() => {
                        this.setState({
                            modalVisibility: true
                        })
                    }}>
                        <Text>Rent It</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        this.sold()
                    }}>
                        <Text>Don't Have It</Text>
                    </TouchableOpacity>
                </View>
                );
        }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
      width: 400,
      height: 400, 
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center'
  }
});
