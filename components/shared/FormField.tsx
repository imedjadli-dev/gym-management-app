import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { C } from "../../constants/colors";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
}

export default function FormField({ label, children, error }: FormFieldProps) {
  return (
    <View style={s.container}>
      <Text style={s.label}>{label}</Text>
      {children}
      {error && <Text style={s.error}>{error}</Text>}
    </View>
  );
}

const s = StyleSheet.create({
  container: { marginBottom: 16 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: C.textSub,
    letterSpacing: 0.6,
    textTransform: "uppercase",
    marginBottom: 6,
  },
  error: { fontSize: 12, color: C.danger, fontWeight: "500", marginTop: 4 },
});
