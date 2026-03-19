import SplashScreen from "@/components/SplashScreen";
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

export default function Index() {
  const [ready, setReady] = useState(false);

  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<Role>("admin");
  const [active, setActive] = useState<Screen>("tableau_de_bord");

  // ✅ Splash timing
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setReady(true);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, []);

  // ✅ ALWAYS FIRST
  //if (!ready) return <SplashScreen />;
  if (!ready) return <SplashScreen onFinish={() => setReady(true)} />;

  // ── Auth gate ─────────────────────────────
  if (!isAuthenticated) {
    if (authScreen === "login") {
      return <Login onNavigate={setAuthScreen} onLogin={handleLogin} />;
    }
    return <Register onNavigate={setAuthScreen} />;
  }

  const handleLogin = (selectedRole: Role) => {
    setRole(selectedRole);
    setIsAuthenticated(true);
    setActive(selectedRole === "admin" ? "tableau_de_bord" : "membres");
  };

  const handleRoleChange = (r: Role) => {
    setRole(r);
    if (r === "secretary" && active === "tableau_de_bord") {
      setActive("membres");
    }
  };

  const renderScreen = () => {
    switch (active) {
      case "tableau_de_bord":
        return <Dashboard role={role} />;
      case "membres":
        return <Members role={role} />;
      case "abonnements":
        return <Subscriptions role={role} />;
      case "produits":
        return <Products role={role} />;
      default:
        return <Dashboard role={role} />;
    }
  };

  // ── Main app ─────────────────────────────
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
