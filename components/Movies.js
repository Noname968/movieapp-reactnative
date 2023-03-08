import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native'
import axios from 'axios'
import Loader from './Loader'

function Movies(props) {
    const [movies, setmovies] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${props.url}?api_key=6bea443a9556b09e135dc3e19d0ffbbc${props.company?props.company:""}`)
            .then(response => {
                setmovies(response.data.results);
                // console.log(response.data.results);
                setLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])

    return (
        <View style={styles.homeconn}>
            {loading ? (<Loader />) :
                (
                    <View>
                        {
                            movies.length !== 0 ? (
                                <FlatList
                                    data={movies}
                                    style={{marginRight:18}}
                                    renderItem={(item,index) => displayMovies(item, props)}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    keyExtractor={(item) => item.id.toString()}
                                />
                            ) :
                                (
                                    <View style={{
                                        height: "100%", width: "100%", alignItems: "center",
                                        justifyContent: "center"
                                    }}>
                                        <Text>No data found</Text>
                                    </View>
                                )
                        }
                    </View>
                )
            }

        </View>
    )
}

const displayMovies = ({ item,index }, props) => {
    // console.log(item)
    return (
        <TouchableOpacity onPress={() => {
            props.navigation.push('Moviedetails', { movieId: item.id, media_type: item.media_type?item.media_type:"movie" });
        }}
        style={[styles.card, index === 0 && styles.firstItem]}>
            <Image
                style={styles.stretch}
                source={{ uri: `https://image.tmdb.org/t/p/w1280/${item.poster_path}` }}
            />
            {/* <Text style={styles.mtitle}>{item.title}</Text> */}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({

    homeconn: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    card: {
        paddingHorizontal: 3,
        marginBottom:10
    },
    stretch: {
        height: 155,
        width: 110,
        borderRadius: 5,
    },
    mtitle: {
        width: 100,
        textAlign: 'center',
        fontSize: 13,
        marginTop: 10,
    },
    firstItem:{
        paddingLeft:20
    },
});

export default Movies