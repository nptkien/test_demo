import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { Text, TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigation";
import DemoTab1 from "../screens/home/demo_tab_1/DemoTab1"
import DemoTab2 from "../screens/home/demo_tab_2/DemoTab2"
export type HomeTabParamList = {
    DemoCommunity: undefined
    DemoShowroom: { queryIndex?: string; itemIndex?: string }
    DemoDebug: undefined
    DemoPodcastList: undefined
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
                name="DemoShowroom"
                component={DemoTab1}
                options={{
                    // tabBarLabel: translate("demoNavigator.componentsTab"),
                    tabBarLabel: "Tab1",
                    tabBarIcon: ({ focused }) => (
                        <Text>Icon</Text>
                        // <Icon icon="components" color={(focused && colors.tint) ? colors.tint : undefined} size={30} />
                    ),
                }}
            />

            <HomeTab.Screen
                name="DemoCommunity"
                component={DemoTab2}
                options={{
                    tabBarLabel: "Tab2",
                    tabBarIcon: ({ focused }) => (
                        <Text>Icon</Text>

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

