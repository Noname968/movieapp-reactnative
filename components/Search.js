import React, { useEffect, useState } from 'react'
import { Text, View, TextInput, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { genrelist } from '../genrelist';

function Search(props) {
    const Genres = (genreid = []) => {
        const text = genreid.map((item) =>
            genrelist[item].name)
        return text.join(", ");
        // console.log(genrelist[item].name)
    }
    const [text, setText] = useState('');
    const [searchdetails, setsearchdetails] = useState([])
    const [page, setpage] = useState(1)
    const title = "Movies"

    useEffect(() => {
        const getresults = async () => {
            await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=6bea443a9556b09e135dc3e19d0ffbbc&language=en-US&query=${text}&page=${page}`)
                .then(response => {
                    // console.log(response.data.results);
                    setsearchdetails(response.data.results)
                })
                .catch(error => {
                    console.log(error);
                })
        }
        getresults();
    }, [text, page])


    return (
        <SafeAreaView style={styles.fullcon}>
            <View>
                <View style={{ flexDirection: "row", marginTop: 24 }}>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => props.navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={26} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{`Search ${title}`}</Text>
                    <View style={{ flex: 1, paddingRight: 12 }}></View>
                </View>
                <View style={styles.titleBar} />
                <Text style={styles.subTitle}>
                    {`We'll help you find your favorite ${title.toLowerCase()}. Discover wonderful ${title.toLowerCase()}.`}
                </Text>
            </View>
            <View style={styles.searchContainer}>
                <Ionicons name={"search"} size={20} style={{ margin: 12 }} />
                <View style={{ alignSelf: "center", flex: 1 }}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={"Avengers: End Game"}
                        onChangeText={(e) => setText(e)}
                        returnKeyType={"search"}
                        autoCorrect={false}
                        cursorColor="black"
                    />
                </View>
            </View>
            <View>
                <FlatList
                    data={searchdetails}
                    keyExtractor={(item) => item?.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {
                            props.navigation.push('Moviedetails', { movieId: item.id, media_type: item.media_type ? item.media_type : "movie" });
                        }}>
                            <View style={styles.scontainer}>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w1280/${item.poster_path}` }}
                                    resizeMode={item.poster_path ? "cover" : "contain"}
                                    style={styles.simage}
                                />
                                <View style={styles.namegencon}>
                                    <Text style={styles.originalName} numberOfLines={3}>
                                        {item.name ? item.name : item.title}
                                    </Text>
                                    <Text style={styles.genrename} numberOfLines={3}>
                                        {Genres(item.genre_ids)}
                                    </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                // onEndReached={changepage}
                // onEndReachedThreshold={0.5}

                />
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    fullcon: {
        marginHorizontal: 20,
    },
    searchContainer: {
        marginHorizontal: 16,
        backgroundColor: '#dedede',
        borderRadius: 24,
        flexDirection: "row",
    },

    searchInput: {
        fontSize: 14,
        flex: 1,
        marginRight: 12,
        textDecorationLine: "none",
    },
    headerTitle: {
        alignSelf: "center",
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 22,
        flex: 9,
    },
    titleBar: {
        width: 40,
        height: 5,
        backgroundColor: 'orange',
        marginTop: 4,
        marginBottom: 12,
        alignSelf: "center",
    },
    subTitle: {
        margin: 16,
        marginTop: 5,
        fontSize: 12,
        textAlign: "center",
        alignSelf: "center",
        width: "70%",
    },
    scontainer: {
        marginVertical: 10,
        marginLeft: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    simage: {
        height: 180,
        width: 120,
        borderRadius: 8,
    },
    namegencon: {
        marginLeft: 20,
        width: "55%",
        // borderWidth: 1,
        // borderColor: 'black',
    },
    originalName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    genrename: {
    },
});
export default Search
