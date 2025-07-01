import { IconSymbol } from '@/components/ui/IconSymbol';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@/contexts/ThemeContext';

import * as FileSystem from 'expo-file-system';

export default function ChatbotScreen() {
  const { theme, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    message: { padding: 10, marginBottom: 10, marginLeft: 5, borderRadius: 8 },
    userMessage: {
      backgroundColor: '#5cb0e7',
    },
    botMessage: {
      backgroundColor: '#f1f1f1',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      backgroundColor: theme === 'dark' ? 'black' : 'white',
      minHeight: 150, // Ensure visibility
    },
    input: {
      flex: 1,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 3,
      color: theme === "dark" ? "white" : "black",
      padding: 10,
      marginLeft: 5,
      marginRight: 10,
      marginBottom: 3,
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

  const emotionIcons = {
    happy: <MaterialCommunityIcons name="robot-happy" size={24} color={theme === "dark" ? "white" : "black"} />,
    sad: <MaterialCommunityIcons name="robot-dead" size={24} color={theme === "dark" ? "white" : "black"} />,
    angry: <MaterialCommunityIcons name="robot-angry" size={24} color={theme === "dark" ? "white" : "black"} />,
    surprised: <MaterialCommunityIcons name="robot-confused" size={24} color={theme === "dark" ? "white" : "black"} />,
    neutral: <MaterialCommunityIcons name="robot" size={24} color={theme === "dark" ? "white" : "black"} />, // default
  };

  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you today?', id: '1', sender: 'bot', emotion: "neutral" },
  ]);
  const [input, setInput] = useState('');
  const [records, setRecords] = useState([]);

  const sendMessage = async () => {
    if (input === "") return;

    const userMessage = {
      text: input,
      id: Math.random().toString(),
      sender: 'user',
      emotion: "none"
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botReply = {
        text: `You said: ${input}`,
        id: Math.random().toString(),
        sender: 'bot',
        emotion: "happy"
      };
      setMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1000);

    setInput('');
    await addNewRecord();
  };

  const addNewRecord = async () => {
    const now = new Date();
    const date = now.toLocaleDateString();

    const newItem = { date: date, activity: "chatbot", entry: "This is a summary of a chatbot log" };

    // Create new array first
    const updatedRecords = [newItem, ...records];

    // Set state
    setRecords(updatedRecords);

    await writeToFile(updatedRecords);
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

      setMessages([
        { text: 'Hello! How can I help you today?', id: '1', sender: 'bot', emotion: "neutral" },
      ]);
      setInput("");
      loadData();
    }, [])
  );

  return (
    <ThemedView>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? -50 : 0} // Adjust as needed for tab bar
        >
          <View style={{ flex: 1 }}>
            {/* Header */}
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Chatbot</Text>
            </View>

            {/* Chat Messages */}
            <FlatList
              data={messages}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View
                  style={{
                    flexDirection: "row",
                    marginRight: 10,
                    alignSelf: item.sender === "user" ? "flex-end" : "flex-start"
                  }}
                >
                  {item.sender === "bot" && (
                    <View style={{ marginTop: 7, marginLeft: 5 }}>
                      {emotionIcons[item.emotion || "neutral"]}
                    </View>
                  )}
                  <View
                    style={[
                      styles.message,
                      item.sender === "user" ? styles.userMessage : styles.botMessage
                    ]}
                  >
                    <Text>{item.text}</Text>
                  </View>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 80 }} // leaves space for input
              style={{ flex: 1 }}
            />

            {/* Robot avatar */}
            <View style={{
              position: 'absolute',
              bottom: 100, // adjust to match input bar height
              right: 16,
              zIndex: 1,
            }}>
              <Image
                source={require('@/assets/images/robot-avatar.png')}
                style={{ width: 100, height: 100 }}
              />
            </View>

            {/* Input bar */}
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Type your message"
                placeholderTextColor={theme === "dark" ? "white" : "grey"}
              />
              <TouchableOpacity
                onPress={sendMessage}
                style={{
                  backgroundColor: theme === "dark" ? "black" : "white",
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                }}
              >
                <IconSymbol size={28} name="paperplane.fill" color={theme === "dark" ? "white" : "black"} />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ThemedView>
  );
}
