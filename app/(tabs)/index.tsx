import { SafeAreaView, StyleSheet } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';

import * as FileSystem from 'expo-file-system';

export default function HomeScreen() {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    historyBubble: {
      backgroundColor: "white",
      borderRadius: 25,
      marginVertical: 5,
      marginHorizontal: 7,
      padding: 10,
      width: "95%",
      flexDirection: "row",
      gap: 5
    },
    logContainer: {
      gap: 8,
      marginBottom: 8,
      backgroundColor: "#5cb0e7",
      borderRadius: 8,
      flex: 1,
      marginLeft: 10,
      marginRight: 15,
      padding: 5,
      justifyContent: "center",
    },
    textBoxView: {
      width: "93%",
      height: 48,
      borderColor: theme === "dark" ? "white" : "black",
      borderWidth: 1,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
      marginLeft: 10,
      gap: 8,
      marginBottom: 8,
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

  const [entry, setEntry] = useState("");

  const [records, setRecords] = useState([
    // {
    //   date: "21/2/2025",
    //   activity: "notes",
    //   entry: "Just venting. I had a long day at work and I feel like nothing I do is ever enough. My boss was short with me again. I didn’t say anything, but it’s eating at me. I don’t want to bring this home to my partner either, so I’m keeping it in."
    // },
    // {
    //   date: "20/2/2025",
    //   activity: "notes",
    //   entry: "Big meeting tomorrow. I’ve been second-guessing everything I’ve done this week. I keep worrying I’m not good enough or I’ll mess up."
    // },
    // {
    //   date: "19/2/2025",
    //   activity: "chatbot",
    //   entry: "User told chatbot that they are okay, but tired and unmotivated. They also didn’t sleep well last night, had a lot to do but can’t seem to start any."
    // },
  ]);

  const addNewRecord = async () => {
    if (entry.trim() === '') return;

    const now = new Date();
    const date = now.toLocaleDateString();

    const newItem = { date: date, activity: "notes", entry: entry };

    // Create new array first
    const updatedRecords = [newItem, ...records];

    // Set state
    setRecords(updatedRecords);

    await writeToFile(updatedRecords);
    setEntry(''); // clear input
  };

  const fileUri = FileSystem.documentDirectory + 'myData.txt';

  const writeToFile = async (dataArray) => {
    try {
      const jsonString = JSON.stringify(dataArray, null, 2); // readable formatting

      await FileSystem.writeAsStringAsync(fileUri, jsonString, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      console.log('Saved to:', fileUri);
    } catch (error) {
      console.error('Failed to save file:', error);
    }
  };

  const clearFile = async () => {
    await FileSystem.deleteAsync(fileUri);
  }

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const content = await FileSystem.readAsStringAsync(fileUri);
          const parsed = JSON.parse(content);
          setRecords(parsed);
        } catch (error) {
          console.log('No file found or invalid content', error);
          setRecords([]);
        }
      };

      loadData();
    }, [])
  );

  return (
    <ThemedView>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, marginTop: 15 }}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Home</Text>
          </View>
          <View style={{ marginVertical: 10 }}>
            <View style={styles.textBoxView}>
              <TextInput placeholder="How are you feeling today?"
                value={entry}
                style={{ marginLeft: 10, width: "80%", color: theme === "dark" ? "white" : "black" }}
                placeholderTextColor={theme === "dark" ? "white" : "grey"}
                onChangeText={setEntry} />
              <TouchableOpacity
                onPress={addNewRecord}
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                  paddingHorizontal: 10,
                  height: '100%',
                  justifyContent: 'center',
                  borderTopRightRadius: 8,
                  borderBottomRightRadius: 8,
                }}
              >
                <IconSymbol size={28} name="paperplane.fill" color={theme === "dark" ? "white" : "black"} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.logContainer}>
            <Text style={{ color: "black", fontSize: 24, fontWeight: "bold", marginTop: 5, textAlign: "center" }}>Log</Text>
            <FlatList
              style={{ flex: 1 }}
              contentContainerStyle={{ flexGrow: 1 }}
              data={records}
              renderItem={({ item, index }) => (
                <View key={index} style={styles.historyBubble}>
                  {
                    item.activity === "notes" ? (
                      <FontAwesome6 name="pencil" size={30} style={{ marginTop: 4 }} />
                    ) : (
                      <MaterialCommunityIcons name="robot-outline" size={30} style={{ marginTop: 4 }} />
                    )
                  }
                  <View style={{ flexDirection: "column" }}>
                    <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>{item.date}</Text>
                    <Text style={{ color: "black", fontSize: 14, fontWeight: "bold" }}>{item.activity === "notes" ? "Wrote Notes" : "Talked to Chatbot"}</Text>
                  </View>
                </View>
              )}
              keyExtractor={(_, index) => index.toString()}
            />
          </View>
        </View>
      </SafeAreaView>
    </ThemedView>
  );
}
