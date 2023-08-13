import * as React from 'react';
import { useEffect } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { usersState, requestLoadUserBySize } from '../../../redux/slices/users';
import styles from '../../../theme/styles';
import { initState, signInReducer } from '../../auth/sign_in/Logic';
import User from '../../../models/User';
// import FlipCard, { RotateAxis } from "react-native-flip"

const UserListTab = () => {
    const dispatch = useAppDispatch()
    const { users, loading, error, size } = useAppSelector(usersState);
    const [uiState, uiLogic] = React.useReducer(signInReducer, initState);
    useEffect(() => {
        const loadUsers = () => {
            dispatch(requestLoadUserBySize({ size: 10 }))
        }
        loadUsers();
        return () => {
        }
    }, [])
    const loadUsersMore = React.useCallback(
        () => {
            return dispatch(requestLoadUserBySize({ size: size + 10 }));
        },
        [size],
    )

    const renderItem = ({ item }: { item: User }) => {
        return (
            <View style={comstyles.item}>
                <Text>{item.last_name}</Text>
                <Text>Price: {item.first_name}</Text>
            </View>
        );
    };
    const renderBody = React.useMemo(() => {
        if (loading) {
            return <View style={{ ...styles.container, ...comstyles.listContainer }}>
                <ActivityIndicator size="large" color="red" />
            </View>
        } else {
            return (
                <View style={{ ...styles.container }}>
                    <FlatList
                        data={users}
                        renderItem={renderItem}
                        keyExtractor={(item: User) => item.id.toString()}
                        contentContainerStyle={comstyles.listContainer}
                    />
                    {loading && <ActivityIndicator size="small" color="red" />}
                    <TouchableOpacity onPress={() => {
                        loadUsersMore();
                    }}>
                        load More
                    </TouchableOpacity>
                </View>
            )
        }
    }, [loading])
    return (
        <View style={styles.container}>
            {renderBody}
        </View>
    );

}


const comstyles = StyleSheet.create({
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
export default UserListTab