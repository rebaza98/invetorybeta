//npm i react-pdf-tailwind --save --legacy-peer-deps
"use client"
import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Line } from '@react-pdf/renderer';
import { createTw,  } from "react-pdf-tailwind";

import dynamic from "next/dynamic";
import { formatearFecha, retornaFechaSistema } from '@/utils/core/utils';

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
);

 
// The 'theme' object is your Tailwind theme config
const tw = createTw({
  // page: {
  //   flexDirection: 'row',
  //   backgroundColor: '#DBEAFE',
  // },
  // section: {
  //   margin: 10,
  //   padding: 10,
  //   flexGrow: 1,
  // },
   
});
 
// const styles = StyleSheet.create({
//   page: {
//     flexDirection: 'column',
//     backgroundColor: '#FFFFFF',
//   },
//   section: {
//     margin: 10,
//     padding: 10,
//     flexGrow: 1,
//   },
// });    {String(rs.ocEmpresa).padStart(5, '0')}

const numProducts = 20; // Número de productos



const RsPDF = ({rs}) => {

  const retornaEstado = () => {

    if (rs.estado === "PENDIENTE"){
      return "text-yellow-500"
    }
    if (rs.estado === "SELECCION"){
      return "text-blue-500"
    }
    if (rs.estado === "ANULADA"){
      return "text-red-500"
    }
    if (rs.estado === "INGRESADA"){
      return "text-green-500"
    }
    return "text-black"
  
  }

  let anchoProducto = "2/5"
  let anchoColumnas = "1/5"
  let orientationPagina = "portrait"
  if (rs.ingresadoAlmacen || rs.estado =="PENDIENTE"){
      anchoProducto = "2/6"
      anchoColumnas = "1/6"
      orientationPagina = "landscape"
  }

  const fechaFormateada = formatearFecha(rs.fechaRegulacion)

  return (
      <PDFViewer style={{ width: "100%", height: "90vh" }} >
        <Document>
        <Page 
          orientation={orientationPagina}
          size="A4" 
          style={tw("p-4")}

          
          
        >
          <View style={tw("flex w-full justify-between flex-row gap-2")} >
            <View style={tw("w-3/6 p-2 text-center")} >
              <Text style={tw("text-sm m-0")} >
                REGULACION SALIDA
              </Text>
              <Text style={{ marginTop: 0, marginBottom: 0 }} >
                {String(rs.regulacionSalidaEmpresa).padStart(5, '0')}
              </Text>
            </View>
            <View style={tw("w-1/3 p-2")} >
              <Text style={tw("text-xs m-0")} >
                Empresa
              </Text>
              <Text style={tw("text-sm m-0")} >
                {rs.empresa?.nombreEmpresa}
              </Text>
            </View>
            <View style={tw("w-1/3 p-2")} >
            <Text style={tw("text-xs m-0")} >
                Estado:
              </Text>
              <Text style={tw(`text-sm ${retornaEstado()}`)} >
                {rs.estado}
              </Text>
            </View>
          </View>
          <View style={tw("flex w-full justify-between flex-row gap-2")} >
            <View style={tw("w-3/6 p-2")} >
              {/* <Text style={tw("font-bold text-xs")} >
                Datos Proveedor:
              </Text>
              <Text style={tw("text-xs font-bold")} >
                Razon Social: {rs.proveedor?.razonSocial}
              </Text>
              <Text style={tw("text-xs font-bold")} >
                {rs.proveedor?.docId.nombre}: {rs.proveedor?.numeroDoc}
              </Text> */}
              <Text style={tw("text-xs font-bold")} >
                Fecha: {fechaFormateada}
              </Text>
            </View>
            <View style={tw("w-1/3 p-2")} >
              <Text style={tw("text-xs m-0")} >
                Usuario
              </Text>
              <Text style={tw("text-sm m-0")} >
                {rs.usuario?.user}
              </Text>
            </View>
            <View style={tw("w-1/3 p-2")} >
              {rs.ingresadoAlmacen && (
                <>
                  <View style={tw("flex flex-row justify-between")} >
                    <Text style={tw("text-xs m-0")} >
                      Movimiento Almacen:
                    </Text>
                    <Text style={tw("text-xs m-0")} >
                      {String(rs.movAlmacen.movimientoRef.movimientoEmpresa).padStart(5, '0')}
                    </Text>
                  </View>
                  <View style={tw("flex flex-row justify-between")} >
                    <Text style={tw("text-xs m-0")} >
                      Fecha Ingreso:
                    </Text>
                    <Text style={tw("text-xs m-0")} >
                      {formatearFecha(rs.movAlmacen.movimientoRef.fechaMovimiento)}
                    </Text>
                  </View>
                </>
              )}
              
            </View>
          </View>
          {/* DETALLE */}
          <View style={tw("border rounded-md mt-4")}>
            {/* CABECERA */}
            <View style={tw("flex flex-row text-center border-b")} >
              <View style={tw(`w-${anchoProducto} p-2 text-center`)} >
                <Text style={tw("text-sm")} >
                  Producto
                </Text>
              </View>
              <View style={tw(`w-${anchoColumnas} p-2`)} >
                <Text style={tw("text-sm")} >
                  SKU
                </Text>
              </View>
              <View style={tw(`w-${anchoColumnas} p-2`)} >
                <Text style={tw("text-sm")} >
                  Cantidad
                </Text>
              </View>
              <View style={tw(`w-${anchoColumnas} p-2`)} >
                <Text style={tw("text-sm")} >
                  Precio
                </Text>
              </View>
              {(rs.ingresadoAlmacen || rs.estado =="PENDIENTE") && (
                <View style={tw(`w-${anchoColumnas} p-2`)} >
                <Text style={tw("text-sm")} >
                  Series
                </Text>
              </View>
              )}
              
            </View>
            {/* BODY */}
            {/* LINEAS */}
            {rs.productos?.map((producto, index) => (
              <View key={producto.productoId} style={tw("flex flex-row text-center justify-center items-center")} >
                <View style={tw(`w-${anchoProducto} p-2 flex text-center`)} >
                  <View style={tw("text-xs flex flex-row text-left justify-start")} >
                    <Text>
                      NOMBRE:
                    </Text>
                    <Text>
                      {` ${producto.nombreProducto}`}
                    </Text>
                  </View>
                  <View style={tw("text-xs flex flex-row text-left justify-start")} >
                    <Text>
                    MODELO:
                    </Text>
                    <Text>
                      {` ${producto.modelo}`}
                    </Text>
                  </View>
                  <View style={tw("text-xs flex flex-row text-left justify-start")} >
                    <Text>
                    MARCA:
                    </Text>
                    <Text>
                      {` ${producto.marca.nombreMarca}`}
                    </Text>
                  </View>
                </View>
                <View style={tw(`w-${anchoColumnas} p-2 flex justify-center items-center`)} >
                  <Text style={tw("text-sm")} >
                    {producto.sku}
                  </Text>
                </View>
                <View style={tw(`w-${anchoColumnas} p-2 flex justify-center items-center`)} >
                  <Text style={tw("text-sm")} >
                    {producto.cantidad}
                  </Text>
                </View>
                <View style={tw(`w-${anchoColumnas} p-2 flex justify-center items-center`)} >
                  <Text style={tw("text-sm")} >
                    S/.{parseFloat(producto.precio).toFixed(2)}
                  </Text>
                </View>
                {(rs.ingresadoAlmacen || rs.estado=="PENDIENTE") && (
                  <View style={tw(`w-${anchoColumnas} p-2 flex justify-center items-center`)} >
                    <Text style={tw("flex text-sm items-center")} >
                      {producto.detalle.map((current) => (`[${current.serie}]`))}
                  </Text>
                </View>
                )}
              </View>
            ))}
          </View>
          {/* RESUMEN */}
          <View style={tw("flex mt-4 flex-row text-center justify-end")} >
            <View style={tw("w-2/5 border rounded-md mt-2 p-2")} >
              <View style={tw("text-sm flex flex-row text-left justify-between")} >
                <Text>
                  SUBTOTAL:
                </Text>
                <Text>
                  {parseFloat(rs.subTotal).toFixed(2)}
                </Text>
              </View>
              <View style={tw("text-sm flex flex-row text-left justify-between")} >
                <Text>
                  IMPUESTO:
                </Text>
                <Text>
                  {parseFloat(rs.impuesto).toFixed(2)}
                </Text>
              </View>
              <View style={tw("text-base mt-2 flex flex-row text-left justify-between")} >
                <Text>
                  TOTAL:
                </Text>
                <Text>
                  S/.{parseFloat(rs.total).toFixed(2)}
                </Text>
              </View>
            </View>
            
          </View>
          <View  >

          </View>
          {/* <Text style={tw("absolute bottom-0 left-0 right-0 text-center text-xs mb-2")} render={({ pageNumber, totalPages }) => (
            `${pageNumber} / ${totalPages}`
          )} fixed /> */}
          <View style={tw("p-2 border border-gray-500 rounded-md absolute bottom-0 left-0 m-2")} fixed>
          <Text style={{ fontSize: '6px' }}>
              Usuario: {rs.usuario?.user}
            </Text>
            <Text style={{ fontSize: '6px' }}>
              Fecha: {formatearFecha(retornaFechaSistema())}
            </Text>
            <Text style={{ fontSize: '6px' }}>
              Hora: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </Text>
            
            <Text style={{ fontSize: '6px' }} render={({ pageNumber, totalPages }) => (
            `Pagina: ${pageNumber} / ${totalPages}`
          )} fixed />
          </View>
        </Page>
        </Document>
      </PDFViewer>
  )
 
}
export default RsPDF;


