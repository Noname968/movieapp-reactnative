import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Text, ScrollView, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Movies from '../components/Movies'
import { Ionicons } from "@expo/vector-icons";

function HomeT(props) {
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
                    <Text style={styles.screenTitle}>Tv Shows</Text>
                    <View style={styles.titleBar} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Airing Today</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'tv/airing_today'} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Popular</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'tv/popular'} />
                </View>
                <View style={styles.vtitle}>
                    <Text style={styles.title}>Top Rated</Text>
                </View>
                <View>
                    <Movies navigation={props.navigation} url={'tv/top_rated'} />
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

export default HomeT