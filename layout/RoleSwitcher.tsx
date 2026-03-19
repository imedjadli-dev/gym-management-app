import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { C } from "../constants/colors";
import { Role } from "../constants/mockData";

interface RoleSwitcherProps {
  role: Role;
  setRole: (role: Role) => void;
}

const ROLES: { value: Role; label: string }[] = [
  { value: "admin", label: "👑 Admin" },
  { value: "secretary", label: "🗂️ Secretary" },
];

export default function RoleSwitcher({ role, setRole }: RoleSwitcherProps) {
  return (
    <View style={s.container}>
      <Text style={s.label}>ROLE</Text>
      <View style={s.row}>
        {ROLES.map((r) => (
          <Pressable
            key={r.value}
            onPress={() => setRole(r.value)}
            style={[s.btn, role === r.value && s.btnActive]}
          >
            <Text style={[s.btnText, role === r.value && s.btnTextActive]}>
              {r.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 24,
    right: 16,
    backgroundColor: C.surface,
    borderRadius: C.radiusLg,
    elevation: 8,
    borderWidth: 1,
    borderColor: C.border,
    padding: 10,
    gap: 8,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: C.textMuted,
    letterSpacing: 0.8,
    textAlign: "center",
  },
  row: { flexDirection: "row", gap: 6 },
  btn: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: C.radiusSm,
    borderWidth: 1,
    borderColor: C.border,
    backgroundColor: C.surface,
  },
  btnActive: { backgroundColor: C.accent, borderColor: C.accent },
  btnText: { fontSize: 12, fontWeight: "700", color: C.textSub },
  btnTextActive: { color: "#fff" },
});
