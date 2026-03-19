import React, { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { C } from "../../constants/colors";

interface AuthInputProps extends TextInputProps {
  label: string;
  icon?: string;
  error?: string;
  hint?: string;
  isPassword?: boolean;
}

export default function AuthInput({
  label,
  icon,
  error,
  hint,
  isPassword,
  ...props
}: AuthInputProps) {
  const [focused, setFocused] = useState(false);
  const [showPass, setShowPass] = useState(false);

  return (
    <View style={s.wrapper}>
      <Text style={s.label}>{label}</Text>
      <View
        style={[s.inputRow, focused && s.inputFocused, !!error && s.inputError]}
      >
        {icon && (
          <Text style={[s.icon, { color: focused ? C.accent : C.textMuted }]}>
            {icon}
          </Text>
        )}
        <TextInput
          {...props}
          secureTextEntry={isPassword && !showPass}
          onFocus={(e) => {
            setFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            props.onBlur?.(e);
          }}
          style={s.input}
          placeholderTextColor={C.textMuted}
          autoCapitalize="none"
        />
        {isPassword && (
          <Pressable onPress={() => setShowPass(!showPass)} hitSlop={8}>
            <Text style={s.icon}>{showPass ? "🙈" : "👁️"}</Text>
          </Pressable>
        )}
      </View>
      {error ? (
        <Text style={s.error}>{error}</Text>
      ) : hint ? (
        <Text style={s.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  label: {
    fontSize: 11,
    fontWeight: "700",
    color: C.textSub,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 7,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.surfaceAlt,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: C.radiusSm,
    paddingHorizontal: 12,
    gap: 8,
  },
  inputFocused: { borderColor: C.accent, backgroundColor: C.surface },
  inputError: { borderColor: C.danger },
  icon: { fontSize: 16 },
  input: { flex: 1, paddingVertical: 11, fontSize: 14, color: C.text },
  error: { fontSize: 12, color: C.danger, fontWeight: "500", marginTop: 4 },
  hint: { fontSize: 12, color: C.textMuted, marginTop: 4 },
});
