import React, { useState } from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";
import { C } from "../../constants/colors";

interface InputProps extends TextInputProps {
  style?: TextStyle;
}

export default function Input({ style, ...props }: InputProps) {
  const [focused, setFocused] = useState(false);
  return (
    <TextInput
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      style={[s.input, focused && s.focused, style]}
      placeholderTextColor={C.textMuted}
    />
  );
}

const s = StyleSheet.create({
  input: {
    backgroundColor: C.surfaceAlt,
    borderWidth: 1.5,
    borderColor: C.border,
    borderRadius: C.radiusSm,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: C.text,
  },
  focused: {
    borderColor: C.accent,
    backgroundColor: C.surface,
  },
});
