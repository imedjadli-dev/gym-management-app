import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { C } from "../../constants/colors";
import Card from "./Card";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  sub?: string;
  trend?: number;
  color?: string;
}

export default function StatCard({
  icon,
  label,
  value,
  sub,
  trend,
  color = C.accent,
}: StatCardProps) {
  return (
    <Card style={s.card}>
      <View style={s.row}>
        <View style={s.left}>
          <Text style={s.label}>{label}</Text>
          <Text style={s.value}>{value}</Text>
          {sub && <Text style={s.sub}>{sub}</Text>}
          {trend !== undefined && (
            <Text
              style={[s.trend, { color: trend > 0 ? C.success : C.danger }]}
            >
              {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% vs last month
            </Text>
          )}
        </View>
        <View style={[s.iconBox, { backgroundColor: color + "18" }]}>
          <Text style={s.icon}>{icon}</Text>
        </View>
      </View>
    </Card>
  );
}

const s = StyleSheet.create({
  card: { padding: 16, flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  left: { flex: 1, marginRight: 8 },
  label: {
    fontSize: 11,
    color: C.textSub,
    fontWeight: "600",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  value: { fontSize: 22, fontWeight: "800", color: C.text, lineHeight: 26 },
  sub: { fontSize: 11, color: C.textMuted, marginTop: 4 },
  trend: { fontSize: 11, fontWeight: "600", marginTop: 4 },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 18 },
});
