import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView, TouchableOpacity } from "react-native";

export default function HeartAttackForm() {
  const [formData, setFormData] = useState({
    sex: "", // 0 for Male, 1 for Female
    totalCholesterol: "",
    age: "",
    cigarettesPerDay: "",
    diabetes: "", // 0 for No, 1 for Yes
    weight: "",
    height: "",
    bmi: "",
  });

  const [emailData, setEmailData] = useState({
    email1: "",
    email2: "",
    email3: "",
  });

  const fPrint = "1737205139712"; // Auto-filled fingerprint

  const handleChange = (key, value) => {
    setFormData((prev) => {
      const updatedData = { ...prev, [key]: value };

      if (updatedData.weight && updatedData.height) {
        const weight = parseFloat(updatedData.weight);
        const height = parseFloat(updatedData.height) / 100; // Convert cm to meters
        if (weight > 0 && height > 0) {
          updatedData.bmi = (weight / (height * height)).toFixed(2);
        } else {
          updatedData.bmi = "";
        }
      }

      return updatedData;
    });
  };

  const handleEmailChange = (key, value) => {
    setEmailData({ ...emailData, [key]: value });
  };

  const handleSubmit = async () => {
    if (!formData.sex || !formData.age || !formData.totalCholesterol) {
      Alert.alert("Error", "Please fill in all required fields!");
      return;
    }

    const { weight, height, ...submitData } = formData; // Exclude weight & height from submission
    try {
      const response = await fetch(`https://www.tejasswami.shop/param/${fPrint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });
      if (response.ok) {
        Alert.alert("Success", "Parameters submitted successfully!");
      } else {
        Alert.alert("Error", "Failed to submit parameters");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await fetch("https://www.tejasswami.shop/fingerPrints/addMails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...emailData, fPrint }),
      });
      if (response.ok) {
        Alert.alert("Success", "Emails submitted successfully!");
      } else {
        Alert.alert("Error", "Failed to submit emails");
      }
    } catch (error) {
      console.error("Error submitting emails:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      {/* Heart Attack Parameters Form */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>Heart Attack Prediction</Text>

      {/* Sex Selection */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Sex</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => handleChange("sex", "1")}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: formData.sex === "1" ? "blue" : "#ddd",
            alignItems: "center",
            borderRadius: 5,
            marginRight: 5,
          }}
        >
          <Text style={{ color: formData.sex === "1" ? "white" : "black" }}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChange("sex", "2")}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: formData.sex === "2" ? "blue" : "#ddd",
            alignItems: "center",
            borderRadius: 5,
            marginLeft: 5,
          }}
        >
          <Text style={{ color: formData.sex === "2" ? "white" : "black" }}>Female</Text>
        </TouchableOpacity>
      </View>

      {/* Diabetes Selection */}
      <Text style={{ fontSize: 16, marginBottom: 5 }}>Diabetes</Text>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TouchableOpacity
          onPress={() => handleChange("diabetes", "0")}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: formData.diabetes === "0" ? "blue" : "#ddd",
            alignItems: "center",
            borderRadius: 5,
            marginRight: 5,
          }}
        >
          <Text style={{ color: formData.diabetes === "0" ? "white" : "black" }}>No</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleChange("diabetes", "1")}
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: formData.diabetes === "1" ? "blue" : "#ddd",
            alignItems: "center",
            borderRadius: 5,
            marginLeft: 5,
          }}
        >
          <Text style={{ color: formData.diabetes === "1" ? "white" : "black" }}>Yes</Text>
        </TouchableOpacity>
      </View>

      {["totalCholesterol", "age", "cigarettesPerDay", "weight", "height"].map((key) => (
        <View key={key} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16 }}>{key.replace(/([A-Z])/g, " $1")}</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 }}
            value={formData[key]}
            onChangeText={(value) => handleChange(key, value)}
            placeholder={`Enter ${key}`}
            keyboardType="numeric"
          />
        </View>
      ))}

      {/* BMI (Auto-calculated) */}
      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16 }}>BMI (Auto Calculated)</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5, backgroundColor: "#f0f0f0" }}
          value={formData.bmi}
          editable={false}
        />
      </View>

      <Button title="Submit Parameters" onPress={handleSubmit} color="blue" />

      {/* Email Form */}
      <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 20 }}>Enter Emails</Text>
      {["email1", "email2", "email3"].map((key) => (
        <View key={key} style={{ marginBottom: 10 }}>
          <Text style={{ fontSize: 16 }}>{key.replace(/([A-Z])/g, " $1")}</Text>
          <TextInput
            style={{ borderWidth: 1, borderColor: "#ccc", padding: 10, borderRadius: 5 }}
            value={emailData[key]}
            onChangeText={(value) => handleEmailChange(key, value)}
            placeholder={`Enter ${key}`}
            keyboardType="email-address"
          />
        </View>
      ))}

      <Button title="Submit Emails" onPress={handleEmailSubmit} color="green" />
    </ScrollView>
  );
}
