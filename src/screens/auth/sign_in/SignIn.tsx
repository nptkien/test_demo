import React, { PropsWithoutRef, forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useReducer, useRef, useState } from 'react';
import { Alert, AlertType, Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { colors } from '../../../theme';
import images from '../../../theme/images';
import styles from '../../../theme/styles';
// import { authState, requestLogin } from '../../../redux/slices/counterSlice';
import { unwrapResult, } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from '../../../redux/hook';
import { authState, requestLogin } from '../../../redux/slices/auth';
import { signInReducer, initState, showModal, SignInMode, changeSignInMode } from './Logic';
import { LoginModal } from '../components/LoginModal';
import ApiError from '../../../models/ApiError';
import { navigate } from '../../../navigators/utilities';
import { Routes } from '../../../navigators/routes';
export const SignInScreen = () => {
    const { user, loading, error } = useAppSelector(authState);
    const [uiState, uiLogic] = useReducer(signInReducer, initState);
    const dispatch = useAppDispatch();
    console.log("render SignInScreen");
    const handleSignIn = useCallback(
        async (signInData: { account: string, password: string }) => {
            dispatch(requestLogin({
                account: signInData.account,
                password: signInData.password
            })).then(unwrapResult).then(result => {
                console.log("LOGIN OKKKK, DI DAU THI DI :D")
            }).catch(_error => {
                console.log(_error);
                let error = new ApiError(_error);
                showAlert(error, );
            })
        },
        [],
    )
    const showAlert = (error: ApiError, ) =>
        Alert.alert(
            'Sign In Error',
            error.message,
            [
                {
                    text: 'Cancel',
                    onPress: () => Alert.alert('Cancel Pressed'),
                    style: 'cancel',
                },
            ],
            {
                cancelable: true,
                onDismiss: () => { }
            },
        );
    const renderSignInModal = useMemo(() => {
        if (uiState.isShowModal) {
            return <LoginModal
                mode={uiState.signInMode}
                changeSignInMode={(changedMode: SignInMode) => {
                    uiLogic(changeSignInMode(changedMode));
                }}
                handleSignIn={(props) => {
                    // TRUYEN LÊN MÀN HÌNH SIGN IN Ở ĐÂY

                    handleSignIn(props);
                }}
            />
        } else {
            return null;
        }

    }, [uiState.isShowModal, uiState.signInMode])
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={colors.white} />
            <TouchableOpacity
                onPress={() => {
                    // refLanguage.current.open();
                    // console.log(`hahahah: ${accountInputRef.current?.getValue()}`)
                }}
                style={style.btn_language}>
                <Image
                    style={style.image_language}
                    resizeMode="stretch"
                    source={
                        images.flag_en
                    }
                />
                <Text style={style.text_language}>
                    EN
                    {/* {currentLanguage?.code == 'en' ? 'EN' : 'VI'} */}
                </Text>
                {/* <FontAwesome5
                        name="angle-down"
                        color={colors.secondary}
                        size={14}
                    /> */}
            </TouchableOpacity>
            <View style={{ height: 200 }}></View>

            {/* <Text>{userState.loading ? "Loadinggggg" : "loaded"}</Text> */}
            <ScrollView
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                style={{ paddingHorizontal: 32, paddingVertical: 10 }}>
                <View style={[styles.row_center, { marginTop: 40 }]}>
                    <Image source={images.intro._3} />
                </View>
                <View style={style.row_1}>
                    <Text>Welcome</Text>
                </View>

                <View style={{}}>
                    <View style={[styles.row_between, { width: '100%' }]}>
                        <TouchableOpacity
                            onPress={() => {
                                // refInternet.current.open();
                                // console.log(`account ${accountInputRef.current?.getValue()}`);
                                // console.log(`pass ${passwordInputRef.current?.getValue()}`);
                                // handleSignIn({
                                //     account: accountInputRef.current?.getValue() ?? "",
                                //     password: passwordInputRef.current?.getValue() ?? ""
                                // })
                                uiLogic(showModal(SignInMode.INTERNET));
                            }}
                            style={{
                                ...style.btn,
                                backgroundColor: colors.primary,
                                // width: get_width_internet(),
                            }}>
                            <TranslateText
                                i18nKey={'auth.login.internet'}
                                style={{
                                    color: colors.white,
                                    ...style.btn_text,
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            // refLocal.current.open();
                            uiLogic(showModal(SignInMode.LOCAL));
                        }}
                        style={{
                            backgroundColor: colors.solid.primary,
                            ...style.btn,
                            marginTop: 8,
                        }}>
                        <TranslateText
                            i18nKey={'auth.login.local'}
                            style={{
                                color: colors.primary,
                                ...style.btn_text,
                            }}
                        />
                    </TouchableOpacity>
                    <TranslateText
                        i18nKey={'auth.login.description'}
                        style={style.description}
                    />
                </View>
            </ScrollView>
            {renderSignInModal}
        </View>
    );
}



export const TranslateText = (props: { i18nKey: any, style: any }) => {
    return <Text>{props.i18nKey}</Text>
}
const style = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0,
        backgroundColor: colors.solid.modal,
    },
    modalView: {
        display: 'flex',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 12,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        overflow: 'hidden',
        width: 300,
        height: 120,
        justifyContent: 'center',
    },
    modal_btn: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        borderColor: colors.divider,
        borderWidth: 1,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    modal_btn_img: {
        width: 30,
        height: 25,
    },
    modal_btn_text: {
        paddingTop: 8,
    },
    btn_close: {
        position: 'absolute',
        right: -0,
        top: -0,
        borderColor: colors.divider,
        borderWidth: 1,
        borderRadius: 12,
        backgroundColor: colors.danger,
        width: 22,
        height: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image_select_lang: {
        height: 25,
        width: 20,
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    background: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
    },
    image_bg: {
        width: 300,
        height: 300,
    },
    images_header: {
        paddingBottom: 20,
        alignItems: 'center',
    },
    main: {
        width: 420,
        height: 460,
        borderRadius: 32,
        backgroundColor: colors.white,
        padding: 24,
        borderWidth: 1,
        borderColor: colors.divider,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    row_1: {
        paddingBottom: 30,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
    },
    sub: {
        fontSize: 14,
        fontWeight: '400',
        color: colors.secondary,
    },
    btn: {
        height: 49,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    btn_text: {
        fontSize: 14,
        fontWeight: '700',
    },
    description: {
        fontSize: 12,
        fontWeight: '400',
        color: colors.dark,
        textAlign: 'center',
        lineHeight: 20,
        marginTop: 40,
    },

    // modal
    modal_top_item: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    modal_top_text: {
        fontSize: 14,
        fontWeight: '600',
        width: 120,
        textAlign: 'center',
        height: 33,
        color: colors.secondary,
        textTransform: 'uppercase',
    },
    modal_top_text_tablet: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.secondary,
        textTransform: 'uppercase',
        paddingLeft: 5,
    },
    modal_top_text_active: {
        fontSize: 14,
        fontWeight: '600',
        width: 120,
        textAlign: 'center',
        height: 33,
        color: colors.primary,
        borderBottomColor: colors.primary,
        borderBottomWidth: 2,
        textTransform: 'uppercase',
    },
    modal_top_tablet_group: {
        width: 140,
        height: 33,
        borderColor: colors.divider,
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal_top_tablet_group_active: {
        width: 140,
        height: 33,
        borderColor: colors.primary,
        borderWidth: 1,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    modal_top_text_active_tablet: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.primary,
        textTransform: 'uppercase',
        paddingLeft: 5,
    },
    modal_content_mobile: {
        width: '100%',
        paddingHorizontal: 12,
        height: 290,
        justifyContent: 'flex-end',
        paddingBottom: 16,
    },
    modal_content: {
        width: '100%',
        paddingTop: 30,
    },
    modal_forgot_password: {
        fontSize: 14,
        fontWeight: '500',
        // color: colors.primary,
        textAlign: 'right',
        paddingLeft: 8,
    },
    modal_image_input: {
        width: 20,
        height: 16,
        marginRight: 5,
    },
    modal_btn_submit: {
        backgroundColor: colors.primary,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
        marginTop: 30,
    },
    modal_btn_submit_mobile: {
        backgroundColor: colors.primary,
        height: 42,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexDirection: 'row',
    },

    btn_language: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.divider,
        paddingHorizontal: 4,
        paddingVertical: 2,
        marginBottom: 10,
        position: 'absolute',
        right: 20,
        // top: Device.isPhone && Platform.OS == 'android' ? 0 : 50,
        zIndex: 100,
    },
    image_language: {
        width: 20,
        height: 16,
    },
    text_language: {
        paddingHorizontal: 8,
        fontSize: 14,
        color: colors.secondary,
    },
    btn_finger: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: colors.divider,
        height: 49,
        borderRadius: 12,
        width: 50,
    },
    modal_main: {
        // height: 348,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});