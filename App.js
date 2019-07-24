import React, { Component }  from 'react';
import { Button, View, Text ,Platform, StyleSheet,  SectionList, Alert} from 'react-native';
import { FlatList,Header, ActivityIndicator  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json

class HomeScreen extends React.Component {
   GetSectionListItem=(item)=>{
      Alert.alert(item)
  }

  static navigationOptions = {
    title: 'NY Times Most Popular',
    headerLeft: null,
    headerStyle: {
      backgroundColor: '#03A9F4',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

   constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://api.nytimes.com/svc/mostpopular/v2/viewed/1.json?api-key=?')
      .then((response) => response.json())
      .then((responseJson) => {


        this.setState({
          isLoading: false,
          dataSource: responseJson.results,
        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    
    return(
   
      <View style={{flex: 10, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text style={styles.SectionHeader} onPress={this.GetSectionListItem.bind(this, item.abstract)}>{item.title} {'\n\n'}<Text style={styles.SectionHeader1}>{item.source}                           {item.published_date}</Text></Text> 
         
          }
        />
      </View>
      
    );
  }
}


const RootStack = createStackNavigator(
  {
    Home: HomeScreen
    
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
const styles = StyleSheet.create({
    
    SectionHeader:{
      backgroundColor : '#64B5F6',
      fontSize : 18,
      padding: 5,
      color: '#fff',
      fontWeight: 'bold',
       borderRadius: 4,
    borderWidth: 5.5,
    borderColor: '#0000'
   },
   SectionHeader1:{
      backgroundColor : '#64B5F6',
      fontSize : 14,
      padding: 5,
      color: '#fff',
     
       borderRadius: 4,
    borderWidth: 5.5,
    borderColor: '#0000'
   }
});
