import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component, useCallback, useEffect } from 'react'
import styles from '../../../theme/styles'
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '../../../navigators/utilities';
import { Routes } from '../../../navigators/routes';
import { AppStackParamList } from '../../../navigators/AppNavigation';

const TableTab = () => {
    useEffect(() => {
        return () => {
        }
    }, [])
    const goToProductList = useCallback(() => {
        console.log("goToProductList");
        navigate({ name: "ProductList", key: Routes.product_list, params: {categoryId: "37"} })
    }, [])
    console.log("TableTab");
    return (
        <View style={{ ...styles.container, ...styles.column_center }}>
            <Text>TableTab</Text>
            <TouchableOpacity onPress={goToProductList}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 14, ...styles.column_center, backgroundColor: "red" }}>
                    <Text style={{ color: "white" }}>Go to Product List</Text>
                </View>
            </TouchableOpacity>
        </View>

    )

}

export default TableTab