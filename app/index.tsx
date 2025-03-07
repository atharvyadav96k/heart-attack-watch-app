import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, TextInput, Button } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import axios from 'axios'

const { width } = Dimensions.get('window');
const height = 200;

const HeartbeatMonitor = () => {
  const [heartRate, setHeartRate] = useState(72); // Initial heart rate
  const [heartRatesHistory, setHeartRatesHistory] = useState([72]); // Store heart rates over time
  const [weight, setWeight] = useState('');
  const [heightInput, setHeightInput] = useState('');
  const [bmi, setBmi] = useState(null);
  const [healthStatus, setHealthStatus] = useState('');

  useEffect(() => {
    // Generate random heart rate every 2 seconds
    const interval = setInterval(async () => {
      const fetchHeartbeat = async (fPrintValue) => {
        try {
          const response = await axios.get('https://www.tejasswami.shop/bpm/1737205139712');
          return response.data.heartBPM;
        } catch (error) {
          console.error('Error fetching heartbeat:', error.response?.data || error.message);
        }
      };
      
      const newHeartRate = await fetchHeartbeat('1737205139712');
      setHeartRate(newHeartRate);

      setHeartRatesHistory((prev) => {
        const updatedHistory = [...prev, newHeartRate];
        // Keep only the last 20 heart rates
        if (updatedHistory.length > 20) {
          updatedHistory.shift(); // Remove the oldest heartbeat
        }
        return updatedHistory;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generatePath = () => {
    let path = '';
    const frequency = 4;

    // Loop over heartRatesHistory to create a continuous line graph of past heartbeats
    heartRatesHistory.forEach((rate, idx) => {
      const x = (idx / heartRatesHistory.length) * width; // Spacing each heartbeat across the screen
      const y = (1 - rate / 120) * height; // Invert the heart rate to plot it correctly on the Y axis
      path += idx === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
    });

    return path;
  };

  const calculateBmi = () => {
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(heightInput) / 100; // Convert height to meters
    if (weightNum > 0 && heightNum > 0) {
      const bmiValue = (weightNum / (heightNum * heightNum)).toFixed(2);
      setBmi(bmiValue);

      // Determine health status based on BMI
      let status = '';
      if (bmiValue < 18.5) status = 'Underweight';
      else if (bmiValue < 25) status = 'Normal (Healthy Weight)';
      else if (bmiValue < 30) status = 'Overweight';
      else if (bmiValue < 35) status = 'Obesity (Class 1)';
      else if (bmiValue < 40) status = 'Obesity (Class 2)';
      else status = 'Severe Obesity (Class 3)';

      setHealthStatus(status);
    } else {
      alert('Please enter valid weight and height!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Heartbeat Monitor */}
      <View style={styles.graphContainer}>
        <Svg height={height} width={width}>
          <Path
            d={generatePath()}
            fill="none"
            stroke="#00ff00"
            strokeWidth="2"
          />
        </Svg>
      </View>
      <Text style={styles.heartRateText}>💓 {heartRate} BPM</Text>

      {/* BMI Calculator */}
      <View style={styles.bmiContainer}>
        <Text style={styles.bmiTitle}>BMI Calculator</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter weight (kg)"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter height (cm)"
          keyboardType="numeric"
          value={heightInput}
          onChangeText={setHeightInput}
        />
        <Button title="Calculate BMI" onPress={calculateBmi} />
        {bmi && (
          <>
            <Text style={styles.bmiResult}>Your BMI: {bmi}</Text>
            <Text style={styles.healthStatus}>Health Status: {healthStatus}</Text>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  graphContainer: {
    height,
    width,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#444',
  },
  heartRateText: {
    marginTop: 20,
    fontSize: 32,
    color: '#00ff00',
    fontWeight: 'bold',
  },
  bmiContainer: {
    marginTop: 40,
    alignItems: 'center',
    width: '100%',
  },
  bmiTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#222',
  },
  bmiResult: {
    marginTop: 20,
    fontSize: 20,
    color: '#00ff00',
  },
  healthStatus: {
    marginTop: 10,
    fontSize: 18,
    color: '#00ff00',
  },
});

export default HeartbeatMonitor;