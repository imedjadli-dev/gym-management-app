import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/shared/Card";
import MiniBarChart from "../components/shared/MiniBarChart";
import SectionHeader from "../components/shared/SectionHeader";
import StatCard from "../components/shared/StatCard";
import { C } from "../constants/colors";
import { Role } from "../constants/mockData";

interface DashboardProps {
  role: Role;
}

const REVENUE_DATA = [
  { label: "Oct", value: 320000 },
  { label: "Nov", value: 410000 },
  { label: "Déc", value: 390000 },
  { label: "Jan", value: 520000 },
  { label: "Fév", value: 480000 },
  { label: "Mar", value: 610000 },
];

const MEMBER_DATA = [
  { label: "Oct", value: 48 },
  { label: "Nov", value: 55 },
  { label: "Déc", value: 60 },
  { label: "Jan", value: 72 },
  { label: "Fév", value: 68 },
  { label: "Mar", value: 81 },
];

const ACTIVITY = [
  {
    icon: "🆕",
    text: "Nour Benali — Nouvel abonnement Basic",
    time: "Il y a 2h",
    color: C.accentLight,
  },
  {
    icon: "🔄",
    text: "Amina Khelifi — Renouvellement du plan Basic",
    time: "Il y a 5h",
    color: C.warningLight,
  },
  {
    icon: "💊",
    text: "Whey Protein 1kg — 3 unités vendues",
    time: "Hier",
    color: C.goldLight,
  },
  {
    icon: "⚠️",
    text: "Riad Mansouri — Abonnement expiré",
    time: "Il y a 4 jours",
    color: C.dangerLight,
  },
];

const SUBS_BREAKDOWN = [
  { label: "Actifs", count: 69, color: C.success, pct: 85 },
  { label: "Nouveaux", count: 13, color: C.accent, pct: 16 },
  { label: "Expirés", count: 6, color: C.danger, pct: 7 },
];

export default function Dashboard({ role }: DashboardProps) {
  return (
    <ScrollView
      style={s.root}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={s.content}
    >
      {/* Page title */}
      <View style={s.pageHeader}>
        <Text style={s.pageTitle}>Tableau de bord</Text>
        <Text style={s.pageDate}>Jeudi 19 mars 2026</Text>
      </View>

      {/* Stat cards — 2x2 grid */}
      <View style={s.statsGrid}>
        <View style={s.statsRow}>
          <StatCard
            icon="👥"
            label="Membres totaux"
            value="81"
            sub="Membres actifs"
            trend={12}
            color={C.accent}
          />
          <View style={s.statGap} />
          <StatCard
            icon="💰"
            label="Revenu mensuel"
            value="610K TND"
            sub="Mars 2026"
            trend={27}
            color={C.success}
          />
        </View>
        <View style={s.statsRow}>
          <StatCard
            icon="🆕"
            label="Nouveaux ce mois"
            value="13"
            sub="Nouveaux abonnements"
            trend={8}
            color="#7C3AED"
          />
          <View style={s.statGap} />
          <StatCard
            icon="⚠️"
            label="Expirés"
            value="6"
            sub="À renouveler"
            color={C.danger}
          />
        </View>
      </View>

      {/* Charts */}
      <View style={s.chartsRow}>
        <Card style={[s.chartCard, { flex: 2 }]}>
          <View style={s.chartHeader}>
            <View>
              <Text style={s.chartTitle}>Tendance des revenus</Text>
              <Text style={s.chartSub}>6 derniers mois</Text>
            </View>
            <Text style={s.chartValue}>DA 3.73M</Text>
          </View>
          <MiniBarChart data={REVENUE_DATA} color={C.accent} />
        </Card>
        <View style={{ width: 12 }} />
        <Card style={[s.chartCard, { flex: 1 }]}>
          <Text style={s.chartTitle}>Croissance des membres</Text>
          <Text style={s.chartSub}>6 derniers mois</Text>
          <View style={{ marginTop: 10 }}>
            <MiniBarChart data={MEMBER_DATA} color="#7C3AED" />
          </View>
        </Card>
      </View>

      {/* Subscription breakdown */}
      <View style={s.breakdownRow}>
        {SUBS_BREAKDOWN.map((s_item) => (
          <Card key={s_item.label} style={s.breakdownCard}>
            <View style={s.breakdownTop}>
              <Text style={s.breakdownLabel}>{s_item.label}</Text>
              <Text style={[s.breakdownCount, { color: s_item.color }]}>
                {s_item.count}
              </Text>
            </View>
            <View style={s.progressTrack}>
              <View
                style={[
                  s.progressBar,
                  {
                    width: `${s_item.pct}%` as any,
                    backgroundColor: s_item.color,
                  },
                ]}
              />
            </View>
            <Text style={s.breakdownPct}>{s_item.pct}% du total</Text>
          </Card>
        ))}
      </View>

      {/* Recent activity */}
      <Card style={s.activityCard}>
        <SectionHeader title="Activité récente" />
        {ACTIVITY.map((a, i) => (
          <View
            key={i}
            style={[
              s.activityItem,
              i < ACTIVITY.length - 1 && s.activityBorder,
            ]}
          >
            <View style={[s.activityIcon, { backgroundColor: a.color }]}>
              <Text style={{ fontSize: 14 }}>{a.icon}</Text>
            </View>
            <Text style={s.activityText} numberOfLines={2}>
              {a.text}
            </Text>
            <Text style={s.activityTime}>{a.time}</Text>
          </View>
        ))}
      </Card>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  content: { padding: 20, paddingBottom: 100 },

  pageHeader: { marginBottom: 20 },
  pageTitle: { fontSize: 22, fontWeight: "800", color: C.text },
  pageDate: { fontSize: 13, color: C.textSub, marginTop: 3 },

  statsGrid: { gap: 12, marginBottom: 16 },
  statsRow: { flexDirection: "row" },
  statGap: { width: 12 },

  chartsRow: { flexDirection: "row", marginBottom: 16 },
  chartCard: { padding: 16 },
  chartHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  chartTitle: { fontSize: 13, fontWeight: "700", color: C.text },
  chartSub: { fontSize: 11, color: C.textMuted, marginTop: 2 },
  chartValue: { fontSize: 14, fontWeight: "800", color: C.success },

  breakdownRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  breakdownCard: { flex: 1, padding: 14 },
  breakdownTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  breakdownLabel: { fontSize: 13, fontWeight: "600", color: C.text },
  breakdownCount: { fontSize: 20, fontWeight: "800" },
  progressTrack: {
    height: 6,
    backgroundColor: C.surfaceAlt,
    borderRadius: 99,
    overflow: "hidden",
  },
  progressBar: { height: "100%" as any, borderRadius: 99 },
  breakdownPct: { fontSize: 11, color: C.textMuted, marginTop: 5 },

  activityCard: { padding: 18 },
  activityItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 11,
  },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: C.border },
  activityIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  activityText: { flex: 1, fontSize: 13, color: C.text },
  activityTime: { fontSize: 11, color: C.textMuted, flexShrink: 0 },
});
