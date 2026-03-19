import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { C } from "../../constants/colors";

interface DataPoint {
  label: string;
  value: number;
}

interface MiniBarChartProps {
  data: DataPoint[];
  color?: string;
}

export default function MiniBarChart({
  data,
  color = C.accent,
}: MiniBarChartProps) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <View style={s.container}>
      {data.map((d, i) => {
        const pct = max > 0 ? d.value / max : 0;
        return (
          <View key={i} style={s.col}>
            <View style={s.track}>
              <View
                style={[
                  s.bar,
                  { height: `${pct * 100}%` as any, backgroundColor: color },
                ]}
              />
            </View>
            <Text style={s.label}>{d.label}</Text>
          </View>
        );
      })}
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: 64,
    gap: 5,
  },
  col: { flex: 1, alignItems: "center", gap: 4 },
  track: {
    width: "100%",
    height: 52,
    backgroundColor: C.surfaceAlt,
    borderRadius: 4,
    justifyContent: "flex-end",
    overflow: "hidden",
  },
  bar: { width: "100%", borderRadius: 4 },
  label: { fontSize: 9, color: C.textMuted, fontWeight: "500" },
});
