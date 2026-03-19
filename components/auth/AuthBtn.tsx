import React from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { C } from "../../constants/colors";

interface AuthBtnProps {
  children: React.ReactNode;
  onPress?: () => void;
  loading?: boolean;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
}

export default function AuthBtn({
  children,
  onPress,
  loading,
  variant = "primary",
  style,
}: AuthBtnProps) {
  const isPrimary = variant === "primary";
  return (
    <Pressable
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        s.btn,
        isPrimary ? s.primary : s.secondary,
        (pressed || loading) && { opacity: 0.75 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? "#fff" : C.accent} size="small" />
      ) : (
        <Text style={[s.text, { color: isPrimary ? "#fff" : C.text }]}>
          {children}
        </Text>
      )}
    </Pressable>
  );
}

const s = StyleSheet.create({
  btn: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: C.radiusSm,
    alignItems: "center",
    justifyContent: "center",
  },
  primary: {
    backgroundColor: C.accent,
    elevation: 4,
  },
  secondary: {
    backgroundColor: C.surface,
    borderWidth: 1.5,
    borderColor: C.border,
    elevation: 1,
  },
  text: { fontSize: 14, fontWeight: "700", letterSpacing: 0.2 },
});
