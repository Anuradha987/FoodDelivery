import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { icons, images, COLORS, FONTS, SIZES } from '../constants';

const Home = () => {

    function renderHeader(){
        return(
            <View style={{flex}}>

            </View>
        )
    }
    return(
        <SafeAreaView style={styles.container}></SafeAreaView>
    )
}
const styles= StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: COLORS.lightGray4,
    }, 
    shadow:{
        shadowColor: '#000', 
        shadowOffset:{
            width:0, 
            height: 3,
        },
        shadowOpacity: 0.1, 
        shadowRadius: 3, 
        elevation:1,
    }, 

})

export default Home;