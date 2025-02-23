import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card : "var(--card)",
        cardForeground: "var(--card-foreground)", 
        popover : "var(--popover)",
        popoverForeground: "var(--popover-foreground)",
        primary: "var(--primary)",
        primaryForeground: "var(--primary-foreground)",
        secondary: "var(--secondary)",
        secondaryForeground: "var(--secondary-foreground)",
        accent: "var(--accent)",
        accentForeground: "var(--accent-foreground)",
        muted: "var(--muted)",
        mutedForeground: "var(--muted-foreground)",
        destructive: "var(--destructive)",
        destructiveForeground: "var(--destructive-foreground)",
        border : "var(--border)",
        input : "var(--input)",
        ring : "var(--ring)",
        radius : "var(--radius)",
        chart1 : "var(--chart1)",
        chart2 : "var(--chart2)",
        chart3 : "var(--chart3)",
        chart4 : "var(--chart4)",
        chart5 : "var(--chart5)",
      },
    },
  },
  plugins: [],
} satisfies Config;
