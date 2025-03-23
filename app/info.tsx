import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Info() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚨 Emergency Actions for Heart Attack 🚨</Text>

      <Text style={styles.step}>1️⃣ CALL EMERGENCY SERVICES (911 / 108)</Text>
      <Text style={styles.detail}>- Get medical help immediately.</Text>
      <Text style={styles.detail}>- Every second counts in a heart attack!</Text>

      <Text style={styles.step}>2️⃣ HELP THEM SIT & STAY CALM</Text>
      <Text style={styles.detail}>- Make them sit in a comfortable position (semi-reclining).</Text>
      <Text style={styles.detail}>- Keep them calm and reassured to reduce stress.</Text>

      <Text style={styles.step}>3️⃣ LOOSEN TIGHT CLOTHING</Text>
      <Text style={styles.detail}>- Loosen belts, ties, or shirts to help breathing.</Text>

      <Text style={styles.step}>4️⃣ GIVE ASPIRIN (IF AVAILABLE & NO ALLERGY)</Text>
      <Text style={styles.detail}>- Dosage: 300 mg uncoated aspirin (chew it, don’t swallow whole).</Text>
      <Text style={styles.detail}>- This helps thin the blood and prevent further blockage.</Text>

      <Text style={styles.step}>5️⃣ GIVE NITROGLYCERIN (ONLY IF PRESCRIBED)</Text>
      <Text style={styles.detail}>- If the person has Nitroglycerin, let them take it.</Text>
      <Text style={styles.warning}>⚠ DO NOT give if not prescribed!</Text>

      <Text style={styles.step}>6️⃣ CHECK FOR CONSCIOUSNESS</Text>
      <Text style={styles.detail}>- If they stop responding, shake them gently and call their name.</Text>

      <Text style={styles.step}>7️⃣ PERFORM CPR (IF UNCONSCIOUS & NO PULSE)</Text>
      <Text style={styles.detail}>- Lay them flat on the ground.</Text>
      <Text style={styles.detail}>- Chest Compressions:</Text>
      <Text style={styles.detail}>  - Push hard & fast in the center of the chest (2 inches deep).</Text>
      <Text style={styles.detail}>  - 100-120 compressions per minute (use the rhythm of "Stayin' Alive").</Text>
      <Text style={styles.detail}>- Rescue Breaths (if trained): Give 2 breaths after 30 compressions.</Text>

      <Text style={styles.step}>8️⃣ USE AN AED (IF AVAILABLE)</Text>
      <Text style={styles.detail}>- An Automated External Defibrillator (AED) can restart the heart.</Text>
      <Text style={styles.detail}>- Follow the voice instructions on the AED.</Text>

      <Text style={styles.warningTitle}>❌ WHAT NOT TO DO ❌</Text>
      <Text style={styles.warning}>🚫 Don’t give food or drink.</Text>
      <Text style={styles.warning}>🚫 Don’t let them move too much.</Text>
      <Text style={styles.warning}>🚫 Don’t ignore mild chest pain—always seek medical help!</Text>

      <Text style={styles.footer}>🚑 ACT FAST—EVERY MINUTE MATTERS! 🚑</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, backgroundColor: '#000' },
  title: { fontSize: 24, color: '#ff4444', fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  step: { fontSize: 18, color: '#00ffcc', fontWeight: 'bold', marginTop: 15 },
  detail: { fontSize: 16, color: '#fff', marginLeft: 10, marginBottom: 5 },
  warningTitle: { fontSize: 20, color: '#ffcc00', fontWeight: 'bold', marginTop: 20 },
  warning: { fontSize: 16, color: '#ffcc00', marginLeft: 10, marginBottom: 5 },
  footer: { fontSize: 18, color: '#00ffcc', fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
});
