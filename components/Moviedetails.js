import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Linking, FlatList, ScrollView, Image, Dimensions, Share, TouchableOpacity } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import Loader from './Loader';
import { SafeAreaView } from 'react-native-safe-area-context'
import Movies from './Movies';

const { height, width } = Dimensions.get("window");

function Moviedetails(props) {
    const [loading, setloading] = useState(true)
    const [details, setdetails] = useState({})
    const [videoUrl, setVideoUrl] = useState('');
    // console.log(props)
    const { movieId, media_type } = props.route.params
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchdata = async () => {
            await axios.get(`https://api.themoviedb.org/3/${media_type}/${movieId}?api_key=6bea443a9556b09e135dc3e19d0ffbbc`)
                .then(response => {
                    setdetails(response.data);
                    // console.log(response.data.backdrop_path);
                    setloading(false);
                })
                .catch(error => {
                    console.log(error);
                })
        }
        fetchdata();
    }, [])

    // console.log(details)

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${movieId}/videos?api_key=6bea443a9556b09e135dc3e19d0ffbbc`)
            .then(response => response.json())
            .then(data => {
                const video = data.results.find(result => result.type === 'Trailer');
                // console.log(data);
                if (video) {
                    setVideoUrl(`https://www.youtube.com/watch?v=${video.key}`);
                }
            });
    })

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${movieId}/credits?api_key=6bea443a9556b09e135dc3e19d0ffbbc`)
            .then((response) => response.json())
            .then((data) => setCast(data.cast))
            .catch((error) => console.error(error));
    }, [movieId]);
    // console.log(cast)

    return (
        <SafeAreaView style={styles.cont}>
            <ScrollView>
                <StatusBar backgroundColor="black"
                    barStyle="light-content" style='light' />
                {loading ? (
                    <Loader />
                ) : (
                    <View>
                        <View>
                            <Image
                                source={{ uri: `https://image.tmdb.org/t/p/w1280/${details?.backdrop_path}` }}
                                style={styles.movieimg}
                            />
                        </View>
                        <View style={styles.headerContainer}>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() => props.navigation.goBack()}
                            >
                                <Ionicons name="arrow-back" size={26} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.5}
                                onPress={() =>
                                    Share.share({ message: `${details.name ? details.name : details.title}\n\n${details?.homepage}` })
                                }
                            >
                                <Ionicons name="share-social-outline" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.playButton}
                            onPress={() => Linking.openURL(videoUrl)}
                        >
                            <Ionicons name="play-circle-outline" size={70} color={'white'} />
                        </TouchableOpacity>
                        <View>
                            <View style={styles.movieTitleContainer}>
                                <Text style={styles.movieTitle} numberOfLines={3}>
                                    {details.name ? details.name : details.title}
                                </Text>
                                <View style={styles.row}>
                                    <Ionicons name="heart" size={22} color={'#F13939'} />
                                    <Text style={details.ratingText}>{details?.vote_average}</Text>
                                </View>
                            </View>
                            <Text style={styles.genreText}>
                                {details?.genres?.map((genre) => genre?.name)?.join(", ")} |{" "}
                                {details.runtime ? details.runtime + ' Min' : 'Seasons-' + details.number_of_seasons}
                            </Text>
                            <Text style={styles.genreText}>
                                {details?.spoken_languages.english_name}
                            </Text>
                            <View style={styles.overviewContainer}>
                                <Text style={styles.overviewTitle}>Overview -</Text>
                                <Text style={styles.overviewText}>{details?.overview}</Text>
                            </View>
                            <View style={{ marginVertical: 5, marginRight: 10 }}>
                                <Text style={styles.castTitle}>Cast</Text>
                                <FlatList
                                    data={cast}
                                    keyExtractor={(item) => item?.credit_id}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    renderItem={({ item, index }) => (
                                        <View style={[styles.container, index === 0 && styles.firstItem]}>
                                            <Image
                                                source={{ uri: `${item.profile_path ? `https://image.tmdb.org/t/p/w200/${item.profile_path}` : "https://m.media-amazon.com/images/M/MV5BMzc1YTA1ZjItMWRhMy00ZTBlLTkzNTgtNTc4ZDE3YTM3ZDk2XkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_UY1200_CR285,0,630,1200_AL_.jpg"}` }}
                                                resizeMode={item.profile_path ? "cover" : "contain"}
                                                style={styles.image}
                                            />
                                            <Text style={styles.originalName} numberOfLines={2}>
                                                {item?.name}
                                            </Text>
                                            <Text style={styles.characterName} numberOfLines={2}>
                                                {item?.character}
                                            </Text>
                                        </View>
                                    )}
                                />
                            </View>
                            <View style={styles.recommended}>
                                <Text style={styles.recomTitle}>Recommendations</Text>
                                <Movies navigation={props.navigation} url={`${media_type}/${movieId}/recommendations`} />
                            </View>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
        height: '100%',

    },
    moviedisplay: {
        // height: 250,
        // width: width,
        alignItems: "center",
        position: "absolute",
    },
    movieimg: {
        height: 250,
        width: width,
        resizeMode: 'cover',
        borderRadius: 2,
    },
    headerContainer: {
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        position: 'absolute',
        left: 0,
        right: 0,

    },
    back: {
        // width: "100%",
        // height: "100%",
        backgroundColor: "white",
        borderRadius: 50
    },
    headerText: {
        color: 'white',
        fontFamily: 'bold',
    },
    playButton: {
        position: "absolute",
        left: 0,
        right: 0,
        elevation: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        top: 90,
    },
    movieTitleContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginTop: 25,
    },
    movieTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 19,
        width: (width + 50) / 2,
    },
    ratingText: {
        marginLeft: 5,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    genreText: {
        color: '#969696',
        paddingHorizontal: 20,
        paddingTop: 5,
        fontWeight: 'bold',
        fontSize: 13,
        width: width - 100,
    },
    overviewContainer: {
        backgroundColor: '#000800',
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 10,
        width: width - 30,
        alignSelf: 'center',
        borderRadius: 12,

    },
    overviewTitle: {
        color: 'white',
        fontSize: 20,
    },
    overviewText: {
        color: "#969696",
        paddingVertical: 5,
        fontSize: 14,
        textAlign: "justify",
    },
    castTitle: {
        marginLeft: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        marginBottom: 5,
    },
    recomTitle: {
        marginLeft: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 19,
        marginTop: 20,
    },
    firstItem: {
        paddingLeft: 20
    },
    container: {
        flex: 1,
        paddingHorizontal: 10,
    },
    image: {
        height: 120,
        width: 80,
        borderRadius: 10,
    },
    originalName: {
        width: 80,
        fontSize: 12,
        fontWeight: 'bold',
        alignSelf: "center"
    },
    characterName: {
        width: 80,
        alignSelf: "center",
        fontSize: 10,
    },
})

export default Moviedetails
