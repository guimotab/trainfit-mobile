import { StyleSheet } from 'react-native';
export const cor = {
    primaria: '#EEEEEE',
    secundaria: '#176B87',
    terciaria: '#053B50',
    darkBlack: '#111111',
    black: '#202020',
    outline: '#002b3b',
    hover: '#1f86a8',
    erro: "#df3636",
    delete: "#8d2323",
    deleteHover: "#a32b2b",
    green700: "#15803d",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827",
}
export const styles = StyleSheet.create({
    fontGlobal: {

    }
    // fontFamily: 
})
interface FontInterface {
    medium: "500"
    semibold: "600"
    bold: "700"
    extraBold: "800"
    family: string
}
export const font = {
    medium: "500",
    semibold: "600",
    bold: "700",
    extraBold: "800",
} as FontInterface
