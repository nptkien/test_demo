import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors } from './colors';


const { height, width } = Dimensions.get('screen');

const styles = StyleSheet.create({
    row_group: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row_center: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row_between: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    column_center: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    right_5: {
        marginRight: 5,
    },
    right_10: {
        marginRight: 10,
    },
    left_5: {
        marginLeft: 5,
    },
    left_10: {
        marginLeft: 10,
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    input: {
        borderBottomWidth: 0.5,
        height: 35,
    },
    input_label_style: {
        marginBottom: 5,
        color: colors.dark,
        fontSize: 14,
        fontWeight: '700',
    },
    input_custom: {
        borderWidth: 0.3,
        height: 40,
        borderColor: colors.secondary,
        borderRadius: 6,
        backgroundColor: colors.dark_50,
        borderBottomWidth: 0.3,
        paddingHorizontal: 12,
    },
    input_image_right: {
        width: 12,
        height: 12,
        marginRight: 5,
    },
    button_header: {
        width: 40,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: colors.divider,
        borderRadius: 6,
        borderWidth: 0.5,
        borderColor: colors.divider,
    },
    RBSheet: {
    },
    header_center: {
        color: colors.dark,
        fontSize: 18,
        fontWeight: 'bold',
    },
    header_image: {
        height: 18,
        width: 18,
        tintColor: colors.dark,
    },
    header_height: {
        height: Platform.OS == 'ios' ? 100 : 84,
        marginBottom: 6,
    },
    vnd: {
        height: 16,
        width: 16,
    },
    underline: {
        textDecorationLine: 'underline',
    },
});

export default styles;
