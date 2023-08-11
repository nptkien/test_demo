import { HostComponent, Text, TouchableOpacity, View, requireNativeComponent, NativeModules, SafeAreaView } from 'react-native'
import { Component, useCallback, useEffect } from 'react'
import styles from '../../../theme/styles'
import { navigate } from '../../../navigators/utilities';
import { Routes } from '../../../navigators/routes';
import { AppStackParamList } from '../../../navigators/AppNavigation';
import * as React from 'react';
const TableTab = () => {
    useEffect(() => {
        return () => {
        }
    }, [])
    const goToProductList = useCallback(() => {
        console.log("goToProductList");
        navigate({ name: "ProductList", key: Routes.product_list, params: { categoryId: "37" } })
    }, []);
    const callNativeModule = () => {
        const SmartPrinter = NativeModules.Printer;
        console.log("callNativeModule", { NativeModules, SmartPrinter });
        console.log("callNativeModule", SmartPrinter);

        try {
            var xxxxx = SmartPrinter.demoHandlePrintEvent;
            xxxxx("vkl");
            console.log("==========");

        } catch (error) {
            console.log("error");

        }
        console.log("==========");


    }
    console.log("TableTab");
    return (
        <View style={{ ...styles.container, ...styles.column_center }}>
            <Text>TableTab</Text>
            <TouchableOpacity onPress={goToProductList}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 14, ...styles.column_center, backgroundColor: "red" }}>
                    <Text style={{ color: "white" }}>Go to Product List</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={callNativeModule}>
                <View style={{ paddingHorizontal: 20, paddingVertical: 14, ...styles.column_center, backgroundColor: "red", marginTop: 30 }}>
                    <Text style={{ color: "white" }}>Demo Native</Text>
                </View>
            </TouchableOpacity>
        </View>

    )

}

export default TableTab