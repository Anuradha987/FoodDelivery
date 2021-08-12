import React from 'react';
import { View, Text , StyleSheet, SafeAreaView, TouchableOpacity, Image, Animated, Touchable} from 'react-native';
import { PickerItem } from 'react-native/Libraries/Components/Picker/Picker';
import {icons, COLORS, SIZES, FONTS} from '../constants'; 

const Restaurant=({route, navigation})=>{

    const [restaurant, setRestaurant] = React.useState(null);   //taken from the home.js page under navigation code
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const scrollX = new Animated.Value(0) //initial animated value is set to zero

    React.useEffect(() => {
        let { item, currentLocation } = route.params;

        setRestaurant(item)
        setCurrentLocation(currentLocation)
    })

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row', marginTop: 10, marginBottom:10}}>

                {/* back button */}
                <TouchableOpacity
                    style={{width: 50, paddingLeft: SIZES.padding * 2, justifyContent: 'center'}}
                    onPress={() => navigation.goBack()}
                >
                        <Image
                            source={icons.back}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                            />
                </TouchableOpacity>  

                {/* Restaurent Name Section */}
                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <View style={{height: 50,
                                  alignItems: 'center',
                                  justifyContent:'center', 
                                  paddingHorizontal: SIZES.padding*3, 
                                  borderRadius: SIZES.radius, 
                                  backgroundColor:COLORS.lightGray3, 
                                }}>
                                    <Text style={{...FONTS.h3}}>{restaurant?.name}</Text>
                    </View>
                </View>

                {/* List button */}
                <TouchableOpacity style = {{width: 50, paddingRight: SIZES.padding * 2, justifyContent: 'center'}}>
                <Image source={icons.list}
                       resizeMode="contain"
                       style={{
                            width: 30,
                            height: 30
                            }}
                />
                </TouchableOpacity>
            </View>
        )
    }

    //food pictures
    function renderFoodInfo(){
        return(
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment='center'
                showsHorizontalScrollIndicator={false}
                //onScroll  --> control the data under three dots
                onScroll = {Animated.event(
                    [
                        {nativeEvent: {contentOffset: {x: scrollX} }  }
                    ],
                        {useNativeDriver: false}
                )}
            >

                {  
                    restaurant?.menu.map((item, index ) =>(
                        <View key={`menu-${index}`}
                              style={{alignItems:'center'}}>

                                <View style={{height: SIZES.height*0.35}}>
                                    {/* food image */}
                                    <Image
                                    source={item.photo}
                                    resizeMode='cover'
                                    style={{ width:SIZES.width, 
                                             height:"100%", }}
                                    />

                                    {/* Quantity Section */}
                                    <View style={{position:'absolute', bottom: -20, width:SIZES.width, height: 50, justifyContent:'center', flexDirection:'row'}}>
                                       
                                        {/* decreate quantity */}
                                        <TouchableOpacity style={{width:50, backgroundColor:COLORS.white, alignItems:'center', justifyContent:'center', borderTopLeftRadius: 25, borderBottomLeftRadius:25}}>
                                            <Text style={{...FONTS.body1}}>-</Text>
                                        </TouchableOpacity>
                                        
                                        {/* quantity */}
                                        <View style={{width:50, backgroundColor: COLORS.white, justifyContent: 'center', alignItems:'center'}}>
                                            <Text style={{...FONTS.h2}}>5</Text>
                                        </View>

                                        {/* increase quantity */}
                                        <TouchableOpacity style={{width:50, backgroundColor:COLORS.white, alignItems:'center', justifyContent:'center', borderTopRightRadius: 25, borderBottomRightRadius:25}}>
                                            <Text style={{...FONTS.h1}}>+</Text>
                                        </TouchableOpacity>

                                    </View>
                                </View>

                                {/* name and description */}
                                <View style={{width: SIZES.width, alignItems:'center',marginTop:15, paddingHorizontal: SIZES.padding*2 }}>
                                    <Text style={{marginVertical:10, textAlign:'center', ...FONTS.h2}}>{item.name} - {item.price.toFixed(2)}</Text>
                                    <Text style={{ ...FONTS.body3}}>{item.description}</Text>
                                </View>

                                {/* calories */}
                                <View style={{flexDirection:'row', marginTop:10,}}>
                                    <Image source={icons.fire} style={{width:20, height:20, marginRight:10}}/>

                                    <Text style={{...FONTS.body3, color:COLORS.darkgray}}>{item.calories.toFixed(2)} cal</Text>
                             
                                </View>
                        </View>
                    ))
                } 
            </Animated.ScrollView>
        )
    }

    //dots
    function renderDots(){

        const dotPosition = Animated.divide(scrollX, SIZES.width)
        return(
            <View style={{height:30, }}>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', height: SIZES.padding}}>
                    {
                        restaurant?.menu.map((item,index) => {
                            
                            //decorating the dots
                            const opacity= dotPosition.interpolate({
                                inputRange: [index-1, index, index+1],
                                outputRange : [0.3,1,0.3], 
                                extrapolate: "clamp"
                            })

                            const dotSize= dotPosition.interpolate({
                                inputRange: [index-1, index, index+1], 
                                outputRange:[SIZES.base * 0.8, 10, SIZES.base * 0.8],
                                extrapolate:'clamp'
                            })

                            const dotColor = dotPosition.interpolate({
                                inputRange: [index-1, index, index+1], 
                                outputRange:[COLORS.darkgray, COLORS.primary, COLORS.darkgray],
                                extrapolate:'clamp'
                            })
                            return(
                                <Animated.View
                                    key= {`dot-${index}`}
                                    opacity= {opacity}
                                    style={{ borderRadius: SIZES.radius, marginHorizontal: 6, width:dotSize, height:dotSize, backgroundColor: dotColor}}
                                />
                            )
                        })
                    }
                </View>
            </View>
        )
    }
    // order section

    function renderOrder(){
        return(
            <View style={{}}>
                {
                    renderDots()
                }
                {/* 1.22.50 */}
            </View>
        )
    }
return(
    <SafeAreaView style ={styles.container}>
       {renderHeader()}
       {renderFoodInfo()}
       {renderOrder()}
    </SafeAreaView>
    )
}

const styles= StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: COLORS.lightGray2,
    }
})
export default Restaurant;