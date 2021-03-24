import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import { Card } from 'react-native-elements'

import db from '../Config'
import firebase from 'firebase'

export default class DetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      info: this.props.navigation.getParam("Data"),
      userDetails: []
    }
  }
  getUserDetails = async () => {
        await db.collection("Users").where("email_id","==",this.state.info.user_id).get().then(doc => {
            doc.docs.map(data => {
              this.setState({
                userDetails: data.data()
              })
            })
        })
  }
  componentDidMount() {
    this.getUserDetails()
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        <Image 
          source={{uri: this.state.info.image_uri}}
          style={styles.image}
       />
       <Card title={"Dress Details"}>
          <Card>
            <Text>Type: {this.state.info.type}</Text>
          </Card>
          <Card>
            <Text>Price: {this.state.info.price}</Text>
          </Card>
       </Card>
        <Card title={"User Details"}>
          <Card>
            <Text>Name: {this.state.userDetails.first_name} {this.state.userDetails.last_name}</Text>
          </Card>
          <Card>
            <Text>Contact Information: {this.state.userDetails.contact_Info}</Text>
          </Card>
        </Card>
        <TouchbaleOpacity>
          <Text>I want to rent the dress.</Text>
        </TouchbaleOpacity>
        </ScrollView>
      </View>
    );
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
