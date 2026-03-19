import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { C } from "../../constants/colors";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  value,
  onChange,
  options,
  placeholder = "Select...",
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const selected = options.find((o) => o.value === value);

  return (
    <>
      <Pressable style={s.trigger} onPress={() => setOpen(true)}>
        <Text style={[s.triggerText, !selected && { color: C.textMuted }]}>
          {selected ? selected.label : placeholder}
        </Text>
        <Text style={s.arrow}>▾</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={s.overlay} onPress={() => setOpen(false)}>
          <View style={s.sheet}>
            <Text style={s.sheetTitle}>{placeholder}</Text>
            <ScrollView>
              {options.map((opt) => (
                <Pressable
                  key={opt.value}
                  style={[s.option, opt.value === value && s.optionActive]}
                  onPress={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                >
                  <Text
                    style={[
                      s.optionText,
                      opt.value === value && s.optionTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                  {opt.value === value && <Text style={s.check}>✓</Text>}
                </Pressable>
              ))}
            </ScrollView>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const s = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: C.surfaceAlt,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: C.radiusSm,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  triggerText: { fontSize: 13, color: C.text, flex: 1 },
  arrow: { fontSize: 12, color: C.textMuted },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,36,0.4)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: C.surface,
    borderTopLeftRadius: C.radiusLg,
    borderTopRightRadius: C.radiusLg,
    padding: 20,
    maxHeight: "60%",
    elevation: 16,
  },
  sheetTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: C.textSub,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 12,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  optionActive: {},
  optionText: { fontSize: 14, color: C.text },
  optionTextActive: { color: C.accent, fontWeight: "700" },
  check: { fontSize: 14, color: C.accent, fontWeight: "700" },
});
