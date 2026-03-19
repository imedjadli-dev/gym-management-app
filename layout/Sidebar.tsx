import React from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Avatar from "../components/shared/Avatar";
import { C } from "../constants/colors";
import { NAV_ADMIN, NAV_SECRETARY, Role, Screen } from "../constants/mockData";

interface SidebarProps {
  role: Role;
  active: Screen;
  setActive: (screen: Screen) => void;
}

export default function Sidebar({ role, active, setActive }: SidebarProps) {
  const nav = role === "admin" ? NAV_ADMIN : NAV_SECRETARY;

  return (
    <SafeAreaView style={s.container}>
      {/* Logo */}
      <View style={s.logo}>
        <View style={s.logoIcon}>
          <Text style={{ fontSize: 20 }}>💪</Text>
        </View>
        <View>
          <Text style={s.logoName}>GOLD'S GYM</Text>
          <Text style={s.logoSub}>Management</Text>
        </View>
      </View>

      {/* Nav items */}
      <ScrollView style={s.nav} showsVerticalScrollIndicator={false}>
        <Text style={s.menuLabel}>MENU</Text>
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <Pressable
              key={item.id}
              onPress={() => setActive(item.id)}
              style={[s.navItem, isActive && s.navItemActive]}
            >
              <Text style={s.navIcon}>{item.icon}</Text>
              <Text style={[s.navLabel, isActive && s.navLabelActive]}>
                {item.label}
              </Text>
              {isActive && <View style={s.dot} />}
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Footer */}
      <View style={s.footer}>
        <Avatar initials={role === "admin" ? "AD" : "SC"} size={34} />
        <View style={{ marginLeft: 10 }}>
          <Text style={s.footerName}>
            {role === "admin" ? "Administrateur" : "Secretaire"}
          </Text>
          <Text style={s.footerSub}>Vous êtes connecté(e)</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: {
    width: 220,
    backgroundColor: C.surface,
    borderRightWidth: 1,
    borderRightColor: C.border,
    elevation: 2,
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    gap: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  logoIcon: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: C.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  logoName: { fontSize: 15, fontWeight: "800", color: C.text },
  logoSub: { fontSize: 10, color: C.textMuted, fontWeight: "500" },
  nav: { flex: 1, paddingHorizontal: 10, paddingTop: 12 },
  menuLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: C.textMuted,
    letterSpacing: 1,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: C.radiusSm,
    marginBottom: 2,
  },
  navItemActive: { backgroundColor: C.accentLight },
  navIcon: { fontSize: 16 },
  navLabel: { flex: 1, fontSize: 13, color: C.textSub, fontWeight: "500" },
  navLabelActive: { color: C.accent, fontWeight: "700" },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: C.accent },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: C.border,
  },
  footerName: { fontSize: 13, fontWeight: "700", color: C.text },
  footerSub: { fontSize: 11, color: C.textMuted },
});
