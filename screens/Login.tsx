import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AuthBtn from "../components/auth/AuthBtn";
import AuthInput from "../components/auth/AuthInput";
import { C } from "../constants/colors";
import { Role } from "../constants/mockData";

interface LoginProps {
  onNavigate: (screen: "login" | "register") => void;
  onLogin: (role: Role) => void;
}

interface FormState {
  email: string;
  password: string;
  role: Role;
}

interface Errors {
  email?: string;
  password?: string;
}

export default function Login({ onNavigate, onLogin }: LoginProps) {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
    role: "admin",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = (): Errors => {
    const e: Errors = {};
    if (!form.email) e.email = "Email requis";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      e.email = "Entrez un email valide";
    if (!form.password) e.password = "Mot de passe requis";
    else if (form.password.length < 6) e.password = "Minimum 6 caractères";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onLogin(form.role), 800);
    }, 1500);
  };

  return (
    <SafeAreaView style={s.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={s.kav}
      >
        <ScrollView
          contentContainerStyle={s.scroll}
          keyboardShouldPersistTaps="handled"
        >
          {/* Brand header */}
          <View style={s.brand}>
            <View style={s.logoBox}>
              <Text style={{ fontSize: 28 }}>💪</Text>
            </View>
            <Text style={s.logoName}>GOLD'S GYM</Text>
            <Text style={s.logoSub}>Système de gestion</Text>
          </View>

          {/* Card */}
          <View style={s.card}>
            <Text style={s.title}>Bon retour</Text>
            <Text style={s.subtitle}>Connectez-vous à votre compte</Text>

            {success ? (
              <View style={s.successBox}>
                <Text
                  style={{
                    fontSize: 32,
                    textAlign: "center",
                    marginBottom: 10,
                  }}
                >
                  ✅
                </Text>
                <Text style={s.successTitle}>Connexion réussie !</Text>
                <Text style={s.successSub}>
                  Redirection vers le tableau de bord...
                </Text>
              </View>
            ) : (
              <>
                {/* Role selector */}
                <View style={s.roleRow}>
                  {(
                    [
                      ["admin", "👑 Administrateur"],
                      ["secretary", "🗂️ Secrétaire"],
                    ] as [Role, string][]
                  ).map(([r, lbl]) => (
                    <Pressable
                      key={r}
                      onPress={() => setForm({ ...form, role: r })}
                      style={[s.roleBtn, form.role === r && s.roleBtnActive]}
                    >
                      <Text
                        style={[
                          s.roleBtnText,
                          form.role === r && s.roleBtnTextActive,
                        ]}
                      >
                        {lbl}
                      </Text>
                    </Pressable>
                  ))}
                </View>

                <AuthInput
                  label="Adresse email"
                  placeholder="admin@GOLD'S GYM.dz"
                  icon="✉️"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(v) => setForm({ ...form, email: v })}
                  error={errors.email}
                />

                <AuthInput
                  label="Mot de passe"
                  placeholder="Entrez votre mot de passe"
                  icon="🔒"
                  isPassword
                  value={form.password}
                  onChangeText={(v) => setForm({ ...form, password: v })}
                  error={errors.password}
                />

                <Pressable style={s.forgotRow}>
                  <Text style={s.forgotText}>Mot de passe oublié ?</Text>
                </Pressable>

                <AuthBtn onPress={handleSubmit} loading={loading}>
                  Se connecter →
                </AuthBtn>
              </>
            )}
          </View>

          {/* Footer link */}
          {!success && (
            <View style={s.footerRow}>
              <Text style={s.footerText}>Vous n'avez pas de compte ? </Text>
              <Pressable onPress={() => onNavigate("register")}>
                <Text style={s.footerLink}>Créer un compte</Text>
              </Pressable>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  kav: { flex: 1 },
  scroll: { flexGrow: 1, padding: 24, justifyContent: "center" },

  brand: { alignItems: "center", marginBottom: 28 },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: C.accent,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    elevation: 6,
  },
  logoName: { fontSize: 24, fontWeight: "800", color: C.text },
  logoSub: {
    fontSize: 12,
    color: C.textMuted,
    fontWeight: "500",
    marginTop: 2,
  },

  card: {
    backgroundColor: C.surface,
    borderRadius: C.radius,
    padding: 24,
    borderWidth: 1,
    borderColor: C.border,
    elevation: 3,
    marginBottom: 20,
  },
  title: { fontSize: 22, fontWeight: "800", color: C.text, marginBottom: 4 },
  subtitle: { fontSize: 14, color: C.textSub, marginBottom: 24 },

  roleRow: {
    flexDirection: "row",
    backgroundColor: C.surfaceAlt,
    borderRadius: C.radiusSm,
    padding: 4,
    marginBottom: 20,
    gap: 4,
  },
  roleBtn: {
    flex: 1,
    paddingVertical: 9,
    borderRadius: 6,
    alignItems: "center",
  },
  roleBtnActive: { backgroundColor: C.surface, elevation: 2 },
  roleBtnText: { fontSize: 13, fontWeight: "600", color: C.textSub },
  roleBtnTextActive: { color: C.accent },

  forgotRow: { alignItems: "flex-end", marginBottom: 20, marginTop: -4 },
  forgotText: { fontSize: 13, color: C.accent, fontWeight: "600" },

  successBox: {
    backgroundColor: C.successLight,
    borderRadius: C.radiusSm,
    padding: 24,
    alignItems: "center",
  },
  successTitle: { fontSize: 16, fontWeight: "800", color: C.success },
  successSub: { fontSize: 13, color: C.success, marginTop: 4, opacity: 0.8 },

  footerRow: { flexDirection: "row", justifyContent: "center" },
  footerText: { fontSize: 13, color: C.textSub },
  footerLink: { fontSize: 13, color: C.accent, fontWeight: "700" },
});
