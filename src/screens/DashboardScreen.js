
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native';

import Header from '../components/Header';
import SummaryCard from '../components/SummaryCard';

export default function DashboardScreen({ products, transactions }) {
  const revenue = transactions.reduce(
    (sum, item) => sum + item.total, 0
  );

  const sold = transactions.reduce(
    (sum, transaction) =>
      sum + transaction.items.reduce(
        (total, item) => total + item.quantity, 0
      ), 0
  );

  return (
    <ScrollView style={styles.container}>
      <Header
        title="Dashboard"
        subtitle="Selamat datang di Kasir Dititik Sudut"
      />

      <View style={styles.welcome}>
        <Text style={styles.welcomeTitle}>Kelola Toko Lebih Mudah!</Text>
        <Text style={styles.welcomeText}>
          Pantau penjualan dan aktivitas tokomu hari ini.
        </Text>
      </View>

      <Text style={styles.heading}>Ringkasan Toko</Text>

      <View style={styles.row}>
        <SummaryCard
          title="Total Produk"
          value={products.length.toString()}
          icon="package-variant"
          color="#193B68"
        />

        <SummaryCard
          title="Transaksi"
          value={transactions.length.toString()}
          icon="receipt"
          color="#16A36A"
        />
      </View>

      <View style={styles.row}>
        <SummaryCard
          title="Barang Terjual"
          value={sold.toString()}
          icon="shopping"
          color="#E69B25"
        />

        <SummaryCard
          title="Pendapatan"
          value={`Rp ${revenue.toLocaleString('id-ID')}`}
          icon="wallet"
          color="#7357B8"
        />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoTitle}>Informasi Toko</Text>
        <Text style={styles.infoText}>Nama: Kasir Dititik Sudut</Text>
        <Text style={styles.infoText}>Status: Aktif</Text>
        <Text style={styles.infoText}>Sistem: Point of Sale</Text>
      </View>

      <Text style={styles.footer}>
        Kasir Dititik Sudut © 2026
      </Text>
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
  welcome: {
    backgroundColor: '#193B68',
    borderRadius: 18,
    padding: 20,
    marginBottom: 24,
  },
  welcomeTitle: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  welcomeText: {
    color: '#DCE5F1',
    marginTop: 8,
    fontSize: 13,
  },
  heading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#101524',
    marginBottom: 13,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
  },
  info: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 18,
    marginTop: 12,
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 12,
    color: '#101524',
  },
  infoText: {
    color: '#687386',
    marginBottom: 8,
    fontSize: 13,
  },
  footer: {
    textAlign: 'center',
    color: '#8992A3',
    marginVertical: 25,
    fontSize: 12,
  },
});
