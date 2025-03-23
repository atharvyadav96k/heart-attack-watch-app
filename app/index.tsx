import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, ScrollView } from 'react-native';
import Svg, { Path, Line, Text as SvgText } from 'react-native-svg';
import axios from 'axios';

const { width } = Dimensions.get('window');
const height = 200;

const HeartbeatMonitor = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [heartRatesHistory, setHeartRatesHistory] = useState([72]);
  const [paramData, setParamData] = useState(null);
  const [emails, setEmails] = useState([]); // State for storing emails

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await axios.get('https://www.tejasswami.shop/bpm/1737205139712');
        console.log(response.data);

        setHeartRate(response.data.heartBPM);
        setParamData(response.data.param);
        setEmails(response.data.email || []); // Store emails in state

        setHeartRatesHistory((prev) => {
          const updatedHistory = [...prev, response.data.heartBPM];
          if (updatedHistory.length > 20) {
            updatedHistory.shift();
          }
          return updatedHistory;
        });
      } catch (error) {
        console.error('Error fetching heartbeat:', error.response?.data || error.message);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const generatePath = () => {
    if (heartRatesHistory.length < 2) return '';
    let path = '';
    heartRatesHistory.forEach((rate, idx) => {
      const x = (idx / (heartRatesHistory.length - 1)) * width;
      const y = height - ((rate - 50) / 70) * height;
      path += idx === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
    });
    return path;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>💓 Live Heartbeat Monitor</Text>
      <View style={styles.graphContainer}>
        <Svg height={height} width={width}>
          {[50, 70, 90, 110, 130].map((bpm, index) => {
            const y = height - ((bpm - 50) / 80) * height;
            return (
              <React.Fragment key={index}>
                <Line x1="0" y1={y} x2={width} y2={y} stroke="#444" strokeWidth="1" />
                <SvgText x="5" y={y - 5} fill="#fff" fontSize="12">{bpm}</SvgText>
              </React.Fragment>
            );
          })}
          <Path d={generatePath()} fill="none" stroke="#00ff00" strokeWidth="2" />
        </Svg>
      </View>
      <Text style={styles.heartRateText}>{heartRate} BPM</Text>

      {paramData && (
        <View style={styles.paramContainer}>
          <Text style={styles.paramTitle}>📊 User Parameters</Text>
          {Object.entries(paramData).map(([key, value]) => {
            let displayValue = value;

            if (key.toLowerCase() === 'sex') {
              displayValue = value === 1 ? 'Male' : 'Female';
            } else if (key.toLowerCase() === 'diabetes') {
              displayValue = value === 0 ? 'No' : 'Yes';
            }

            return (
              <View key={key} style={styles.paramItem}>
                <Text style={styles.paramKey}>{key}:</Text>
                <Text style={styles.paramValue}>{displayValue}</Text>
              </View>
            );
          })}
        </View>
      )}

      {/* Display Emails */}
      {emails.length > 0 && (
        <View style={styles.emailContainer}>
          <Text style={styles.emailTitle}>📧 Associated Emails</Text>
          {emails.map((email, index) => (
            <Text key={index} style={styles.emailText}>{email}</Text>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#00ffcc',
    marginBottom: 15,
  },
  graphContainer: {
    height,
    width,
    backgroundColor: '#1a1a1a',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#444',
    marginBottom: 20,
  },
  heartRateText: {
    fontSize: 36,
    color: '#00ff00',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paramContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  paramTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 10,
  },
  paramItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  paramKey: {
    fontSize: 16,
    color: '#bbb',
  },
  paramValue: {
    fontSize: 16,
    color: '#00ff00',
    fontWeight: 'bold',
  },
  emailContainer: {
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    marginBottom: 20,
  },
  emailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00ffcc',
    textAlign: 'center',
    marginBottom: 10,
  },
  emailText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
});

export default HeartbeatMonitor;
