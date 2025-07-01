import { useState } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
    const { theme, toggleTheme } = useTheme();

    const styles = StyleSheet.create({
        heading: {
            color: theme === "dark" ? "white" : "black",
            fontSize: 16,
            fontWeight: 'bold',
        },
        historyBubble: {
            backgroundColor: theme === "dark" ? "black" : "white",
            borderColor: theme === "dark" ? "white" : "#CACACA",
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 5,
            marginHorizontal: 20,
            paddingHorizontal: 15,
            paddingVertical: 15,
            width: "90%",
            flexDirection: "row",
            justifyContent: 'space-between', // Spread them out
            alignItems: 'center',
            gap: 5
        },
        subheading: {
            color: theme === "dark" ? "white" : "black",
            flexDirection: 'row',
            fontSize: 12,
            fontWeight: "bold",
            gap: 8,
            marginLeft: 5,
            marginVertical: 8,
        },
        smallText: {
            color: theme === "dark" ? "white" : "black",
            fontSize: 12,
            fontWeight: "bold"
        },
        title: {
            color: theme === "dark" ? "white" : "black",
            fontSize: 20, 
            fontWeight: "bold"
        },
        titleContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            marginBottom: 8,
        },
    });

    const [switch2, setSwitch2] = useState(false);
    const [switch3, setSwitch3] = useState(false);
    const [switch4, setSwitch4] = useState(false);

    const toggleSwitch2 = () => setSwitch2(previousState => !previousState);
    const toggleSwitch3 = () => setSwitch3(previousState => !previousState);
    const toggleSwitch4 = () => setSwitch4(previousState => !previousState);

    return (
        <ThemedView>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1, marginTop: 15 }}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Settings</Text>
                    </View>
                    <Text style={styles.subheading}>APPEARANCE</Text>
                    <View style={styles.historyBubble}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginTop: 5, marginRight: 8 }}>
                                <Ionicons name="moon-outline" size={24} color={theme === "dark" ? "white" : "black"} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.heading}>Toggle Dark Mode</Text>
                                <Text style={styles.smallText}>Easier on Your Eyes</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={theme === "dark" ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            value={theme === 'dark'} onValueChange={toggleTheme}
                        />
                    </View>
                    <View style={styles.historyBubble}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginTop: 5, marginRight: 8 }}>
                                <MaterialIcons name="text-fields" size={24} color={theme === "dark" ? "white" : "black"} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.heading}>Larger Text</Text>
                                <Text style={styles.smallText}>Better Readability</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={switch2 ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch2}
                            value={switch2}
                        />
                    </View>
                    <Text style={styles.subheading}>NOTIFICATIONS</Text>
                    <View style={styles.historyBubble}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginTop: 5, marginRight: 8 }}>
                                <FontAwesome6 name="calendar-week" size={24} color={theme === "dark" ? "white" : "black"} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.heading}>Daily Reminders</Text>
                                <Text style={styles.smallText}>Turn on for gentle check-ins</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={switch3 ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch3}
                            value={switch3}
                        />
                    </View>
                    <View style={styles.historyBubble}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ marginTop: 5, marginRight: 8 }}>
                                <Ionicons name="stats-chart" size={24} color={theme === "dark" ? "white" : "black"} />
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.heading}>Weekly Reports</Text>
                                <Text style={styles.smallText}>Turn on for progress summaries</Text>
                            </View>
                        </View>
                        <Switch
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={switch4 ? '#f5dd4b' : '#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={toggleSwitch4}
                            value={switch4}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ThemedView>
    );
}


