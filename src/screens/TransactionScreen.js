
import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity
} from 'react-native';

import Header from '../components/Header';
import ProductCard from '../components/ProductCard';

export default function TransactionScreen({
  products,
  cart,
  onAdd,
  onChangeQuantity,
  total,
  onCheckout
}) {
  return (
    <ScrollView style={styles.container}>
      <Header
        title="Transaksi"
        subtitle="Buat transaksi penjualan baru"
      />

      <Text style={styles.heading}>Pilih Produk</Text>

      <View style={styles.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={onAdd}
          />
        ))}
      </View>

      <View style={styles.cartBox}>
        <Text style={styles.heading}>Keranjang Belanja</Text>

        {cart.length === 0 ? (
          <Text style={styles.empty}>
            Belum ada produk yang dipilih.
          </Text>
        ) : (
          cart.map((item) => (
            <View style={styles.cartItem} key={item.id}>
              <View style={{ flex: 1 }}>
                <Text style={styles.productName}>
                  {item.name}
                </Text>
                <Text style={styles.price}>
                  Rp {item.price.toLocaleString('id-ID')}
                </Text>
                <Text style={styles.subtotal}>
                  Subtotal: Rp {(item.price * item.quantity)
                    .toLocaleString('id-ID')}
                </Text>
              </View>

              <View style={styles.quantity}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => onChangeQuantity(item.id, -1)}
                >
                  <Text style={styles.qtyText}>−</Text>
                </TouchableOpacity>

                <Text style={styles.qtyNumber}>
                  {item.quantity}
                </Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => onChangeQuantity(item.id, 1)}
                  disabled={
                    item.quantity >=
                    products.find((p) => p.id === item.id).stock
                  }
                >
                  <Text style={styles.qtyText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        <View style={styles.divider} />

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Pembayaran</Text>
          <Text style={styles.totalValue}>
            Rp {total.toLocaleString('id-ID')}
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.checkoutButton,
            cart.length === 0 && styles.disabled
          ]}
          onPress={onCheckout}
        >
          <Text style={styles.checkoutText}>
            Selesaikan Pembayaran
          </Text>
        </TouchableOpacity>
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
    fontSize: 17,
    fontWeight: 'bold',
    color: '#101524',
    marginBottom: 15,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cartBox: {
    backgroundColor: '#FFFFFF',
    padding: 17,
    borderRadius: 17,
    marginTop: 8,
    marginBottom: 25,
  },
  empty: {
    textAlign: 'center',
    color: '#8992A3',
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF0F4',
  },
  productName: {
    fontWeight: 'bold',
    color: '#101524',
  },
  price: {
    color: '#8992A3',
    fontSize: 12,
    marginTop: 4,
  },
  subtotal: {
    color: '#193B68',
    fontSize: 12,
    marginTop: 4,
  },
  quantity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    backgroundColor: '#EAF0F8',
    width: 29,
    height: 29,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    color: '#193B68',
    fontSize: 19,
    fontWeight: 'bold',
  },
  qtyNumber: {
    fontWeight: 'bold',
    color: '#101524',
  },
  divider: {
    height: 1,
    backgroundColor: '#E6EAF0',
    marginVertical: 17,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 17,
  },
  totalLabel: {
    color: '#101524',
    fontWeight: 'bold',
  },
  totalValue: {
    color: '#193B68',
    fontSize: 16,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#193B68',
    padding: 15,
    borderRadius: 11,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  disabled: {
    opacity: 0.5,
  },
});
