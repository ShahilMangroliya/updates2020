import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,Image,ImageBackground} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import firebase from 'firebase'

export default class About extends Component{
    signOut = () => {
        firebase.auth().signOut()
        .then(
          this.props.navigation.replace('Login')
        )
        .catch(error => console.log(error))
      }
    render(){
        return(
            <View style={{flex:1}}>
                <View style={{backgroundColor:'#0C0C0C',flexDirection:'row',alignItems:'center',width:width,height:100}}>
                    <TouchableOpacity onPress={()=>this.props.navigation.openDrawer()}>
                        <Entypo name='menu' style={{color:'white',margin:20,marginTop:40}} size={40} />
                    </TouchableOpacity>
                    <Image
                        source={
                        require('E:/reactnative/up2020/images/updates1.png')}
                        style={{height: 110,marginLeft:70,width: 110,resizeMode: 'stretch',borderRadius:150}}/>
                        <TouchableOpacity onPress={()=>{this.signOut(),console.log('logout')}}>
                            <MaterialCommunityIcons name='logout' style={{color:'white',margin:20,marginLeft:80,marginTop:40}} size={40} />
                        </TouchableOpacity>
                </View>
                <ImageBackground
                    source={{uri:'https://scontent.fstv5-1.fna.fbcdn.net/v/t1.0-9/s960x960/121143098_114101953796321_5446374937076223946_o.jpg?_nc_cat=108&ccb=2&_nc_sid=8024bb&_nc_ohc=DlzrypwvzvIAX8-l0tG&_nc_ht=scontent.fstv5-1.fna&tp=7&oh=d8ce016100083ad3ec98ce7b40108b5f&oe=5FB64F2D'}}
                        style={{flex:1,marginTop:100,height:height-100,width:width,resizeMode: 'cover',position:'absolute'}}/>
             <Text>about</Text>

            </View>
            // <Text>about</Text>
        );
    }
}