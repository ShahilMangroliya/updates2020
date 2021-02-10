import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Keyboard,Alert,Dimensions,ActivityIndicator,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'


export default class Login extends Component{
    state = { 
      email: '', 
      pass: '',
      isLoading: false,
      uid:''
    }
    async userLogin () {
        if(this.state.email === '' && this.state.pass === '') {
          Alert.alert('Enter details to login!')
        } else {
          // this.setState({
          //   isLoading: true,
          // })
          // this.te()
          await firebase
          .auth()
          .signInWithEmailAndPassword(this.state.email, this.state.pass)
          .then((res) => {
            // console.log(res)
            // this.setState({uid:res.uid})
            console.log('User logged-in successfully!')
            this.setState({
              isLoading: false,
              email: '', 
              password: ''
            })
            // console.log(this.state.uid);
            this.setState({uid: firebase.auth().currentUser.uid})
            console.log(this.state.uid);

            this.props.navigation.replace('HOME')
          })
          .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
            // this.setState({isLoading:false})
              alert('The password is too weak.');
          this.te()
          // this.setState({isLoading:false})

          }
             else {
              Alert.alert(errorMessage);
          // this.te()
          // this.setState({isLoading:false})
          }
            console.log(error);
            // this.setState({isLoading:false})
          })
          // .then(
          //   .sthisetState({isLoading:false})
          // )
          // .finally(
          //   this.setState({isLoading:false})
          // )
        }
    }


    

componentDidMount(){
    console.log('///////////////////////////////////////////////////////login');
    // console.log(this.state.uid,'//');

}
    render(){
        return(
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
            <View style={{flex:1,alignContent:'center',justifyContent:'center'}}>
            {this.state.isLoading &&
                <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute',elevation:7}}> 
                        <View style={{    position: 'absolute',elevation:6,
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'}}>
                          <ActivityIndicator size='large' color="white"/>
                        </View>
                        </View>

                }
                <ImageBackground
                    source={require('E:/reactnative/up2020/images/back.jpg')}
                        style={{flex:1,marginTop:100,opacity:1,height:height,width:width,resizeMode: 'cover',position:'absolute'}}/>
                        <View style={{flex:1,alignContent:'center',justifyContent:'center',height:height,backgroundColor: 'rgba(0,0,0,0.5)'}}>
                        <Image
                        source={
                        require('E:/reactnative/up2020/images/updates1.png')}
                        style={{height: 200,alignSelf:'center',marginTop:-150,marginBottom:-50,width: 200,resizeMode: 'stretch',borderRadius:150}}/>
                        <View style={{margin:10,marginTop:40}}>
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
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({pass:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                        <Text style={{fontSize:17,color:'white'}}>Don' Have Account? </Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.replace('Signup')}}>
                        <Text style={{fontSize:17,fontWeight:'bold',fontFamily:'',color:'red'}}>SIGN UP</Text>
                        </TouchableOpacity>
                        </View>
                        <Text style={{fontSize:17,alignSelf:'center',marginBottom:20,color:'white'}}>Forgot Password? </Text>


                        <TouchableOpacity onPress={()=>{this.userLogin()}}>
                        <View style={{backgroundColor:'#DE3578',margin:10,alignSelf:'center',justifyContent:'center',borderRadius:25,marginTop:10,height:50,width:150}}>
                            <Text style={{alignSelf:'center',color:'white',fontSize:17,fontWeight:'bold',fontFamily:''}}>LOG IN</Text>  
                        </View>
                        </TouchableOpacity>


                
             {/* <Text>edit profile</Text> */}
             </View>
            </View>         
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

        );
    }
}