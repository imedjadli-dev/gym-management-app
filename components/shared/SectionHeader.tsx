import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { C } from "../../constants/colors";

interface SectionHeaderProps {
  title: string;
  action?: React.ReactNode;
}

export default function SectionHeader({ title, action }: SectionHeaderProps) {
  return (
    <View style={s.row}>
      <Text style={s.title}>{title}</Text>
      {action}
    </View>
  );
}

const s = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  title: { fontSize: 17, fontWeight: "700", color: C.text },
});
