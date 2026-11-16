
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header({ title, subtitle }) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.logo}>
        <Text style={styles.logoText}>DS</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 22,
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#101524',
  },
  subtitle: {
    color: '#8992A3',
    marginTop: 5,
    fontSize: 13,
  },
  logo: {
    width: 45,
    height: 45,
    borderRadius: 14,
    backgroundColor: '#193B68',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});
