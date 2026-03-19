import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { C } from "../../constants/colors";

interface ModalProps {
  title: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  title,
  visible,
  onClose,
  children,
}: ModalProps) {
  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={s.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={s.kav}
        >
          <Pressable style={s.sheet} onPress={() => {}}>
            {/* Header */}
            <View style={s.header}>
              <Text style={s.title}>{title}</Text>
              <Pressable onPress={onClose} hitSlop={12}>
                <Text style={s.close}>✕</Text>
              </Pressable>
            </View>
            {/* Body */}
            <ScrollView
              style={s.body}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              {children}
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </RNModal>
  );
}

const s = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(15,23,36,0.45)",
    justifyContent: "flex-end",
  },
  kav: { justifyContent: "flex-end" },
  sheet: {
    backgroundColor: C.surface,
    borderTopLeftRadius: C.radiusLg,
    borderTopRightRadius: C.radiusLg,
    maxHeight: "85%",
    elevation: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  title: { fontSize: 16, fontWeight: "700", color: C.text },
  close: { fontSize: 18, color: C.textMuted },
  body: { padding: 20 },
});
