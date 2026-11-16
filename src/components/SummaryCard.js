
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SummaryCard({ title, value, icon, color }) {
  return (
    <View style={styles.card}>
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <MaterialCommunityIcons
          name={icon}
          size={25}
          color="#FFFFFF"
        />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    flex: 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  iconBox: {
    width: 43,
    height: 43,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 13,
  },
  title: {
    fontSize: 12,
    color: '#8992A3',
  },
  value: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#101524',
    marginTop: 5,
  },
});
