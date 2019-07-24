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
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
   
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text style={styles.SectionHeader} onPress={this.GetSectionListItem.bind(this, item.abstract)}>{item.title} {'\n\n'}<Text style={styles.SectionHeader1}>{item.source}                           {item.published_date}</Text></Text> 
         
          }
          keyExtractor={({id}, index) => id}
        />
      </View>
      
    );
  }
}
class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('otherParam', 'A Nested Details Screen'),
    };
  };

  render() {
    /* 2. Get the param, provide a fallback value if not available */
    const { navigation } = this.props;
    const itemId = navigation.getParam('itemId', 'NO-ID');
    const otherParam = navigation.getParam('otherParam', 'some default value');

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Details Screen</Text>
        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Button
          title="Go to Details... again"
          onPress={() =>
            this.props.navigation.push('Details', {
              itemId: Math.floor(Math.random() * 100),
            })}
        />
        <Button
          title="Update the title"
          onPress={() =>
            this.props.navigation.setParams({ otherParam: 'Updated!' })}
        />
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          title="Go back"
          onPress={() => this.props.navigation.goBack()}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen,
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
    container: {
      flex: 1,
      justifyContent: "center",
      backgroundColor: "#e5e5e5",
      borderRadius: 4,
    borderWidth: 5.5,
    borderColor: '#0000'
    },
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
   },
    SectionListItemS:{
      fontSize : 16,
      padding: 6,
      color: '#000',
      backgroundColor : '#F5F5F5'
  }
});
