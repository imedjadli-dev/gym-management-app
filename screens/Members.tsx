import React, { useState } from "react";
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
import { Member, MEMBERS, MemberStatus, Role } from "../constants/mockData";

interface MembersProps {
  role: Role;
}

type Filter = "all" | MemberStatus;

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "active", label: "Actifs" },
  { value: "new", label: "Nouveaux" },
  { value: "expired", label: "Expirés" },
];

const PLAN_OPTIONS = [
  { value: "Basic", label: "Basique" },
  { value: "Premium", label: "Premium" },
];

export default function Members({ role }: MembersProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [showModal, setShowModal] = useState(false);
  const [editMember, setEditMember] = useState<Member | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", plan: "Basic" });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    phone?: string;
  }>({});

  const filtered = MEMBERS.filter((m) => {
    const matchSearch = m.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || m.status === filter;
    return matchSearch && matchFilter;
  });

  const openAdd = () => {
    setEditMember(null);
    setForm({ name: "", phone: "", plan: "Basic" });
    setFormErrors({});
    setShowModal(true);
  };

  const openEdit = (m: Member) => {
    setEditMember(m);
    setForm({ name: m.name, phone: m.phone, plan: m.plan });
    setFormErrors({});
    setShowModal(true);
  };

  const validateForm = () => {
    const e: { name?: string; phone?: string } = {};
    if (!form.name.trim()) e.name = "Le nom est requis";
    if (!form.phone.trim()) e.phone = "Le téléphone est requis";
    return e;
  };

  const handleSave = () => {
    const e = validateForm();
    if (Object.keys(e).length) {
      setFormErrors(e);
      return;
    }
    setShowModal(false);
  };

  const renderMember = ({ item, index }: { item: Member; index: number }) => (
    <View style={[s.row, index % 2 === 1 && s.rowAlt]}>
      {/* Avatar + name */}
      <View style={s.memberCell}>
        <Avatar initials={item.avatar} size={34} />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={s.memberName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={s.memberPhone}>{item.phone}</Text>
        </View>
      </View>

      {/* Plan */}
      <View style={s.cell}>
        <Text style={s.cellText}>{item.plan}</Text>
      </View>

      {/* Status */}
      <View style={s.cell}>
        <Badge status={item.status} />
      </View>

      {/* Expires */}
      <View style={s.cell}>
        <Text
          style={[
            s.cellText,
            item.status === "expired" && { color: C.danger, fontWeight: "600" },
          ]}
        >
          {item.expires}
        </Text>
      </View>

      {/* Actions */}
      <View style={s.actionsCell}>
        <Btn small variant="secondary" onPress={() => openEdit(item)}>
          Modifier
        </Btn>
        {role === "admin" && (
          <Btn small variant="danger" style={{ marginLeft: 6 }}>
            Suppr
          </Btn>
        )}
      </View>
    </View>
  );

  return (
    <View style={s.root}>
      {/* Header */}
      <View style={s.pageHeader}>
        <View>
          <Text style={s.pageTitle}>Membres</Text>
          <Text style={s.pageSub}>{MEMBERS.length} membres au total</Text>
        </View>
        <Btn onPress={openAdd}>＋ Ajouter un membre</Btn>
      </View>

      {/* Search */}
      <View style={s.searchRow}>
        <View style={s.searchBox}>
          <Text style={s.searchIcon}>🔍</Text>
          <TextInput
            style={s.searchInput}
            placeholder="Rechercher des membres..."
            placeholderTextColor={C.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      {/* Filter pills */}
      <View style={s.filterRow}>
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
          </Pressable>
        ))}
      </View>

      {/* Table */}
      <Card style={s.tableCard}>
        {/* Table header */}
        <View style={[s.row, s.tableHead]}>
          <Text style={[s.headCell, { flex: 2.2 }]}>Membre</Text>
          <Text style={[s.headCell, { flex: 1 }]}>Plan</Text>
          <Text style={[s.headCell, { flex: 1 }]}>Statut</Text>
          <Text style={[s.headCell, { flex: 1.3 }]}>Expire</Text>
          <Text style={[s.headCell, { flex: 1.4 }]}>Actions</Text>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderMember}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={s.emptyBox}>
              <Text style={s.emptyText}>Aucun membre trouvé</Text>
            </View>
          }
        />
      </Card>

      {/* Add / Edit Modal */}
      <Modal
        title={editMember ? "Modifier le membre" : "Ajouter un membre"}
        visible={showModal}
        onClose={() => setShowModal(false)}
      >
        <FormField label="Nom complet" error={formErrors.name}>
          <TextInput
            style={s.modalInput}
            placeholder="Nom complet"
            placeholderTextColor={C.textMuted}
            value={form.name}
            onChangeText={(v) => setForm({ ...form, name: v })}
          />
        </FormField>

        <FormField label="Téléphone" error={formErrors.phone}>
          <TextInput
            style={s.modalInput}
            placeholder="+213 ..."
            placeholderTextColor={C.textMuted}
            keyboardType="phone-pad"
            value={form.phone}
            onChangeText={(v) => setForm({ ...form, phone: v })}
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

        <View style={s.modalActions}>
          <Btn
            variant="secondary"
            onPress={() => setShowModal(false)}
            style={{ flex: 1 }}
          >
            Annuler
          </Btn>
          <View style={{ width: 10 }} />
          <Btn onPress={handleSave} style={{ flex: 1 }}>
            {editMember ? "Enregistrer les modifications" : "Ajouter le membre"}
          </Btn>
        </View>
      </Modal>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1 },

  pageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  pageTitle: { fontSize: 22, fontWeight: "800", color: C.text },
  pageSub: { fontSize: 13, color: C.textSub, marginTop: 3 },

  searchRow: { marginBottom: 12 },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surfaceAlt,
    borderRadius: C.radiusSm,
    borderWidth: 1,
    borderColor: C.border,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchIcon: { fontSize: 14 },
  searchInput: { flex: 1, paddingVertical: 10, fontSize: 13, color: C.text },

  filterRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    flexWrap: "wrap",
  },
  filterPill: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: C.radiusSm,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
  },
  filterPillActive: { backgroundColor: C.accentLight, borderColor: C.accent },
  filterText: { fontSize: 12, fontWeight: "600", color: C.textSub },
  filterTextActive: { color: C.accent },

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
    padding: 12,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  rowAlt: { backgroundColor: C.bg },

  memberCell: {
    flex: 2.2,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  memberName: { fontSize: 13, fontWeight: "600", color: C.text },
  memberPhone: { fontSize: 11, color: C.textMuted, marginTop: 1 },

  cell: { flex: 1, padding: 12 },
  cellText: { fontSize: 12, color: C.textSub },

  actionsCell: {
    flex: 1.4,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },

  emptyBox: { padding: 30, alignItems: "center" },
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
  modalActions: { flexDirection: "row", marginTop: 8, paddingBottom: 8 },
});
