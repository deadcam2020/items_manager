import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        padding: 20,
        fontSize: 12
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 6
    },
    label: {
        fontWeight: "bold"
    },
    value: {
        textAlign: "right"
    }
});

const PDF = ({ item }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>

                <Text style={styles.title}>ITEMS MANAGER</Text>

                {/* Ejemplo de filas */}
                <View style={styles.row}>
                    <Text style={styles.label}>Factura:</Text>
                    <Text style={styles.value}>{item.id}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Cliente:</Text>
                    <Text style={styles.value}>{item.buyer_name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Vendedor:</Text>
                    <Text style={styles.value}>{item.seller_name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Método de pago:</Text>
                    <Text style={styles.value}>{item.payment_method}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Producto:</Text>
                    <Text style={styles.value}>{item.title}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.value}>
                        {new Date(item.created_at).toLocaleDateString()}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Precio:</Text>
                    <Text style={styles.value}>${Number(item.unit_price).toLocaleString()} COP</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Cantidad:</Text>
                    <Text style={styles.value}>{Number(item.quantity).toLocaleString()} </Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Total:</Text>
                    <Text style={styles.value}>${Number(item.total_price).toLocaleString()} COP</Text>
                </View>

            </Page>
        </Document>
    );
};

export default PDF;
