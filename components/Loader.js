import React from 'react';
import { ActivityIndicator,StyleSheet } from 'react-native';

const Loader = () => {
    return <ActivityIndicator size="large" color={'black'} style={styles.load}/>;
};

const styles = StyleSheet.create({
    load:{
        textAlign: 'center',
        width: '100%',
        height: '100%',
    }
})
export default Loader;