import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Avatar from "../components/shared/Avatar";
import Badge from "../components/shared/Badge";
import Btn from "../components/shared/Btn";
import Card from "../components/shared/Card";
import FormField from "../components/shared/FormField";
import Modal from "../components/shared/Modal";
import Select from "../components/shared/Select";
import { C } from "../constants/colors";
import {
  MEMBERS,
  Role,
  Subscription,
  SUBSCRIPTIONS,
  SubscriptionType,
} from "../constants/mockData";

interface SubscriptionsProps {
  role: Role;
}

type Filter = "all" | SubscriptionType;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "new", label: "Nouveaux" },
  { value: "active", label: "Actifs" },
  { value: "renew", label: "Renouvelés" },
  { value: "expired", label: "Expirés" },
];

const SUMMARY_CARDS = [
  { type: "new", icon: "🆕", label: "Nouveaux", color: C.accent },
  { type: "active", icon: "✅", label: "Actifs", color: C.success },
  { type: "renew", icon: "🔄", label: "Renouvelés", color: C.warning },
  { type: "expired", icon: "⚠️", label: "Expirés", color: C.danger },
] as const;

const MEMBER_OPTIONS = MEMBERS.map((m) => ({ value: m.name, label: m.name }));
const PLAN_OPTIONS = [
  { value: "Basic", label: "Basique — 2,000 TND/mois" },
  { value: "Premium", label: "Premium — 3,500 TND/mois" },
];
const TYPE_OPTIONS = [
  { value: "new", label: "Nouveau" },
  { value: "renew", label: "Renouvellement" },
];

export default function Subscriptions({ role }: SubscriptionsProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ member: "", plan: "Basic", type: "new" });

  const counts: Record<string, number> = {
    all: SUBSCRIPTIONS.length,
    new: SUBSCRIPTIONS.filter((s) => s.type === "new").length,
    active: SUBSCRIPTIONS.filter((s) => s.type === "active").length,
    renew: SUBSCRIPTIONS.filter((s) => s.type === "renew").length,
    expired: SUBSCRIPTIONS.filter((s) => s.type === "expired").length,
  };

  const filtered = SUBSCRIPTIONS.filter(
    (s) => filter === "all" || s.type === filter,
  );

  const renderItem = ({
    item,
    index,
  }: {
    item: Subscription;
    index: number;
  }) => {
    const initials = item.member
      .split(" ")
      .map((n) => n[0])
      .join("");
    return (
      <View style={[s.row, index % 2 === 1 && s.rowAlt]}>
        <View style={s.memberCell}>
          <Avatar initials={initials} size={32} />
          <Text style={s.memberName} numberOfLines={1}>
            {item.member}
          </Text>
        </View>
        <Text style={s.cell}>{item.plan}</Text>
        <View style={s.cell}>
          <Badge status={item.type} />
        </View>
        <Text style={s.cell}>{item.date}</Text>
        <Text style={[s.cell, s.amount]}>
          {item.amount.toLocaleString()} DA
        </Text>
        <View style={s.actionsCell}>
          {item.type === "expired" && (
            <Btn small variant="success">
              Renouveler
            </Btn>
          )}
          {role === "admin" && (
            <Btn small variant="danger" style={{ marginLeft: 4 }}>
              Suppr
            </Btn>
          )}
        </View>
      </View>
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
          <Text style={s.pageTitle}>Abonnements</Text>
          <Text style={s.pageSub}>Gérer tous les plans d'adhésion</Text>
        </View>
        <Btn onPress={() => setShowModal(true)}>＋ Nouveau</Btn>
      </View>

      {/* Summary cards */}
      <View style={s.summaryRow}>
        {SUMMARY_CARDS.map((sc) => (
          <Pressable
            key={sc.type}
            onPress={() => setFilter(sc.type)}
            style={{ flex: 1 }}
          >
            <Card style={s.summaryCard}>
              <Text style={s.summaryIcon}>{sc.icon}</Text>
              <Text style={s.summaryLabel}>{sc.label}</Text>
              <Text style={[s.summaryCount, { color: sc.color }]}>
                {counts[sc.type]}
              </Text>
            </Card>
          </Pressable>
        ))}
      </View>

      {/* Filter pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={s.filterScroll}
        contentContainerStyle={s.filterRow}
      >
        {FILTERS.map((f) => (
          <Pressable
            key={f.value}
            onPress={() => setFilter(f.value)}
            style={[s.filterPill, filter === f.value && s.filterPillActive]}
          >
            <Text
              style={[s.filterText, filter === f.value && s.filterTextActive]}
            >
              {f.label}
            </Text>
            {f.value !== "all" && (
              <View
                style={[
                  s.filterBadge,
                  filter === f.value && s.filterBadgeActive,
                ]}
              >
                <Text
                  style={[
                    s.filterBadgeText,
                    filter === f.value && s.filterBadgeTextActive,
                  ]}
                >
                  {counts[f.value]}
                </Text>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {/* Table */}
      <Card style={s.tableCard}>
        {/* Table head */}
        <View style={[s.row, s.tableHead]}>
          <Text style={[s.headCell, { flex: 2 }]}>Membre</Text>
          <Text style={[s.headCell, { flex: 1 }]}>Plan</Text>
          <Text style={[s.headCell, { flex: 1 }]}>Statut</Text>
          <Text style={[s.headCell, { flex: 1.2 }]}>Date</Text>
          <Text style={[s.headCell, { flex: 1.2 }]}>Montant</Text>
          <Text style={[s.headCell, { flex: 1.4 }]}>Actions</Text>
        </View>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={s.emptyBox}>
              <Text style={s.emptyText}>Aucun abonnement trouvé</Text>
            </View>
          }
        />
      </Card>

      {/* New Subscription Modal */}
      <Modal
        title="Nouvel abonnement"
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <FormField label="Membre">
          <Select
            value={form.member}
            onChange={(v) => setForm({ ...form, member: v })}
            options={MEMBER_OPTIONS}
            placeholder="Sélectionner un membre..."
          />
        </FormField>
        <FormField label="Plan">
          <Select
            value={form.plan}
            onChange={(v) => setForm({ ...form, plan: v })}
            options={PLAN_OPTIONS}
            placeholder="Sélectionner un plan"
          />
        </FormField>
        <FormField label="Type">
          <Select
            value={form.type}
            onChange={(v) => setForm({ ...form, type: v })}
            options={TYPE_OPTIONS}
            placeholder="Sélectionner un type"
          />
        </FormField>
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
            Créer
          </Btn>
        </View>
      </Modal>
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

  summaryRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  summaryCard: { padding: 12, alignItems: "center", gap: 4 },
  summaryIcon: { fontSize: 20 },
  summaryLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: C.textSub,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  summaryCount: { fontSize: 22, fontWeight: "800" },

  filterScroll: { marginBottom: 14 },
  filterRow: { gap: 8, paddingRight: 4 },
  filterPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 7,
    paddingHorizontal: 14,
    borderRadius: C.radiusSm,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
  },
  filterPillActive: { backgroundColor: C.accentLight, borderColor: C.accent },
  filterText: { fontSize: 12, fontWeight: "600", color: C.textSub },
  filterTextActive: { color: C.accent },
  filterBadge: {
    backgroundColor: C.surfaceAlt,
    borderRadius: 99,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  filterBadgeActive: { backgroundColor: C.accent },
  filterBadgeText: { fontSize: 10, fontWeight: "700", color: C.textSub },
  filterBadgeTextActive: { color: "#fff" },

  tableCard: { overflow: "hidden" },
  tableHead: {
    backgroundColor: C.surfaceAlt,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  headCell: {
    fontSize: 10,
    fontWeight: "700",
    color: C.textSub,
    letterSpacing: 0.5,
    textTransform: "uppercase",
    padding: 11,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  rowAlt: { backgroundColor: C.bg },

  memberCell: {
    flex: 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 11,
  },
  memberName: { fontSize: 12, fontWeight: "600", color: C.text, flex: 1 },

  cell: { flex: 1, padding: 11, fontSize: 12, color: C.textSub },
  amount: { fontWeight: "700", color: C.text },

  actionsCell: {
    flex: 1.4,
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },

  emptyBox: { padding: 28, alignItems: "center" },
  emptyText: { fontSize: 14, color: C.textMuted },

  modalActions: { flexDirection: "row", marginTop: 8, paddingBottom: 8 },
});
