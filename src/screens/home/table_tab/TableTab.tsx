import { Text, View } from 'react-native'
import React, { Component, useEffect } from 'react'
import styles from '../../../theme/styles'
import { SafeAreaView } from 'react-native-safe-area-context';

const TableTab = () => {
    useEffect(() => {
        return () => {
        }
    }, [])

    console.log("TableTab");
    return (
        <SafeAreaView>
            <View style={{ ...styles.container, ...styles.column_center }}>
                <Text>TableTab</Text>
            </View>
        </SafeAreaView>

    )

}

export default TableTab