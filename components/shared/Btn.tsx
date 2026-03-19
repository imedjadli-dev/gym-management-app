import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { C } from "../../constants/colors";

type BtnVariant = "primary" | "secondary" | "danger" | "success" | "ghost";

interface BtnProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: BtnVariant;
  small?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
}

const VARIANTS: Record<
  BtnVariant,
  { bg: string; color: string; border?: string }
> = {
  primary: { bg: C.accent, color: "#fff" },
  secondary: { bg: C.surfaceAlt, color: C.text, border: C.border },
  danger: { bg: C.dangerLight, color: C.danger, border: C.danger + "30" },
  success: { bg: C.successLight, color: C.success, border: C.success + "30" },
  ghost: { bg: "transparent", color: C.textSub },
};

export default function Btn({
  children,
  onPress,
  variant = "primary",
  small,
  style,
  disabled,
}: BtnProps) {
  const v = VARIANTS[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        s.base,
        {
          backgroundColor: v.bg,
          borderColor: v.border ?? "transparent",
          borderWidth: v.border ? 1 : 0,
          paddingVertical: small ? 6 : 9,
          paddingHorizontal: small ? 12 : 16,
          opacity: pressed || disabled ? 0.75 : 1,
        },
        style,
      ]}
    >
      <Text style={[s.text, { color: v.color, fontSize: small ? 12 : 13 }]}>
        {children}
      </Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  base: {
    borderRadius: C.radiusSm,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  text: { fontWeight: "600", letterSpacing: 0.1 },
});
