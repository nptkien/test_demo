import { Text, View } from 'react-native'
import React, { Component } from 'react'
import styles from '../../../theme/styles'

class SettingTab extends Component {
    render() {
        return (
            <View style={{ ...styles.container, ...styles.column_center }}>
                <Text>SettingTab</Text>
            </View>
        )
    }
}

export default SettingTab