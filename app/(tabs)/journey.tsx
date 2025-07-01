import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/contexts/ThemeContext';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function JourneyScreen() {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    historyBubble: {
      backgroundColor: "#5cb0e7",
      borderRadius: 25,
      marginVertical: 5,
      marginHorizontal: 7,
      paddingHorizontal: 30,
      paddingVertical: 15,
      width: "95%",
      flexDirection: "row",
      justifyContent: 'space-between', // Spread them out
      alignItems: 'center',
      gap: 5
    },
    numText: {
      color: theme === "dark" ? "black" : "white",
      fontSize: 30,
      fontWeight: "bold",
    },
    statText: {
      color: theme === "dark" ? "black" : "white",
      fontSize: 24,
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
    userText: {
      color: theme === "dark" ? "white" : "black",
      fontSize: 16,
      fontWeight: "bold"
    },
  });

  return (
    <ThemedView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 15 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Your Journey</Text>
          </View>
          <View style={{ alignItems: "center", marginVertical: 5 }}>
            <Text style={styles.userText}>Hello, User</Text>
          </View>
          <View style={styles.historyBubble}>
            <FontAwesome5 name="calendar-alt" size={30} color={theme === "dark" ? "white" : "black"} />
            <Text style={styles.statText}>Days Logged In</Text>
            <Text style={styles.numText}>23</Text>
          </View>
          <View style={styles.historyBubble}>
            <FontAwesome name="pencil" size={30} color={theme === "dark" ? "white" : "black"} />
            <Text style={styles.statText}>Notes Written</Text>
            <Text style={styles.numText}>47</Text>
          </View>
          <View style={styles.historyBubble}>
            <Ionicons name="chatbox-outline" size={30} color={theme === "dark" ? "white" : "black"} />
            <Text style={styles.statText}>Chat Sessions</Text>
            <Text style={styles.numText}>31</Text>
          </View>
          <View style={styles.historyBubble}>
            <MaterialCommunityIcons name="lightning-bolt-outline" size={30} color={theme === "dark" ? "white" : "black"} />
            <Text style={styles.statText}>Current Streak</Text>
            <Text style={styles.numText}>7</Text>
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}


