import React, { PropsWithoutRef, forwardRef, useCallback, useImperativeHandle, useRef, useState } from "react";
import { View, TouchableOpacity, Image, Text, StyleSheet, TextInput } from "react-native";
import config from "../../../config";
import { colors } from "../../../theme/colors";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import styles from "../../../theme/styles";
import images from "../../../theme/images";
import { Input } from "@rneui/themed";
import { TranslateText } from "../sign_in/SignIn";
import { SignInMode, changeSignInMode } from "../sign_in/Logic";

export const LoginModal = (props: {
    mode: SignInMode,
    changeSignInMode: (mode: SignInMode) => void,
    handleSignIn: (props: { account: string, password: string }) => void
}) => {
    const { mode, changeSignInMode, handleSignIn } = props;
    const accountInputRef = useRef<AuthInputRef>(null);
    const passwordInputRef = useRef<AuthInputRef>(null);
    return (
        <View style={{ marginBottom: 50 }}>
            <View style={[styles.row_group, { paddingHorizontal: 12 }]}>
                <ChangeSignModeBtn
                    label="internet account"
                    isActive={mode === SignInMode.INTERNET}
                    changeSignInMode={() => {
                        changeSignInMode(SignInMode.INTERNET);

                    }}
                />
                <ChangeSignModeBtn
                    label="ip address"
                    isActive={mode === SignInMode.LOCAL}
                    changeSignInMode={() => {
                        changeSignInMode(SignInMode.LOCAL);
                    }}
                />
            </View>
            <View style={style.modal_content}>
                <View style={{ marginTop: -10 }}>
                    <AuthInput type={(mode == SignInMode.INTERNET) ? AuthInputType.ACCOUNT : AuthInputType.LOCAL_IP} ref={accountInputRef} />
                </View>
                <View style={{ marginTop: -10 }}>
                    <AuthInput type={AuthInputType.PASSWORD} ref={passwordInputRef} />
                </View>
                <SignInBtn
                    handleSignIn={() => {
                        console.log(`account ${accountInputRef.current?.getValue()}`);
                        console.log(`pass ${passwordInputRef.current?.getValue()}`);
                        handleSignIn({
                            account: accountInputRef.current?.getValue() ?? "",
                            password: passwordInputRef.current?.getValue() ?? ""
                        })
                    }}
                />
            </View>
        </View>
    );
}
const SignInBtn = (props: {
    handleSignIn: () => void
}) => {
    const { handleSignIn } = props;
    return <View style={[styles.row_between, { width: '100%', justifyContent: 'center', paddingTop: 10 }]}>
        <TouchableOpacity
            onPress={handleSignIn}
            style={{
                ...style.btn,
                width: '50%',
                backgroundColor: colors.primary,
            }}>
            <TranslateText
                i18nKey={'Login'}
                style={{
                    color: colors.white,
                    ...style.btn_text,
                }}
            />
        </TouchableOpacity>
    </View>
}
const ChangeSignModeBtn = (props: { isActive: boolean, changeSignInMode: () => void, label: string }) => {
    const { isActive, changeSignInMode, label } = props;
    return <View style={isActive ? style.modal_top_tablet_group_active : style.modal_top_tablet_group}>
        <FontAwesome5 name={isActive ? "globe" : "laptop"} color={isActive ? colors.primary : colors.secondary} />
        <TouchableOpacity
            onPress={() => {
                changeSignInMode();
            }}>
            <TranslateText
                i18nKey={label}
                style={isActive ? style.modal_top_text_active_tablet : style.modal_top_text_tablet}
            />
        </TouchableOpacity>
    </View>
}
export interface AuthInputRef {
    getValue: () => string
}
enum AuthInputType {
    ACCOUNT,
    PASSWORD,
    LOCAL_IP,
}
interface PropsAuthInput {
    type: AuthInputType
    // onChange?: (e: SelectChangeEvent<any>) => void,
    // onDelete?: (event: any) => void
}
const AuthInput = forwardRef<AuthInputRef, PropsWithoutRef<PropsAuthInput>>((props, ref) => {
    const { type } = props;
    const [text, setText] = useState("");

    useImperativeHandle(ref, () => ({
        getValue: () => {
            return text;
        },
    }));
    const getInputLabelString = useCallback(() => {
        if (type == AuthInputType.PASSWORD) {
            return {
                label: "pass word",
                placeHolder: "enter your password"
            }
        } else if (type == AuthInputType.LOCAL_IP) {
            return {
                label: "your ip address",
                placeHolder: "xxx xxx xxx"
            }
        } else {
            return {
                label: "email",
                placeHolder: "enter your email"
            }
        }
    }, [type]);
    console.log(`render auth input:  ${type}`)

    return (
        // <View style={[{ marginTop: 40, flex: 1 }]}>
        <Input
            disabledInputStyle={{ backgroundColor: '#ddd' }}
            inputContainerStyle={styles.input_custom}
            inputStyle={{
                fontSize: 14,
            }}
            // label={I18n.t('auth.login.email')}
            label={<Text>{getInputLabelString().label}</Text>}
            labelStyle={styles.input_label_style}
            rightIcon={
                <TouchableOpacity
                    onPress={() => {
                        // setDataInternet({
                        //     ...dataInternet,
                        //     email: '',
                        // });
                    }}>
                    {/* {dataInternet?.email && (
                                    <Image
                                        style={styles.input_image_right}
                                        resizeMode="stretch"
                                        source={images.action.delete}
                                    />
                                )} */}
                </TouchableOpacity>
            }
            // placeholder={I18n.t('auth.login.input_email') + ' ...'}
            placeholder={getInputLabelString().placeHolder}
            secureTextEntry={type === AuthInputType.PASSWORD}
            onChangeText={text => {
                setText(text);
            }}
            value={text}
            keyboardType={(type === AuthInputType.PASSWORD) ? "visible-password" : "email-address"}
        />
        // </View>
    );
})


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