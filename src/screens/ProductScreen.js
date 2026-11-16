
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export default function ProductScreen({ products, onAdd }) {
  return (
    <ScrollView style={styles.container}>
      <Header
        title="Daftar Produk"
        subtitle="Pilih produk untuk transaksi"
      />

      <Text style={styles.heading}>
        Semua Produk ({products.length})
      </Text>

      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F5F9',
    padding: 20,
    paddingTop: 55,
  },
  heading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#101524',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
