import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View,Image,SafeAreaView,ScrollView } from 'react-native';
import Home from './components/home';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator,DrawerItem,DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer'
import Signup from './components/signup';
import About from './components/about';
import Profile from './components/profile';
import Register from './components/register';
import { Component } from 'react';
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Animated from 'react-native-reanimated';
import { Avatar,Title,} from 'react-native-paper'
import Login from './components/login';
import * as firebase from 'firebase'
var x;


const firebaseConfig = {

};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.firestore();



// firebase.initializeApp


var email;
var name;
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

function CustomDrawerContent(props){
try{
  x = firebase.auth().currentUser.uid
  if(x!=null){
  console.log(x,'done')
  firebase.database().ref('up2020').on("value",datasnap=>{
    console.log(datasnap.val()[x]);
    email=datasnap.val()[x].email
    name=datasnap.val()[x].name
})
  }
}
catch(error){
  email='not found'
  name='not found'
}




  // x =  firebase.auth().currentUser.uid
  // // this.setState({currentuser:x})
  // console.log(x,'done')

  // firebase.firestore()
  // .collection('up2020/'+x+'/data')
  // .get()
  // .then(snapshot => {
  //     snapshot.forEach(doc=>{
  //         console.log(doc.id, ' => ', doc.data());
  //         email=doc.data().email
  //         name=doc.data().name
  //         console.log(email);
  //     })
  //   });
  return (
    <DrawerContentScrollView >
      <SafeAreaView style={{}}>
        <View style={{height: 190, backgroundColor: '#0C0C0C', alignItems: 'center', justifyContent: 'center'}}>
          <Image source={require('./images/updates1.png')} style={{height: 120, width:200}}/>
  <Text style={{color:'#fff',fontSize:15}}>{name}</Text>
  <Text style={{color:'#fff',fontSize:12,opacity:0.8}}>{email}</Text>
        </View>
      <DrawerItemList {...props} />

    </SafeAreaView>
    </DrawerContentScrollView>
  );
}



export default class App extends Component {

state={
  authenticated:false,
  loading:false
}
  createHomeStack=()=>
  <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
  drawerStyle={{backgroundColor:'#0C0C0C'}}
>
  <Drawer.Screen name='HOME' component={Home} 
  options={{
    drawerIcon:({focused,color,size}) => (
      <Entypo name='home' style={{color:color,fontSize:size}}/>
    )}}
  />

  <Drawer.Screen name='EDIT PROFILE' component={Profile} options={{
        drawerIcon:({focused,color,size}) => (
          <FontAwesome5 name='user-edit' style={{color:color,fontSize:size}}/>
        )
      }} />

  <Drawer.Screen name='ABOUT US' component={About} options={{
        drawerIcon:({focused,color,size}) => (
          <Entypo name='info' style={{color:color,fontSize:size}}/>
        )
      }} />

</Drawer.Navigator>
  

  async componentDidMount(){
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
      // firebase.firestore();
      console.log('Initializing Firebase');
    }
    else{
      console.log('Initialized Firebase');
    
    
   await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loading: false, authenticated: true });
      } else {
        this.setState({ loading: false, authenticated: false });
      }
    });
    console.log(this.state.authenticated)

  

   
  // try{

    }
  }

  
  
  render(){
  return (
    <View style={{flex:1}}>
      {/* <StatusBar style="auto" /> */}
      <NavigationContainer theme={{colors:{...DefaultTheme.colors,text:'#fff'}}}>
        {
          this.state.authenticated?
          
          <Stack.Navigator>
            {/* <Stack.Screen name='Signup'  options={{headerShown:false}} component={Signup}  />  */}
            {/* <Stack.Screen name='Login'  options={{headerShown:false}} component={Login}  />  */}
            <Stack.Screen name='HOME'  options={{headerShown:false}} component={this.createHomeStack}  /> 
            {/* <Stack.Screen name='Signup' component={Signup} />  */}
      <Stack.Screen name='Login'  options={{headerShown:false}} component={Login}  /> 
            <Stack.Screen name='Register' options={{headerShown:false}} component={Register} /> 
          </Stack.Navigator>
          
          
          :
        
    <Stack.Navigator>
      <Stack.Screen name='Signup'  options={{headerShown:false}} component={Signup}  /> 
      <Stack.Screen name='Login'  options={{headerShown:false}} component={Login}  /> 
      <Stack.Screen name='HOME'  options={{headerShown:false}} component={this.createHomeStack}  /> 
      {/* <Stack.Screen name='Signup' component={Signup} />  */}
      <Stack.Screen name='Register' options={{headerShown:false}} component={Register} /> 
    </Stack.Navigator>
  }
      </NavigationContainer>














    </View>
  );
}
}
