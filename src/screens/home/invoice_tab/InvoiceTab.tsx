import { Text, View } from 'react-native'
import React, { Component } from 'react'
import styles from '../../../theme/styles'

class InvoiceTab extends Component {
    render() {
        return (
            <View style={{ ...styles.container, ...styles.column_center }}>
                <Text>InvoiceTab</Text>
            </View>
        )
    }
}

export default InvoiceTab