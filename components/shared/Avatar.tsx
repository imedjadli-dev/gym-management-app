import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { C } from "../../constants/colors";

interface AvatarProps {
  initials: string;
  size?: number;
}

export default function Avatar({ initials, size = 36 }: AvatarProps) {
  return (
    <View
      style={[
        s.container,
        { width: size, height: size, borderRadius: size / 2 },
      ]}
    >
      <Text style={[s.text, { fontSize: size * 0.33 }]}>{initials}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    backgroundColor: C.accentLight,
    borderWidth: 2,
    borderColor: C.border,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: C.accent,
    fontWeight: "700",
  },
});
