import React, { useEffect } from 'react';
import { View } from 'react-native';
import styles from '../../theme/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/base';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { authState, restoreUserSession } from '../../redux/slices/auth';
import * as LocalStorage from '../../utils/storage';
import { navigate } from '../../navigators/utilities';
import { Routes } from '../../navigators/routes';
import { AppStackParamList } from '../../navigators/AppNavigation';
import User from '../../models/User';
export const SplashScreen = () => {
    const { user, loading, error } = useAppSelector(authState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const getUserInfo = async () => {
            var userInfo = await LocalStorage.load("user");
            console.log(`don't login ${userInfo}`);
            if (userInfo) {
                dispatch(restoreUserSession(new User(userInfo)));
                navigate({ name: Routes.home as keyof AppStackParamList, key: Routes.home });
            } else {
                navigate({ name: Routes.sign_in as keyof AppStackParamList, key: Routes.sign_in });
            }
        }
        getUserInfo();
        return () => {
        }
    }, [])

    return (
        <SafeAreaView>
            <View style={{ ...styles.container, ...styles.column_center }}>
                <Text>Splash creen</Text>
            </View>
        </SafeAreaView>
    );
}