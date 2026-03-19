import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { C } from "../constants/colors";
import { Role, Screen } from "../constants/mockData";
import RoleSwitcher from "../layout/RoleSwitcher";
import Sidebar from "../layout/Sidebar";
import Dashboard from "../screens/Dashboard";
import Login from "../screens/Login";
import Members from "../screens/Members";
import Products from "../screens/Products";
import Register from "../screens/Register";
import Subscriptions from "../screens/Subscriptions";

type AuthScreen = "login" | "register";

export default function RootLayout() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>("admin");
  const [active, setActive] = useState<Screen>("dashboard");

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    setActive(selectedRole === "admin" ? "dashboard" : "members");
  };

  const handleRoleChange = (r: Role) => {
    setRole(r);
    if (r === "secretary" && active === "dashboard") setActive("members");
  };

  const renderScreen = () => {
    switch (active) {
      case "dashboard":
        return <Dashboard role={role} />;
      case "members":
        return <Members role={role} />;
      case "subscriptions":
        return <Subscriptions role={role} />;
      case "products":
        return <Products role={role} />;
      default:
        return <Dashboard role={role} />;
    }
  };

  // ── Auth gate ─────────────────────────────────────────────
  if (!isAuthenticated) {
    if (authScreen === "login") {
      return <Login onNavigate={setAuthScreen} onLogin={handleLogin} />;
    }
    return <Register onNavigate={setAuthScreen} />;
  }

  // ── Main app ──────────────────────────────────────────────
  return (
    <SafeAreaView style={s.root}>
      <View style={s.layout}>
        <Sidebar role={role} active={active} setActive={setActive} />
        <View style={s.content}>{renderScreen()}</View>
      </View>
      <RoleSwitcher role={role} setRole={handleRoleChange} />
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  layout: { flex: 1, flexDirection: "row" },
  content: { flex: 1, padding: 20 },
});
