import React, { useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Badge from "../components/shared/Badge";
import Btn from "../components/shared/Btn";
import Card from "../components/shared/Card";
import FormField from "../components/shared/FormField";
import Modal from "../components/shared/Modal";
import Select from "../components/shared/Select";
import StatCard from "../components/shared/StatCard";
import { C } from "../constants/colors";
import { MEMBERS, Product, PRODUCTS, Role } from "../constants/mockData";

interface ProductsProps {
  role: Role;
}

const CATEGORY_ICONS: Record<string, string> = {
  Nutrition: "🥤",
  Equipment: "🏋️",
  Accessories: "🧤",
};

const CATEGORY_OPTIONS = [
  { value: "Nutrition", label: "Nutrition" },
  { value: "Equipment", label: "Équipement" },
  { value: "Accessories", label: "Accessoires" },
];

const MEMBER_OPTIONS = [
  { value: "", label: "Client de passage" },
  ...MEMBERS.map((m) => ({ value: m.name, label: m.name })),
];

export default function Products({ role }: ProductsProps) {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [showSell, setShowSell] = useState<Product | null>(null);
  const [qty, setQty] = useState("1");
  const [sellMember, setSellMember] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "Nutrition",
  });

  const filtered = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const totalRevenue = PRODUCTS.reduce((sum, p) => sum + p.price * p.sold, 0);
  const bestSeller = PRODUCTS.reduce((a, b) => (a.sold > b.sold ? a : b));
  const outOfStock = PRODUCTS.filter((p) => p.stock === 0).length;

  const openAdd = () => {
    setEditProduct(null);
    setForm({ name: "", price: "", stock: "", category: "Nutrition" });
    setShowModal(true);
  };

  const openEdit = (p: Product) => {
    setEditProduct(p);
    setForm({
      name: p.name,
      price: String(p.price),
      stock: String(p.stock),
      category: p.category,
    });
    setShowModal(true);
  };

  const openSell = (p: Product) => {
    setShowSell(p);
    setQty("1");
    setSellMember("");
  };

  const total = showSell ? showSell.price * (parseInt(qty) || 1) : 0;

  const renderProduct = ({ item }: { item: Product }) => {
    const stockPct = Math.min((item.stock / 50) * 100, 100);
    const stockColor =
      item.stock === 0 ? C.danger : item.stock < 10 ? C.warning : C.success;

    return (
      <Card style={s.productCard}>
        {/* Product header */}
        <View style={s.productHeader}>
          <View style={{ flex: 1 }}>
            <Text style={s.productName} numberOfLines={2}>
              {item.name}
            </Text>
            <View style={{ marginTop: 6 }}>
              <Badge status={item.category} />
            </View>
          </View>
          <View style={s.productIconBox}>
            <Text style={{ fontSize: 22 }}>
              {CATEGORY_ICONS[item.category]}
            </Text>
          </View>
        </View>

        {/* Stats grid */}
        <View style={s.statsGrid}>
          {[
            { label: "Prix", value: `${item.price.toLocaleString()} TND` },
            {
              label: "Stock",
              value:
                item.stock === 0 ? "Rupture de stock" : `${item.stock} unités`,
              danger: item.stock === 0,
            },
            { label: "Unités vendues", value: String(item.sold) },
            {
              label: "Revenu",
              value: `${((item.price * item.sold) / 1000).toFixed(1)}K TND`,
            },
          ].map((stat) => (
            <View key={stat.label} style={s.statBox}>
              <Text style={s.statLabel}>{stat.label}</Text>
              <Text style={[s.statValue, stat.danger && { color: C.danger }]}>
                {stat.value}
              </Text>
            </View>
          ))}
        </View>

        {/* Stock bar */}
        <View style={s.stockSection}>
          <View style={s.stockTrack}>
            <View
              style={[
                s.stockBar,
                { width: `${stockPct}%` as any, backgroundColor: stockColor },
              ]}
            />
          </View>
          <Text style={s.stockLabel}>Niveau de stock</Text>
        </View>

        {/* Actions */}
        <View style={s.productActions}>
          <Btn
            small
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => openSell(item)}
          >
            💳 Vendre
          </Btn>
          {role === "admin" && (
            <>
              <Btn
                small
                variant="secondary"
                style={{ marginLeft: 8 }}
                onPress={() => openEdit(item)}
              >
                Modifier
              </Btn>
              <Btn small variant="danger" style={{ marginLeft: 6 }}>
                Suppr
              </Btn>
            </>
          )}
        </View>
      </Card>
    );
  };

  return (
    <ScrollView
      style={s.root}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={s.content}
    >
      {/* Header */}
      <View style={s.pageHeader}>
        <View>
          <Text style={s.pageTitle}>Produits & Ventes</Text>
          <Text style={s.pageSub}>{PRODUCTS.length} produits</Text>
        </View>
        {role === "admin" && <Btn onPress={openAdd}>＋ Ajouter un produit</Btn>}
      </View>

      {/* Stat cards */}
      <View style={s.statsRow}>
        <StatCard
          icon="📦"
          label="Produits"
          value={String(PRODUCTS.length)}
          color={C.accent}
        />
        <View style={{ width: 10 }} />
        <StatCard
          icon="💵"
          label="Revenu"
          value={`${(totalRevenue / 1000).toFixed(0)}K TND`}
          color={C.success}
        />
      </View>
      <View style={[s.statsRow, { marginTop: 10, marginBottom: 16 }]}>
        <StatCard
          icon="🏆"
          label="Meilleure vente"
          value={bestSeller.name}
          sub={`${bestSeller.sold} vendus`}
          color={C.gold}
        />
        <View style={{ width: 10 }} />
        <StatCard
          icon="🚫"
          label="Rupture de stock"
          value={String(outOfStock)}
          color={C.danger}
        />
      </View>

      {/* Search */}
      <View style={s.searchBox}>
        <Text style={{ fontSize: 14 }}>🔍</Text>
        <TextInput
          style={s.searchInput}
          placeholder="Rechercher des produits..."
          placeholderTextColor={C.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Product grid — 2 columns */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        scrollEnabled={false}
        ListEmptyComponent={
          <View style={s.emptyBox}>
            <Text style={s.emptyText}>Aucun produit trouvé</Text>
          </View>
        }
      />

      {/* Add / Edit Modal */}
      <Modal
        title={editProduct ? "Modifier le produit" : "Ajouter un produit"}
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <FormField label="Nom du produit">
          <TextInput
            style={s.modalInput}
            placeholder="ex : Whey Protein 1kg"
            placeholderTextColor={C.textMuted}
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />
        </FormField>
        <FormField label="Catégorie">
          <Select
            value={form.category}
            onChange={(v) => setForm({ ...form, category: v })}
            options={CATEGORY_OPTIONS}
            placeholder="Sélectionner une catégorie"
          />
        </FormField>
        <View style={s.twoCol}>
          <FormField label="Prix (TND)" style={{ flex: 1 }}>
            <TextInput
              style={s.modalInput}
              placeholder="4500"
              placeholderTextColor={C.textMuted}
              keyboardType="numeric"
              value={form.price}
              onChangeText={(v) => setForm({ ...form, price: v })}
            />
          </FormField>
          <View style={{ width: 12 }} />
          <FormField label="Stock" style={{ flex: 1 }}>
            <TextInput
              style={s.modalInput}
              placeholder="20"
              placeholderTextColor={C.textMuted}
              keyboardType="numeric"
              value={form.stock}
              onChangeText={(v) => setForm({ ...form, stock: v })}
            />
          </FormField>
        </View>
        <View style={s.modalActions}>
          <Btn
            variant="secondary"
            onPress={() => setShowModal(false)}
            style={{ flex: 1 }}
          >
            Annuler
          </Btn>
          <View style={{ width: 10 }} />
          <Btn onPress={() => setShowModal(false)} style={{ flex: 1 }}>
            {editProduct ? "Enregistrer" : "Ajouter le produit"}
          </Btn>
        </View>
      </Modal>

      {/* Sell Modal */}
      {showSell && (
        <Modal
          title={`Vente — ${showSell.name}`}
          visible={!!showSell}
          onClose={() => setShowSell(null)}
        >
          {/* Product info */}
          <View style={s.sellInfo}>
            <View style={s.sellInfoRow}>
              <Text style={s.sellInfoKey}>Prix unitaire</Text>
              <Text style={s.sellInfoVal}>
                {showSell.price.toLocaleString()} TND
              </Text>
            </View>
            <View style={s.sellInfoRow}>
              <Text style={s.sellInfoKey}>Stock disponible</Text>
              <Text
                style={[
                  s.sellInfoVal,
                  { color: showSell.stock === 0 ? C.danger : C.success },
                ]}
              >
                {showSell.stock} unités
              </Text>
            </View>
          </View>

          <FormField label="Client / Membre">
            <Select
              value={sellMember}
              onChange={setSellMember}
              options={MEMBER_OPTIONS}
              placeholder="Client de passage"
            />
          </FormField>

          <FormField label="Quantité">
            <TextInput
              style={s.modalInput}
              value={qty}
              onChangeText={(v) => setQty(v.replace(/[^0-9]/g, ""))}
              keyboardType="numeric"
              placeholderTextColor={C.textMuted}
            />
          </FormField>

          {/* Total */}
          <View style={s.totalBox}>
            <Text style={s.totalLabel}>Total</Text>
            <Text style={s.totalValue}>{total.toLocaleString()} TND</Text>
          </View>

          <View style={s.modalActions}>
            <Btn
              variant="secondary"
              onPress={() => setShowSell(null)}
              style={{ flex: 1 }}
            >
              Annuler
            </Btn>
            <View style={{ width: 10 }} />
            <Btn
              variant="success"
              onPress={() => setShowSell(null)}
              style={{ flex: 1 }}
            >
              ✓ Confirmer la vente
            </Btn>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 100 },

  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: "800", color: C.text },
  pageSub: { fontSize: 13, color: C.textSub, marginTop: 3 },

  statsRow: { flexDirection: "row" },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: C.surfaceAlt,
    borderRadius: C.radiusSm,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 13, color: C.text },

  productCard: { flex: 1, padding: 14 },
  productHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  productName: { fontSize: 13, fontWeight: "700", color: C.text, flex: 1 },
  productIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: C.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 12,
  },
  statBox: {
    width: "47%",
    backgroundColor: C.surfaceAlt,
    borderRadius: C.radiusSm,
    padding: 8,
  },
  statLabel: {
    fontSize: 9,
    color: C.textMuted,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  statValue: { fontSize: 12, fontWeight: "700", color: C.text, marginTop: 2 },

  stockSection: { marginBottom: 12 },
  stockTrack: {
    height: 5,
    backgroundColor: C.surfaceAlt,
    borderRadius: 99,
    overflow: "hidden",
  },
  stockBar: { height: "100%" as any, borderRadius: 99 },
  stockLabel: { fontSize: 9, color: C.textMuted, marginTop: 3 },

  productActions: { flexDirection: "row", alignItems: "center" },

  emptyBox: { padding: 40, alignItems: "center" },
  emptyText: { fontSize: 14, color: C.textMuted },

  modalInput: {
    backgroundColor: C.surfaceAlt,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: C.radiusSm,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: C.text,
  },
  twoCol: { flexDirection: "row" },
  modalActions: { flexDirection: "row", marginTop: 8, paddingBottom: 8 },

  sellInfo: {
    backgroundColor: C.surfaceAlt,
    borderRadius: C.radiusSm,
    padding: 14,
    marginBottom: 16,
    gap: 6,
  },
  sellInfoRow: { flexDirection: "row", justifyContent: "space-between" },
  sellInfoKey: { fontSize: 13, color: C.textSub },
  sellInfoVal: { fontSize: 13, fontWeight: "700", color: C.text },

  totalBox: {
    backgroundColor: C.accentLight,
    borderRadius: C.radiusSm,
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  totalLabel: { fontSize: 14, fontWeight: "700", color: C.accent },
  totalValue: { fontSize: 18, fontWeight: "800", color: C.accent },
});
