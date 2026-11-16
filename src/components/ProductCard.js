
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProductCard({ product, onAdd }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <MaterialCommunityIcons
          name="package-variant"
          size={30}
          color="#193B68"
        />
      </View>

      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.category}>{product.category}</Text>

      <Text style={styles.price}>
        Rp {product.price.toLocaleString('id-ID')}
      </Text>

      <Text style={styles.stock}>
        Stok: {product.stock}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onAdd(product)}
      >
        <Text style={styles.buttonText}>+ Tambah</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 13,
    borderRadius: 15,
    marginBottom: 13,
  },
  iconBox: {
    backgroundColor: '#EAF0F8',
    width: 55,
    height: 55,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontWeight: 'bold',
    color: '#101524',
    fontSize: 14,
  },
  category: {
    fontSize: 11,
    color: '#8992A3',
    marginTop: 4,
  },
  price: {
    color: '#193B68',
    fontWeight: 'bold',
    fontSize: 14,
    marginTop: 10,
  },
  stock: {
    color: '#8992A3',
    fontSize: 11,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#193B68',
    padding: 9,
    borderRadius: 9,
    alignItems: 'center',
    marginTop: 12,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
