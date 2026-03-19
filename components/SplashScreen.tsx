import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

// ─── DEV MODE ───────────────────────────────────────────────────────────────
// Set to `true` while designing the splash screen.
// The auto-exit timer is disabled and a "Continue →" button appears instead.
// Flip back to `false` before shipping to production.
const DEV_MODE = true;
// ─────────────────────────────────────────────────────────────────────────────

interface SplashScreenProps {
  onFinish?: () => void;
  appName?: string;
  tagline?: string;
}

const SplashScreen: React.FC<SplashScreenProps> = ({
  onFinish,
  appName = "GOLD'S GYM",
  tagline = "The future, simplified.",
}) => {
  // --- Animated Values ---
  const bgOpacity = useRef(new Animated.Value(0)).current;
  const ringScale1 = useRef(new Animated.Value(0)).current;
  const ringScale2 = useRef(new Animated.Value(0)).current;
  const ringScale3 = useRef(new Animated.Value(0)).current;
  const ringOpacity1 = useRef(new Animated.Value(0)).current;
  const ringOpacity2 = useRef(new Animated.Value(0)).current;
  const ringOpacity3 = useRef(new Animated.Value(0)).current;
  const orbitRotation = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const glowPulse = useRef(new Animated.Value(0.6)).current;
  const titleTranslateY = useRef(new Animated.Value(30)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const taglineTranslateY = useRef(new Animated.Value(20)).current;
  const taglineOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;
  const exitOpacity = useRef(new Animated.Value(1)).current;
  const exitScale = useRef(new Animated.Value(1)).current;
  const shimmerX = useRef(new Animated.Value(-width)).current;

  useEffect(() => {
    // 1. Background fade in
    Animated.timing(bgOpacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();

    // 2. Expanding rings
    const ringDelay = (
      delay: number,
      scale: Animated.Value,
      opacity: Animated.Value,
    ) =>
      Animated.sequence([
        Animated.delay(delay),
        Animated.parallel([
          Animated.spring(scale, {
            toValue: 1,
            tension: 40,
            friction: 6,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ]);

    ringDelay(200, ringScale1, ringOpacity1).start();
    ringDelay(350, ringScale2, ringOpacity2).start();
    ringDelay(500, ringScale3, ringOpacity3).start();

    // 3. Orbit dot rotation (continuous)
    Animated.loop(
      Animated.timing(orbitRotation, {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    // 4. Logo entrance
    Animated.sequence([
      Animated.delay(400),
      Animated.parallel([
        Animated.spring(logoScale, {
          toValue: 1,
          tension: 50,
          friction: 5,
          useNativeDriver: true,
        }),
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 5. Glow pulse (continuous)
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowPulse, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(glowPulse, {
          toValue: 0.5,
          duration: 1500,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // 6. Title slide up
    Animated.sequence([
      Animated.delay(700),
      Animated.parallel([
        Animated.spring(titleTranslateY, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 7. Tagline slide up
    Animated.sequence([
      Animated.delay(950),
      Animated.parallel([
        Animated.spring(taglineTranslateY, {
          toValue: 0,
          tension: 60,
          friction: 8,
          useNativeDriver: true,
        }),
        Animated.timing(taglineOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // 8. Loading dots appear
    Animated.sequence([
      Animated.delay(1200),
      Animated.timing(dotsOpacity, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();

    // 9. Shimmer sweep
    Animated.loop(
      Animated.sequence([
        Animated.delay(1400),
        Animated.timing(shimmerX, {
          toValue: width * 2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(shimmerX, {
          toValue: -width,
          duration: 0,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // 10. Exit after 3.2s — skipped in DEV_MODE
    if (DEV_MODE) return; // freeze here, manual button handles navigation

    const exitTimer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(exitOpacity, {
          toValue: 0,
          duration: 600,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(exitScale, {
          toValue: 1.08,
          duration: 600,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => onFinish?.());
    }, 3200);

    return () => clearTimeout(exitTimer);
  }, []);

  const orbitSpin = orbitRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        { opacity: exitOpacity, transform: [{ scale: exitScale }] },
      ]}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#F7F8FA" />

      {/* Background */}
      <Animated.View style={[styles.bg, { opacity: bgOpacity }]} />

      {/* Particle dots (static decorative) */}
      {PARTICLES.map((p, i) => (
        <View
          key={i}
          style={[
            styles.particle,
            { top: p.y, left: p.x, width: p.s, height: p.s, opacity: p.o },
          ]}
        />
      ))}

      {/* Center orbital system */}
      <View style={styles.orbitalCenter}>
        {/* Ring 3 — outermost */}
        <Animated.View
          style={[
            styles.ring,
            styles.ring3,
            { transform: [{ scale: ringScale3 }], opacity: ringOpacity3 },
          ]}
        />

        {/* Ring 2 */}
        <Animated.View
          style={[
            styles.ring,
            styles.ring2,
            { transform: [{ scale: ringScale2 }], opacity: ringOpacity2 },
          ]}
        />

        {/* Ring 1 */}
        <Animated.View
          style={[
            styles.ring,
            styles.ring1,
            { transform: [{ scale: ringScale1 }], opacity: ringOpacity1 },
          ]}
        />

        {/* Orbiting dot */}
        <Animated.View
          style={[styles.orbitTrack, { transform: [{ rotate: orbitSpin }] }]}
        >
          <View style={styles.orbitDot} />
        </Animated.View>

        {/* Glow behind logo */}
        <Animated.View style={[styles.glow, { opacity: glowPulse }]} />

        {/* Logo mark */}
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            },
          ]}
        >
          {/* Hexagonal logo shape */}
          <View style={styles.hexOuter}>
            <View style={styles.hexInner}>
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logoImage}
                resizeMode="contain"
              />
              {/* Shimmer overlay */}
              <Animated.View
                style={[
                  styles.shimmer,
                  { transform: [{ translateX: shimmerX }] },
                ]}
              />
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Text block */}
      <View style={styles.textBlock}>
        <Animated.Text
          style={[
            styles.appName,
            {
              opacity: titleOpacity,
              transform: [{ translateY: titleTranslateY }],
            },
          ]}
        >
          {appName}
        </Animated.Text>

        <Animated.Text
          style={[
            styles.tagline,
            {
              opacity: taglineOpacity,
              transform: [{ translateY: taglineTranslateY }],
            },
          ]}
        >
          {tagline}
        </Animated.Text>

        {/* Loading indicator */}
        <Animated.View style={[styles.dotsRow, { opacity: dotsOpacity }]}>
          <LoadingDots />
        </Animated.View>
      </View>

      {/* Bottom version stamp */}
      <Animated.Text style={[styles.version, { opacity: taglineOpacity }]}>
        v1.0.0
      </Animated.Text>

      {/* DEV MODE overlay */}
      {DEV_MODE && (
        <View style={styles.devOverlay}>
          <View style={styles.devBadge}>
            <Text style={styles.devBadgeText}>⚙ DEV MODE</Text>
          </View>
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.75}
            onPress={() => {
              Animated.parallel([
                Animated.timing(exitOpacity, {
                  toValue: 0,
                  duration: 600,
                  easing: Easing.in(Easing.ease),
                  useNativeDriver: true,
                }),
                Animated.timing(exitScale, {
                  toValue: 1.08,
                  duration: 600,
                  easing: Easing.in(Easing.ease),
                  useNativeDriver: true,
                }),
              ]).start(() => onFinish?.());
            }}
          >
            <Text style={styles.continueBtnText}>Continue →</Text>
          </TouchableOpacity>
        </View>
      )}
    </Animated.View>
  );
};

/* ─── Loading Dots Sub-Component ─────────────────────────────────────────── */
const LoadingDots: React.FC = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const bounce = (val: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(val, {
            toValue: -8,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.delay(600),
        ]),
      );
    bounce(dot1, 0).start();
    bounce(dot2, 150).start();
    bounce(dot3, 300).start();
  }, []);

  return (
    <View style={styles.dotsInner}>
      {[dot1, dot2, dot3].map((d, i) => (
        <Animated.View
          key={i}
          style={[styles.dot, { transform: [{ translateY: d }] }]}
        />
      ))}
    </View>
  );
};

/* ─── Static Particle Data ────────────────────────────────────────────────── */
const PARTICLES = Array.from({ length: 40 }, () => ({
  x: Math.random() * width,
  y: Math.random() * height,
  s: Math.random() * 2.5 + 0.5,
  o: Math.random() * 0.12 + 0.04, // subtle on light bg
}));

/* ─── Theme (mirrors C from constants/colors) ────────────────────────────── */
const ACCENT = "#2563EB"; // C.accent
const ACCENT_DARK = "#1D4ED8"; // C.accentDark
const ACCENT_LIGHT = "#EFF4FF"; // C.accentLight
const BG = "#F7F8FA"; // C.bg
const TEXT = "#0F1724"; // C.text
const TEXT_SUB = "#6B7483"; // C.textSub

const LOGO_SIZE = 96;
const RING1 = 130;
const RING2 = 185;
const RING3 = 240;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BG,
  },
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: BG,
  },
  particle: {
    position: "absolute",
    borderRadius: 99,
    backgroundColor: ACCENT, // blue specks instead of white
  },

  /* Orbital rings */
  orbitalCenter: {
    width: RING3,
    height: RING3,
    alignItems: "center",
    justifyContent: "center",
  },
  ring: {
    position: "absolute",
    borderRadius: 999,
    borderWidth: 1,
  },
  ring1: {
    width: RING1,
    height: RING1,
    borderColor: `${ACCENT}55`,
  },
  ring2: {
    width: RING2,
    height: RING2,
    borderColor: `${ACCENT_DARK}40`,
    borderStyle: "dashed",
  },
  ring3: {
    width: RING3,
    height: RING3,
    borderColor: `${ACCENT}25`,
  },

  /* Orbiting dot */
  orbitTrack: {
    position: "absolute",
    width: RING2,
    height: RING2,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  orbitDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: ACCENT,
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },

  /* Glow */
  glow: {
    position: "absolute",
    width: LOGO_SIZE + 60,
    height: LOGO_SIZE + 60,
    borderRadius: (LOGO_SIZE + 60) / 2,
    backgroundColor: ACCENT_LIGHT,
    opacity: 0.9,
  },

  /* Logo */
  logoContainer: {
    position: "absolute",
  },
  hexOuter: {
    width: LOGO_SIZE,
    height: LOGO_SIZE,
    borderRadius: LOGO_SIZE * 0.28,
    backgroundColor: ACCENT_LIGHT,
    borderWidth: 1.5,
    borderColor: ACCENT,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    shadowColor: ACCENT,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 16,
  },
  hexInner: {
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    height: "100%",
  },
  logoImage: {
    width: LOGO_SIZE * 0.65,
    height: LOGO_SIZE * 0.65,
  },
  shimmer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    width: 40,
    backgroundColor: "rgba(255,255,255,0.45)",
    transform: [{ skewX: "-20deg" }],
  },

  /* Text */
  textBlock: {
    marginTop: 52,
    alignItems: "center",
  },
  appName: {
    fontSize: 42,
    fontWeight: "800",
    letterSpacing: 14,
    color: TEXT,
    textShadowColor: `${ACCENT}33`,
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  tagline: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "300",
    letterSpacing: 3,
    color: TEXT_SUB,
    textTransform: "uppercase",
  },

  /* Dots */
  dotsRow: {
    marginTop: 40,
  },
  dotsInner: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: ACCENT,
    opacity: 0.85,
  },

  /* Version */
  version: {
    position: "absolute",
    bottom: 36,
    fontSize: 11,
    letterSpacing: 2,
    color: TEXT_SUB,
    opacity: 0.4,
  },

  /* DEV MODE */
  devOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "box-none",
  },
  devBadge: {
    position: "absolute",
    top: 52,
    right: 16,
    backgroundColor: "rgba(255, 180, 0, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(255, 180, 0, 0.55)",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  devBadgeText: {
    color: "#D97706",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 1.5,
  },
  continueBtn: {
    position: "absolute",
    bottom: 80,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: `${ACCENT}88`,
    borderRadius: 30,
    paddingHorizontal: 32,
    paddingVertical: 12,
    backgroundColor: ACCENT_LIGHT,
  },
  continueBtnText: {
    color: ACCENT,
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 2,
  },
});

export default SplashScreen;
