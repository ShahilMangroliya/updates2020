import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,ActivityIndicator,Alert,Keyboard,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
// const i 
var x;


const firebaseConfig = {
    apiKey: "AIzaSyC9_BW2RyOyKD3w8Za_Krhz5pJcswHyfZY",
    authDomain: "up2020-64b8e.firebaseapp.com",
    databaseURL: "https://up2020-64b8e.firebaseio.com",
    projectId: "up2020-64b8e",
    storageBucket: "up2020-64b8e.appspot.com",
    messagingSenderId: "1033212055436",
    appId: "1:1033212055436:web:c866dd6e2eea508fc190a9"
  };

  var phoneno = '/^\d{10}$/';




export default class Signup extends Component{
    state={
        name:'',
        phone:'',
        email:'',
        pass:'',
        branch:'',
        isLoading:'',
        uid:'',
        currentuser:''
    }


    //  phonenumber(inputtxt)
    // {
    //   if((inputtxt.value.match(this.state.phone))
    //         {
    //       return true;
    //         }
    //       else
    //         {
    //         alert("message");
    //         return false;
    //         }
    // }
    




    
    registerUser = () => {
        if(this.state.email === '' && this.state.pass === '' && this.state.name === '' && this.state.phone === '' &&this.state.branch === '' ) {
          Alert.alert('Enter proper details to signup!')
        } 
        else if(this.state.phone.length<10 || this.state.phone.includes(',') || this.state.phone.includes('.'))
        {
          Alert.alert('Mobile number badly formatted!')
          console.log(this.state.phone.length,this.state.phone.includes(','),this.state.phone.includes('.'));

        }
        else {
          this.setState({
            isLoading: true,
          })
        //   firebase.auth().onAuthStateChanged((user) => {this.setState({uid:user.uid})})
        //   dbRef = firebase.firestore().collection('/user/'+this.state.uid+'/data');
        // dbRef = firebase.firestore().collection('user');
    
          firebase
          .auth()
          .createUserWithEmailAndPassword(this.state.email, this.state.pass)
          .then(() => {
          //   res.user.updateProfile({
          //     displayName: this.state.displayName
          //   })
          // firebase.auth().onAuthStateChanged((user) => {this.setState({uid:user.uid})})
          // console.log(this.state.uid);
          x = firebase.auth().currentUser.uid
          this.setState({currentuser:x})
          console.log(x)
    


          firebase.database().ref("up2020/"+this.state.currentuser+"/").set({
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            branch:this.state.branch
        })
            
            this.props.navigation.replace('HOME')
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
              alert('The password is too weak.');
            }
             else {
              alert(errorMessage);
            }
            console.log(error);
          });    
        }
      }
      componentDidMount(){
        firebase.auth().onAuthStateChanged((user) => {this.setState({uid:user.uid})})
          console.log(this.state.uid);
            console.log('//////////////////////////////////////2/////');
        }    







    render(){
        return(
            
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
            <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>

                <ImageBackground
                    source={require('E:/reactnative/up2020/images/back.jpg')}
                        style={{flex:1,marginTop:100,opacity:1,height:height,width:width,resizeMode: 'cover',position:'absolute'}}/>
                        <View style={{flex:1,alignContent:'center',justifyContent:'center',height:height,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        
                        
                        
                        
                        <Image
                        source={
                        require('E:/reactnative/up2020/images/updates1.png')}
                        style={{height: 200,alignSelf:'center',marginTop:-150,marginBottom:-50,width: 200,resizeMode: 'stretch',borderRadius:150}}/>
                        
                        <View style={{margin:10,marginTop:40}}>
                        <FontAwesome name='user' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:6,marginLeft:20,marginTop:15}} size={22} />

                        <TextInput style={{paddingLeft:50,opacity:0.80,backgroundColor:'#E9E9E9',borderRadius:25,width:width-20,height:50,elevation:5}}
                            placeholder='Enter Name'
                            keyboardType='default'
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({name:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{margin:10}}>
                        <FontAwesome name='phone' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:6,marginLeft:20,marginTop:15}} size={22} />
                        <TextInput style={{paddingLeft:50,opacity:0.80,backgroundColor:'#E9E9E9',borderRadius:25,width:width-20,height:50,elevation:5}}
                            placeholder='Enter mobile number'
                            keyboardType='numeric'
                            maxLength={10}
                            ref='mobileNo'
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({phone:text})}
                            
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        
                        
                        <View style={{margin:10}}>
                        <Entypo name='mail' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:6,marginLeft:20,marginTop:15}} size={22} />

                        <TextInput style={{paddingLeft:50,opacity:0.80,backgroundColor:'#E9E9E9',borderRadius:25,width:width-20,height:50,elevation:5}}
                            placeholder='Enter Email Id'
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({email:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{margin:10}}>
                        <Entypo name='lock' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:6,marginLeft:20,marginTop:15}} size={22} />
                        <TextInput style={{paddingLeft:50,opacity:0.80,backgroundColor:'#E9E9E9',borderRadius:25,width:width-20,height:50,elevation:5}}
                            placeholder='Enter Password'
                            keyboardType='ascii-capable'
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({pass:text})}
                            />
                        </View>
                        <View style={{margin:10}}>
                        <Entypo name='flow-branch' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:6,marginLeft:20,marginTop:15}} size={22} />
                        <TextInput style={{paddingLeft:50,opacity:0.80,backgroundColor:'#E9E9E9',borderRadius:25,width:width-20,height:50,elevation:5}}
                            placeholder='Enter Branch'
                            onChangeText={(text) => this.setState({branch:text})}
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:17,color:'white'}}>Already Have Account? </Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.replace('Login')}}>
                        <Text style={{fontSize:17,fontWeight:'bold',fontFamily:'',color:'red'}}>LOG IN</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{marginBottom:50,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.registerUser()}}>
                        <View style={{backgroundColor:'#DE3578',margin:10,justifyContent:'center',borderRadius:25,marginTop:10,height:50,width:150}}>
                            <Text style={{alignSelf:'center',color:'white',fontSize:17,fontWeight:'bold',fontFamily:''}}>SIGN UP</Text>  
                        </View>
                        </TouchableOpacity>
                        </View>


                
             {/* <Text>edit profile</Text> */}
             </View>
            </View>         
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>


        );
    }
}