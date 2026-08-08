import React from "react";
import { View, Text, TextInput } from "react-native";
import { useState } from "react";
import { Button } from "react-native";
export default function StudentForm(){
    const[Username,setUsername]=useState("")
    const[password,setPassword]=useState("")
    function handleLogin(){
        alert("Login successfull")
    }
    return(
        <View>
            <Text>
                Username:
            </Text>
            <TextInput 
             placeholder="enter...."
             value={Username}
             onChangeText={setUsername}
            />
            <Text>
                Password:
            </Text>
            <TextInput 
             placeholder="enter...."
             value={password}
             onChangeText={setPassword}
            />
            <Text>Username:{Username}</Text>
            <Text>Password:{password}</Text>
            <Button
            title="login"
            onPress={handleLogin}
            />
        </View>
    )
}