import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Modal as RNModal,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
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
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable style={s.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={s.kav}
        >
          <Pressable
            style={[
              s.sheet,
              isLandscape
                ? {
                    // Landscape: centered floating dialog
                    width: width * 0.55,
                    maxHeight: height * 0.9,
                    borderRadius: C.radiusLg,
                    alignSelf: "center",
                  }
                : {
                    // Portrait: bottom sheet
                    width: "100%",
                    maxHeight: height * 0.85,
                    borderTopLeftRadius: C.radiusLg,
                    borderTopRightRadius: C.radiusLg,
                  },
            ]}
            onPress={() => {}}
          >
            {/* Header */}
            <View style={s.header}>
              <Text style={s.title}>{title}</Text>
              <Pressable onPress={onClose} hitSlop={12}>
                <Text style={s.close}>✕</Text>
              </Pressable>
            </View>

            {/* Body — scrollable so buttons always reachable */}
            <ScrollView
              style={{ flexShrink: 1 }}
              contentContainerStyle={s.body}
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
    justifyContent: "center",
    alignItems: "center",
  },
  kav: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  sheet: {
    backgroundColor: C.surface,
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
  body: { padding: 20, paddingBottom: 32 },
});
