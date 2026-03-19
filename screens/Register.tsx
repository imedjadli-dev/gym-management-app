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

interface RegisterProps {
  onNavigate: (screen: "login" | "register") => void;
}

interface FormState {
  name: string;
  email: string;
  password: string;
  confirm: string;
  role: Role;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
  confirm?: string;
}

function passwordStrength(p: string): number {
  if (!p) return 0;
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
}

const STRENGTH_LABEL = ["", "Weak", "Fair", "Good", "Strong"];
const STRENGTH_COLOR = ["", C.danger, C.warning, "#CA8A04", C.success];

export default function Register({ onNavigate }: RegisterProps) {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "secretary",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState(1);

  const set = (field: keyof FormState) => (v: string) =>
    setForm((f) => ({ ...f, [field]: v }));

  const validateStep1 = (): Errors => {
    const e: Errors = {};
    if (!form.name.trim()) e.name = "Full name is required";
    else if (form.name.trim().length < 3)
      e.name = "Must be at least 3 characters";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    return e;
  };

  const validateStep2 = (): Errors => {
    const e: Errors = {};
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 8) e.password = "Minimum 8 characters";
    if (!form.confirm) e.confirm = "Please confirm your password";
    else if (form.confirm !== form.password)
      e.confirm = "Passwords do not match";
    return e;
  };

  const nextStep = () => {
    const e = validateStep1();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleSubmit = () => {
    const e = validateStep2();
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const s_val = passwordStrength(form.password);

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
          {/* Brand */}
          <View style={s.brand}>
            <View style={s.logoBox}>
              <Text style={{ fontSize: 28 }}>💪</Text>
            </View>
            <Text style={s.logoName}>GymPro</Text>
            <Text style={s.logoSub}>Create your account</Text>
          </View>

          <View style={s.card}>
            <Text style={s.title}>Get started</Text>
            <Text style={s.subtitle}>Set up your GymPro access</Text>

            {/* Step indicator */}
            {!success && (
              <View style={s.stepRow}>
                {[1, 2, 3].map((n, i) => (
                  <React.Fragment key={n}>
                    <View
                      style={[
                        s.stepCircle,
                        (success ? 3 : step) >= n && s.stepCircleActive,
                      ]}
                    >
                      <Text
                        style={[
                          s.stepNum,
                          (success ? 3 : step) >= n && s.stepNumActive,
                        ]}
                      >
                        {step > n && !success ? "✓" : n}
                      </Text>
                    </View>
                    {i < 2 && (
                      <View
                        style={[s.stepLine, step > n && s.stepLineActive]}
                      />
                    )}
                  </React.Fragment>
                ))}
              </View>
            )}

            {success ? (
              <View style={s.successBox}>
                <Text
                  style={{
                    fontSize: 40,
                    textAlign: "center",
                    marginBottom: 12,
                  }}
                >
                  🎉
                </Text>
                <Text style={s.successTitle}>Account created!</Text>
                <Text style={s.successSub}>Your GymPro account is ready.</Text>
                <Pressable
                  style={s.loginBtn}
                  onPress={() => onNavigate("login")}
                >
                  <Text style={s.loginBtnText}>Go to Login →</Text>
                </Pressable>
              </View>
            ) : step === 1 ? (
              <>
                <AuthInput
                  label="Full Name"
                  placeholder="e.g. Ahmed Benali"
                  icon="👤"
                  value={form.name}
                  onChangeText={set("name")}
                  error={errors.name}
                />

                <AuthInput
                  label="Email Address"
                  placeholder="ahmed@gympro.dz"
                  icon="✉️"
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={set("email")}
                  error={errors.email}
                />

                {/* Role picker */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={s.fieldLabel}>ROLE</Text>
                  <View style={s.roleGrid}>
                    {[
                      {
                        value: "admin" as Role,
                        icon: "👑",
                        label: "Admin",
                        desc: "Full access",
                      },
                      {
                        value: "secretary" as Role,
                        icon: "🗂️",
                        label: "Secretary",
                        desc: "Limited access",
                      },
                    ].map((r) => (
                      <Pressable
                        key={r.value}
                        onPress={() => setForm({ ...form, role: r.value })}
                        style={[
                          s.roleCard,
                          form.role === r.value && s.roleCardActive,
                        ]}
                      >
                        <Text style={s.roleIcon}>{r.icon}</Text>
                        <Text
                          style={[
                            s.roleLabel,
                            form.role === r.value && s.roleLabelActive,
                          ]}
                        >
                          {r.label}
                        </Text>
                        <Text style={s.roleDesc}>{r.desc}</Text>
                      </Pressable>
                    ))}
                  </View>
                </View>

                <AuthBtn onPress={nextStep}>Continue →</AuthBtn>
              </>
            ) : (
              <>
                <Pressable
                  style={s.backBtn}
                  onPress={() => {
                    setStep(1);
                    setErrors({});
                  }}
                >
                  <Text style={s.backBtnText}>← Back</Text>
                </Pressable>

                <AuthInput
                  label="Password"
                  placeholder="Min. 8 characters"
                  icon="🔒"
                  isPassword
                  value={form.password}
                  onChangeText={set("password")}
                  error={errors.password}
                  hint="Use uppercase, numbers and symbols"
                />

                {/* Strength meter */}
                {form.password.length > 0 && (
                  <View style={s.strengthBox}>
                    <View style={s.strengthBars}>
                      {[1, 2, 3, 4].map((n) => (
                        <View
                          key={n}
                          style={[
                            s.strengthBar,
                            {
                              backgroundColor:
                                s_val >= n ? STRENGTH_COLOR[s_val] : C.border,
                            },
                          ]}
                        />
                      ))}
                    </View>
                    <Text
                      style={[
                        s.strengthLabel,
                        { color: STRENGTH_COLOR[s_val] },
                      ]}
                    >
                      {STRENGTH_LABEL[s_val]} password
                    </Text>
                  </View>
                )}

                <AuthInput
                  label="Confirm Password"
                  placeholder="Repeat your password"
                  icon="🔒"
                  isPassword
                  value={form.confirm}
                  onChangeText={set("confirm")}
                  error={errors.confirm}
                />

                {/* Summary */}
                <View style={s.summary}>
                  <Text style={s.summaryTitle}>ACCOUNT SUMMARY</Text>
                  {[
                    { label: "Name", value: form.name || "—" },
                    { label: "Email", value: form.email || "—" },
                    { label: "Role", value: form.role, accent: true },
                  ].map((row) => (
                    <View key={row.label} style={s.summaryRow}>
                      <Text style={s.summaryKey}>{row.label}</Text>
                      <Text
                        style={[
                          s.summaryVal,
                          row.accent && { color: C.accent },
                        ]}
                      >
                        {row.value}
                      </Text>
                    </View>
                  ))}
                </View>

                <AuthBtn onPress={handleSubmit} loading={loading}>
                  Create Account
                </AuthBtn>
              </>
            )}
          </View>

          {!success && (
            <View style={s.footerRow}>
              <Text style={s.footerText}>Already have an account? </Text>
              <Pressable onPress={() => onNavigate("login")}>
                <Text style={s.footerLink}>Sign in</Text>
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
  subtitle: { fontSize: 14, color: C.textSub, marginBottom: 20 },

  stepRow: { flexDirection: "row", alignItems: "center", marginBottom: 24 },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: C.surfaceAlt,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  stepCircleActive: { backgroundColor: C.accent, borderColor: C.accent },
  stepNum: { fontSize: 11, fontWeight: "700", color: C.textMuted },
  stepNumActive: { color: "#fff" },
  stepLine: {
    flex: 1,
    height: 2,
    backgroundColor: C.border,
    marginHorizontal: 4,
  },
  stepLineActive: { backgroundColor: C.accent },

  fieldLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: C.textSub,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  roleGrid: { flexDirection: "row", gap: 10 },
  roleCard: {
    flex: 1,
    padding: 14,
    borderRadius: C.radiusSm,
    borderWidth: 2,
    borderColor: C.border,
    backgroundColor: C.surface,
  },
  roleCardActive: { borderColor: C.accent, backgroundColor: C.accentLight },
  roleIcon: { fontSize: 20, marginBottom: 6 },
  roleLabel: { fontSize: 13, fontWeight: "700", color: C.text },
  roleLabelActive: { color: C.accent },
  roleDesc: { fontSize: 11, color: C.textMuted, marginTop: 2 },

  backBtn: { marginBottom: 16 },
  backBtnText: { fontSize: 13, fontWeight: "600", color: C.textSub },

  strengthBox: { marginTop: -8, marginBottom: 14 },
  strengthBars: { flexDirection: "row", gap: 4, marginBottom: 5 },
  strengthBar: { flex: 1, height: 4, borderRadius: 99 },
  strengthLabel: { fontSize: 11, fontWeight: "600" },

  summary: {
    backgroundColor: C.surfaceAlt,
    borderRadius: C.radiusSm,
    padding: 14,
    marginBottom: 18,
  },
  summaryTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: C.textMuted,
    letterSpacing: 0.8,
    marginBottom: 10,
    textTransform: "uppercase",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  summaryKey: { fontSize: 13, color: C.textSub },
  summaryVal: {
    fontSize: 13,
    fontWeight: "600",
    color: C.text,
    textTransform: "capitalize",
  },

  successBox: {
    backgroundColor: C.successLight,
    borderRadius: C.radiusSm,
    padding: 24,
    alignItems: "center",
  },
  successTitle: { fontSize: 16, fontWeight: "800", color: C.success },
  successSub: { fontSize: 13, color: C.success, marginTop: 4, opacity: 0.8 },
  loginBtn: {
    marginTop: 16,
    backgroundColor: C.success,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: C.radiusSm,
  },
  loginBtnText: { color: "#fff", fontWeight: "700", fontSize: 13 },

  footerRow: { flexDirection: "row", justifyContent: "center" },
  footerText: { fontSize: 13, color: C.textSub },
  footerLink: { fontSize: 13, color: C.accent, fontWeight: "700" },
});
