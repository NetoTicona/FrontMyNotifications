
//import { hrtime } from "process";
import { RESOURCE_BY_ROLES } from "./internalRoutes";
import {  ROLES_ENUM } from "./roles.enum";
import { IMenu } from "./ui-menu.model";



export const Menu_titles:IMenu[] = [
    {
        title:"Resumen",
        icon:"clipboard",
        href:"/main-page",
        role: RESOURCE_BY_ROLES.RESUMEN_OPTION
    }
    ,

{
    title:"Reportes",
    icon:"clipboard",
    href:"reports",
    role:RESOURCE_BY_ROLES.REPORT_OPTION,
    imagen:"reporte.svg",
    
    
},

    {
        title:"Vender y pedidos",
        icon:"newspaper",
        href:"/pending-finished",
        role: RESOURCE_BY_ROLES.VENDER_OPTION,
        imagen:"venta.svg",
        
    },

    

    {
        title:"Mis gastos/retiros",
        icon:"receipt",
        href:"/my-expenses",
        role:RESOURCE_BY_ROLES.EXPENSES_OPTION
        
    },
    
    {
        title:"Movimiento dinero",
        icon:"cash",
        href:"/box-money",
        role:RESOURCE_BY_ROLES.MOVES_OPTION,
        imagen:"ingresoygasto.svg",
        
        
    },
    {
        title:"Mis clientes",
        icon:"people",
        href:"/my-clients",
        role: RESOURCE_BY_ROLES.CLIENTS_OPTION,
        imagen:"cliente.svg",

    },
    {
        title:"Mis productos",
        href:"/products",
        icon:"shirt",
        role:RESOURCE_BY_ROLES.PRODUCTS_OPTION,
        imagen:"productos.svg",
        
    },
    {
        title:"Mi catálogo web",
        icon:"book",
        href:"/catalog",
        role:RESOURCE_BY_ROLES.CATALOG_OPTION,
        imagen:"catalogoa.svg",
        
    },    
    {
        title:"Mis proveedores",
        href:"/my-providers",
        icon:"cog",
        role:RESOURCE_BY_ROLES.SUPPLIER_OPTION,
        imagen:"configuraciones.svg",
        
    },   
    {
        title:"Deudas",
        href:"/deudas",
        icon:"cog",
        role:RESOURCE_BY_ROLES.SUPPLIER_OPTION,
        imagen:"configuraciones.svg",
        
    },
    {
        title:"Citas del día",
        href:"/quotes-day",
        icon:"calendar",
        role:RESOURCE_BY_ROLES.SUPPLIER_OPTION,
        imagen:"configuraciones.svg",
        
    },








    /*
    {
        title:"Utilidad",
        href:"/balance",
        icon:"stats-chart",
        role:RESOURCE_BY_ROLES.BALANCE_OPTION
        
    }
    ,*/
    {
        title:"Información",
        href:"/inform-yourself",
        icon:"information",
        role:RESOURCE_BY_ROLES.INFORMATION_OPTION,
        imagen:"informacion.svg",
        
    },
    {
        title:"Reservas",
        icon:"today",
        href:"/bookings",
        role:RESOURCE_BY_ROLES.BOOKS,
        imagen:"reserva.svg",
        
    },
    {
        title:"Mis habitaciones",
        icon:"business",
        href:"/my-rooms",
        role:RESOURCE_BY_ROLES.MY_ROOMS,
        imagen:"habitacion.svg",
        
    },


    {
        title:"Configuraciones",
        icon:"cog",
        href:"/settings",
        role:RESOURCE_BY_ROLES.SETTINGS_OPTION,
        imagen:"configuracion.svg",
    }
,
{
    title:"Cambiar contraseña",
    icon:"person",
    href:"/client",
    imagen:"palabraclave.svg",
    role:RESOURCE_BY_ROLES.CHANGE_PASSWORD
    
}
,{
    title:"Asesor digital",
    icon:"logo-wechat",
    href:"/chat",
    role:RESOURCE_BY_ROLES.ADVISER_OPTION
    
},


/*
{
    title:"Alerta stock",
    icon:"alert",
    href:"/min-stock-modal",
    role:RESOURCE_BY_ROLES.ALERT_OPTION
    
},
*/
/*
{
    title:"Asociar cuenta",
    icon:"people",
    href:"/associate-accounts",
    role:RESOURCE_BY_ROLES.ADD_USER
    
},*/

{
    title:"Necesito ayuda",
    icon:"help",
    href:"needHelp",
    role:RESOURCE_BY_ROLES.NEED_HELP,
    imagen:"ayuda.svg",
},
{
    title:"Ofertas",
    icon:"backspace-outline",
    href:"/offers",
    role:RESOURCE_BY_ROLES.OFFERTS,
    imagen:"timeline.svg",
},

{
    title:"Mis areas",
    icon:"flag",
    href:"my-area",
    role:RESOURCE_BY_ROLES.AREAS,
    imagen:"Cerrarsesion.svg",
    
    
},
{
    title:"Mis zonas",
    icon:"apps",
    href:"my-zona",
    role:RESOURCE_BY_ROLES.ZONAS,
    imagen:"Cerrarsesion.svg",
    
    
},

{
    title:"Platillos y menus",
    icon:"fast-food",
    href:"/dish-register",
    role:RESOURCE_BY_ROLES.DISHREGISTER,
    imagen:"Cerrarsesion.svg",
    
    
},











{
    title:"Restaurant-Pedidos",
    icon:"pizza",
    href:"restaurant",
    role:RESOURCE_BY_ROLES.RESTAURANT,
    imagen:"Cerrarsesion.svg",
    
    
},
{
    title:"Area Cocina",
    icon:"color-fill",
    href:"kitchen",
    role:RESOURCE_BY_ROLES.AREAKITCHEN,
    imagen:"Cerrarsesion.svg",
    
    
},









{
    title:"Cerrar Sesión",
    icon:"exit",
    href:"close",
    role:RESOURCE_BY_ROLES.CLOSE_SESSION,
    imagen:"salida.svg",
    
    
}

   /*  {
        title:"Vender",
        icon:"checkmark-circle-outline",
        href:"/sell",
        role: RESOURCE_BY_ROLES.VENDER_OPTION
    },


    {
        title:"Mis pedidos",
        icon:"cart",    
        href:"/orders",
        role:RESOURCE_BY_ROLES.ORDERS_OPTION

    },
    */
   



    //--------------------------------------------------//



   /*  {
        title:"Objetivos",
        icon:"flash",
        href:"/objectives",
        role:RESOURCE_BY_ROLES.CATALOG_OPTION
        
    }, */
   
   


/*   {
        title:"Registar Productos",
        icon:"clipboard",
        href:"/product-register",
        role: RESOURCE_BY_ROLES.PRODUCT_REGISTER_OPTION
        
    }, */

   /*  {
        title:"Transacciones",
        icon:"cash",
       
    }, */
   /*  {
        title:"Estadísticas",
        icon:"podium"
    }, */
    /* {
        title:"Usuarios",
        icon:"person",
        href:"/user-register"
    }, */
   
]