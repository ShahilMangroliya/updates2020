import React ,{Component} from 'react'
import { Text ,View,TouchableOpacity,Dimensions,Image, ImageBackground,FlatList} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
var data = require('./data/data.json');
import firebase from 'firebase'

var x;



export default class Home extends Component{
    componentDidMount(){
        // console.log(this.props.route.params.uid);
        x = firebase.auth().currentUser.uid
        this.setState({currentuser:x})
        console.log(x)
    }

    signOut = () => {
        firebase.auth().signOut().then(
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
                        <TouchableOpacity onPress={()=>{this.signOut()}}>
                            <MaterialCommunityIcons name='logout' style={{color:'white',margin:20,marginLeft:80,marginTop:40}} size={40} />
                        </TouchableOpacity>
                </View>

                <View style={{marginBottom:100}}>
                    <ImageBackground
                    source={
                        require('E:/reactnative/up2020/images/homeback.jpg')}
                        style={{flex:1,height:height-100,width:width,marginBottom:0,resizeMode: 'cover'}}/>
                    
                        {/* <Text style={{color:'white'}}>home</Text> */}
                        <FlatList
                            style={{}}
                                data={data}
                                // horizontal
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => (
                                    <View style={{ flex:1,borderBottomColor:'#757575',borderBottomWidth:1,paddingBottom:25,paddingTop:25}}>
                                        <TouchableOpacity onPress={()=>this.props.navigation.navigate('Register',{ id:item.id})}>
                                        <Image source={{uri:item.image}} style={{margin:10,height:60,marginTop:10,width:width-20}}/>
                                        </TouchableOpacity>

                                    </View>
                                )}
                        />
                </View>
            </View>
        );
    }
}