import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, ScrollView, View, Image, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Movies from '../components/Movies'
import { Ionicons } from "@expo/vector-icons";

function HomeM(props) {
    return (
        <SafeAreaView>
            <ScrollView style={styles.homeview}>
                <StatusBar backgroundColor="black"
                    barStyle="light-content" style='light' />
                <View style={styles.navicons}>
                    <TouchableWithoutFeedback onPress={() => props.navigation.toggleDrawer()}>
                        <Ionicons name={"menu"} size={25} />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Search")}>
                        <Ionicons name={"search"} size={24} />
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <Text style={styles.screenTitle}>Movies</Text>
                    <View style={styles.titleBar} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Now Playing</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'movie/now_playing'} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Trending</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'/trending/all/day'} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Top Rated</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'movie/top_rated'} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Upcoming Movies</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'movie/upcoming'} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Marvel Movies</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'discover/movie'} company={'&with_companies=420'}/>
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Dc Movies</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'discover/movie'} company={'&with_companies=174'}/>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    homeview: {
    },
    vtitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 7,
        marginHorizontal: 21,
    },
    title: {
        fontSize: 18,
    },
    screenTitle: {
        fontSize: 30,
        marginLeft: 20,
        marginBottom: 0,
    },

    titleBar: {
        width: 30,
        height: 5,
        backgroundColor: 'orange',
        marginTop: 2,
        marginBottom: 12,
        marginLeft: 20,
    },
    navicons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 21,
    }
});

export default HomeM