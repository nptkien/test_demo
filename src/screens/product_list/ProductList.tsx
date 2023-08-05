import React, { Component, useCallback, useEffect, useMemo, useReducer } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import Product from '../../models/Product';
import { AppStackParamList, AppStackScreenProps } from '../../navigators/AppNavigation';
import { unwrapResult } from '@reduxjs/toolkit';
import ApiError from '../../models/ApiError';
import { Routes } from '../../navigators/routes';
import { navigate } from '../../navigators/utilities';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import { productState, requestLoadProductsByCategoryId } from '../../redux/slices/products';
import { signInReducer, initState } from '../auth/sign_in/Logic';

export const ProductListScreen: React.FC<AppStackScreenProps<"ProductList">> = (props) => {
    const { route } = props;
    const { products, loading, error, currentPage } = useAppSelector(productState);
    const [uiState, uiLogic] = useReducer(signInReducer, initState);
    const dispatch = useAppDispatch();
    console.log("render ProductListScreen");
    useEffect(() => {
        loadProducts({ page: currentPage + 1 })
        return () => {
        }
    }, [])
    const loadProducts = useCallback(
        async (filter: { page: number }) => {
            dispatch(requestLoadProductsByCategoryId({
                categoryId: route.params.categoryId,
                page: filter.page
            }))
        },
        [currentPage],
    )
    const xxx = () => {
        console.log("loadmore");

    }
    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.item}>
            <Text>{item.name}</Text>
            <Text>Price: {item.price}</Text>
        </View>
    );
    const renderBody = useMemo(() => {
        if (loading) {
            return <View style={{ ...styles.container, ...styles.listContainer }}>
                <ActivityIndicator size="large" color="red" />
            </View>
        } else {
            return (
                <View style={{ ...styles.container }}>
                    <FlatList
                        data={products}
                        renderItem={renderItem}
                        keyExtractor={(item: Product) => item.id}
                        contentContainerStyle={styles.listContainer}
                        onEndReached={() => loadProducts({ page: currentPage + 1 })}
                        onEndReachedThreshold={products.length == 0 ? null : 0.2}
                    />
                    {loading && <ActivityIndicator size="small" color="red" />}
                </View>

            )
        }
    }, [loading])
    return (
        <View style={styles.container}>
            {renderBody}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    listContainer: {
        paddingBottom: 16,
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        height: 250
    },
});
