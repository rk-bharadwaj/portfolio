export const personalInfo = {
  name: "R KIRAN BHARADWAJ",
  headline: "Embedded Systems & Full-Stack IoT Developer",
  subheadline: "Hardware & Firmware Engineer",
  bio: "I bridge the gap between physical electronics and the digital world. I design custom PCBs, write C/C++, MicroPython firmware for microcontrollers, and build web dashboards to connect physical devices to the cloud—taking ideas from scratch to complete IoT solutions.",
  location: "Puttur, Karnataka, India // UTC+05:30",
  status: "ONLINE // AVAILABLE FOR HIRE & COLLABORATION",
  email: "rkb.88856[at]gmail.com",
  // 📬 ATTACH RECEIVING EMAIL ID:
  recipientEmail: "rkb.88856@gmail.com",
  // 📬 Formspree Endpoint ID for Contact Form:
  formspreeId: "xwlonkqq",
  phone: "+91 9019388856",
  phoneRaw: "919019388856",
  github: "https://github.com/rk-bharadwaj",
  linkedin: "https://linkedin.com/in/rk-bharadwaj",
  metrics: [
    { label: "SYS_STATUS", value: "ACTIVE // NOMINAL", color: "emerald" },
    { label: "CLOCK_SPEED", value: "240 MHz (ESP32) / 72 MHz (STM32)", color: "cyan" },
    { label: "BUS_INTERFACES", value: "I2C / SPI / UART / PWM", color: "cyan" },
    { label: "DOMAIN_SCOPE", value: "SILICON TO WEB DASHBOARD", color: "emerald" }
  ]
};

// 3 Core Pillars of Expertise
export const coreExpertise = [
  {
    id: "hardware",
    number: "01",
    title: "Hardware & PCB Design",
    description: "Designing reliable electronic circuits, creating custom schematic captures, laying out PCBs, and prototyping physical hardware from scratch.",
    badge: "CIRCUITS & SCHEMATICS",
    accentColor: "cyan",
    technologies: ["Schematic Design", "PCB Layout (KiCad)", "Circuit Prototyping", "Power Management", "DFM / DRC"]
  },
  {
    id: "firmware",
    number: "02",
    title: "Firmware Coding",
    description: "Writing optimized low-level code in C/C++ for microcontrollers and development boards to control sensors, peripherals, and communication protocols.",
    badge: "LOW-LEVEL FIRMWARE",
    accentColor: "emerald",
    technologies: ["C & C++", "MicroPython", "ARM Cortex-M (STM32)", "Xtensa(ESP32)", "FreeRTOS"]
  },
  {
    id: "iot-web",
    number: "03",
    title: "Web & IoT Integration",
    description: "Connecting physical hardware to the internet and building responsive web dashboards using HTML, CSS, and JavaScript to monitor and control devices.",
    badge: "IOT & FULL-STACK",
    accentColor: "cyan",
    technologies: ["HTML & CSS", "JavaScript", "IoT Dashboard UI"]
  }
];

// Categorized Skills Matrix with Pill-Shaped Badges
export const skillGroups = [
  {
    category: "Hardware & PCB",
    tag: "EDA_AND_CIRCUITS",
    accent: "cyan",
    skills: [
      "Schematic Design",
      "PCB Layout",
      "Circuit Prototyping",
      "Microcontroller & Dev Boards",
      "Electronic Testing"
    ]
  },
  {
    category: "Firmware & Programming",
    tag: "LOW_LEVEL_CODE",
    accent: "emerald",
    skills: [
      "C",
      "C++",
      "Embedded Firmware",
      "Hardware-Software Debugging"
    ]
  },
  {
    category: "Web & IoT Software",
    tag: "EDGE_TO_CLOUD",
    accent: "cyan",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Java",
      "IoT Device Integration"
    ]
  },
  {
    category: "Systems & Diagnostics",
    tag: "LAB_AND_SERVICING",
    accent: "emerald",
    skills: [
      "Computer Hardware Servicing",
      "Software Troubleshooting",
      "System Assembly",
      "Fault Diagnostics"
    ]
  }
];

// Featured Projects with Category Filter Tabs
export const projectTabs = [
  { id: "all", label: "All" },
  { id: "hardware", label: "Hardware / PCB Design" },
  { id: "firmware", label: "Firmware Coding" }
];

export const featuredProjects = [
  {
    id: "rf-transmitter",
    title: "Transistor-Based Radio Frequency Transmitter",
    category: "hardware",
    categoryLabel: "Hardware / PCB Design",
    summary: "A discrete RF audio transmitter built with a 2N2222A transistor, using 18 pF and 27 pF ceramic capacitors along with a 1 kΩ potentiometer to tune the frequency and transmit clear microphone audio over short distances.",
    tags: ["2N2222A NPN BJT", "Universal PCB", "RF Modulation"],
    schematicSpecs: {
      topology: "Common-Emitter High-Frequency Colpitts Oscillator",
      activeComponent: "High-Frequency NPN Transistor (2N3904 / 2N2222A)",
      tankTuning: "Hand-Wound Inductor (L) + Variable Trimmer Capacitor (C)",
      powerSupply: "3.7V - 9V DC Regulated Rail",
      antenna: "1/4 Wavelength Monopole with Low-Pass Filtering"
    },
    codeUrl: "https://github.com/rk-bharadwaj/transistor-based-rf-transmitter.git",
    demoUrl: "https://github.com/rk-bharadwaj/transistor-based-rf-transmitter.git",
    badge: "HARDWARE PROTOTYPE",
    accent: "cyan"
  },
  {
    id: "stm32-simon",
    title: "HK32F103 Electronic Memory Sequence Game",
    category: "firmware",
    categoryLabel: "Firmware Coding",
    summary: "An interactive cognitive training and memory sequence game built on the ARM Cortex-M3. Built with real-time interrupts and physical controls, it gives you the original, hands-on feel of hardware working in real time.",
    tags: ["HK32F103", "ARM Cortex-M3", "Embedded C / C++", "Buzzer Audio", "Real-Time Input", "Flash Memory"],
    schematicSpecs: {
      processor: "HK32F103C8T6 (72MHz ARM Cortex-M3, 64KB Flash)",
      audioSynthesis: "Hardware Timer PWM generating 4 discrete musical note frequencies",
      inputs: "4x Tactile Switches with EXTI debounced hardware interrupts",
      persistence: "Internal Flash page emulation for persistent top scores",
      stateMachine: "Deterministic non-blocking event-driven loop"
    },
    codeUrl: "https://github.com/rk-bharadwaj/hk32f103-electronic-memory-sequence-game.git",
    demoUrl: "https://github.com/rk-bharadwaj/hk32f103-electronic-memory-sequence-game.git",
    badge: "FIRMWARE C/C++",
    accent: "emerald"
  },
  {
    id: "oled-hill-climb-game",
    title: "ESP32 Hill Climb Racing Game",
    category: "firmware",
    categoryLabel: "Firmware Coding",
    summary: "Real-time 2D physics engine and procedural terrain generation written from scratch in C/C++ on ESP32. Drives an 0.96 inch OLED display module over high-speed 400kHz I2C with analog joystick control.",
    tags: ["ESP32", "Embedded C/C++", "0.96inch OLED Display", "I2C Communication", "Analog Joystick"],
    schematicSpecs: {
      mcu: "ESP32-WROOM-32 (Xtensa Dual-Core 240MHz)",
      displayBus: "I2C Fast Mode (400kHz) with double-buffered byte array",
      controls: "2-Axis Analog Resistive Joystick with deadzone smoothing",
      physics: "Verlet numerical integration for chassis damping and wheel traction",
      performance: "Locked 60 FPS frame buffer rendering"
    },
    codeUrl: "https://github.com/rk-bharadwaj/oled-hill-climb-game.git",
    demoUrl: "https://github.com/rk-bharadwaj/oled-hill-climb-game.git",
    badge: "FIRMWARE + DRIVER",
    accent: "emerald"
  }
];
