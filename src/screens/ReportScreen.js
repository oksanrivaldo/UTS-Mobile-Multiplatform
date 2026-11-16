
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView
} from 'react-native';

import Header from '../components/Header';

export default function ReportScreen({ transactions, lastUpdate }) {
  const totalRevenue = transactions.reduce(
    (sum, item) => sum + item.total, 0
  );

  return (
    <ScrollView style={styles.container}>
      <Header
        title="Laporan Penjualan"
        subtitle="Riwayat transaksi tokomu"
      />

      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>
          Total Pendapatan
        </Text>

        <Text style={styles.revenue}>
          Rp {totalRevenue.toLocaleString('id-ID')}
        </Text>

        <Text style={styles.summaryText}>
          {transactions.length} transaksi berhasil
        </Text>
      </View>

      <Text style={styles.heading}>Riwayat Transaksi</Text>

      {transactions.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>
            Belum ada transaksi.
          </Text>
          <Text style={styles.emptySubtext}>
            Transaksi yang berhasil akan muncul di sini.
          </Text>
        </View>
      ) : (
        transactions.map((item) => (
          <View style={styles.transaction} key={item.id}>
            <View style={styles.topRow}>
              <Text style={styles.transactionTitle}>
                Transaksi #{item.id.slice(-6)}
              </Text>

              <Text style={styles.status}>Berhasil</Text>
            </View>

            <Text style={styles.date}>{item.date}</Text>

            <Text style={styles.items}>
              {item.items.map(
                (product) =>
                  `${product.name} (${product.quantity}x)`
              ).join(', ')}
            </Text>

            <Text style={styles.amount}>
              Rp {item.total.toLocaleString('id-ID')}
            </Text>
          </View>
        ))
      )}

      <Text style={styles.updated}>
        Pembaruan terakhir: {lastUpdate}
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
  summary: {
    backgroundColor: '#193B68',
    borderRadius: 17,
    padding: 21,
    marginBottom: 25,
  },
  summaryTitle: {
    color: '#DCE5F1',
    fontSize: 13,
  },
  revenue: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 25,
    marginVertical: 10,
  },
  summaryText: {
    color: '#DCE5F1',
    fontSize: 12,
  },
  heading: {
    fontSize: 17,
    color: '#101524',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  empty: {
    backgroundColor: '#FFFFFF',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
  },
  emptyText: {
    color: '#101524',
    fontWeight: 'bold',
  },
  emptySubtext: {
    color: '#8992A3',
    fontSize: 12,
    marginTop: 7,
    textAlign: 'center',
  },
  transaction: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionTitle: {
    color: '#101524',
    fontWeight: 'bold',
  },
  status: {
    color: '#16A36A',
    fontSize: 11,
    fontWeight: 'bold',
  },
  date: {
    color: '#8992A3',
    fontSize: 11,
    marginTop: 7,
  },
  items: {
    color: '#687386',
    fontSize: 12,
    marginTop: 10,
  },
  amount: {
    color: '#193B68',
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 12,
  },
  updated: {
    color: '#8992A3',
    textAlign: 'center',
    fontSize: 11,
    marginVertical: 20,
  },
});
