import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { Text, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigation";
import UserListTab from "../screens/home/table_tab/TableTab"
import OrdersTab from "../screens/home/orders_tab/OrderTab"
import { Routes } from "./routes"
import InvoiceTab from "../screens/home/invoice_tab/InvoiceTab"
import SettingTab from "../screens/home/setting_tab/SettingTab"
import { Icon } from "react-native-vector-icons/Icon"
export type HomeTabParamList = {
    TableTab: undefined
    OrderTab: { queryIndex?: string; itemIndex?: string }
    SettingTab: undefined
    InvoiceTab: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof HomeTabParamList> = CompositeScreenProps<
    BottomTabScreenProps<HomeTabParamList, T>,
    AppStackScreenProps<keyof AppStackParamList>
>

const HomeTab = createBottomTabNavigator<HomeTabParamList>()

export function HomeNavigator() {
    const { bottom } = useSafeAreaInsets()

    return (
        <HomeTab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: [$tabBar, { height: bottom + 70 }],
                tabBarActiveTintColor: colors.text,
                tabBarInactiveTintColor: colors.text,
                tabBarLabelStyle: $tabBarLabel,
                tabBarItemStyle: $tabBarItem,
            }}
        >
            <HomeTab.Screen
                name={Routes.table_tab as keyof HomeTabParamList}
                component={UserListTab}
                options={{
                    // tabBarLabel: translate("demoNavigator.componentsTab"),
                    tabBarLabel: "Table",
                    tabBarIcon: ({ focused }) => (
                        <></>
                        // <Icon icon="components" color={(focused && colors.tint) ? colors.tint : undefined} size={30} />
                    ),
                }}
            />

            <HomeTab.Screen
                name={Routes.order_tab as keyof HomeTabParamList}
                component={OrdersTab}
                options={{
                    tabBarLabel: "Orders",
                    tabBarIcon: ({ focused }) => (
                        <></>

                        // <Icon icon="community" color={(focused && colors.tint) ? colors.tint : undefined} size={30} />
                    ),
                }}
            />

            <HomeTab.Screen
                name={Routes.invoice_tab as keyof HomeTabParamList}
                component={InvoiceTab}
                options={{
                    tabBarLabel: "Invoice",
                    tabBarIcon: ({ focused }) => (
                        <></>
                        // <Icon name="community" color={(focused && colors.tint) ? colors.tint : undefined} size={30} />
                    ),
                }}
            />

            <HomeTab.Screen
                name={Routes.setting_tab as keyof HomeTabParamList}
                component={SettingTab}
                options={{
                    tabBarLabel: "Setting",
                    tabBarIcon: ({ focused }) => (
                        <></>

                        // <Icon icon="community" color={(focused && colors.tint) ? colors.tint : undefined} size={30} />
                    ),
                }}
            />

        </HomeTab.Navigator>
    )
}

const $tabBar: ViewStyle = {
    backgroundColor: colors.background,
    borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
    paddingTop: spacing.md,
}

const $tabBarLabel: TextStyle = {
    fontSize: 12,
    fontFamily: typography.primary.medium,
    lineHeight: 16,
    flex: 1,
}

