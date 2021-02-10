import React ,{Component} from 'react'
import { Text ,View,Dimensions,Image,Animated,Modal,TextInput,Alert,TouchableOpacity,ScrollView,ImageBackground} from 'react-native'
const {width,height} = Dimensions.get('screen')
import Entypo from 'react-native-vector-icons/Entypo'
import data from './data/data.json'
// import Animated from 'react-native-reanimated'
import firebase from 'firebase'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
const HEADER_MIN_HEIGHT = 100;
const HEADER_MAX_HEIGHT = 150;
var x;
var y;
// var z;

export default class Register extends Component{
    constructor() {
        super();
    
        this.scrollYAnimatedValue = new Animated.Value(0);
    
        this.array = [];
      }
state={
    currentuser:'',
    name:'',
    email:'',
    phone:'',
    yx:'',
    // x:'',
    zx:'',
    modal2:false,
    modal4:false,
    modal3:false,
    modal5:false,
    m1:'',
    m2:'',
    m3:'',
    m4:'',
    e1:'',
    e2:'',
    e3:'',
    e4:'',
    r0:'',
    r1:'',
    r2:'',
    r3:'',
    r4:'',
    data:'',
    allid:[],
    leader1:'',
    register:false,
    pid:0
}
     async componentDidMount(){
       if(this.props.route.params.id!=null){
         this.setState({pid:this.props.route.params.id})
        console.log('///////////////////////////////////////////////////////////register');
        // console.log(this.props.route.params);
        console.log(data[this.state.pid].name);
        x = await firebase.auth().currentUser.uid
        this.setState({currentuser:x,zx:x})
        // z=x;
        console.log(x,'done')


        firebase.database().ref('up2020').on("value",datasnap=>{
            console.log(datasnap.val()[x]);
            this.setState({name:datasnap.val()[x].name})
            this.setState({phone:datasnap.val()[x].phone})
            this.setState({email:datasnap.val()[x].email})
        })
        firebase.database().ref(data[this.state.pid].name+'/'+x).on("value",datasnap=>{
          if(datasnap.val()!=null){
          // this.setState({yx:datasnap.val().id})
          this.setState({m1:datasnap.val().othermember1,m2:datasnap.val().othermember2,m3:datasnap.val().othermember3,m4:datasnap.val().othermember4})
          
        
        }
      })


        firebase.database().ref(data[this.state.pid].name+'/'+x).on("value",datasnap=>{
            if(datasnap.val()!=null){
            this.setState({yx:datasnap.val().id})
            
          
          }
            else
            this.setState({yx:''})

        })
       await firebase.database().ref(data[this.state.pid].name).on("value",datasnap=>{
            if(datasnap.val()!=null){
          this.setState({data:datasnap.val()})
          

        for (var i in this.state.data){
          console.log(i)
              console.log('/////////////////////////////////');
              if(datasnap.val()[i]!=null){
                if(data[this.state.pid].maxmember==2){
                  console.log(datasnap.val()[i].email)
                  if(datasnap.val()[i].otheremail1==this.state.email){
                    console.log('doneeeeeee');
                    this.setState({register:true})
                  }
                }
                if(data[this.state.pid].maxmember==2){
                  console.log(datasnap.val()[i].email)
                  if(datasnap.val()[i].otheremail1==this.state.email){
                    console.log('doneeeeeee');
                    this.setState({register:true,leader1:datasnap.val()[i].name})
                  }
                }
                if(data[this.state.pid].maxmember==3){
                  console.log(datasnap.val()[i].email)
                  if(datasnap.val()[i].otheremail1==this.state.email || datasnap.val()[i].otheremail2==this.state.email){
                    console.log('doneeeeeee');
                    this.setState({register:true,leader1:datasnap.val()[i].name})
                  }
                }
                if(data[this.state.pid].maxmember==4){
                  console.log(datasnap.val()[i].email)
                  if(datasnap.val()[i].otheremail1==this.state.email || datasnap.val()[i].otheremail2==this.state.email || datasnap.val()[i].otheremail3==this.state.email){
                    // if(datasnap.val()[i].otheremail1==this.state.email){
                    console.log('doneeeeeee');
                    this.setState({register:true,leader1:datasnap.val()[i].name})
                  }
                }
                if(data[this.state.pid].maxmember==5){
                  console.log(datasnap.val()[i].email)
                  if(datasnap.val()[i].otheremail1==this.state.email || datasnap.val()[i].otheremail2==this.state.email || datasnap.val()[i].otheremail3==this.state.email || datasnap.val()[i].otheremail4==this.state.email){
                    // if(datasnap.val()[i].otheremail1==this.state.email){
                    console.log('doneeeeeee');
                    this.setState({register:true,leader1:datasnap.val()[i].name})
                  }
                }
              }
              
          }
        }
      })
    }
}









        openModal=()=>{
          if(this.state.pid!=null){
            console.log('modal');
            if(data[this.state.pid].maxmember==2)
            this.setState({modal2:true})
           else if(data[this.state.pid].maxmember==3)
            this.setState({modal3:true})
           else if(data[this.state.pid].maxmember==4)
            this.setState({modal4:true})
           else if(data[this.state.pid].maxmember==5)
            this.setState({modal5:true})
        }
      }


    async register(){
      if(this.state.pid!=null){
      if(data[this.state.pid].maxmember==1){
        firebase.database().ref(data[this.state.pid].name+'/'+this.state.currentuser).set({
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            id:this.state.currentuser,
            // othermember1:this.state.m1,
            // otheremail1:this.state.e1,
        })
        .then(this.props.navigation.navigate('HOME'))
    }
        if(data[this.state.pid].maxmember==2){
            firebase.database().ref(data[this.state.pid].name+'/'+this.state.currentuser).set({
                name:this.state.name,
                email:this.state.email,
                phone:this.state.phone,
                id:this.state.currentuser,
                othermember1:this.state.m1,
                otheremail1:this.state.e1,
            })
            .then(this.props.navigation.navigate('HOME'))
        }
        // this.setState({modal2:true})
       else if(data[this.state.pid].maxmember==3){
        firebase.database().ref(data[this.state.pid].name+'/'+this.state.currentuser).set({
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            id:this.state.currentuser,
            othermember1:this.state.m1,
            otheremail1:this.state.e1,
            othermember2:this.state.m2,
            otheremail2:this.state.e2,
        })
        .then(this.props.navigation.navigate('HOME'))
       }
        // this.setState({modal3:true})
       else if(data[this.state.pid].maxmember==4){
        firebase.database().ref(data[this.state.pid].name+'/'+this.state.currentuser).set({
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            id:this.state.currentuser,
            othermember1:this.state.m1,
            otheremail1:this.state.e1,
            othermember2:this.state.m2,
            otheremail2:this.state.e2,
            othermember3:this.state.m3,
            otheremail3:this.state.e3,
        })
        .then(this.props.navigation.navigate('HOME'))
       }
        // this.setState({modal4:true})
       else if(data[this.state.pid].maxmember==5){
        firebase.database().ref(data[this.state.pid].name+'/'+this.state.currentuser).set({
            name:this.state.name,
            email:this.state.email,
            phone:this.state.phone,
            id:this.state.currentuser,
            othermember1:this.state.m1,
            otheremail1:this.state.e1,
            othermember2:this.state.m2,
            otheremail2:this.state.e2,
            othermember3:this.state.m3,
            otheremail3:this.state.e3,
            othermember4:this.state.m4,
            otheremail4:this.state.e4,
            riot0:this.state.r0,
            riot1:this.state.r1,
            riot2:this.state.r2,
            riot3:this.state.r3,
            riot4:this.state.r4,
        })
       }
    this.props.navigation.navigate('HOME')
         
      }
    }


    render(){
        const headerHeight = this.scrollYAnimatedValue.interpolate(
            {
              inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
              outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
              extrapolate: 'clamp'
            });
      
          const headerBackgroundColor = this.scrollYAnimatedValue.interpolate(
            {
              inputRange: [0, (HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
              outputRange: [10000, 0],
              extrapolate: 'clamp'
            });
        return(
            <View>
                <Animated.View 
                
                style={[ { height: headerHeight, backgroundColor: 'black' }]}
                
                
                > 
                <Image
                    source={{uri:data[this.state.pid].poster}}
                    style={{height: 300,width: width}}/>
                    </Animated.View>
                    <TouchableOpacity style={{position:'absolute'}} onPress={()=>{this.props.navigation.navigate('HOME'),y=null}}>
                    <MaterialIcons name='arrow-back' style={{color:'white',marginLeft:10,marginTop:40}} size={40} />
                    </TouchableOpacity>
                <ScrollView 
                    contentContainerStyle={{ paddingTop: HEADER_MAX_HEIGHT }}
                    // scrollEventThrottle={10}
                    onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this.scrollYAnimatedValue } } }]
                    )}>


                
                    <View>
                    <ImageBackground
                    source={{uri:'https://scontent.fstv5-1.fna.fbcdn.net/v/t1.0-9/s960x960/121143098_114101953796321_5446374937076223946_o.jpg?_nc_cat=108&ccb=2&_nc_sid=8024bb&_nc_ohc=DlzrypwvzvIAX8-l0tG&_nc_ht=scontent.fstv5-1.fna&tp=7&oh=d8ce016100083ad3ec98ce7b40108b5f&oe=5FB64F2D'}}
                        style={{flex:1,height:1.8*height,width:width,resizeMode: 'cover',position:'absolute'}}/>


{/* //////////////////////////////////////////////////////////////////////////////////////// */}

                        <Modal animationType='slide' transparent={true} visible={this.state.modal2} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
                              <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                              <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                                <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter Member Name'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.m1}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m1:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter Email id'
                            keyboardType='email-address'
                            defaultValue={this.state.e1}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e1:text})}
                            />

                        </View>
                              <View style={{flexDirection:'row'}}>
                              {/* <TouchableOpacity onPress={() => {this.setState({modal2:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity> */}
                              <TouchableOpacity onPress={() => 
                              
                              {
                                if(data[this.state.pid].id==6){
                                    if(this.state.m1==''||this.state.e1==''){
                                    alert('Enter Proper data')
                                    }
                                    else
                                    this.setState({modal2:false})

                            }
                             else if((this.state.m1==''&&this.state.e1!='')||(this.state.m1!=''&&this.state.e1=='')){
                                alert('Enter proper data')
                              }
                              
                              else{
                              this.setState({modal2:false})
                              }
                                }}>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Submit</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </Modal>

{/* /////////////////////////////////////////////////////////////////////////////// */}

                            <Modal animationType='slide' transparent={true} visible={this.state.modal3} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
                              <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                              <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                                <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter first Member Name'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.m1}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m1:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter first Member Email id'
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            defaultValue={this.state.e1}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e1:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter second Member Name'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            defaultValue={this.state.m2}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m2:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter second Member Email id'
                            keyboardType='email-address'
                            defaultValue={this.state.e2}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e2:text})}
                            />

                        </View>
                        
                              <View style={{flexDirection:'row'}}>
                              {/* <TouchableOpacity onPress={() => {this.setState({modal3:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity> */}
                              <TouchableOpacity onPress={() => 
                                {
                                if((this.state.m1==''&&this.state.e1!='')||(this.state.m1!=''&&this.state.e1=='')||(this.state.m2!=''&&this.state.e2=='')||(this.state.m2!=''&&this.state.e2=='')){
                                  alert('Enter proper data')
                                }
                                
                                
                                else{
                                
                                {this.setState({modal3:false})}
                                }
                              }
                              
                              }>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Submit</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </Modal>

{/* //////////////////////////////////////////////////////////////////////////////////////////////////// */}
                            <Modal animationType='slide' transparent={true} visible={this.state.modal4} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
                              <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                              <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                                <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter first Member Name'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.m1}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m1:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter first Member Email id'
                            keyboardType='email-address'
                            defaultValue={this.state.e1}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e1:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter second Member Name'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            defaultValue={this.state.m2}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m2:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter second Member Email id'
                            defaultValue={this.state.e2}
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e2:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter third Member Name'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.m3}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m3:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter third Member Email id'
                            keyboardType='email-address'
                            defaultValue={this.state.e3}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e3:text})}
                            />

                        </View>
                              <View style={{flexDirection:'row'}}>
                              {/* <TouchableOpacity onPress={() => {this.setState({modal4:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity> */}
                              <TouchableOpacity onPress={() => {
                                
                                if((this.state.m1==''&&this.state.e1!='')||(this.state.m1!=''&&this.state.e1=='')||(this.state.m2==''&&this.state.e2!='')||(this.state.m2!=''&&this.state.e2=='')||(this.state.m3==''&&this.state.e3!='')||(this.state.m3!=''&&this.state.e3=='')){
                                  alert('Enter proper data')
                                }
                                else{
                                this.setState({modal4:false})}
                              }}>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Submit</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                            </Modal>


{/* //////////////////////////////////////////////////////////////////////////// */}


<Modal animationType='slide' transparent={true} visible={this.state.modal5} onRequestClose={() => {Alert.alert("Modal has been closed.");}}>
                              <View style={{height:height,width:width,opacity:1,opacity:0.8,backgroundColor: 'rgba(52, 52, 52, 0.8)',position:'absolute'}}/>
                              <ScrollView>
                              <View style={{ flex: 1,justifyContent: "center",alignItems: "center"}}>
                                <View style={{margin: 20,width:width-20,backgroundColor: "white",borderRadius: 20,padding: 35,alignItems: "center",shadowColor: "#000",}}>

                                <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'red',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter your riot id'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.r0}
                            // secureTextEntry={true}
                            placeholderTextColor="red"
                            onChangeText={(text) => this.setState({r0:text})}
                            />

                        </View>
                                <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter first Member Name'
                            defaultValue={this.state.m1}
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m1:text})}
                            />

                        </View>                                

                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter first Member Email id'
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            defaultValue={this.state.e1}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e1:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter first Member riot id'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            defaultValue={this.state.r1}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({r1:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter second Member Name'
                            defaultValue={this.state.m2}
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m2:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter second Member Email id'
                            keyboardType='email-address'
                            defaultValue={this.state.e2}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e2:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter second Member riot id'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            defaultValue={this.state.r2}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({r2:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter third Member Name'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.m3}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m3:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter third Member Email id'
                            keyboardType='email-address'
                            // secureTextEntry={true}
                            defaultValue={this.state.e3}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e3:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter third Member riot id'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.r3}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({r3:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter forth Member Name'
                            keyboardType='ascii-capable'
                            defaultValue={this.state.m4}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({m4:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                          {/* <View style={{borderRadius:30,marginLeft:-5,borderWidth:4,borderColor:'black',position:'absolute',justifyContent:'center',marginTop:28,width:60,height:60}}>
                            <Entypo name='mail' style={{color:'black',alignSelf:'center',position:'absolute',elevation:6,marginLeft:20}} size={30} />
                          </View> */}
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter forth Member Email id'
                            keyboardType='email-address'
                            defaultValue={this.state.e4}
                            // secureTextEntry={true}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({e4:text})}
                            />

                        </View>
                        <View style={{margin:10,borderRadius:30,borderWidth:1,borderColor:'black',justifyContent:'center',width:width-30,height:50}}>
                        <TextInput style={{fontSize:15,width:width-20,alignSelf:'center',paddingLeft:20,color:'black',opacity:0.80,}}
                            placeholder='Enter forth Member riot id'
                            keyboardType='ascii-capable'
                            // secureTextEntry={true}
                            defaultValue={this.state.r4}
                            placeholderTextColor="black"
                            onChangeText={(text) => this.setState({r4:text})}
                            />

                        </View>
                              <View style={{flexDirection:'row'}}>
                              {/* <TouchableOpacity onPress={() => {this.setState({modal5:false})}}>
                                    
                                <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                    <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Cancel</Text>
                                </View>
                              </TouchableOpacity> */}
                              <TouchableOpacity onPress={() => {
                                if(this.state.r0==''||this.state.r1==''||this.state.r2==''||this.state.r3==''||this.state.r4==''||this.state.e1==''||this.state.e2==''||this.state.e3==''||this.state.e4==''||this.state.m1==''||this.state.m2==''||this.state.m3==''||this.state.m4==''){
                                  alert('Enter proper data')
                                }
                                
                                else{
                                
                                this.setState({modal5:false})
                                }
                                
                                
                                }}>
                                    
                                    <View style={{margin:10,marginTop:10,borderRadius:30,backgroundColor:'#63B263',alignItems:'center',justifyContent:'center',width:width/3,height:60}}>
                                        <Text style={{color: "white",fontWeight: "bold",fontFamily:'',fontSize:18,textAlign: "center"}}>Submit</Text>
                                    </View>
                                  </TouchableOpacity>
                                  </View>
                                </View>
                              </View>
                              </ScrollView>
                            </Modal>

{/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}

                {/* <ScrollView > */}
                <Entypo name='chevron-thin-up' style={{color:'white',alignSelf:'center',marginTop:10}} size={30} />
                    <Text style={{color:'white',fontSize:25,fontWeight:'bold',fontFamily:'',alignSelf:'center',margin:10}}>{data[this.state.pid].name}</Text>
                    <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:10,marginBottom:10}}>
                        <View style={{backgroundColor:'#63B263',alignContent:'center',justifyContent:'center',borderRadius:18,height:35,width:150}}>
                            <Text style={{alignSelf:'center',color:'white',fontSize:17}}>Team Size: {data[this.state.pid].maxmember}</Text>  
                        </View>
                        <View style={{backgroundColor:'#63B263',alignContent:'center',justifyContent:'center',borderRadius:18,height:35,width:150}}>
                            <Text style={{alignSelf:'center',color:'white',fontSize:17}}>{data[this.state.pid].eventtype}</Text>  
                        </View>
                    </View>
                    <View style={{margin:10}}>
                        <Text style={{fontSize:20,color:'red'}}>{data[this.state.pid].register}</Text>
                        <Text style={{fontSize:20,color:'white'}}>Description:</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{data[this.state.pid].discription}</Text>
                        <Text style={{fontSize:20,color:'white',marginTop:20}}>Event Organizer:</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{data[this.state.pid].organizer1}</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{data[this.state.pid].organizer2}</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{data[this.state.pid].organizer3}</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B',marginBottom:30}}>{data[this.state.pid].organizer4}</Text>


                        {
                            data[this.state.pid].maxmember>1&&this.state.zx!=this.state.yx && this.state.register!=true&&
                        <TouchableOpacity onPress={()=>{this.openModal()}}>
                        <View style={{backgroundColor:'#63B263',alignContent:'center',marginBottom:20,justifyContent:'center',borderRadius:30,height:60,width:width-20}}>
                            <Text style={{alignSelf:'center',color:'white',fontSize:17,fontWeight:'bold',fontFamily:''}}>ADD MEMBER</Text>  
                        </View>
                        </TouchableOpacity>
                        }
                        <View style={{marginBottom:250}}>
                        {this.state.zx!=this.state.yx && this.state.register!=true&&
                        <TouchableOpacity onPress={()=>{this.register(),console.log('register')}}>
                        <View style={{backgroundColor:'#63B263',alignContent:'center',justifyContent:'center',borderRadius:30,height:60,width:width-20}}>
                            <Text style={{alignSelf:'center',color:'white',fontSize:17,fontWeight:'bold',fontFamily:''}}>REGISTER</Text>  
                        </View>
                        </TouchableOpacity>
                        }
                         {
                           this.state.register&& 
                            <View style={{margin:10}}>
                        {/* <Text>done</Text> */}
                        <Text style={{fontSize:20,color:'white',marginTop:20}}>Team Leader:</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{this.state.leader1}</Text>
                        </View>
                        }
                          {
                            data[this.state.pid].maxmember>1&&this.state.zx==this.state.yx && 
                            <View style={{margin:10}}>
                        {/* <Text>done</Text> */}
                        <Text style={{fontSize:20,color:'white',marginTop:20}}>Team Member:</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{this.state.leader1}</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{this.state.m1}</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{this.state.m2}</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B'}}>{this.state.m3}</Text>
                        <Text style={{fontSize:15,color:'#7B7B7B',marginBottom:30}}>{this.state.m4}</Text>
                        </View>
                        }
  
                        
                        
                        </View>
                    </View>
                    </View>
                </ScrollView>
                </View>
        );
    }
}