import React, { useEffect } from 'react';
import { View } from 'react-native';
import styles from '../../theme/styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from '@rneui/base';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { usersState, restoreUserSession } from '../../redux/slices/users';
import * as LocalStorage from '../../utils/storage';
import { navigate } from '../../navigators/utilities';
import { Routes } from '../../navigators/routes';
import { AppStackParamList } from '../../navigators/AppNavigation';
import User from '../../models/User';
export const SplashScreen = () => {
    const { users: user, loading, error } = useAppSelector(usersState);
    const dispatch = useAppDispatch();
    console.log("???");

    return (
        <SafeAreaView>
            <View style={{ ...styles.container, ...styles.column_center }}>
                <Text>Splash creen</Text>
            </View>
        </SafeAreaView>
    );
}