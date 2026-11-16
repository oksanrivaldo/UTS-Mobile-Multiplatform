
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import productsData from './src/data/products';
import DashboardScreen from './src/screens/DashboardScreen';
import ProductScreen from './src/screens/ProductScreen';
import TransactionScreen from './src/screens/TransactionScreen';
import ReportScreen from './src/screens/ReportScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [lastUpdate, setLastUpdate] = useState('-');

  // Menghitung jumlah produk dalam keranjang
  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Memperbarui informasi transaksi menggunakan useEffect
  useEffect(() => {
    if (transactions.length > 0) {
      setLastUpdate(new Date().toLocaleString('id-ID'));
    }
  }, [transactions]);

  // Menambahkan produk ke keranjang
  const addToCart = (product) => {
    if (product.stock <= 0) {
      Alert.alert('Stok Habis', 'Produk ini tidak tersedia.');
      return;
    }

    const existingItem = cart.find(
      (item) => item.id === product.id
    );

    if (existingItem && existingItem.quantity >= product.stock) {
      Alert.alert('Stok Tidak Cukup', 'Jumlah melebihi stok.');
      return;
    }

    setCart((previousCart) => {
      const found = previousCart.find(
        (item) => item.id === product.id
      );

      if (found) {
        return previousCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previousCart, { ...product, quantity: 1 }];
    });
  };

  // Mengubah jumlah produk dalam keranjang
  const changeQuantity = (id, amount) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Menghitung total pembayaran
  const totalPayment = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Menyelesaikan transaksi
  const checkout = () => {
    if (cart.length === 0) {
      Alert.alert('Keranjang Kosong', 'Tambahkan produk terlebih dahulu.');
      return;
    }

    const transaction = {
      id: Date.now().toString(),
      items: cart,
      total: totalPayment,
      date: new Date().toLocaleString('id-ID'),
    };

    setTransactions((previous) => [transaction, ...previous]);

    setProducts((previousProducts) =>
      previousProducts.map((product) => {
        const purchased = cart.find(
          (item) => item.id === product.id
        );

        return purchased
          ? { ...product, stock: product.stock - purchased.quantity }
          : product;
      })
    );

    setCart([]);

    Alert.alert(
      'Transaksi Berhasil!',
      `Total pembayaran: Rp ${totalPayment.toLocaleString('id-ID')}`
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: '#193B68',
          tabBarInactiveTintColor: '#8992A3',
          tabBarStyle: {
            height: 65,
            paddingBottom: 8,
            paddingTop: 8,
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E6EAF0',
          },
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Dashboard: 'home-outline',
              Produk: 'cube-outline',
              Transaksi: 'cart-outline',
              Laporan: 'bar-chart-outline',
            };

            return (
              <Ionicons
                name={icons[route.name]}
                size={size}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen name="Dashboard">
          {() => (
            <DashboardScreen
              products={products}
              transactions={transactions}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Produk">
          {() => (
            <ProductScreen
              products={products}
              onAdd={addToCart}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Transaksi"
          options={{
            tabBarBadge: cartCount > 0 ? cartCount : undefined,
          }}
        >
          {() => (
            <TransactionScreen
              products={products}
              cart={cart}
              onAdd={addToCart}
              onChangeQuantity={changeQuantity}
              total={totalPayment}
              onCheckout={checkout}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Laporan">
          {() => (
            <ReportScreen
              transactions={transactions}
              lastUpdate={lastUpdate}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
