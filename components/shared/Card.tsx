import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { C } from "../../constants/colors";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export default function Card({ children, style }: CardProps) {
  return <View style={[s.card, style]}>{children}</View>;
}

const s = StyleSheet.create({
  card: {
    backgroundColor: C.surface,
    borderRadius: C.radius,
    borderWidth: 1,
    borderColor: C.border,
    // Android shadow
    elevation: 2,
  },
});
