import { Text, View } from 'react-native'
import React, { Component } from 'react'
import styles from '../../../theme/styles'

class OrdersTab extends Component {
    render() {
        console.log("OrdersTab");

        return (
            <View style={{ ...styles.container, ...styles.column_center }}>
                <Text>DemoTab2</Text>
            </View>
        )
    }
}

export default OrdersTab