import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { C } from "../../constants/colors";

type BadgeStatus = string;

const CONFIG: Record<string, { bg: string; color: string; label: string }> = {
  active: { bg: C.successLight, color: C.success, label: "Active" },
  new: { bg: C.accentLight, color: C.accent, label: "New" },
  expired: { bg: C.dangerLight, color: C.danger, label: "Expired" },
  renew: { bg: C.warningLight, color: C.warning, label: "Renewed" },
  "In Stock": { bg: C.successLight, color: C.success, label: "In Stock" },
  "Out of Stock": { bg: C.dangerLight, color: C.danger, label: "Out of Stock" },
  Nutrition: { bg: "#F0FDF4", color: "#166534", label: "Nutrition" },
  Equipment: { bg: "#EFF6FF", color: "#1E40AF", label: "Equipment" },
  Accessories: { bg: "#FDF4FF", color: "#7E22CE", label: "Accessories" },
};

export default function Badge({ status }: { status: BadgeStatus }) {
  const cfg = CONFIG[status] ?? {
    bg: C.surfaceAlt,
    color: C.textSub,
    label: status,
  };
  return (
    <View style={[s.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[s.label, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999,
    alignSelf: "flex-start",
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    textTransform: "capitalize",
  },
});
