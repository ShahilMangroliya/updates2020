import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Alert,Keyboard,Dimensions,KeyboardAvoidingView,TouchableWithoutFeedback,Image,ImageBackground,TextInput} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'
var x

export default class Profile extends Component{
    state={
        name:'',
        phone:'',
        // tname:'',
        // tphone:'',
        // l:''
    }


    componentDidMount(){
        x =  firebase.auth().currentUser.uid
        //   this.setState({currentuser:x})
          console.log(x,'done')
          firebase.database().ref("up2020").on("value",datasnap=>{
            console.log(datasnap.val()[x]);
            // email=datasnap.val()[x].email
            // name=datasnap.val()[x].name
            // phone=datasnap.val()[x].phone
            // email=datasnap.val()[x].email
            // enrol=datasnap.val()[x].enrollment
            this.setState({name:datasnap.val()[x].name})
            this.setState({phone:datasnap.val()[x].phone})
            // this.setState({email:datasnap.val()[x].email})
            // this.setState({enrol:datasnap.val()[x].enrollment})
        })
        // this.setState({l:1})
    
    }

    signOut = () => {
        firebase.auth().signOut()
        .then(
          this.props.navigation.replace('Login')
        )
        .catch(error => console.log(error))
      }

    update=()=>{
        if( this.state.name === '' || this.state.phone === '' ) {
            Alert.alert('Enter proper details')
          } 
          else if(this.state.phone.length<10 || this.state.phone.includes(',') || this.state.phone.includes('.'))
          {
            Alert.alert('Mobile number badly formatted!')
            console.log(this.state.phone.length,this.state.phone.includes(','),this.state.phone.includes('.'));
  
          }
          else {
            // this.setState({
            //   isLoading: true,
            // })
          x = firebase.auth().currentUser.uid

        firebase.database().ref("up2020/"+x+"/").update({
            name:this.state.name,
            // email:this.state.email,
            phone:this.state.phone,
            
            // enrollment:this.state.enrol
        })
        .then(

            this.props.navigation.navigate('HOME')
        )
      }
    }



    render(){
        return(
            <KeyboardAvoidingView style={{height:height}} 
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
           
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#0C0C0C',flexDirection:'row',alignItems:'center',width:width,height:100}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                        <Entypo name='menu' style={{color:'white',margin:20,marginTop:40}} size={40} />
                    </TouchableOpacity>
                    <Image
                        source={
                        require('E:/reactnative/up2020/images/updates1.png')}
                        style={{height: 110,marginLeft:70,width: 110,resizeMode: 'stretch',borderRadius:150}}/>
                        <TouchableOpacity onPress={()=>{this.signOut()}}>
                            <MaterialCommunityIcons name='logout' style={{color:'white',margin:20,marginLeft:80,marginTop:40}} size={40} />
                        </TouchableOpacity>
                </View>
                <ImageBackground
                    source={{uri:'https://scontent.fstv5-1.fna.fbcdn.net/v/t1.0-9/s960x960/121143098_114101953796321_5446374937076223946_o.jpg?_nc_cat=108&ccb=2&_nc_sid=8024bb&_nc_ohc=DlzrypwvzvIAX8-l0tG&_nc_ht=scontent.fstv5-1.fna&tp=7&oh=d8ce016100083ad3ec98ce7b40108b5f&oe=5FB64F2D'}}
                        style={{flex:1,marginTop:100,height:height-100,width:width,resizeMode: 'cover',position:'absolute'}}/>
                        <View style={{margin:10,marginTop:40}}>
                        <FontAwesome name='user' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:6,marginLeft:20,marginTop:15}} size={22} />

                        <TextInput style={{paddingLeft:50,backgroundColor:'#E9E9E9',borderRadius:25,width:width-20,height:50,elevation:5}}
                            placeholder='Enter Certificate Name'
                            keyboardType='default'
                            defaultValue={this.state.name}
                            // secureTextEntry={true}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({name:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <View style={{margin:10}}>
                        <FontAwesome name='phone' style={{color:'#7B7B7B',margin:20,position:'absolute',elevation:6,marginLeft:20,marginTop:15}} size={22} />
                        <TextInput style={{paddingLeft:50,backgroundColor:'#E9E9E9',borderRadius:25,width:width-20,height:50,elevation:5}}
                            placeholder='Enter Phone No.'
                            keyboardType='numeric'
                            // secureTextEntry={true}
                            defaultValue={this.state.phone}
                            maxLength={10}
                            // returnKeyLabel = {"next"}
                            // value={this.state.email}
                            onChangeText={(text) => this.setState({phone:text})}
                            // onChangeText={(text)=>console.log(text)}
                            />
                        </View>
                        <TouchableOpacity onPress={()=>this.update()}>
                        <View style={{backgroundColor:'#63B263',margin:10,alignContent:'center',justifyContent:'center',borderRadius:25,marginTop:10,height:50,width:width-20}}>
                            <Text style={{alignSelf:'center',color:'white',fontSize:17,fontWeight:'bold',fontFamily:''}}>UPDATE</Text>  
                        </View>
                        </TouchableOpacity>


                
             {/* <Text>edit profile</Text> */}

            </View>         
         </TouchableWithoutFeedback>
         </KeyboardAvoidingView>

        );
    }
}