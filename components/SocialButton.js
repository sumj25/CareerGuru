import React from 'react';
import {TouchableOpacity,Text,View,StyleSheet} from 'react-native';
import {windowHeight,windowWidth} from '../utils/Dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const SocialButton =({buttonTitle,btnType,color,backgroundColor,...rest}) => {
    let bgColor=backgroundColor;
    return (
        <TouchableOpacity style={[styles.buttonContainer,{backgroundColor:bgColor} ]}
        {...rest}>
        <View style={styles.iconWrapper,{ paddingRight:50}}>
        <FontAwesome name={btnType} style={styles.icon} size={32} color={color} />
        </View>
        <View style={styles.buttonTextWrapper}>
        <Text style={[styles.buttonText,{color:color}]}>{buttonTitle}</Text>
        </View>
        </TouchableOpacity>
    );
};
export default SocialButton;
const styles=StyleSheet.create({
    buttonContainer: {
        marginTop:10,
        width:'100%',
        height:windowHeight/15,
        padding:10,
       flexDirection:'row',
        borderRadius:3,
    },
    buttonText: {
        fontSize:18,
        fontWeight:'bold',
       
    },
    iconWrapper:{
        width:30,
        justifyContent:'center',
        alignItems:'center'
    },
    icon:{
        fontWeight:'bold',
       
    },
    btnTextWrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        
    }

});