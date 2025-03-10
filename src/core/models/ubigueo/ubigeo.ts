// src/core/constants/ubigeo.ts
interface Departamento {
  idDepa: number;
  departamento: string;
}

interface Provincia {
  idProv: number;
  idDepa: number;
  provincia: string;
}

interface Distrito {
  idDist: number;
  idProv: number;
  distrito: string;
}

export const DEPARTAMENTOS: Departamento[] = [
  {
    idDepa: 1,
    departamento: "Amazonas",
  },
  {
    idDepa: 2,
    departamento: "Áncash",
  },
  {
    idDepa: 3,
    departamento: "Apurímac",
  },
  {
    idDepa: 4,
    departamento: "Arequipa",
  },
  {
    idDepa: 5,
    departamento: "Ayacucho",
  },
  {
    idDepa: 6,
    departamento: "Cajamarca",
  },
  {
    idDepa: 7,
    departamento: "Callao",
  },
  {
    idDepa: 8,
    departamento: "Cusco",
  },
  {
    idDepa: 9,
    departamento: "Huancavelica",
  },
  {
    idDepa: 10,
    departamento: "Huánuco",
  },
  {
    idDepa: 11,
    departamento: "Ica",
  },
  {
    idDepa: 12,
    departamento: "Junín",
  },
  {
    idDepa: 13,
    departamento: "La Libertad",
  },
  {
    idDepa: 14,
    departamento: "Lambayeque",
  },
  {
    idDepa: 15,
    departamento: "Lima",
  },
  {
    idDepa: 16,
    departamento: "Loreto",
  },
  {
    idDepa: 17,
    departamento: "Madre de Dios",
  },
  {
    idDepa: 18,
    departamento: "Moquegua",
  },
  {
    idDepa: 19,
    departamento: "Pasco",
  },
  {
    idDepa: 20,
    departamento: "Piura",
  },
  {
    idDepa: 21,
    departamento: "Puno",
  },
  {
    idDepa: 22,
    departamento: "San Martín",
  },
  {
    idDepa: 23,
    departamento: "Tacna",
  },
  {
    idDepa: 24,
    departamento: "Tumbes",
  },
  {
    idDepa: 25,
    departamento: "Ucayali",
  },
];

export const PROVINCIAS: Provincia[] = [
  {
    idProv: 1,
    provincia: "Chachapoyas",
    idDepa: 1,
  },
  {
    idProv: 2,
    provincia: "Bagua",
    idDepa: 1,
  },
  {
    idProv: 3,
    provincia: "Bongará",
    idDepa: 1,
  },
  {
    idProv: 4,
    provincia: "Condorcanqui",
    idDepa: 1,
  },
  {
    idProv: 5,
    provincia: "Luya",
    idDepa: 1,
  },
  {
    idProv: 6,
    provincia: "Rodríguez de Mendoza",
    idDepa: 1,
  },
  {
    idProv: 7,
    provincia: "Utcubamba",
    idDepa: 1,
  },
  {
    idProv: 8,
    provincia: "Huaraz",
    idDepa: 2,
  },
  {
    idProv: 9,
    provincia: "Aija",
    idDepa: 2,
  },
  {
    idProv: 10,
    provincia: "Antonio Raymondi",
    idDepa: 2,
  },
  {
    idProv: 11,
    provincia: "Asunción",
    idDepa: 2,
  },
  {
    idProv: 12,
    provincia: "Bolognesi",
    idDepa: 2,
  },
  {
    idProv: 13,
    provincia: "Carhuaz",
    idDepa: 2,
  },
  {
    idProv: 14,
    provincia: "Carlos Fermín Fitzcarrald",
    idDepa: 2,
  },
  {
    idProv: 15,
    provincia: "Casma",
    idDepa: 2,
  },
  {
    idProv: 16,
    provincia: "Corongo",
    idDepa: 2,
  },
  {
    idProv: 17,
    provincia: "Huari",
    idDepa: 2,
  },
  {
    idProv: 18,
    provincia: "Huarmey",
    idDepa: 2,
  },
  {
    idProv: 19,
    provincia: "Huaylas",
    idDepa: 2,
  },
  {
    idProv: 20,
    provincia: "Mariscal Luzuriaga",
    idDepa: 2,
  },
  {
    idProv: 21,
    provincia: "Ocros",
    idDepa: 2,
  },
  {
    idProv: 22,
    provincia: "Pallasca",
    idDepa: 2,
  },
  {
    idProv: 23,
    provincia: "Pomabamba",
    idDepa: 2,
  },
  {
    idProv: 24,
    provincia: "Recuay",
    idDepa: 2,
  },
  {
    idProv: 25,
    provincia: "Santa",
    idDepa: 2,
  },
  {
    idProv: 26,
    provincia: "Sihuas",
    idDepa: 2,
  },
  {
    idProv: 27,
    provincia: "Yungay",
    idDepa: 2,
  },
  {
    idProv: 28,
    provincia: "Abancay",
    idDepa: 3,
  },
  {
    idProv: 29,
    provincia: "Andahuaylas",
    idDepa: 3,
  },
  {
    idProv: 30,
    provincia: "Antabamba",
    idDepa: 3,
  },
  {
    idProv: 31,
    provincia: "Aymaraes",
    idDepa: 3,
  },
  {
    idProv: 32,
    provincia: "Cotabambas",
    idDepa: 3,
  },
  {
    idProv: 33,
    provincia: "Chincheros",
    idDepa: 3,
  },
  {
    idProv: 34,
    provincia: "Grau",
    idDepa: 3,
  },
  {
    idProv: 35,
    provincia: "Arequipa",
    idDepa: 4,
  },
  {
    idProv: 36,
    provincia: "Camaná",
    idDepa: 4,
  },
  {
    idProv: 37,
    provincia: "Caravelí",
    idDepa: 4,
  },
  {
    idProv: 38,
    provincia: "Castilla",
    idDepa: 4,
  },
  {
    idProv: 39,
    provincia: "Caylloma",
    idDepa: 4,
  },
  {
    idProv: 40,
    provincia: "Condesuyos",
    idDepa: 4,
  },
  {
    idProv: 41,
    provincia: "Islay",
    idDepa: 4,
  },
  {
    idProv: 42,
    provincia: "La Unión",
    idDepa: 4,
  },
  {
    idProv: 43,
    provincia: "Huamanga",
    idDepa: 5,
  },
  {
    idProv: 44,
    provincia: "Cangallo",
    idDepa: 5,
  },
  {
    idProv: 45,
    provincia: "Huanca Sancos",
    idDepa: 5,
  },
  {
    idProv: 46,
    provincia: "Huanta",
    idDepa: 5,
  },
  {
    idProv: 47,
    provincia: "La Mar",
    idDepa: 5,
  },
  {
    idProv: 48,
    provincia: "Lucanas",
    idDepa: 5,
  },
  {
    idProv: 49,
    provincia: "Parinacochas",
    idDepa: 5,
  },
  {
    idProv: 50,
    provincia: "Páucar del Sara Sara",
    idDepa: 5,
  },
  {
    idProv: 51,
    provincia: "Sucre",
    idDepa: 5,
  },
  {
    idProv: 52,
    provincia: "Víctor Fajardo",
    idDepa: 5,
  },
  {
    idProv: 53,
    provincia: "Vilcas Huamán",
    idDepa: 5,
  },
  {
    idProv: 54,
    provincia: "Cajamarca",
    idDepa: 6,
  },
  {
    idProv: 55,
    provincia: "Cajabamba",
    idDepa: 6,
  },
  {
    idProv: 56,
    provincia: "Celendín",
    idDepa: 6,
  },
  {
    idProv: 57,
    provincia: "Chota",
    idDepa: 6,
  },
  {
    idProv: 58,
    provincia: "Contumazá",
    idDepa: 6,
  },
  {
    idProv: 59,
    provincia: "Cutervo",
    idDepa: 6,
  },
  {
    idProv: 60,
    provincia: "Hualgayoc",
    idDepa: 6,
  },
  {
    idProv: 61,
    provincia: "Jaén",
    idDepa: 6,
  },
  {
    idProv: 62,
    provincia: "San Ignacio",
    idDepa: 6,
  },
  {
    idProv: 63,
    provincia: "San Marcos",
    idDepa: 6,
  },
  {
    idProv: 64,
    provincia: "San Miguel",
    idDepa: 6,
  },
  {
    idProv: 65,
    provincia: "San Pablo",
    idDepa: 6,
  },
  {
    idProv: 66,
    provincia: "Santa Cruz",
    idDepa: 6,
  },
  {
    idProv: 67,
    provincia: "Callao",
    idDepa: 7,
  },
  {
    idProv: 68,
    provincia: "Cusco",
    idDepa: 8,
  },
  {
    idProv: 69,
    provincia: "Acomayo",
    idDepa: 8,
  },
  {
    idProv: 70,
    provincia: "Anta",
    idDepa: 8,
  },
  {
    idProv: 71,
    provincia: "Calca",
    idDepa: 8,
  },
  {
    idProv: 72,
    provincia: "Canas",
    idDepa: 8,
  },
  {
    idProv: 73,
    provincia: "Canchis",
    idDepa: 8,
  },
  {
    idProv: 74,
    provincia: "Chumbivilcas",
    idDepa: 8,
  },
  {
    idProv: 75,
    provincia: "Espinar",
    idDepa: 8,
  },
  {
    idProv: 76,
    provincia: "La Convención",
    idDepa: 8,
  },
  {
    idProv: 77,
    provincia: "Paruro",
    idDepa: 8,
  },
  {
    idProv: 78,
    provincia: "Paucartambo",
    idDepa: 8,
  },
  {
    idProv: 79,
    provincia: "Quispicanchi",
    idDepa: 8,
  },
  {
    idProv: 80,
    provincia: "Urubamba",
    idDepa: 8,
  },
  {
    idProv: 81,
    provincia: "Huancavelica",
    idDepa: 9,
  },
  {
    idProv: 82,
    provincia: "Acobamba",
    idDepa: 9,
  },
  {
    idProv: 83,
    provincia: "Angaraes",
    idDepa: 9,
  },
  {
    idProv: 84,
    provincia: "Castrovirreyna",
    idDepa: 9,
  },
  {
    idProv: 85,
    provincia: "Churcampa",
    idDepa: 9,
  },
  {
    idProv: 86,
    provincia: "Huaytará",
    idDepa: 9,
  },
  {
    idProv: 87,
    provincia: "Tayacaja",
    idDepa: 9,
  },
  {
    idProv: 88,
    provincia: "Huánuco",
    idDepa: 10,
  },
  {
    idProv: 89,
    provincia: "Ambo",
    idDepa: 10,
  },
  {
    idProv: 90,
    provincia: "Dos de Mayo",
    idDepa: 10,
  },
  {
    idProv: 91,
    provincia: "Huacaybamba",
    idDepa: 10,
  },
  {
    idProv: 92,
    provincia: "Huamalíes",
    idDepa: 10,
  },
  {
    idProv: 93,
    provincia: "Leoncio Prado",
    idDepa: 10,
  },
  {
    idProv: 94,
    provincia: "Marañón",
    idDepa: 10,
  },
  {
    idProv: 95,
    provincia: "Pachitea",
    idDepa: 10,
  },
  {
    idProv: 96,
    provincia: "Puerto Inca",
    idDepa: 10,
  },
  {
    idProv: 97,
    provincia: "Lauricocha",
    idDepa: 10,
  },
  {
    idProv: 98,
    provincia: "Yarowilca",
    idDepa: 10,
  },
  {
    idProv: 99,
    provincia: "Ica",
    idDepa: 11,
  },
  {
    idProv: 100,
    provincia: "Chincha",
    idDepa: 11,
  },
  {
    idProv: 101,
    provincia: "Nazca",
    idDepa: 11,
  },
  {
    idProv: 102,
    provincia: "Palpa",
    idDepa: 11,
  },
  {
    idProv: 103,
    provincia: "Pisco",
    idDepa: 11,
  },
  {
    idProv: 104,
    provincia: "Huancayo",
    idDepa: 12,
  },
  {
    idProv: 105,
    provincia: "Concepción",
    idDepa: 12,
  },
  {
    idProv: 106,
    provincia: "Chanchamayo",
    idDepa: 12,
  },
  {
    idProv: 107,
    provincia: "Jauja",
    idDepa: 12,
  },
  {
    idProv: 108,
    provincia: "Junín",
    idDepa: 12,
  },
  {
    idProv: 109,
    provincia: "Satipo",
    idDepa: 12,
  },
  {
    idProv: 110,
    provincia: "Tarma",
    idDepa: 12,
  },
  {
    idProv: 111,
    provincia: "Yauli",
    idDepa: 12,
  },
  {
    idProv: 112,
    provincia: "Chupaca",
    idDepa: 12,
  },
  {
    idProv: 113,
    provincia: "Trujillo",
    idDepa: 13,
  },
  {
    idProv: 114,
    provincia: "Ascope",
    idDepa: 13,
  },
  {
    idProv: 115,
    provincia: "Bolívar",
    idDepa: 13,
  },
  {
    idProv: 116,
    provincia: "Chepén",
    idDepa: 13,
  },
  {
    idProv: 117,
    provincia: "Julcán",
    idDepa: 13,
  },
  {
    idProv: 118,
    provincia: "Otuzco",
    idDepa: 13,
  },
  {
    idProv: 119,
    provincia: "Pacasmayo",
    idDepa: 13,
  },
  {
    idProv: 120,
    provincia: "Pataz",
    idDepa: 13,
  },
  {
    idProv: 121,
    provincia: "Sánchez Carrión",
    idDepa: 13,
  },
  {
    idProv: 122,
    provincia: "Santiago de Chuco",
    idDepa: 13,
  },
  {
    idProv: 123,
    provincia: "Gran Chimú",
    idDepa: 13,
  },
  {
    idProv: 124,
    provincia: "Virú",
    idDepa: 13,
  },
  {
    idProv: 125,
    provincia: "Chiclayo",
    idDepa: 14,
  },
  {
    idProv: 126,
    provincia: "Ferreñafe",
    idDepa: 14,
  },
  {
    idProv: 127,
    provincia: "Lambayeque",
    idDepa: 14,
  },
  {
    idProv: 128,
    provincia: "Lima",
    idDepa: 15,
  },
  {
    idProv: 129,
    provincia: "Barranca",
    idDepa: 15,
  },
  {
    idProv: 130,
    provincia: "Cajatambo",
    idDepa: 15,
  },
  {
    idProv: 131,
    provincia: "Canta",
    idDepa: 15,
  },
  {
    idProv: 132,
    provincia: "Cañete",
    idDepa: 15,
  },
  {
    idProv: 133,
    provincia: "Huaral",
    idDepa: 15,
  },
  {
    idProv: 134,
    provincia: "Huarochirí",
    idDepa: 15,
  },
  {
    idProv: 135,
    provincia: "Huaura",
    idDepa: 15,
  },
  {
    idProv: 136,
    provincia: "Oyón",
    idDepa: 15,
  },
  {
    idProv: 137,
    provincia: "Yauyos",
    idDepa: 15,
  },
  {
    idProv: 138,
    provincia: "Alto Amazonas",
    idDepa: 16,
  },
  {
    idProv: 139,
    provincia: "Datem del Marañón",
    idDepa: 16,
  },
  {
    idProv: 140,
    provincia: "Loreto",
    idDepa: 16,
  },
  {
    idProv: 141,
    provincia: "Mariscal Ramón Castilla",
    idDepa: 16,
  },
  {
    idProv: 142,
    provincia: "Maynas",
    idDepa: 16,
  },
  {
    idProv: 143,
    provincia: "Putumayo",
    idDepa: 16,
  },
  {
    idProv: 144,
    provincia: "Requena",
    idDepa: 16,
  },
  {
    idProv: 145,
    provincia: "Ucayali",
    idDepa: 16,
  },
  {
    idProv: 146,
    provincia: "Tambopata",
    idDepa: 17,
  },
  {
    idProv: 147,
    provincia: "Manu",
    idDepa: 17,
  },
  {
    idProv: 148,
    provincia: "Tahuamanu",
    idDepa: 17,
  },
  {
    idProv: 149,
    provincia: "Mariscal Nieto",
    idDepa: 18,
  },
  {
    idProv: 150,
    provincia: "General Sánchez Cerro",
    idDepa: 18,
  },
  {
    idProv: 151,
    provincia: "Ilo",
    idDepa: 18,
  },
  {
    idProv: 152,
    provincia: "Pasco",
    idDepa: 19,
  },
  {
    idProv: 153,
    provincia: "Daniel Alcides Carrión",
    idDepa: 19,
  },
  {
    idProv: 154,
    provincia: "Oxapampa",
    idDepa: 19,
  },
  {
    idProv: 155,
    provincia: "Piura",
    idDepa: 20,
  },
  {
    idProv: 156,
    provincia: "Ayabaca",
    idDepa: 20,
  },
  {
    idProv: 157,
    provincia: "Huancabamba",
    idDepa: 20,
  },
  {
    idProv: 158,
    provincia: "Morropón",
    idDepa: 20,
  },
  {
    idProv: 159,
    provincia: "Paita",
    idDepa: 20,
  },
  {
    idProv: 160,
    provincia: "Sullana",
    idDepa: 20,
  },
  {
    idProv: 161,
    provincia: "Talara",
    idDepa: 20,
  },
  {
    idProv: 162,
    provincia: "Sechura",
    idDepa: 20,
  },
  {
    idProv: 163,
    provincia: "Puno",
    idDepa: 21,
  },
  {
    idProv: 164,
    provincia: "Azángaro",
    idDepa: 21,
  },
  {
    idProv: 165,
    provincia: "Carabaya",
    idDepa: 21,
  },
  {
    idProv: 166,
    provincia: "Chucuito",
    idDepa: 21,
  },
  {
    idProv: 167,
    provincia: "El Collao",
    idDepa: 21,
  },
  {
    idProv: 168,
    provincia: "Huancané",
    idDepa: 21,
  },
  {
    idProv: 169,
    provincia: "Lampa",
    idDepa: 21,
  },
  {
    idProv: 170,
    provincia: "Melgar",
    idDepa: 21,
  },
  {
    idProv: 171,
    provincia: "Moho",
    idDepa: 21,
  },
  {
    idProv: 172,
    provincia: "San Antonio de Putina",
    idDepa: 21,
  },
  {
    idProv: 173,
    provincia: "San Román",
    idDepa: 21,
  },
  {
    idProv: 174,
    provincia: "Sandia",
    idDepa: 21,
  },
  {
    idProv: 175,
    provincia: "Yunguyo",
    idDepa: 21,
  },
  {
    idProv: 176,
    provincia: "Moyobamba",
    idDepa: 22,
  },
  {
    idProv: 177,
    provincia: "Bellavista",
    idDepa: 22,
  },
  {
    idProv: 178,
    provincia: "El Dorado",
    idDepa: 22,
  },
  {
    idProv: 179,
    provincia: "Huallaga",
    idDepa: 22,
  },
  {
    idProv: 180,
    provincia: "Lamas",
    idDepa: 22,
  },
  {
    idProv: 181,
    provincia: "Mariscal Cáceres",
    idDepa: 22,
  },
  {
    idProv: 182,
    provincia: "Picota",
    idDepa: 22,
  },
  {
    idProv: 183,
    provincia: "Rioja",
    idDepa: 22,
  },
  {
    idProv: 184,
    provincia: "San Martín",
    idDepa: 22,
  },
  {
    idProv: 185,
    provincia: "Tocache",
    idDepa: 22,
  },
  {
    idProv: 186,
    provincia: "Tacna",
    idDepa: 23,
  },
  {
    idProv: 187,
    provincia: "Candarave",
    idDepa: 23,
  },
  {
    idProv: 188,
    provincia: "Jorge Basadre",
    idDepa: 23,
  },
  {
    idProv: 189,
    provincia: "Tarata",
    idDepa: 23,
  },
  {
    idProv: 190,
    provincia: "Tumbes",
    idDepa: 24,
  },
  {
    idProv: 191,
    provincia: "Contralmirante Villar",
    idDepa: 24,
  },
  {
    idProv: 192,
    provincia: "Zarumilla",
    idDepa: 24,
  },
  {
    idProv: 193,
    provincia: "Coronel Portillo",
    idDepa: 25,
  },
  {
    idProv: 194,
    provincia: "Atalaya",
    idDepa: 25,
  },
  {
    idProv: 195,
    provincia: "Padre Abad",
    idDepa: 25,
  },
  {
    idProv: 196,
    provincia: "Purús",
    idDepa: 25,
  },
];

export const DISTRITOS: Distrito[] = [
  {
    idDist: 1,
    distrito: "Asunción",
    idProv: 1,
  },
  {
    idDist: 2,
    distrito: "Balsas",
    idProv: 1,
  },
  {
    idDist: 3,
    distrito: "Chachapoyas",
    idProv: 1,
  },
  {
    idDist: 4,
    distrito: "Cheto",
    idProv: 1,
  },
  {
    idDist: 5,
    distrito: "Chiliquin",
    idProv: 1,
  },
  {
    idDist: 6,
    distrito: "Chuquibamba",
    idProv: 1,
  },
  {
    idDist: 7,
    distrito: "Granada",
    idProv: 1,
  },
  {
    idDist: 8,
    distrito: "Huancas",
    idProv: 1,
  },
  {
    idDist: 9,
    distrito: "La Jalca",
    idProv: 1,
  },
  {
    idDist: 10,
    distrito: "Leimebamba",
    idProv: 1,
  },
  {
    idDist: 11,
    distrito: "Levanto",
    idProv: 1,
  },
  {
    idDist: 12,
    distrito: "Magdalena",
    idProv: 1,
  },
  {
    idDist: 13,
    distrito: "Mariscal Castilla",
    idProv: 1,
  },
  {
    idDist: 14,
    distrito: "Molinopampa",
    idProv: 1,
  },
  {
    idDist: 15,
    distrito: "Montevideo",
    idProv: 1,
  },
  {
    idDist: 16,
    distrito: "Olleros",
    idProv: 1,
  },
  {
    idDist: 17,
    distrito: "Quinjalca",
    idProv: 1,
  },
  {
    idDist: 18,
    distrito: "San Francisco de Daguas",
    idProv: 1,
  },
  {
    idDist: 19,
    distrito: "San Isidro de Maino",
    idProv: 1,
  },
  {
    idDist: 20,
    distrito: "Soloco",
    idProv: 1,
  },
  {
    idDist: 21,
    distrito: "Sonche",
    idProv: 1,
  },
  {
    idDist: 22,
    distrito: "Aramango",
    idProv: 2,
  },
  {
    idDist: 23,
    distrito: "Bagua",
    idProv: 2,
  },
  {
    idDist: 24,
    distrito: "Copallin",
    idProv: 2,
  },
  {
    idDist: 25,
    distrito: "El Parco",
    idProv: 2,
  },
  {
    idDist: 26,
    distrito: "La Peca",
    idProv: 2,
  },
  {
    idDist: 27,
    distrito: "Imaza",
    idProv: 2,
  },
  {
    idDist: 28,
    distrito: "Jazán",
    idProv: 3,
  },
  {
    idDist: 29,
    distrito: "Recta",
    idProv: 3,
  },
  {
    idDist: 30,
    distrito: "Shipasbamba",
    idProv: 3,
  },
  {
    idDist: 31,
    distrito: "Valera",
    idProv: 3,
  },
  {
    idDist: 32,
    distrito: "Yambrasbamba",
    idProv: 3,
  },
  {
    idDist: 33,
    distrito: "El Cenepa",
    idProv: 4,
  },
  {
    idDist: 34,
    distrito: "Nieva",
    idProv: 4,
  },
  {
    idDist: 35,
    distrito: "Rio Santiago",
    idProv: 4,
  },
  {
    idDist: 36,
    distrito: "Camporredondo",
    idProv: 5,
  },
  {
    idDist: 37,
    distrito: "Cocabamba",
    idProv: 5,
  },
  {
    idDist: 38,
    distrito: "Colcamar",
    idProv: 5,
  },
  {
    idDist: 39,
    distrito: "Conila",
    idProv: 5,
  },
  {
    idDist: 40,
    distrito: "Inguilpata",
    idProv: 5,
  },
  {
    idDist: 41,
    distrito: "Lamud",
    idProv: 5,
  },
  {
    idDist: 42,
    distrito: "Lonya Chico",
    idProv: 5,
  },
  {
    idDist: 43,
    distrito: "Luya",
    idProv: 5,
  },
  {
    idDist: 44,
    distrito: "Luya Viejo",
    idProv: 5,
  },
  {
    idDist: 45,
    distrito: "María",
    idProv: 5,
  },
  {
    idDist: 46,
    distrito: "Ocalli",
    idProv: 5,
  },
  {
    idDist: 47,
    distrito: "Ocumal",
    idProv: 5,
  },
  {
    idDist: 48,
    distrito: "Pisuquía",
    idProv: 5,
  },
  {
    idDist: 49,
    distrito: "Providencia",
    idProv: 5,
  },
  {
    idDist: 50,
    distrito: "San Cristóbal",
    idProv: 5,
  },
  {
    idDist: 51,
    distrito: "San Francisco del Yeso",
    idProv: 5,
  },
  {
    idDist: 52,
    distrito: "San Jerónimo",
    idProv: 5,
  },
  {
    idDist: 53,
    distrito: "San Juan de Lopecancha",
    idProv: 5,
  },
  {
    idDist: 54,
    distrito: "Santa Catalina",
    idProv: 5,
  },
  {
    idDist: 55,
    distrito: "Santo Tomas",
    idProv: 5,
  },
  {
    idDist: 56,
    distrito: "Tingo",
    idProv: 5,
  },
  {
    idDist: 57,
    distrito: "Trita",
    idProv: 5,
  },
  {
    idDist: 58,
    distrito: "Chirimoto",
    idProv: 6,
  },
  {
    idDist: 59,
    distrito: "Cochamal",
    idProv: 6,
  },
  {
    idDist: 60,
    distrito: "Huambo",
    idProv: 6,
  },
  {
    idDist: 61,
    distrito: "Limabamba",
    idProv: 6,
  },
  {
    idDist: 62,
    distrito: "Longar",
    idProv: 6,
  },
  {
    idDist: 63,
    distrito: "Mariscal Benavides",
    idProv: 6,
  },
  {
    idDist: 64,
    distrito: "Milpuc",
    idProv: 6,
  },
  {
    idDist: 65,
    distrito: "Omia",
    idProv: 6,
  },
  {
    idDist: 66,
    distrito: "San Nicolás",
    idProv: 6,
  },
  {
    idDist: 67,
    distrito: "Santa Rosa",
    idProv: 6,
  },
  {
    idDist: 68,
    distrito: "Totora",
    idProv: 6,
  },
  {
    idDist: 69,
    distrito: "Vista Alegre",
    idProv: 6,
  },
  {
    idDist: 70,
    distrito: "Bagua Grande",
    idProv: 7,
  },
  {
    idDist: 71,
    distrito: "Cajaruro",
    idProv: 7,
  },
  {
    idDist: 72,
    distrito: "Cumba",
    idProv: 7,
  },
  {
    idDist: 73,
    distrito: "El Milagro",
    idProv: 7,
  },
  {
    idDist: 74,
    distrito: "Jamalca",
    idProv: 7,
  },
  {
    idDist: 75,
    distrito: "Lonya Grande",
    idProv: 7,
  },
  {
    idDist: 76,
    distrito: "Yamón",
    idProv: 7,
  },
  {
    idDist: 77,
    distrito: "Huaraz",
    idProv: 8,
  },
  {
    idDist: 78,
    distrito: "Cochabamba",
    idProv: 8,
  },
  {
    idDist: 79,
    distrito: "Colcabamba",
    idProv: 8,
  },
  {
    idDist: 80,
    distrito: "Huanchay",
    idProv: 8,
  },
  {
    idDist: 81,
    distrito: "Independencia",
    idProv: 8,
  },
  {
    idDist: 82,
    distrito: "Jangas",
    idProv: 8,
  },
  {
    idDist: 83,
    distrito: "La Libertad",
    idProv: 8,
  },
  {
    idDist: 84,
    distrito: "Olleros",
    idProv: 8,
  },
  {
    idDist: 85,
    distrito: "Pampas Grande",
    idProv: 8,
  },
  {
    idDist: 86,
    distrito: "Pariacoto",
    idProv: 8,
  },
  {
    idDist: 87,
    distrito: "Pira",
    idProv: 8,
  },
  {
    idDist: 88,
    distrito: "Tarica",
    idProv: 8,
  },
  {
    idDist: 89,
    distrito: "Aija",
    idProv: 9,
  },
  {
    idDist: 90,
    distrito: "Coris",
    idProv: 9,
  },
  {
    idDist: 91,
    distrito: "Huacllán",
    idProv: 9,
  },
  {
    idDist: 92,
    distrito: "La Merced",
    idProv: 9,
  },
  {
    idDist: 93,
    distrito: "Succha",
    idProv: 9,
  },
  {
    idDist: 94,
    distrito: "Llamellín",
    idProv: 10,
  },
  {
    idDist: 95,
    distrito: "Aczo",
    idProv: 10,
  },
  {
    idDist: 96,
    distrito: "Chaccho",
    idProv: 10,
  },
  {
    idDist: 97,
    distrito: "Chingas",
    idProv: 10,
  },
  {
    idDist: 98,
    distrito: "Mirgas",
    idProv: 10,
  },
  {
    idDist: 99,
    distrito: "San Juan de Rontoy",
    idProv: 10,
  },
  {
    idDist: 100,
    distrito: "Chacas",
    idProv: 11,
  },
  {
    idDist: 101,
    distrito: "Acochaca",
    idProv: 11,
  },
  {
    idDist: 102,
    distrito: "Chiquián",
    idProv: 12,
  },
  {
    idDist: 103,
    distrito: "Abelardo Pardo Lezameta",
    idProv: 12,
  },
  {
    idDist: 104,
    distrito: "Antonio Raymondi",
    idProv: 12,
  },
  {
    idDist: 105,
    distrito: "Aquia",
    idProv: 12,
  },
  {
    idDist: 106,
    distrito: "Cajacay",
    idProv: 12,
  },
  {
    idDist: 107,
    distrito: "Canis",
    idProv: 12,
  },
  {
    idDist: 108,
    distrito: "Colquioc",
    idProv: 12,
  },
  {
    idDist: 109,
    distrito: "Huallanca",
    idProv: 12,
  },
  {
    idDist: 110,
    distrito: "Huasta",
    idProv: 12,
  },
  {
    idDist: 111,
    distrito: "Huayllacayán",
    idProv: 12,
  },
  {
    idDist: 112,
    distrito: "La Primavera",
    idProv: 12,
  },
  {
    idDist: 113,
    distrito: "Mangas",
    idProv: 12,
  },
  {
    idDist: 114,
    distrito: "Pacllón",
    idProv: 12,
  },
  {
    idDist: 115,
    distrito: "San Miguel de Corpanqui",
    idProv: 12,
  },
  {
    idDist: 116,
    distrito: "Ticllos",
    idProv: 12,
  },
  {
    idDist: 117,
    distrito: "Carhuaz",
    idProv: 13,
  },
  {
    idDist: 118,
    distrito: "Acopampa",
    idProv: 13,
  },
  {
    idDist: 119,
    distrito: "Amashca",
    idProv: 13,
  },
  {
    idDist: 120,
    distrito: "Anta",
    idProv: 13,
  },
  {
    idDist: 121,
    distrito: "Ataquero",
    idProv: 13,
  },
  {
    idDist: 122,
    distrito: "Marcara",
    idProv: 13,
  },
  {
    idDist: 123,
    distrito: "Pariahuanca",
    idProv: 13,
  },
  {
    idDist: 124,
    distrito: "San Miguel de Aco",
    idProv: 13,
  },
  {
    idDist: 125,
    distrito: "Shilla",
    idProv: 13,
  },
  {
    idDist: 126,
    distrito: "Tinco",
    idProv: 13,
  },
  {
    idDist: 127,
    distrito: "Yungar",
    idProv: 13,
  },
  {
    idDist: 128,
    distrito: "San Luis",
    idProv: 14,
  },
  {
    idDist: 129,
    distrito: "San Nicolás",
    idProv: 14,
  },
  {
    idDist: 130,
    distrito: "Yauya",
    idProv: 14,
  },
  {
    idDist: 131,
    distrito: "Casma",
    idProv: 15,
  },
  {
    idDist: 132,
    distrito: "Buena Vista Alta",
    idProv: 15,
  },
  {
    idDist: 133,
    distrito: "Comandante Noel",
    idProv: 15,
  },
  {
    idDist: 134,
    distrito: "Yaután",
    idProv: 15,
  },
  {
    idDist: 135,
    distrito: "Corongo",
    idProv: 16,
  },
  {
    idDist: 136,
    distrito: "Aco",
    idProv: 16,
  },
  {
    idDist: 137,
    distrito: "Bambas",
    idProv: 16,
  },
  {
    idDist: 138,
    distrito: "Cusca",
    idProv: 16,
  },
  {
    idDist: 139,
    distrito: "La Pampa",
    idProv: 16,
  },
  {
    idDist: 140,
    distrito: "Yánac",
    idProv: 16,
  },
  {
    idDist: 141,
    distrito: "Yupán",
    idProv: 16,
  },
  {
    idDist: 142,
    distrito: "Huari",
    idProv: 17,
  },
  {
    idDist: 143,
    distrito: "Anra",
    idProv: 17,
  },
  {
    idDist: 144,
    distrito: "Cajay",
    idProv: 17,
  },
  {
    idDist: 145,
    distrito: "Chavín de Huántar",
    idProv: 17,
  },
  {
    idDist: 146,
    distrito: "Huacachi",
    idProv: 17,
  },
  {
    idDist: 147,
    distrito: "Huacchis",
    idProv: 17,
  },
  {
    idDist: 148,
    distrito: "Huachis",
    idProv: 17,
  },
  {
    idDist: 149,
    distrito: "Huantar",
    idProv: 17,
  },
  {
    idDist: 150,
    distrito: "Masin",
    idProv: 17,
  },
  {
    idDist: 151,
    distrito: "Paucas",
    idProv: 17,
  },
  {
    idDist: 152,
    distrito: "Pontó",
    idProv: 17,
  },
  {
    idDist: 153,
    distrito: "Rahuapampa",
    idProv: 17,
  },
  {
    idDist: 154,
    distrito: "Rapayán",
    idProv: 17,
  },
  {
    idDist: 155,
    distrito: "San Marcos",
    idProv: 17,
  },
  {
    idDist: 156,
    distrito: "San Pedro de Chana",
    idProv: 17,
  },
  {
    idDist: 157,
    distrito: "Uco",
    idProv: 17,
  },
  {
    idDist: 158,
    distrito: "Huarmey",
    idProv: 18,
  },
  {
    idDist: 159,
    distrito: "Cochapeti",
    idProv: 18,
  },
  {
    idDist: 160,
    distrito: "Culebras",
    idProv: 18,
  },
  {
    idDist: 161,
    distrito: "Huayan",
    idProv: 18,
  },
  {
    idDist: 162,
    distrito: "Malvas",
    idProv: 18,
  },
  {
    idDist: 163,
    distrito: "Caraz",
    idProv: 19,
  },
  {
    idDist: 164,
    distrito: "Huallanca",
    idProv: 19,
  },
  {
    idDist: 165,
    distrito: "Huata",
    idProv: 19,
  },
  {
    idDist: 166,
    distrito: "Huaylas",
    idProv: 19,
  },
  {
    idDist: 167,
    distrito: "Mato",
    idProv: 19,
  },
  {
    idDist: 168,
    distrito: "Pamparomás",
    idProv: 19,
  },
  {
    idDist: 169,
    distrito: "Pueblo Libre",
    idProv: 19,
  },
  {
    idDist: 170,
    distrito: "Santa Cruz",
    idProv: 19,
  },
  {
    idDist: 171,
    distrito: "Santo Toribio",
    idProv: 19,
  },
  {
    idDist: 172,
    distrito: "Yuracmarca",
    idProv: 19,
  },
  {
    idDist: 173,
    distrito: "Piscobamba",
    idProv: 20,
  },
  {
    idDist: 174,
    distrito: "Casca",
    idProv: 20,
  },
  {
    idDist: 175,
    distrito: "Eleazar Guzmán Barron",
    idProv: 20,
  },
  {
    idDist: 176,
    distrito: "Fidel Olivas Escudero",
    idProv: 20,
  },
  {
    idDist: 177,
    distrito: "Llama",
    idProv: 20,
  },
  {
    idDist: 178,
    distrito: "Llumpa",
    idProv: 20,
  },
  {
    idDist: 179,
    distrito: "Lucma",
    idProv: 20,
  },
  {
    idDist: 180,
    distrito: "Musga",
    idProv: 20,
  },
  {
    idDist: 181,
    distrito: "Ocros",
    idProv: 21,
  },
  {
    idDist: 182,
    distrito: "Acas",
    idProv: 21,
  },
  {
    idDist: 183,
    distrito: "Cajamarquilla",
    idProv: 21,
  },
  {
    idDist: 184,
    distrito: "Carhuapampa",
    idProv: 21,
  },
  {
    idDist: 185,
    distrito: "Cochas",
    idProv: 21,
  },
  {
    idDist: 186,
    distrito: "Congas",
    idProv: 21,
  },
  {
    idDist: 187,
    distrito: "Llipa",
    idProv: 21,
  },
  {
    idDist: 188,
    distrito: "San Cristóbal de Raján",
    idProv: 21,
  },
  {
    idDist: 189,
    distrito: "San Pedro",
    idProv: 21,
  },
  {
    idDist: 190,
    distrito: "Santiago de Chilcas",
    idProv: 21,
  },
  {
    idDist: 191,
    distrito: "Cabana",
    idProv: 22,
  },
  {
    idDist: 192,
    distrito: "Bolognesi",
    idProv: 22,
  },
  {
    idDist: 193,
    distrito: "Conchucos",
    idProv: 22,
  },
  {
    idDist: 194,
    distrito: "Huacaschuque",
    idProv: 22,
  },
  {
    idDist: 195,
    distrito: "Huandoval",
    idProv: 22,
  },
  {
    idDist: 196,
    distrito: "Lacabamba",
    idProv: 22,
  },
  {
    idDist: 197,
    distrito: "Llapo",
    idProv: 22,
  },
  {
    idDist: 198,
    distrito: "Pallasca",
    idProv: 22,
  },
  {
    idDist: 199,
    distrito: "Pampas",
    idProv: 22,
  },
  {
    idDist: 200,
    distrito: "Santa Rosa",
    idProv: 22,
  },
  {
    idDist: 201,
    distrito: "Tauca",
    idProv: 22,
  },
  {
    idDist: 202,
    distrito: "Pomabamba",
    idProv: 23,
  },
  {
    idDist: 203,
    distrito: "Huayllán",
    idProv: 23,
  },
  {
    idDist: 204,
    distrito: "Parobamba",
    idProv: 23,
  },
  {
    idDist: 205,
    distrito: "Quinuabamba",
    idProv: 23,
  },
  {
    idDist: 206,
    distrito: "Recuay",
    idProv: 24,
  },
  {
    idDist: 207,
    distrito: "Catac",
    idProv: 24,
  },
  {
    idDist: 208,
    distrito: "Cotaparaco",
    idProv: 24,
  },
  {
    idDist: 209,
    distrito: "Huayllapampa",
    idProv: 24,
  },
  {
    idDist: 210,
    distrito: "Llaclla",
    idProv: 24,
  },
  {
    idDist: 211,
    distrito: "Marca",
    idProv: 24,
  },
  {
    idDist: 212,
    distrito: "Pampas Chico",
    idProv: 24,
  },
  {
    idDist: 213,
    distrito: "Pararín",
    idProv: 24,
  },
  {
    idDist: 214,
    distrito: "Tapacocha",
    idProv: 24,
  },
  {
    idDist: 215,
    distrito: "Ticapampa",
    idProv: 24,
  },
  {
    idDist: 216,
    distrito: "Chimbote",
    idProv: 25,
  },
  {
    idDist: 217,
    distrito: "Cáceres del Perú",
    idProv: 25,
  },
  {
    idDist: 218,
    distrito: "Coishco",
    idProv: 25,
  },
  {
    idDist: 219,
    distrito: "Macate",
    idProv: 25,
  },
  {
    idDist: 220,
    distrito: "Moro",
    idProv: 25,
  },
  {
    idDist: 221,
    distrito: "Nepeña",
    idProv: 25,
  },
  {
    idDist: 222,
    distrito: "Nuevo Chimbote",
    idProv: 25,
  },
  {
    idDist: 223,
    distrito: "Samanco",
    idProv: 25,
  },
  {
    idDist: 224,
    distrito: "Santa",
    idProv: 25,
  },
  {
    idDist: 225,
    distrito: "Sihuas",
    idProv: 26,
  },
  {
    idDist: 226,
    distrito: "Acobamba",
    idProv: 26,
  },
  {
    idDist: 227,
    distrito: "Alfonso Ugarte",
    idProv: 26,
  },
  {
    idDist: 228,
    distrito: "Cashapampa",
    idProv: 26,
  },
  {
    idDist: 229,
    distrito: "Chingalpo",
    idProv: 26,
  },
  {
    idDist: 230,
    distrito: "Huayllabamba",
    idProv: 26,
  },
  {
    idDist: 231,
    distrito: "Quiches",
    idProv: 26,
  },
  {
    idDist: 232,
    distrito: "Ragash",
    idProv: 26,
  },
  {
    idDist: 233,
    distrito: "San Juan",
    idProv: 26,
  },
  {
    idDist: 234,
    distrito: "Sicsibamba",
    idProv: 26,
  },
  {
    idDist: 235,
    distrito: "Yungay",
    idProv: 27,
  },
  {
    idDist: 236,
    distrito: "Cascapara",
    idProv: 27,
  },
  {
    idDist: 237,
    distrito: "Mancos",
    idProv: 27,
  },
  {
    idDist: 238,
    distrito: "Matacoto",
    idProv: 27,
  },
  {
    idDist: 239,
    distrito: "Quillo",
    idProv: 27,
  },
  {
    idDist: 240,
    distrito: "Ranrahirca",
    idProv: 27,
  },
  {
    idDist: 241,
    distrito: "Shupluy",
    idProv: 27,
  },
  {
    idDist: 242,
    distrito: "Yanama",
    idProv: 27,
  },
  {
    idDist: 243,
    distrito: "Abancay",
    idProv: 28,
  },
  {
    idDist: 244,
    distrito: "Chacoche",
    idProv: 28,
  },
  {
    idDist: 245,
    distrito: "Circa",
    idProv: 28,
  },
  {
    idDist: 246,
    distrito: "Curahuasi",
    idProv: 28,
  },
  {
    idDist: 247,
    distrito: "Huanipaca",
    idProv: 28,
  },
  {
    idDist: 248,
    distrito: "Lambrama",
    idProv: 28,
  },
  {
    idDist: 249,
    distrito: "Pichirhua",
    idProv: 28,
  },
  {
    idDist: 250,
    distrito: "San Pedro de Cachora",
    idProv: 28,
  },
  {
    idDist: 251,
    distrito: "Tamburco",
    idProv: 28,
  },
  {
    idDist: 252,
    distrito: "Andahuaylas",
    idProv: 29,
  },
  {
    idDist: 253,
    distrito: "Andarapa",
    idProv: 29,
  },
  {
    idDist: 254,
    distrito: "Chiara",
    idProv: 29,
  },
  {
    idDist: 255,
    distrito: "Huancarama",
    idProv: 29,
  },
  {
    idDist: 256,
    distrito: "Huancaray",
    idProv: 29,
  },
  {
    idDist: 257,
    distrito: "Huayana",
    idProv: 29,
  },
  {
    idDist: 258,
    distrito: "Kishuara",
    idProv: 29,
  },
  {
    idDist: 259,
    distrito: "Pacobamba",
    idProv: 29,
  },
  {
    idDist: 260,
    distrito: "Pacucha",
    idProv: 29,
  },
  {
    idDist: 261,
    distrito: "Pampachiri",
    idProv: 29,
  },
  {
    idDist: 262,
    distrito: "Pomacocha",
    idProv: 29,
  },
  {
    idDist: 263,
    distrito: "San Antonio de Cachi",
    idProv: 29,
  },
  {
    idDist: 264,
    distrito: "San Jerónimo",
    idProv: 29,
  },
  {
    idDist: 265,
    distrito: "San Miguel de Chaccrampa",
    idProv: 29,
  },
  {
    idDist: 266,
    distrito: "Santa María de Chicmo",
    idProv: 29,
  },
  {
    idDist: 267,
    distrito: "Talavera",
    idProv: 29,
  },
  {
    idDist: 268,
    distrito: "Tumay Huaraca",
    idProv: 29,
  },
  {
    idDist: 269,
    distrito: "Turpo",
    idProv: 29,
  },
  {
    idDist: 270,
    distrito: "Antabamba",
    idProv: 30,
  },
  {
    idDist: 271,
    distrito: "El Oro",
    idProv: 30,
  },
  {
    idDist: 272,
    distrito: "Huaquirca",
    idProv: 30,
  },
  {
    idDist: 273,
    distrito: "Juan Espinoza Medrano",
    idProv: 30,
  },
  {
    idDist: 274,
    distrito: "Oropesa",
    idProv: 30,
  },
  {
    idDist: 275,
    distrito: "Pachaconas",
    idProv: 30,
  },
  {
    idDist: 276,
    distrito: "Sabaino",
    idProv: 30,
  },
  {
    idDist: 277,
    distrito: "Chalhuanca",
    idProv: 31,
  },
  {
    idDist: 278,
    distrito: "Capaya",
    idProv: 31,
  },
  {
    idDist: 279,
    distrito: "Caraybamba",
    idProv: 31,
  },
  {
    idDist: 280,
    distrito: "Chapimarca",
    idProv: 31,
  },
  {
    idDist: 281,
    distrito: "Colcabamba",
    idProv: 31,
  },
  {
    idDist: 282,
    distrito: "Cotaruse",
    idProv: 31,
  },
  {
    idDist: 283,
    distrito: "Ihuayllo",
    idProv: 31,
  },
  {
    idDist: 284,
    distrito: "Justo Apu Sahuaraura",
    idProv: 31,
  },
  {
    idDist: 285,
    distrito: "Lucre",
    idProv: 31,
  },
  {
    idDist: 286,
    distrito: "Pocohuanca",
    idProv: 31,
  },
  {
    idDist: 287,
    distrito: "San Juan de Chacña",
    idProv: 31,
  },
  {
    idDist: 288,
    distrito: "Sañayca",
    idProv: 31,
  },
  {
    idDist: 289,
    distrito: "Soraya",
    idProv: 31,
  },
  {
    idDist: 290,
    distrito: "Tapairihua",
    idProv: 31,
  },
  {
    idDist: 291,
    distrito: "Tintay",
    idProv: 31,
  },
  {
    idDist: 292,
    distrito: "Toraya",
    idProv: 31,
  },
  {
    idDist: 293,
    distrito: "Yanaca",
    idProv: 31,
  },
  {
    idDist: 294,
    distrito: "Tambobamba",
    idProv: 32,
  },
  {
    idDist: 295,
    distrito: "Cotabambas",
    idProv: 32,
  },
  {
    idDist: 296,
    distrito: "Coyllurqui",
    idProv: 32,
  },
  {
    idDist: 297,
    distrito: "Haquira",
    idProv: 32,
  },
  {
    idDist: 298,
    distrito: "Mara",
    idProv: 32,
  },
  {
    idDist: 299,
    distrito: "Challhuahuacho",
    idProv: 32,
  },
  {
    idDist: 300,
    distrito: "Chincheros",
    idProv: 33,
  },
  {
    idDist: 301,
    distrito: "Anco_Huallo",
    idProv: 33,
  },
  {
    idDist: 302,
    distrito: "Cocharcas",
    idProv: 33,
  },
  {
    idDist: 303,
    distrito: "Huaccana",
    idProv: 33,
  },
  {
    idDist: 304,
    distrito: "Ocobamba",
    idProv: 33,
  },
  {
    idDist: 305,
    distrito: "Ongoy",
    idProv: 33,
  },
  {
    idDist: 306,
    distrito: "Uranmarca",
    idProv: 33,
  },
  {
    idDist: 307,
    distrito: "Ranracancha",
    idProv: 33,
  },
  {
    idDist: 308,
    distrito: "Rocchacc",
    idProv: 33,
  },
  {
    idDist: 309,
    distrito: "El Porvenir",
    idProv: 33,
  },
  {
    idDist: 310,
    distrito: "Chuquibambilla",
    idProv: 34,
  },
  {
    idDist: 311,
    distrito: "Curpahuasi",
    idProv: 34,
  },
  {
    idDist: 312,
    distrito: "Gamarra",
    idProv: 34,
  },
  {
    idDist: 313,
    distrito: "Huayllati",
    idProv: 34,
  },
  {
    idDist: 314,
    distrito: "Mamara",
    idProv: 34,
  },
  {
    idDist: 315,
    distrito: "Micaela Bastidas",
    idProv: 34,
  },
  {
    idDist: 316,
    distrito: "Pataypampa",
    idProv: 34,
  },
  {
    idDist: 317,
    distrito: "Progreso",
    idProv: 34,
  },
  {
    idDist: 318,
    distrito: "San Antonio",
    idProv: 34,
  },
  {
    idDist: 319,
    distrito: "Santa Rosa",
    idProv: 34,
  },
  {
    idDist: 320,
    distrito: "Turpay",
    idProv: 34,
  },
  {
    idDist: 321,
    distrito: "Vilcabamba",
    idProv: 34,
  },
  {
    idDist: 322,
    distrito: "Virundo",
    idProv: 34,
  },
  {
    idDist: 323,
    distrito: "Arequipa",
    idProv: 35,
  },
  {
    idDist: 324,
    distrito: "Alto Selva Alegre",
    idProv: 35,
  },
  {
    idDist: 325,
    distrito: "Cayma",
    idProv: 35,
  },
  {
    idDist: 326,
    distrito: "Cerro Colorado",
    idProv: 35,
  },
  {
    idDist: 327,
    distrito: "Characato",
    idProv: 35,
  },
  {
    idDist: 328,
    distrito: "Chiguata",
    idProv: 35,
  },
  {
    idDist: 329,
    distrito: "Jacobo Hunter",
    idProv: 35,
  },
  {
    idDist: 330,
    distrito: "José Luis Bustamante y Rivero",
    idProv: 35,
  },
  {
    idDist: 331,
    distrito: "La Joya",
    idProv: 35,
  },
  {
    idDist: 332,
    distrito: "Mariano Melgar",
    idProv: 35,
  },
  {
    idDist: 333,
    distrito: "Miraflores",
    idProv: 35,
  },
  {
    idDist: 334,
    distrito: "Mollebaya",
    idProv: 35,
  },
  {
    idDist: 335,
    distrito: "Paucarpata",
    idProv: 35,
  },
  {
    idDist: 336,
    distrito: "Pocsi",
    idProv: 35,
  },
  {
    idDist: 337,
    distrito: "Polobaya",
    idProv: 35,
  },
  {
    idDist: 338,
    distrito: "Quequeña",
    idProv: 35,
  },
  {
    idDist: 339,
    distrito: "Sabandia",
    idProv: 35,
  },
  {
    idDist: 340,
    distrito: "Sachaca",
    idProv: 35,
  },
  {
    idDist: 341,
    distrito: "San Juan de Siguas",
    idProv: 35,
  },
  {
    idDist: 342,
    distrito: "San Juan de Tarucani",
    idProv: 35,
  },
  {
    idDist: 343,
    distrito: "Santa Isabel de Siguas",
    idProv: 35,
  },
  {
    idDist: 344,
    distrito: "Santa Rita de Siguas",
    idProv: 35,
  },
  {
    idDist: 345,
    distrito: "Socabaya",
    idProv: 35,
  },
  {
    idDist: 346,
    distrito: "Tiabaya",
    idProv: 35,
  },
  {
    idDist: 347,
    distrito: "Uchumayo",
    idProv: 35,
  },
  {
    idDist: 348,
    distrito: "Vítor",
    idProv: 35,
  },
  {
    idDist: 349,
    distrito: "Yanahuara",
    idProv: 35,
  },
  {
    idDist: 350,
    distrito: "Yarabamba",
    idProv: 35,
  },
  {
    idDist: 351,
    distrito: "Yura",
    idProv: 35,
  },
  {
    idDist: 352,
    distrito: "Camaná",
    idProv: 36,
  },
  {
    idDist: 353,
    distrito: "José María Quimper",
    idProv: 36,
  },
  {
    idDist: 354,
    distrito: "Mariano Nicolás Valcárcel",
    idProv: 36,
  },
  {
    idDist: 355,
    distrito: "Mariscal Cáceres",
    idProv: 36,
  },
  {
    idDist: 356,
    distrito: "Nicolás de Piérola",
    idProv: 36,
  },
  {
    idDist: 357,
    distrito: "Ocoña",
    idProv: 36,
  },
  {
    idDist: 358,
    distrito: "Quilca",
    idProv: 36,
  },
  {
    idDist: 359,
    distrito: "Samuel Pastor",
    idProv: 36,
  },
  {
    idDist: 360,
    distrito: "Caravelí",
    idProv: 37,
  },
  {
    idDist: 361,
    distrito: "Acarí",
    idProv: 37,
  },
  {
    idDist: 362,
    distrito: "Atico",
    idProv: 37,
  },
  {
    idDist: 363,
    distrito: "Atiquipa",
    idProv: 37,
  },
  {
    idDist: 364,
    distrito: "Bella Unión",
    idProv: 37,
  },
  {
    idDist: 365,
    distrito: "Cahuacho",
    idProv: 37,
  },
  {
    idDist: 366,
    distrito: "Chala",
    idProv: 37,
  },
  {
    idDist: 367,
    distrito: "Chaparra",
    idProv: 37,
  },
  {
    idDist: 368,
    distrito: "Huanuhuanu",
    idProv: 37,
  },
  {
    idDist: 369,
    distrito: "Jaqui",
    idProv: 37,
  },
  {
    idDist: 370,
    distrito: "Lomas",
    idProv: 37,
  },
  {
    idDist: 371,
    distrito: "Quicacha",
    idProv: 37,
  },
  {
    idDist: 372,
    distrito: "Yauca",
    idProv: 37,
  },
  {
    idDist: 373,
    distrito: "Aplao",
    idProv: 38,
  },
  {
    idDist: 374,
    distrito: "Andagua",
    idProv: 38,
  },
  {
    idDist: 375,
    distrito: "Ayo",
    idProv: 38,
  },
  {
    idDist: 376,
    distrito: "Chachas",
    idProv: 38,
  },
  {
    idDist: 377,
    distrito: "Chilcaymarca",
    idProv: 38,
  },
  {
    idDist: 378,
    distrito: "Choco",
    idProv: 38,
  },
  {
    idDist: 379,
    distrito: "Huancarqui",
    idProv: 38,
  },
  {
    idDist: 380,
    distrito: "Machaguay",
    idProv: 38,
  },
  {
    idDist: 381,
    distrito: "Orcopampa",
    idProv: 38,
  },
  {
    idDist: 382,
    distrito: "Pampacolca",
    idProv: 38,
  },
  {
    idDist: 383,
    distrito: "Tipán",
    idProv: 38,
  },
  {
    idDist: 384,
    distrito: "Uñón",
    idProv: 38,
  },
  {
    idDist: 385,
    distrito: "Uraca",
    idProv: 38,
  },
  {
    idDist: 386,
    distrito: "Viraco",
    idProv: 38,
  },
  {
    idDist: 387,
    distrito: "Chivay",
    idProv: 39,
  },
  {
    idDist: 388,
    distrito: "Achoma",
    idProv: 39,
  },
  {
    idDist: 389,
    distrito: "Cabanaconde",
    idProv: 39,
  },
  {
    idDist: 390,
    distrito: "Callalli",
    idProv: 39,
  },
  {
    idDist: 391,
    distrito: "Caylloma",
    idProv: 39,
  },
  {
    idDist: 392,
    distrito: "Coporaque",
    idProv: 39,
  },
  {
    idDist: 393,
    distrito: "Huambo",
    idProv: 39,
  },
  {
    idDist: 394,
    distrito: "Huanca",
    idProv: 39,
  },
  {
    idDist: 395,
    distrito: "Ichupampa",
    idProv: 39,
  },
  {
    idDist: 396,
    distrito: "Lari",
    idProv: 39,
  },
  {
    idDist: 397,
    distrito: "Lluta",
    idProv: 39,
  },
  {
    idDist: 398,
    distrito: "Maca",
    idProv: 39,
  },
  {
    idDist: 399,
    distrito: "Madrigal",
    idProv: 39,
  },
  {
    idDist: 400,
    distrito: "Majes",
    idProv: 39,
  },
  {
    idDist: 401,
    distrito: "San Antonio de Chuca",
    idProv: 39,
  },
  {
    idDist: 402,
    distrito: "Sibayo",
    idProv: 39,
  },
  {
    idDist: 403,
    distrito: "Tapay",
    idProv: 39,
  },
  {
    idDist: 404,
    distrito: "Tisco",
    idProv: 39,
  },
  {
    idDist: 405,
    distrito: "Tuti",
    idProv: 39,
  },
  {
    idDist: 406,
    distrito: "Yanque",
    idProv: 39,
  },
  {
    idDist: 407,
    distrito: "Chuquibamba",
    idProv: 40,
  },
  {
    idDist: 408,
    distrito: "Andaray",
    idProv: 40,
  },
  {
    idDist: 409,
    distrito: "Cayarani",
    idProv: 40,
  },
  {
    idDist: 410,
    distrito: "Chichas",
    idProv: 40,
  },
  {
    idDist: 411,
    distrito: "Iray",
    idProv: 40,
  },
  {
    idDist: 412,
    distrito: "Río Grande",
    idProv: 40,
  },
  {
    idDist: 413,
    distrito: "Salamanca",
    idProv: 40,
  },
  {
    idDist: 414,
    distrito: "Yanaquihua",
    idProv: 40,
  },
  {
    idDist: 415,
    distrito: "Mollendo",
    idProv: 41,
  },
  {
    idDist: 416,
    distrito: "Cocachacra",
    idProv: 41,
  },
  {
    idDist: 417,
    distrito: "Dean Valdivia",
    idProv: 41,
  },
  {
    idDist: 418,
    distrito: "Islay",
    idProv: 41,
  },
  {
    idDist: 419,
    distrito: "Mejía",
    idProv: 41,
  },
  {
    idDist: 420,
    distrito: "Punta de Bombón",
    idProv: 41,
  },
  {
    idDist: 421,
    distrito: "Cotahuasi",
    idProv: 42,
  },
  {
    idDist: 422,
    distrito: "Alca",
    idProv: 42,
  },
  {
    idDist: 423,
    distrito: "Charcana",
    idProv: 42,
  },
  {
    idDist: 424,
    distrito: "Huaynacotas",
    idProv: 42,
  },
  {
    idDist: 425,
    distrito: "Pampamarca",
    idProv: 42,
  },
  {
    idDist: 426,
    distrito: "Puyca",
    idProv: 42,
  },
  {
    idDist: 427,
    distrito: "Quechualla",
    idProv: 42,
  },
  {
    idDist: 428,
    distrito: "Sayla",
    idProv: 42,
  },
  {
    idDist: 429,
    distrito: "Tauria",
    idProv: 42,
  },
  {
    idDist: 430,
    distrito: "Tomepampa",
    idProv: 42,
  },
  {
    idDist: 431,
    distrito: "Toro",
    idProv: 42,
  },
  {
    idDist: 432,
    distrito: "Ayacucho",
    idProv: 43,
  },
  {
    idDist: 433,
    distrito: "Acocro",
    idProv: 43,
  },
  {
    idDist: 434,
    distrito: "Acos Vinchos",
    idProv: 43,
  },
  {
    idDist: 435,
    distrito: "Carmen Alto",
    idProv: 43,
  },
  {
    idDist: 436,
    distrito: "Chiara",
    idProv: 43,
  },
  {
    idDist: 437,
    distrito: "Jesús Nazareno",
    idProv: 43,
  },
  {
    idDist: 438,
    distrito: "Ocros",
    idProv: 43,
  },
  {
    idDist: 439,
    distrito: "Pacaycasa",
    idProv: 43,
  },
  {
    idDist: 440,
    distrito: "Quinua",
    idProv: 43,
  },
  {
    idDist: 441,
    distrito: "San José de Ticllas",
    idProv: 43,
  },
  {
    idDist: 442,
    distrito: "San Juan Bautista",
    idProv: 43,
  },
  {
    idDist: 443,
    distrito: "Santiago de Pischa",
    idProv: 43,
  },
  {
    idDist: 444,
    distrito: "Socos",
    idProv: 43,
  },
  {
    idDist: 445,
    distrito: "Tambillo",
    idProv: 43,
  },
  {
    idDist: 446,
    distrito: "Vinchos",
    idProv: 43,
  },
  {
    idDist: 447,
    distrito: "Andrés Avelino Cáceres Dorregaray",
    idProv: 43,
  },
  {
    idDist: 448,
    distrito: "Cangallo",
    idProv: 44,
  },
  {
    idDist: 449,
    distrito: "Chuschi",
    idProv: 44,
  },
  {
    idDist: 450,
    distrito: "Los Morochucos",
    idProv: 44,
  },
  {
    idDist: 451,
    distrito: "María Parado de Bellido",
    idProv: 44,
  },
  {
    idDist: 452,
    distrito: "Paras",
    idProv: 44,
  },
  {
    idDist: 453,
    distrito: "Totos",
    idProv: 44,
  },
  {
    idDist: 454,
    distrito: "Huanca Sancos",
    idProv: 45,
  },
  {
    idDist: 455,
    distrito: "Carapo",
    idProv: 45,
  },
  {
    idDist: 456,
    distrito: "Sacsamarca",
    idProv: 45,
  },
  {
    idDist: 457,
    distrito: "Sancos",
    idProv: 45,
  },
  {
    idDist: 458,
    distrito: "Huanta",
    idProv: 46,
  },
  {
    idDist: 459,
    distrito: "Ayahuanco",
    idProv: 46,
  },
  {
    idDist: 460,
    distrito: "Huamanguilla",
    idProv: 46,
  },
  {
    idDist: 461,
    distrito: "Iguain",
    idProv: 46,
  },
  {
    idDist: 462,
    distrito: "Luricocha",
    idProv: 46,
  },
  {
    idDist: 463,
    distrito: "Santillana",
    idProv: 46,
  },
  {
    idDist: 464,
    distrito: "Sivia",
    idProv: 46,
  },
  {
    idDist: 465,
    distrito: "Llochegua",
    idProv: 46,
  },
  {
    idDist: 466,
    distrito: "Canayre",
    idProv: 46,
  },
  {
    idDist: 467,
    distrito: "Uchuraccay",
    idProv: 46,
  },
  {
    idDist: 468,
    distrito: "Pucacolpa",
    idProv: 46,
  },
  {
    idDist: 469,
    distrito: "Chaca",
    idProv: 46,
  },
  {
    idDist: 470,
    distrito: "San Miguel",
    idProv: 47,
  },
  {
    idDist: 471,
    distrito: "Anco",
    idProv: 47,
  },
  {
    idDist: 472,
    distrito: "Ayna",
    idProv: 47,
  },
  {
    idDist: 473,
    distrito: "Chilcas",
    idProv: 47,
  },
  {
    idDist: 474,
    distrito: "Chungui",
    idProv: 47,
  },
  {
    idDist: 475,
    distrito: "Luis Carranza",
    idProv: 47,
  },
  {
    idDist: 476,
    distrito: "Santa Rosa",
    idProv: 47,
  },
  {
    idDist: 477,
    distrito: "Tambo",
    idProv: 47,
  },
  {
    idDist: 478,
    distrito: "Samugari",
    idProv: 47,
  },
  {
    idDist: 479,
    distrito: "Anchihuay",
    idProv: 47,
  },
  {
    idDist: 480,
    distrito: "Puquio",
    idProv: 48,
  },
  {
    idDist: 481,
    distrito: "Aucara",
    idProv: 48,
  },
  {
    idDist: 482,
    distrito: "Cabana",
    idProv: 48,
  },
  {
    idDist: 483,
    distrito: "Carmen Salcedo",
    idProv: 48,
  },
  {
    idDist: 484,
    distrito: "Chaviña",
    idProv: 48,
  },
  {
    idDist: 485,
    distrito: "Chipao",
    idProv: 48,
  },
  {
    idDist: 486,
    distrito: "Huac-Huas",
    idProv: 48,
  },
  {
    idDist: 487,
    distrito: "Laramate",
    idProv: 48,
  },
  {
    idDist: 488,
    distrito: "Leoncio Prado",
    idProv: 48,
  },
  {
    idDist: 489,
    distrito: "Llauta",
    idProv: 48,
  },
  {
    idDist: 490,
    distrito: "Lucanas",
    idProv: 48,
  },
  {
    idDist: 491,
    distrito: "Ocaña",
    idProv: 48,
  },
  {
    idDist: 492,
    distrito: "Otoca",
    idProv: 48,
  },
  {
    idDist: 493,
    distrito: "Saisa",
    idProv: 48,
  },
  {
    idDist: 494,
    distrito: "San Cristóbal",
    idProv: 48,
  },
  {
    idDist: 495,
    distrito: "San Juan",
    idProv: 48,
  },
  {
    idDist: 496,
    distrito: "San Pedro",
    idProv: 48,
  },
  {
    idDist: 497,
    distrito: "San Pedro de Palco",
    idProv: 48,
  },
  {
    idDist: 498,
    distrito: "Sancos",
    idProv: 48,
  },
  {
    idDist: 499,
    distrito: "Santa Ana de Huaycahuacho",
    idProv: 48,
  },
  {
    idDist: 500,
    distrito: "Santa Lucia",
    idProv: 48,
  },
  {
    idDist: 501,
    distrito: "Coracora",
    idProv: 49,
  },
  {
    idDist: 502,
    distrito: "Chumpi",
    idProv: 49,
  },
  {
    idDist: 503,
    distrito: "Coronel Castañeda",
    idProv: 49,
  },
  {
    idDist: 504,
    distrito: "Pacapausa",
    idProv: 49,
  },
  {
    idDist: 505,
    distrito: "Pullo",
    idProv: 49,
  },
  {
    idDist: 506,
    distrito: "Puyusca",
    idProv: 49,
  },
  {
    idDist: 507,
    distrito: "San Francisco de Ravacayco",
    idProv: 49,
  },
  {
    idDist: 508,
    distrito: "Upahuacho",
    idProv: 49,
  },
  {
    idDist: 509,
    distrito: "Pausa",
    idProv: 50,
  },
  {
    idDist: 510,
    distrito: "Colta",
    idProv: 50,
  },
  {
    idDist: 511,
    distrito: "Corculla",
    idProv: 50,
  },
  {
    idDist: 512,
    distrito: "Lampa",
    idProv: 50,
  },
  {
    idDist: 513,
    distrito: "Marcabamba",
    idProv: 50,
  },
  {
    idDist: 514,
    distrito: "Oyolo",
    idProv: 50,
  },
  {
    idDist: 515,
    distrito: "Pararca",
    idProv: 50,
  },
  {
    idDist: 516,
    distrito: "San Javier de Alpabamba",
    idProv: 50,
  },
  {
    idDist: 517,
    distrito: "San José de Ushua",
    idProv: 50,
  },
  {
    idDist: 518,
    distrito: "Sara Sara",
    idProv: 50,
  },
  {
    idDist: 519,
    distrito: "Querobamba",
    idProv: 51,
  },
  {
    idDist: 520,
    distrito: "Belén",
    idProv: 51,
  },
  {
    idDist: 521,
    distrito: "Chalcos",
    idProv: 51,
  },
  {
    idDist: 522,
    distrito: "Chilcayoc",
    idProv: 51,
  },
  {
    idDist: 523,
    distrito: "Huacaña",
    idProv: 51,
  },
  {
    idDist: 524,
    distrito: "Morcolla",
    idProv: 51,
  },
  {
    idDist: 525,
    distrito: "Paico",
    idProv: 51,
  },
  {
    idDist: 526,
    distrito: "San Pedro de Larcay",
    idProv: 51,
  },
  {
    idDist: 527,
    distrito: "San Salvador de Quije",
    idProv: 51,
  },
  {
    idDist: 528,
    distrito: "Santiago de Paucaray",
    idProv: 51,
  },
  {
    idDist: 529,
    distrito: "Soras",
    idProv: 51,
  },
  {
    idDist: 530,
    distrito: "Huancapi",
    idProv: 52,
  },
  {
    idDist: 531,
    distrito: "Alcamenca",
    idProv: 52,
  },
  {
    idDist: 532,
    distrito: "Apongo",
    idProv: 52,
  },
  {
    idDist: 533,
    distrito: "Asquipata",
    idProv: 52,
  },
  {
    idDist: 534,
    distrito: "Canaria",
    idProv: 52,
  },
  {
    idDist: 535,
    distrito: "Cayara",
    idProv: 52,
  },
  {
    idDist: 536,
    distrito: "Colca",
    idProv: 52,
  },
  {
    idDist: 537,
    distrito: "Huamanquiquia",
    idProv: 52,
  },
  {
    idDist: 538,
    distrito: "Huancaraylla",
    idProv: 52,
  },
  {
    idDist: 539,
    distrito: "Huaya",
    idProv: 52,
  },
  {
    idDist: 540,
    distrito: "Sarhua",
    idProv: 52,
  },
  {
    idDist: 541,
    distrito: "Vilcanchos",
    idProv: 52,
  },
  {
    idDist: 542,
    distrito: "Vilcas Huamán",
    idProv: 53,
  },
  {
    idDist: 543,
    distrito: "Accomarca",
    idProv: 53,
  },
  {
    idDist: 544,
    distrito: "Carhuanca",
    idProv: 53,
  },
  {
    idDist: 545,
    distrito: "Concepción",
    idProv: 53,
  },
  {
    idDist: 546,
    distrito: "Huambalpa",
    idProv: 53,
  },
  {
    idDist: 547,
    distrito: "Independencia",
    idProv: 53,
  },
  {
    idDist: 548,
    distrito: "Saurama",
    idProv: 53,
  },
  {
    idDist: 549,
    distrito: "Vischongo",
    idProv: 53,
  },
  {
    idDist: 550,
    distrito: "Cajamarca",
    idProv: 54,
  },
  {
    idDist: 551,
    distrito: "Asunción",
    idProv: 54,
  },
  {
    idDist: 552,
    distrito: "Chetilla",
    idProv: 54,
  },
  {
    idDist: 553,
    distrito: "Cospán",
    idProv: 54,
  },
  {
    idDist: 554,
    distrito: "Encañada",
    idProv: 54,
  },
  {
    idDist: 555,
    distrito: "Jesús",
    idProv: 54,
  },
  {
    idDist: 556,
    distrito: "Llacanora",
    idProv: 54,
  },
  {
    idDist: 557,
    distrito: "Los Baños del Inca",
    idProv: 54,
  },
  {
    idDist: 558,
    distrito: "Magdalena",
    idProv: 54,
  },
  {
    idDist: 559,
    distrito: "Matara",
    idProv: 54,
  },
  {
    idDist: 560,
    distrito: "Namora",
    idProv: 54,
  },
  {
    idDist: 561,
    distrito: "San Juan",
    idProv: 54,
  },
  {
    idDist: 562,
    distrito: "Cajabamba",
    idProv: 55,
  },
  {
    idDist: 563,
    distrito: "Cachachi",
    idProv: 55,
  },
  {
    idDist: 564,
    distrito: "Condebamba",
    idProv: 55,
  },
  {
    idDist: 565,
    distrito: "Sitacocha",
    idProv: 55,
  },
  {
    idDist: 566,
    distrito: "Celendín",
    idProv: 56,
  },
  {
    idDist: 567,
    distrito: "Chumuch",
    idProv: 56,
  },
  {
    idDist: 568,
    distrito: "Cortegana",
    idProv: 56,
  },
  {
    idDist: 569,
    distrito: "Huasmin",
    idProv: 56,
  },
  {
    idDist: 570,
    distrito: "Jorge Chávez",
    idProv: 56,
  },
  {
    idDist: 571,
    distrito: "José Gálvez",
    idProv: 56,
  },
  {
    idDist: 572,
    distrito: "La Libertad de Pallán",
    idProv: 56,
  },
  {
    idDist: 573,
    distrito: "Miguel Iglesias",
    idProv: 56,
  },
  {
    idDist: 574,
    distrito: "Oxamarca",
    idProv: 56,
  },
  {
    idDist: 575,
    distrito: "Sorochuco",
    idProv: 56,
  },
  {
    idDist: 576,
    distrito: "Sucre",
    idProv: 56,
  },
  {
    idDist: 577,
    distrito: "Utco",
    idProv: 56,
  },
  {
    idDist: 578,
    distrito: "Chota",
    idProv: 57,
  },
  {
    idDist: 579,
    distrito: "Anguía",
    idProv: 57,
  },
  {
    idDist: 580,
    distrito: "Chadin",
    idProv: 57,
  },
  {
    idDist: 581,
    distrito: "Chalamarca",
    idProv: 57,
  },
  {
    idDist: 582,
    distrito: "Chiguirip",
    idProv: 57,
  },
  {
    idDist: 583,
    distrito: "Chimban",
    idProv: 57,
  },
  {
    idDist: 584,
    distrito: "Choropampa",
    idProv: 57,
  },
  {
    idDist: 585,
    distrito: "Cochabamba",
    idProv: 57,
  },
  {
    idDist: 586,
    distrito: "Conchan",
    idProv: 57,
  },
  {
    idDist: 587,
    distrito: "Huambos",
    idProv: 57,
  },
  {
    idDist: 588,
    distrito: "Lajas",
    idProv: 57,
  },
  {
    idDist: 589,
    distrito: "Llama",
    idProv: 57,
  },
  {
    idDist: 590,
    distrito: "Miracosta",
    idProv: 57,
  },
  {
    idDist: 591,
    distrito: "Paccha",
    idProv: 57,
  },
  {
    idDist: 592,
    distrito: "Pion",
    idProv: 57,
  },
  {
    idDist: 593,
    distrito: "Querocoto",
    idProv: 57,
  },
  {
    idDist: 594,
    distrito: "San Juan de Licupis",
    idProv: 57,
  },
  {
    idDist: 595,
    distrito: "Tacabamba",
    idProv: 57,
  },
  {
    idDist: 596,
    distrito: "Tocmoche",
    idProv: 57,
  },
  {
    idDist: 597,
    distrito: "Contumazá",
    idProv: 58,
  },
  {
    idDist: 598,
    distrito: "Chilete",
    idProv: 58,
  },
  {
    idDist: 599,
    distrito: "Cupisnique",
    idProv: 58,
  },
  {
    idDist: 600,
    distrito: "Guzmango",
    idProv: 58,
  },
  {
    idDist: 601,
    distrito: "San Benito",
    idProv: 58,
  },
  {
    idDist: 602,
    distrito: "Santa Cruz de Toledo",
    idProv: 58,
  },
  {
    idDist: 603,
    distrito: "Tantarica",
    idProv: 58,
  },
  {
    idDist: 604,
    distrito: "Yonán",
    idProv: 58,
  },
  {
    idDist: 605,
    distrito: "Cutervo",
    idProv: 59,
  },
  {
    idDist: 606,
    distrito: "Callayuc",
    idProv: 59,
  },
  {
    idDist: 607,
    distrito: "Choros",
    idProv: 59,
  },
  {
    idDist: 608,
    distrito: "Cujillo",
    idProv: 59,
  },
  {
    idDist: 609,
    distrito: "La Ramada",
    idProv: 59,
  },
  {
    idDist: 610,
    distrito: "Pimpingos",
    idProv: 59,
  },
  {
    idDist: 611,
    distrito: "Querocotillo",
    idProv: 59,
  },
  {
    idDist: 612,
    distrito: "San Andrés de Cutervo",
    idProv: 59,
  },
  {
    idDist: 613,
    distrito: "San Juan de Cutervo",
    idProv: 59,
  },
  {
    idDist: 614,
    distrito: "San Luis de Lucma",
    idProv: 59,
  },
  {
    idDist: 615,
    distrito: "Santa Cruz",
    idProv: 59,
  },
  {
    idDist: 616,
    distrito: "Santo Domingo de la Capilla",
    idProv: 59,
  },
  {
    idDist: 617,
    distrito: "Santo Tomás",
    idProv: 59,
  },
  {
    idDist: 618,
    distrito: "Socota",
    idProv: 59,
  },
  {
    idDist: 619,
    distrito: "Toribio Casanova",
    idProv: 59,
  },
  {
    idDist: 620,
    distrito: "Bambamarca",
    idProv: 60,
  },
  {
    idDist: 621,
    distrito: "Chugur",
    idProv: 60,
  },
  {
    idDist: 622,
    distrito: "Hualgayoc",
    idProv: 60,
  },
  {
    idDist: 623,
    distrito: "Jaén",
    idProv: 61,
  },
  {
    idDist: 624,
    distrito: "Bellavista",
    idProv: 61,
  },
  {
    idDist: 625,
    distrito: "Chontalí",
    idProv: 61,
  },
  {
    idDist: 626,
    distrito: "Colasay",
    idProv: 61,
  },
  {
    idDist: 627,
    distrito: "Huabal",
    idProv: 61,
  },
  {
    idDist: 628,
    distrito: "Las Pirias",
    idProv: 61,
  },
  {
    idDist: 629,
    distrito: "Pomahuaca",
    idProv: 61,
  },
  {
    idDist: 630,
    distrito: "Pucará",
    idProv: 61,
  },
  {
    idDist: 631,
    distrito: "Sallique",
    idProv: 61,
  },
  {
    idDist: 632,
    distrito: "San Felipe",
    idProv: 61,
  },
  {
    idDist: 633,
    distrito: "San José del Alto",
    idProv: 61,
  },
  {
    idDist: 634,
    distrito: "Santa Rosa",
    idProv: 61,
  },
  {
    idDist: 635,
    distrito: "San Ignacio",
    idProv: 62,
  },
  {
    idDist: 636,
    distrito: "Chirinos",
    idProv: 62,
  },
  {
    idDist: 637,
    distrito: "Huarango",
    idProv: 62,
  },
  {
    idDist: 638,
    distrito: "La Coipa",
    idProv: 62,
  },
  {
    idDist: 639,
    distrito: "Namballe",
    idProv: 62,
  },
  {
    idDist: 640,
    distrito: "San José de Lourdes",
    idProv: 62,
  },
  {
    idDist: 641,
    distrito: "Tabaconas",
    idProv: 62,
  },
  {
    idDist: 642,
    distrito: "San Marcos",
    idProv: 63,
  },
  {
    idDist: 643,
    distrito: "Chancay",
    idProv: 63,
  },
  {
    idDist: 644,
    distrito: "Eduardo Villanueva",
    idProv: 63,
  },
  {
    idDist: 645,
    distrito: "Gregorio Pita",
    idProv: 63,
  },
  {
    idDist: 646,
    distrito: "Ichocán",
    idProv: 63,
  },
  {
    idDist: 647,
    distrito: "José Manuel Quiroz",
    idProv: 63,
  },
  {
    idDist: 648,
    distrito: "José Sabogal",
    idProv: 63,
  },
  {
    idDist: 649,
    distrito: "San Miguel de Pallaques",
    idProv: 64,
  },
  {
    idDist: 650,
    distrito: "Bolívar",
    idProv: 64,
  },
  {
    idDist: 651,
    distrito: "Calquis",
    idProv: 64,
  },
  {
    idDist: 652,
    distrito: "Catilluc",
    idProv: 64,
  },
  {
    idDist: 653,
    distrito: "El Prado",
    idProv: 64,
  },
  {
    idDist: 654,
    distrito: "La Florida",
    idProv: 64,
  },
  {
    idDist: 655,
    distrito: "Llapa",
    idProv: 64,
  },
  {
    idDist: 656,
    distrito: "Nanchoc",
    idProv: 64,
  },
  {
    idDist: 657,
    distrito: "Niepos",
    idProv: 64,
  },
  {
    idDist: 658,
    distrito: "San Gregorio",
    idProv: 64,
  },
  {
    idDist: 659,
    distrito: "San Silvestre de Cochan",
    idProv: 64,
  },
  {
    idDist: 660,
    distrito: "Tongod",
    idProv: 64,
  },
  {
    idDist: 661,
    distrito: "Unión Agua Blanca",
    idProv: 64,
  },
  {
    idDist: 662,
    distrito: "San Pablo",
    idProv: 65,
  },
  {
    idDist: 663,
    distrito: "San Bernardino",
    idProv: 65,
  },
  {
    idDist: 664,
    distrito: "San Luis",
    idProv: 65,
  },
  {
    idDist: 665,
    distrito: "Tumbaden",
    idProv: 65,
  },
  {
    idDist: 666,
    distrito: "Santa Cruz",
    idProv: 66,
  },
  {
    idDist: 667,
    distrito: "Andabamba",
    idProv: 66,
  },
  {
    idDist: 668,
    distrito: "Catache",
    idProv: 66,
  },
  {
    idDist: 669,
    distrito: "Chancaybaños",
    idProv: 66,
  },
  {
    idDist: 670,
    distrito: "La Esperanza",
    idProv: 66,
  },
  {
    idDist: 671,
    distrito: "Ninabamba",
    idProv: 66,
  },
  {
    idDist: 672,
    distrito: "Pulan",
    idProv: 66,
  },
  {
    idDist: 673,
    distrito: "Saucepampa",
    idProv: 66,
  },
  {
    idDist: 674,
    distrito: "Sexi",
    idProv: 66,
  },
  {
    idDist: 675,
    distrito: "Uticyacu",
    idProv: 66,
  },
  {
    idDist: 676,
    distrito: "Yauyucan",
    idProv: 66,
  },
  {
    idDist: 677,
    distrito: "Callao",
    idProv: 67,
  },
  {
    idDist: 678,
    distrito: "Bellavista",
    idProv: 67,
  },
  {
    idDist: 679,
    distrito: "Carmen de la Legua Reynoso",
    idProv: 67,
  },
  {
    idDist: 680,
    distrito: "La Perla",
    idProv: 67,
  },
  {
    idDist: 681,
    distrito: "La Punta",
    idProv: 67,
  },
  {
    idDist: 682,
    distrito: "Ventanilla",
    idProv: 67,
  },
  {
    idDist: 683,
    distrito: "Mi Perú",
    idProv: 67,
  },
  {
    idDist: 684,
    distrito: "Cusco",
    idProv: 68,
  },
  {
    idDist: 685,
    distrito: "Ccorca",
    idProv: 68,
  },
  {
    idDist: 686,
    distrito: "Poroy",
    idProv: 68,
  },
  {
    idDist: 687,
    distrito: "San Jerónimo",
    idProv: 68,
  },
  {
    idDist: 688,
    distrito: "San Sebastián",
    idProv: 68,
  },
  {
    idDist: 689,
    distrito: "Santiago",
    idProv: 68,
  },
  {
    idDist: 690,
    distrito: "Saylla",
    idProv: 68,
  },
  {
    idDist: 691,
    distrito: "Wanchaq",
    idProv: 68,
  },
  {
    idDist: 692,
    distrito: "Acomayo",
    idProv: 69,
  },
  {
    idDist: 693,
    distrito: "Acopia",
    idProv: 69,
  },
  {
    idDist: 694,
    distrito: "Acos",
    idProv: 69,
  },
  {
    idDist: 695,
    distrito: "Mosoc Llacta",
    idProv: 69,
  },
  {
    idDist: 696,
    distrito: "Pomacanchi",
    idProv: 69,
  },
  {
    idDist: 697,
    distrito: "Rondocan",
    idProv: 69,
  },
  {
    idDist: 698,
    distrito: "Sangarará",
    idProv: 69,
  },
  {
    idDist: 699,
    distrito: "Anta",
    idProv: 70,
  },
  {
    idDist: 700,
    distrito: "Ancahuasi",
    idProv: 70,
  },
  {
    idDist: 701,
    distrito: "Cachimayo",
    idProv: 70,
  },
  {
    idDist: 702,
    distrito: "Chinchaypujio",
    idProv: 70,
  },
  {
    idDist: 703,
    distrito: "Huarocondo",
    idProv: 70,
  },
  {
    idDist: 704,
    distrito: "Limatambo",
    idProv: 70,
  },
  {
    idDist: 705,
    distrito: "Mollepata",
    idProv: 70,
  },
  {
    idDist: 706,
    distrito: "Pucyura",
    idProv: 70,
  },
  {
    idDist: 707,
    distrito: "Zurite",
    idProv: 70,
  },
  {
    idDist: 708,
    distrito: "Calca",
    idProv: 71,
  },
  {
    idDist: 709,
    distrito: "Coya",
    idProv: 71,
  },
  {
    idDist: 710,
    distrito: "Lamay",
    idProv: 71,
  },
  {
    idDist: 711,
    distrito: "Lares",
    idProv: 71,
  },
  {
    idDist: 712,
    distrito: "Pisac",
    idProv: 71,
  },
  {
    idDist: 713,
    distrito: "San Salvador",
    idProv: 71,
  },
  {
    idDist: 714,
    distrito: "Taray",
    idProv: 71,
  },
  {
    idDist: 715,
    distrito: "Yanatile",
    idProv: 71,
  },
  {
    idDist: 716,
    distrito: "Yanaoca",
    idProv: 72,
  },
  {
    idDist: 717,
    distrito: "Checca",
    idProv: 72,
  },
  {
    idDist: 718,
    distrito: "Kunturkanki",
    idProv: 72,
  },
  {
    idDist: 719,
    distrito: "Langui",
    idProv: 72,
  },
  {
    idDist: 720,
    distrito: "Layo",
    idProv: 72,
  },
  {
    idDist: 721,
    distrito: "Pampamarca",
    idProv: 72,
  },
  {
    idDist: 722,
    distrito: "Quehue",
    idProv: 72,
  },
  {
    idDist: 723,
    distrito: "Túpac Amaru",
    idProv: 72,
  },
  {
    idDist: 724,
    distrito: "Sicuani",
    idProv: 73,
  },
  {
    idDist: 725,
    distrito: "Checacupe",
    idProv: 73,
  },
  {
    idDist: 726,
    distrito: "Combapata",
    idProv: 73,
  },
  {
    idDist: 727,
    distrito: "Marangani",
    idProv: 73,
  },
  {
    idDist: 728,
    distrito: "Pitumarca",
    idProv: 73,
  },
  {
    idDist: 729,
    distrito: "San Pablo",
    idProv: 73,
  },
  {
    idDist: 730,
    distrito: "San Pedro",
    idProv: 73,
  },
  {
    idDist: 731,
    distrito: "Tinta",
    idProv: 73,
  },
  {
    idDist: 732,
    distrito: "Santo Tomás",
    idProv: 74,
  },
  {
    idDist: 733,
    distrito: "Capacmarca",
    idProv: 74,
  },
  {
    idDist: 734,
    distrito: "Chamaca",
    idProv: 74,
  },
  {
    idDist: 735,
    distrito: "Colquemarca",
    idProv: 74,
  },
  {
    idDist: 736,
    distrito: "Livitaca",
    idProv: 74,
  },
  {
    idDist: 737,
    distrito: "Llusco",
    idProv: 74,
  },
  {
    idDist: 738,
    distrito: "Quiñota",
    idProv: 74,
  },
  {
    idDist: 739,
    distrito: "Velille",
    idProv: 74,
  },
  {
    idDist: 740,
    distrito: "Espinar",
    idProv: 75,
  },
  {
    idDist: 741,
    distrito: "Condoroma",
    idProv: 75,
  },
  {
    idDist: 742,
    distrito: "Coporaque",
    idProv: 75,
  },
  {
    idDist: 743,
    distrito: "Ocoruro",
    idProv: 75,
  },
  {
    idDist: 744,
    distrito: "Pallpata",
    idProv: 75,
  },
  {
    idDist: 745,
    distrito: "Pichigua",
    idProv: 75,
  },
  {
    idDist: 746,
    distrito: "Suyckutambo",
    idProv: 75,
  },
  {
    idDist: 747,
    distrito: "Alto Pichigua",
    idProv: 75,
  },
  {
    idDist: 748,
    distrito: "Santa Ana",
    idProv: 76,
  },
  {
    idDist: 749,
    distrito: "Echarate",
    idProv: 76,
  },
  {
    idDist: 750,
    distrito: "Huayopata",
    idProv: 76,
  },
  {
    idDist: 751,
    distrito: "Maranura",
    idProv: 76,
  },
  {
    idDist: 752,
    distrito: "Ocobamba",
    idProv: 76,
  },
  {
    idDist: 753,
    distrito: "Quellouno",
    idProv: 76,
  },
  {
    idDist: 754,
    distrito: "Kimbiri",
    idProv: 76,
  },
  {
    idDist: 755,
    distrito: "Santa Teresa",
    idProv: 76,
  },
  {
    idDist: 756,
    distrito: "Vilcabamba",
    idProv: 76,
  },
  {
    idDist: 757,
    distrito: "Pichari",
    idProv: 76,
  },
  {
    idDist: 758,
    distrito: "Inkawasi",
    idProv: 76,
  },
  {
    idDist: 759,
    distrito: "Villa Virgen",
    idProv: 76,
  },
  {
    idDist: 760,
    distrito: "Paruro",
    idProv: 77,
  },
  {
    idDist: 761,
    distrito: "Accha",
    idProv: 77,
  },
  {
    idDist: 762,
    distrito: "Ccapi",
    idProv: 77,
  },
  {
    idDist: 763,
    distrito: "Colcha",
    idProv: 77,
  },
  {
    idDist: 764,
    distrito: "Huanoquite",
    idProv: 77,
  },
  {
    idDist: 765,
    distrito: "Omacha",
    idProv: 77,
  },
  {
    idDist: 766,
    distrito: "Paccaritambo",
    idProv: 77,
  },
  {
    idDist: 767,
    distrito: "Pillpinto",
    idProv: 77,
  },
  {
    idDist: 768,
    distrito: "Yaurisque",
    idProv: 77,
  },
  {
    idDist: 769,
    distrito: "Paucartambo",
    idProv: 78,
  },
  {
    idDist: 770,
    distrito: "Caicay",
    idProv: 78,
  },
  {
    idDist: 771,
    distrito: "Challabamba",
    idProv: 78,
  },
  {
    idDist: 772,
    distrito: "Colquepata",
    idProv: 78,
  },
  {
    idDist: 773,
    distrito: "Huancarani",
    idProv: 78,
  },
  {
    idDist: 774,
    distrito: "Kosñipata",
    idProv: 78,
  },
  {
    idDist: 775,
    distrito: "Urcos",
    idProv: 79,
  },
  {
    idDist: 776,
    distrito: "Andahuaylillas",
    idProv: 79,
  },
  {
    idDist: 777,
    distrito: "Camanti",
    idProv: 79,
  },
  {
    idDist: 778,
    distrito: "Ccarhuayo",
    idProv: 79,
  },
  {
    idDist: 779,
    distrito: "Ccatca",
    idProv: 79,
  },
  {
    idDist: 780,
    distrito: "Cusipata",
    idProv: 79,
  },
  {
    idDist: 781,
    distrito: "Huaro",
    idProv: 79,
  },
  {
    idDist: 782,
    distrito: "Lucre",
    idProv: 79,
  },
  {
    idDist: 783,
    distrito: "Marcapata",
    idProv: 79,
  },
  {
    idDist: 784,
    distrito: "Ocongate",
    idProv: 79,
  },
  {
    idDist: 785,
    distrito: "Oropesa",
    idProv: 79,
  },
  {
    idDist: 786,
    distrito: "Quiquijana",
    idProv: 79,
  },
  {
    idDist: 787,
    distrito: "Urubamba",
    idProv: 80,
  },
  {
    idDist: 788,
    distrito: "Chinchero",
    idProv: 80,
  },
  {
    idDist: 789,
    distrito: "Huayllabamba",
    idProv: 80,
  },
  {
    idDist: 790,
    distrito: "Machupicchu",
    idProv: 80,
  },
  {
    idDist: 791,
    distrito: "Maras",
    idProv: 80,
  },
  {
    idDist: 792,
    distrito: "Ollantaytambo",
    idProv: 80,
  },
  {
    idDist: 793,
    distrito: "Yucay",
    idProv: 80,
  },
  {
    idDist: 794,
    distrito: "Huancavelica",
    idProv: 81,
  },
  {
    idDist: 795,
    distrito: "Acobambilla",
    idProv: 81,
  },
  {
    idDist: 796,
    distrito: "Acoria",
    idProv: 81,
  },
  {
    idDist: 797,
    distrito: "Conayca",
    idProv: 81,
  },
  {
    idDist: 798,
    distrito: "Cuenca",
    idProv: 81,
  },
  {
    idDist: 799,
    distrito: "Huachocolpa",
    idProv: 81,
  },
  {
    idDist: 800,
    distrito: "Huayllahuara",
    idProv: 81,
  },
  {
    idDist: 801,
    distrito: "Izcuchaca",
    idProv: 81,
  },
  {
    idDist: 802,
    distrito: "Laria",
    idProv: 81,
  },
  {
    idDist: 803,
    distrito: "Manta",
    idProv: 81,
  },
  {
    idDist: 804,
    distrito: "Mariscal Cáceres",
    idProv: 81,
  },
  {
    idDist: 805,
    distrito: "Moya",
    idProv: 81,
  },
  {
    idDist: 806,
    distrito: "Nuevo Occoro",
    idProv: 81,
  },
  {
    idDist: 807,
    distrito: "Palca",
    idProv: 81,
  },
  {
    idDist: 808,
    distrito: "Pilchaca",
    idProv: 81,
  },
  {
    idDist: 809,
    distrito: "Vilca",
    idProv: 81,
  },
  {
    idDist: 810,
    distrito: "Yauli",
    idProv: 81,
  },
  {
    idDist: 811,
    distrito: "Ascensión",
    idProv: 81,
  },
  {
    idDist: 812,
    distrito: "Acobamba",
    idProv: 82,
  },
  {
    idDist: 813,
    distrito: "Andabamba",
    idProv: 82,
  },
  {
    idDist: 814,
    distrito: "Anta",
    idProv: 82,
  },
  {
    idDist: 815,
    distrito: "Caja",
    idProv: 82,
  },
  {
    idDist: 816,
    distrito: "Marcas",
    idProv: 82,
  },
  {
    idDist: 817,
    distrito: "Paucará",
    idProv: 82,
  },
  {
    idDist: 818,
    distrito: "Pomacocha",
    idProv: 82,
  },
  {
    idDist: 819,
    distrito: "Rosario",
    idProv: 82,
  },
  {
    idDist: 820,
    distrito: "Lircay",
    idProv: 83,
  },
  {
    idDist: 821,
    distrito: "Anchonga",
    idProv: 83,
  },
  {
    idDist: 822,
    distrito: "Callanmarca",
    idProv: 83,
  },
  {
    idDist: 823,
    distrito: "Ccochaccasa",
    idProv: 83,
  },
  {
    idDist: 824,
    distrito: "Chincho",
    idProv: 83,
  },
  {
    idDist: 825,
    distrito: "Congalla",
    idProv: 83,
  },
  {
    idDist: 826,
    distrito: "Huanca-Huanca",
    idProv: 83,
  },
  {
    idDist: 827,
    distrito: "Huayllay Grande",
    idProv: 83,
  },
  {
    idDist: 828,
    distrito: "Julcamarca",
    idProv: 83,
  },
  {
    idDist: 829,
    distrito: "San Antonio de Antaparco",
    idProv: 83,
  },
  {
    idDist: 830,
    distrito: "Santo Tomás de Pata",
    idProv: 83,
  },
  {
    idDist: 831,
    distrito: "Secclla",
    idProv: 83,
  },
  {
    idDist: 832,
    distrito: "Castrovirreyna",
    idProv: 84,
  },
  {
    idDist: 833,
    distrito: "Arma",
    idProv: 84,
  },
  {
    idDist: 834,
    distrito: "Aurahua",
    idProv: 84,
  },
  {
    idDist: 835,
    distrito: "Capillas",
    idProv: 84,
  },
  {
    idDist: 836,
    distrito: "Chupamarca",
    idProv: 84,
  },
  {
    idDist: 837,
    distrito: "Cocas",
    idProv: 84,
  },
  {
    idDist: 838,
    distrito: "Huachos",
    idProv: 84,
  },
  {
    idDist: 839,
    distrito: "Huamatambo",
    idProv: 84,
  },
  {
    idDist: 840,
    distrito: "Mollepampa",
    idProv: 84,
  },
  {
    idDist: 841,
    distrito: "San Juan",
    idProv: 84,
  },
  {
    idDist: 842,
    distrito: "Santa Ana",
    idProv: 84,
  },
  {
    idDist: 843,
    distrito: "Tantara",
    idProv: 84,
  },
  {
    idDist: 844,
    distrito: "Ticrapo",
    idProv: 84,
  },
  {
    idDist: 845,
    distrito: "Churcampa",
    idProv: 85,
  },
  {
    idDist: 846,
    distrito: "Anco",
    idProv: 85,
  },
  {
    idDist: 847,
    distrito: "Chinchihuasi",
    idProv: 85,
  },
  {
    idDist: 848,
    distrito: "El Carmen",
    idProv: 85,
  },
  {
    idDist: 849,
    distrito: "La Merced",
    idProv: 85,
  },
  {
    idDist: 850,
    distrito: "Locroja",
    idProv: 85,
  },
  {
    idDist: 851,
    distrito: "Pachamarca",
    idProv: 85,
  },
  {
    idDist: 852,
    distrito: "Paucarbamba",
    idProv: 85,
  },
  {
    idDist: 853,
    distrito: "San Miguel de Mayocc",
    idProv: 85,
  },
  {
    idDist: 854,
    distrito: "San Pedro de Coris",
    idProv: 85,
  },
  {
    idDist: 855,
    distrito: "Huaytará",
    idProv: 86,
  },
  {
    idDist: 856,
    distrito: "Ayaví",
    idProv: 86,
  },
  {
    idDist: 857,
    distrito: "Córdova",
    idProv: 86,
  },
  {
    idDist: 858,
    distrito: "Huayacundo Arma",
    idProv: 86,
  },
  {
    idDist: 859,
    distrito: "Laramarca",
    idProv: 86,
  },
  {
    idDist: 860,
    distrito: "Ocoyo",
    idProv: 86,
  },
  {
    idDist: 861,
    distrito: "Pilpichaca",
    idProv: 86,
  },
  {
    idDist: 862,
    distrito: "Querco",
    idProv: 86,
  },
  {
    idDist: 863,
    distrito: "Quito-Arma",
    idProv: 86,
  },
  {
    idDist: 864,
    distrito: "San Antonio de Cusicancha",
    idProv: 86,
  },
  {
    idDist: 865,
    distrito: "San Francisco de Sangayaico",
    idProv: 86,
  },
  {
    idDist: 866,
    distrito: "San Isidro",
    idProv: 86,
  },
  {
    idDist: 867,
    distrito: "Santiago de Chocorvos",
    idProv: 86,
  },
  {
    idDist: 868,
    distrito: "Santiago de Quirahuara",
    idProv: 86,
  },
  {
    idDist: 869,
    distrito: "Santo Domingo de Capillas",
    idProv: 86,
  },
  {
    idDist: 870,
    distrito: "Tambo",
    idProv: 86,
  },
  {
    idDist: 871,
    distrito: "Pampas",
    idProv: 87,
  },
  {
    idDist: 872,
    distrito: "Acostambo",
    idProv: 87,
  },
  {
    idDist: 873,
    distrito: "Acraquia",
    idProv: 87,
  },
  {
    idDist: 874,
    distrito: "Ahuaycha",
    idProv: 87,
  },
  {
    idDist: 875,
    distrito: "Colcabamba",
    idProv: 87,
  },
  {
    idDist: 876,
    distrito: "Daniel Hernández",
    idProv: 87,
  },
  {
    idDist: 877,
    distrito: "Huachocolpa",
    idProv: 87,
  },
  {
    idDist: 878,
    distrito: "Huaribamba",
    idProv: 87,
  },
  {
    idDist: 879,
    distrito: "Ñahuimpuquio",
    idProv: 87,
  },
  {
    idDist: 880,
    distrito: "Pazos",
    idProv: 87,
  },
  {
    idDist: 881,
    distrito: "Quishuar",
    idProv: 87,
  },
  {
    idDist: 882,
    distrito: "Salcabamba",
    idProv: 87,
  },
  {
    idDist: 883,
    distrito: "Salcahuasi",
    idProv: 87,
  },
  {
    idDist: 884,
    distrito: "San Marcos de Rocchac",
    idProv: 87,
  },
  {
    idDist: 885,
    distrito: "Surcubamba",
    idProv: 87,
  },
  {
    idDist: 886,
    distrito: "Tintay Puncu",
    idProv: 87,
  },
  {
    idDist: 887,
    distrito: "Quichuas",
    idProv: 87,
  },
  {
    idDist: 888,
    distrito: "Andaymarca",
    idProv: 87,
  },
  {
    idDist: 889,
    distrito: "Roble",
    idProv: 87,
  },
  {
    idDist: 890,
    distrito: "Pichos",
    idProv: 87,
  },
  {
    idDist: 891,
    distrito: "Huánuco",
    idProv: 88,
  },
  {
    idDist: 892,
    distrito: "Amarilis",
    idProv: 88,
  },
  {
    idDist: 893,
    distrito: "Chinchao",
    idProv: 88,
  },
  {
    idDist: 894,
    distrito: "Churubamba",
    idProv: 88,
  },
  {
    idDist: 895,
    distrito: "Margos",
    idProv: 88,
  },
  {
    idDist: 896,
    distrito: "Quisqui (Kichki)",
    idProv: 88,
  },
  {
    idDist: 897,
    distrito: "San Francisco de Cayrán",
    idProv: 88,
  },
  {
    idDist: 898,
    distrito: "San Pedro de Chaulán",
    idProv: 88,
  },
  {
    idDist: 899,
    distrito: "Santa María del Valle",
    idProv: 88,
  },
  {
    idDist: 900,
    distrito: "Yarumayo",
    idProv: 88,
  },
  {
    idDist: 901,
    distrito: "Pillco Marca",
    idProv: 88,
  },
  {
    idDist: 902,
    distrito: "Ambo",
    idProv: 89,
  },
  {
    idDist: 903,
    distrito: "Cayna",
    idProv: 89,
  },
  {
    idDist: 904,
    distrito: "Colpas",
    idProv: 89,
  },
  {
    idDist: 905,
    distrito: "Conchamarca",
    idProv: 89,
  },
  {
    idDist: 906,
    distrito: "Huacar",
    idProv: 89,
  },
  {
    idDist: 907,
    distrito: "San Francisco",
    idProv: 89,
  },
  {
    idDist: 908,
    distrito: "San Rafael",
    idProv: 89,
  },
  {
    idDist: 909,
    distrito: "Tomay Kichwa",
    idProv: 89,
  },
  {
    idDist: 910,
    distrito: "La Unión",
    idProv: 90,
  },
  {
    idDist: 911,
    distrito: "Chuquis",
    idProv: 90,
  },
  {
    idDist: 912,
    distrito: "Marías",
    idProv: 90,
  },
  {
    idDist: 913,
    distrito: "Pachas",
    idProv: 90,
  },
  {
    idDist: 914,
    distrito: "Quivilla",
    idProv: 90,
  },
  {
    idDist: 915,
    distrito: "Ripán",
    idProv: 90,
  },
  {
    idDist: 916,
    distrito: "Shunqui",
    idProv: 90,
  },
  {
    idDist: 917,
    distrito: "Sillapata",
    idProv: 90,
  },
  {
    idDist: 918,
    distrito: "Yanas",
    idProv: 90,
  },
  {
    idDist: 919,
    distrito: "Huacaybamba",
    idProv: 91,
  },
  {
    idDist: 920,
    distrito: "Canchabamba",
    idProv: 91,
  },
  {
    idDist: 921,
    distrito: "Cochabamba",
    idProv: 91,
  },
  {
    idDist: 922,
    distrito: "Pinra",
    idProv: 91,
  },
  {
    idDist: 923,
    distrito: "Llata",
    idProv: 92,
  },
  {
    idDist: 924,
    distrito: "Arancay",
    idProv: 92,
  },
  {
    idDist: 925,
    distrito: "Chavín de Pariarca",
    idProv: 92,
  },
  {
    idDist: 926,
    distrito: "Jacas Grande",
    idProv: 92,
  },
  {
    idDist: 927,
    distrito: "Jircan",
    idProv: 92,
  },
  {
    idDist: 928,
    distrito: "Miraflores",
    idProv: 92,
  },
  {
    idDist: 929,
    distrito: "Monzón",
    idProv: 92,
  },
  {
    idDist: 930,
    distrito: "Punchao",
    idProv: 92,
  },
  {
    idDist: 931,
    distrito: "Puños",
    idProv: 92,
  },
  {
    idDist: 932,
    distrito: "Singa",
    idProv: 92,
  },
  {
    idDist: 933,
    distrito: "Tantamayo",
    idProv: 92,
  },
  {
    idDist: 934,
    distrito: "Rupa-Rupa",
    idProv: 93,
  },
  {
    idDist: 935,
    distrito: "Daniel Alomía Robles",
    idProv: 93,
  },
  {
    idDist: 936,
    distrito: "Hermilio Valdizán",
    idProv: 93,
  },
  {
    idDist: 937,
    distrito: "José Crespo y Castillo",
    idProv: 93,
  },
  {
    idDist: 938,
    distrito: "Luyando",
    idProv: 93,
  },
  {
    idDist: 939,
    distrito: "Mariano Dámaso Beraún",
    idProv: 93,
  },
  {
    idDist: 940,
    distrito: "Pucayacu",
    idProv: 93,
  },
  {
    idDist: 941,
    distrito: "Huacrachuco",
    idProv: 94,
  },
  {
    idDist: 942,
    distrito: "Cholon",
    idProv: 94,
  },
  {
    idDist: 943,
    distrito: "San Buenaventura",
    idProv: 94,
  },
  {
    idDist: 944,
    distrito: "Panao",
    idProv: 95,
  },
  {
    idDist: 945,
    distrito: "Chaglla",
    idProv: 95,
  },
  {
    idDist: 946,
    distrito: "Molino",
    idProv: 95,
  },
  {
    idDist: 947,
    distrito: "Umari",
    idProv: 95,
  },
  {
    idDist: 948,
    distrito: "Puerto Inca",
    idProv: 96,
  },
  {
    idDist: 949,
    distrito: "Codo del Pozuzo",
    idProv: 96,
  },
  {
    idDist: 950,
    distrito: "Honoria",
    idProv: 96,
  },
  {
    idDist: 951,
    distrito: "Tournavista",
    idProv: 96,
  },
  {
    idDist: 952,
    distrito: "Yuyapichis",
    idProv: 96,
  },
  {
    idDist: 953,
    distrito: "Jesús",
    idProv: 97,
  },
  {
    idDist: 954,
    distrito: "Baños",
    idProv: 97,
  },
  {
    idDist: 955,
    distrito: "Jivia",
    idProv: 97,
  },
  {
    idDist: 956,
    distrito: "Queropalca",
    idProv: 97,
  },
  {
    idDist: 957,
    distrito: "Rondos",
    idProv: 97,
  },
  {
    idDist: 958,
    distrito: "San Francisco de Asís",
    idProv: 97,
  },
  {
    idDist: 959,
    distrito: "San Miguel de Cauri",
    idProv: 97,
  },
  {
    idDist: 960,
    distrito: "Chavinillo",
    idProv: 98,
  },
  {
    idDist: 961,
    distrito: "Cahuac",
    idProv: 98,
  },
  {
    idDist: 962,
    distrito: "Chacabamba",
    idProv: 98,
  },
  {
    idDist: 963,
    distrito: "Aparicio Pomares",
    idProv: 98,
  },
  {
    idDist: 964,
    distrito: "Jacas Chico",
    idProv: 98,
  },
  {
    idDist: 965,
    distrito: "Obas",
    idProv: 98,
  },
  {
    idDist: 966,
    distrito: "Pampamarca",
    idProv: 98,
  },
  {
    idDist: 967,
    distrito: "Ica",
    idProv: 99,
  },
  {
    idDist: 968,
    distrito: "La Tinguiña",
    idProv: 99,
  },
  {
    idDist: 969,
    distrito: "Los Aquijes",
    idProv: 99,
  },
  {
    idDist: 970,
    distrito: "Ocucaje",
    idProv: 99,
  },
  {
    idDist: 971,
    distrito: "Pachacutec",
    idProv: 99,
  },
  {
    idDist: 972,
    distrito: "Parcona",
    idProv: 99,
  },
  {
    idDist: 973,
    distrito: "Pueblo Nuevo",
    idProv: 99,
  },
  {
    idDist: 974,
    distrito: "Salas",
    idProv: 99,
  },
  {
    idDist: 975,
    distrito: "San José de Los Molinos",
    idProv: 99,
  },
  {
    idDist: 976,
    distrito: "San Juan Bautista",
    idProv: 99,
  },
  {
    idDist: 977,
    distrito: "Santiago",
    idProv: 99,
  },
  {
    idDist: 978,
    distrito: "Subtanjalla",
    idProv: 99,
  },
  {
    idDist: 979,
    distrito: "Tate",
    idProv: 99,
  },
  {
    idDist: 980,
    distrito: "Yauca del Rosario",
    idProv: 99,
  },
  {
    idDist: 981,
    distrito: "Chincha Alta",
    idProv: 100,
  },
  {
    idDist: 982,
    distrito: "Alto Larán",
    idProv: 100,
  },
  {
    idDist: 983,
    distrito: "Chavín",
    idProv: 100,
  },
  {
    idDist: 984,
    distrito: "Chincha Baja",
    idProv: 100,
  },
  {
    idDist: 985,
    distrito: "El Carmen",
    idProv: 100,
  },
  {
    idDist: 986,
    distrito: "Grocio Prado",
    idProv: 100,
  },
  {
    idDist: 987,
    distrito: "Pueblo Nuevo",
    idProv: 100,
  },
  {
    idDist: 988,
    distrito: "San Juan de Yanac",
    idProv: 100,
  },
  {
    idDist: 989,
    distrito: "San Pedro de Huacarpana",
    idProv: 100,
  },
  {
    idDist: 990,
    distrito: "Sunampe",
    idProv: 100,
  },
  {
    idDist: 991,
    distrito: "Tambo de Mora",
    idProv: 100,
  },
  {
    idDist: 992,
    distrito: "Nazca",
    idProv: 101,
  },
  {
    idDist: 993,
    distrito: "Changuillo",
    idProv: 101,
  },
  {
    idDist: 994,
    distrito: "El Ingenio",
    idProv: 101,
  },
  {
    idDist: 995,
    distrito: "Marcona",
    idProv: 101,
  },
  {
    idDist: 996,
    distrito: "Vista Alegre",
    idProv: 101,
  },
  {
    idDist: 997,
    distrito: "Palpa",
    idProv: 102,
  },
  {
    idDist: 998,
    distrito: "Llipata",
    idProv: 102,
  },
  {
    idDist: 999,
    distrito: "Río Grande",
    idProv: 102,
  },
  {
    idDist: 1000,
    distrito: "Santa Cruz",
    idProv: 102,
  },
  {
    idDist: 1001,
    distrito: "Tibillo",
    idProv: 102,
  },
  {
    idDist: 1002,
    distrito: "Pisco",
    idProv: 103,
  },
  {
    idDist: 1003,
    distrito: "Huancano",
    idProv: 103,
  },
  {
    idDist: 1004,
    distrito: "Humay",
    idProv: 103,
  },
  {
    idDist: 1005,
    distrito: "Independencia",
    idProv: 103,
  },
  {
    idDist: 1006,
    distrito: "Paracas",
    idProv: 103,
  },
  {
    idDist: 1007,
    distrito: "San Andrés",
    idProv: 103,
  },
  {
    idDist: 1008,
    distrito: "San Clemente",
    idProv: 103,
  },
  {
    idDist: 1009,
    distrito: "Tupac Amaru Inca",
    idProv: 103,
  },
  {
    idDist: 1010,
    distrito: "Huancayo",
    idProv: 104,
  },
  {
    idDist: 1011,
    distrito: "Carhuacallanga",
    idProv: 104,
  },
  {
    idDist: 1012,
    distrito: "Chacapampa",
    idProv: 104,
  },
  {
    idDist: 1013,
    distrito: "Chicche",
    idProv: 104,
  },
  {
    idDist: 1014,
    distrito: "Chilca",
    idProv: 104,
  },
  {
    idDist: 1015,
    distrito: "Chongos Alto",
    idProv: 104,
  },
  {
    idDist: 1016,
    distrito: "Chupuro",
    idProv: 104,
  },
  {
    idDist: 1017,
    distrito: "Colca",
    idProv: 104,
  },
  {
    idDist: 1018,
    distrito: "Cullhuas",
    idProv: 104,
  },
  {
    idDist: 1019,
    distrito: "El Tambo",
    idProv: 104,
  },
  {
    idDist: 1020,
    distrito: "Huacrapuquio",
    idProv: 104,
  },
  {
    idDist: 1021,
    distrito: "Hualhuas",
    idProv: 104,
  },
  {
    idDist: 1022,
    distrito: "Huancán",
    idProv: 104,
  },
  {
    idDist: 1023,
    distrito: "Huasicancha",
    idProv: 104,
  },
  {
    idDist: 1024,
    distrito: "Huayucachi",
    idProv: 104,
  },
  {
    idDist: 1025,
    distrito: "Ingenio",
    idProv: 104,
  },
  {
    idDist: 1026,
    distrito: "Pariahuanca",
    idProv: 104,
  },
  {
    idDist: 1027,
    distrito: "Pilcomayo",
    idProv: 104,
  },
  {
    idDist: 1028,
    distrito: "Pucará",
    idProv: 104,
  },
  {
    idDist: 1029,
    distrito: "Quichuay",
    idProv: 104,
  },
  {
    idDist: 1030,
    distrito: "Quilcas",
    idProv: 104,
  },
  {
    idDist: 1031,
    distrito: "San Agustín",
    idProv: 104,
  },
  {
    idDist: 1032,
    distrito: "San Jerónimo de Tunán",
    idProv: 104,
  },
  {
    idDist: 1033,
    distrito: "Santo Domingo de Acobamba",
    idProv: 104,
  },
  {
    idDist: 1034,
    distrito: "Sapallanga",
    idProv: 104,
  },
  {
    idDist: 1035,
    distrito: "Sicaya",
    idProv: 104,
  },
  {
    idDist: 1036,
    distrito: "Viques",
    idProv: 104,
  },
  {
    idDist: 1037,
    distrito: "Concepción",
    idProv: 105,
  },
  {
    idDist: 1038,
    distrito: "Aco",
    idProv: 105,
  },
  {
    idDist: 1039,
    distrito: "Andamarca",
    idProv: 105,
  },
  {
    idDist: 1040,
    distrito: "Chambara",
    idProv: 105,
  },
  {
    idDist: 1041,
    distrito: "Cochas",
    idProv: 105,
  },
  {
    idDist: 1042,
    distrito: "Comas",
    idProv: 105,
  },
  {
    idDist: 1043,
    distrito: "Heroínas Toledo",
    idProv: 105,
  },
  {
    idDist: 1044,
    distrito: "Manzanares",
    idProv: 105,
  },
  {
    idDist: 1045,
    distrito: "Mariscal Castilla",
    idProv: 105,
  },
  {
    idDist: 1046,
    distrito: "Matahuasi",
    idProv: 105,
  },
  {
    idDist: 1047,
    distrito: "Mito",
    idProv: 105,
  },
  {
    idDist: 1048,
    distrito: "Nueve de Julio",
    idProv: 105,
  },
  {
    idDist: 1049,
    distrito: "Orcotuna",
    idProv: 105,
  },
  {
    idDist: 1050,
    distrito: "San José de Quero",
    idProv: 105,
  },
  {
    idDist: 1051,
    distrito: "Santa Rosa de Ocopa",
    idProv: 105,
  },
  {
    idDist: 1052,
    distrito: "Chanchamayo",
    idProv: 106,
  },
  {
    idDist: 1053,
    distrito: "Perené",
    idProv: 106,
  },
  {
    idDist: 1054,
    distrito: "Pichanaqui",
    idProv: 106,
  },
  {
    idDist: 1055,
    distrito: "San Luis de Shuaro",
    idProv: 106,
  },
  {
    idDist: 1056,
    distrito: "San Ramón",
    idProv: 106,
  },
  {
    idDist: 1057,
    distrito: "Vitoc",
    idProv: 106,
  },
  {
    idDist: 1058,
    distrito: "Jauja",
    idProv: 107,
  },
  {
    idDist: 1059,
    distrito: "Acolla",
    idProv: 107,
  },
  {
    idDist: 1060,
    distrito: "Apata",
    idProv: 107,
  },
  {
    idDist: 1061,
    distrito: "Ataura",
    idProv: 107,
  },
  {
    idDist: 1062,
    distrito: "Canchayllo",
    idProv: 107,
  },
  {
    idDist: 1063,
    distrito: "Curicaca",
    idProv: 107,
  },
  {
    idDist: 1064,
    distrito: "El Mantaro",
    idProv: 107,
  },
  {
    idDist: 1065,
    distrito: "Huamalí",
    idProv: 107,
  },
  {
    idDist: 1066,
    distrito: "Huaripampa",
    idProv: 107,
  },
  {
    idDist: 1067,
    distrito: "Huertas",
    idProv: 107,
  },
  {
    idDist: 1068,
    distrito: "Janjaillo",
    idProv: 107,
  },
  {
    idDist: 1069,
    distrito: "Julcán",
    idProv: 107,
  },
  {
    idDist: 1070,
    distrito: "Leonor Ordóñez",
    idProv: 107,
  },
  {
    idDist: 1071,
    distrito: "Llocllapampa",
    idProv: 107,
  },
  {
    idDist: 1072,
    distrito: "Marco",
    idProv: 107,
  },
  {
    idDist: 1073,
    distrito: "Masma",
    idProv: 107,
  },
  {
    idDist: 1074,
    distrito: "Masma Chicche",
    idProv: 107,
  },
  {
    idDist: 1075,
    distrito: "Molinos",
    idProv: 107,
  },
  {
    idDist: 1076,
    distrito: "Monobamba",
    idProv: 107,
  },
  {
    idDist: 1077,
    distrito: "Muqui",
    idProv: 107,
  },
  {
    idDist: 1078,
    distrito: "Muquiyauyo",
    idProv: 107,
  },
  {
    idDist: 1079,
    distrito: "Paca",
    idProv: 107,
  },
  {
    idDist: 1080,
    distrito: "Paccha",
    idProv: 107,
  },
  {
    idDist: 1081,
    distrito: "Pancán",
    idProv: 107,
  },
  {
    idDist: 1082,
    distrito: "Parco",
    idProv: 107,
  },
  {
    idDist: 1083,
    distrito: "Pomacancha",
    idProv: 107,
  },
  {
    idDist: 1084,
    distrito: "Ricrán",
    idProv: 107,
  },
  {
    idDist: 1085,
    distrito: "San Lorenzo",
    idProv: 107,
  },
  {
    idDist: 1086,
    distrito: "San Pedro de Chunan",
    idProv: 107,
  },
  {
    idDist: 1087,
    distrito: "Sausa",
    idProv: 107,
  },
  {
    idDist: 1088,
    distrito: "Sincos",
    idProv: 107,
  },
  {
    idDist: 1089,
    distrito: "Tunan Marca",
    idProv: 107,
  },
  {
    idDist: 1090,
    distrito: "Yauli",
    idProv: 107,
  },
  {
    idDist: 1091,
    distrito: "Yauyos",
    idProv: 107,
  },
  {
    idDist: 1092,
    distrito: "Junín",
    idProv: 108,
  },
  {
    idDist: 1093,
    distrito: "Carhuamayo",
    idProv: 108,
  },
  {
    idDist: 1094,
    distrito: "Ondores",
    idProv: 108,
  },
  {
    idDist: 1095,
    distrito: "Ulcumayo",
    idProv: 108,
  },
  {
    idDist: 1096,
    distrito: "Satipo",
    idProv: 109,
  },
  {
    idDist: 1097,
    distrito: "Coviriali",
    idProv: 109,
  },
  {
    idDist: 1098,
    distrito: "Llaylla",
    idProv: 109,
  },
  {
    idDist: 1099,
    distrito: "Mazamari",
    idProv: 109,
  },
  {
    idDist: 1100,
    distrito: "Pampa Hermosa",
    idProv: 109,
  },
  {
    idDist: 1101,
    distrito: "Pangoa",
    idProv: 109,
  },
  {
    idDist: 1102,
    distrito: "Río Negro",
    idProv: 109,
  },
  {
    idDist: 1103,
    distrito: "Río Tambo",
    idProv: 109,
  },
  {
    idDist: 1104,
    distrito: "Vizcatán del Ene",
    idProv: 109,
  },
  {
    idDist: 1105,
    distrito: "Tarma",
    idProv: 110,
  },
  {
    idDist: 1106,
    distrito: "Acobamba",
    idProv: 110,
  },
  {
    idDist: 1107,
    distrito: "Huaricolca",
    idProv: 110,
  },
  {
    idDist: 1108,
    distrito: "Huasahuasi",
    idProv: 110,
  },
  {
    idDist: 1109,
    distrito: "La Unión",
    idProv: 110,
  },
  {
    idDist: 1110,
    distrito: "Palca",
    idProv: 110,
  },
  {
    idDist: 1111,
    distrito: "Palcamayo",
    idProv: 110,
  },
  {
    idDist: 1112,
    distrito: "San Pedro de Cajas",
    idProv: 110,
  },
  {
    idDist: 1113,
    distrito: "Tapo",
    idProv: 110,
  },
  {
    idDist: 1114,
    distrito: "La Oroya",
    idProv: 111,
  },
  {
    idDist: 1115,
    distrito: "Chacapalpa",
    idProv: 111,
  },
  {
    idDist: 1116,
    distrito: "Huay-Huay",
    idProv: 111,
  },
  {
    idDist: 1117,
    distrito: "Marcapomacocha",
    idProv: 111,
  },
  {
    idDist: 1118,
    distrito: "Morococha",
    idProv: 111,
  },
  {
    idDist: 1119,
    distrito: "Paccha",
    idProv: 111,
  },
  {
    idDist: 1120,
    distrito: "Santa Bárbara de Carhuacayán",
    idProv: 111,
  },
  {
    idDist: 1121,
    distrito: "Santa Rosa de Sacco",
    idProv: 111,
  },
  {
    idDist: 1122,
    distrito: "Suitucancha",
    idProv: 111,
  },
  {
    idDist: 1123,
    distrito: "Yauli",
    idProv: 111,
  },
  {
    idDist: 1124,
    distrito: "Chupaca",
    idProv: 112,
  },
  {
    idDist: 1125,
    distrito: "Ahuac",
    idProv: 112,
  },
  {
    idDist: 1126,
    distrito: "Chongos Bajo",
    idProv: 112,
  },
  {
    idDist: 1127,
    distrito: "Huachac",
    idProv: 112,
  },
  {
    idDist: 1128,
    distrito: "Huamancaca Chico",
    idProv: 112,
  },
  {
    idDist: 1129,
    distrito: "San Juan de Iscos",
    idProv: 112,
  },
  {
    idDist: 1130,
    distrito: "San Juan de Jarpa",
    idProv: 112,
  },
  {
    idDist: 1131,
    distrito: "Tres de Diciembre",
    idProv: 112,
  },
  {
    idDist: 1132,
    distrito: "Yanacancha",
    idProv: 112,
  },
  {
    idDist: 1133,
    distrito: "Trujillo",
    idProv: 113,
  },
  {
    idDist: 1134,
    distrito: "El Porvenir",
    idProv: 113,
  },
  {
    idDist: 1135,
    distrito: "Florencia de Mora",
    idProv: 113,
  },
  {
    idDist: 1136,
    distrito: "Huanchaco",
    idProv: 113,
  },
  {
    idDist: 1137,
    distrito: "La Esperanza",
    idProv: 113,
  },
  {
    idDist: 1138,
    distrito: "Laredo",
    idProv: 113,
  },
  {
    idDist: 1139,
    distrito: "Moche",
    idProv: 113,
  },
  {
    idDist: 1140,
    distrito: "Poroto",
    idProv: 113,
  },
  {
    idDist: 1141,
    distrito: "Salaverry",
    idProv: 113,
  },
  {
    idDist: 1142,
    distrito: "Simbal",
    idProv: 113,
  },
  {
    idDist: 1143,
    distrito: "Victor Larco Herrera",
    idProv: 113,
  },
  {
    idDist: 1144,
    distrito: "Ascope",
    idProv: 114,
  },
  {
    idDist: 1145,
    distrito: "Chicama",
    idProv: 114,
  },
  {
    idDist: 1146,
    distrito: "Chocope",
    idProv: 114,
  },
  {
    idDist: 1147,
    distrito: "Magdalena de Cao",
    idProv: 114,
  },
  {
    idDist: 1148,
    distrito: "Paijan",
    idProv: 114,
  },
  {
    idDist: 1149,
    distrito: "Rázuri",
    idProv: 114,
  },
  {
    idDist: 1150,
    distrito: "Santiago de Cao",
    idProv: 114,
  },
  {
    idDist: 1151,
    distrito: "Casa Grande",
    idProv: 114,
  },
  {
    idDist: 1152,
    distrito: "Bolívar",
    idProv: 115,
  },
  {
    idDist: 1153,
    distrito: "Bambamarca",
    idProv: 115,
  },
  {
    idDist: 1154,
    distrito: "Condormarca",
    idProv: 115,
  },
  {
    idDist: 1155,
    distrito: "Longotea",
    idProv: 115,
  },
  {
    idDist: 1156,
    distrito: "Uchumarca",
    idProv: 115,
  },
  {
    idDist: 1157,
    distrito: "Ucuncha",
    idProv: 115,
  },
  {
    idDist: 1158,
    distrito: "Chepén",
    idProv: 116,
  },
  {
    idDist: 1159,
    distrito: "Pacanga",
    idProv: 116,
  },
  {
    idDist: 1160,
    distrito: "Pueblo Nuevo",
    idProv: 116,
  },
  {
    idDist: 1161,
    distrito: "Julcán",
    idProv: 117,
  },
  {
    idDist: 1162,
    distrito: "Calamarca",
    idProv: 117,
  },
  {
    idDist: 1163,
    distrito: "Carabamba",
    idProv: 117,
  },
  {
    idDist: 1164,
    distrito: "Huaso",
    idProv: 117,
  },
  {
    idDist: 1165,
    distrito: "Otuzco",
    idProv: 118,
  },
  {
    idDist: 1166,
    distrito: "Agallpampa",
    idProv: 118,
  },
  {
    idDist: 1167,
    distrito: "Charat",
    idProv: 118,
  },
  {
    idDist: 1168,
    distrito: "Huaranchal",
    idProv: 118,
  },
  {
    idDist: 1169,
    distrito: "La Cuesta",
    idProv: 118,
  },
  {
    idDist: 1170,
    distrito: "Mache",
    idProv: 118,
  },
  {
    idDist: 1171,
    distrito: "Paranday",
    idProv: 118,
  },
  {
    idDist: 1172,
    distrito: "Salpo",
    idProv: 118,
  },
  {
    idDist: 1173,
    distrito: "Sinsicap",
    idProv: 118,
  },
  {
    idDist: 1174,
    distrito: "Usquil",
    idProv: 118,
  },
  {
    idDist: 1175,
    distrito: "San Pedro de Lloc",
    idProv: 119,
  },
  {
    idDist: 1176,
    distrito: "Guadalupe",
    idProv: 119,
  },
  {
    idDist: 1177,
    distrito: "Jequetepeque",
    idProv: 119,
  },
  {
    idDist: 1178,
    distrito: "Pacasmayo",
    idProv: 119,
  },
  {
    idDist: 1179,
    distrito: "San José",
    idProv: 119,
  },
  {
    idDist: 1180,
    distrito: "Tayabamba",
    idProv: 120,
  },
  {
    idDist: 1181,
    distrito: "Buldibuyo",
    idProv: 120,
  },
  {
    idDist: 1182,
    distrito: "Chillia",
    idProv: 120,
  },
  {
    idDist: 1183,
    distrito: "Huancaspata",
    idProv: 120,
  },
  {
    idDist: 1184,
    distrito: "Huaylillas",
    idProv: 120,
  },
  {
    idDist: 1185,
    distrito: "Huayo",
    idProv: 120,
  },
  {
    idDist: 1186,
    distrito: "Ongón",
    idProv: 120,
  },
  {
    idDist: 1187,
    distrito: "Parcoy",
    idProv: 120,
  },
  {
    idDist: 1188,
    distrito: "Pataz",
    idProv: 120,
  },
  {
    idDist: 1189,
    distrito: "Pías",
    idProv: 120,
  },
  {
    idDist: 1190,
    distrito: "Santiago de Challas",
    idProv: 120,
  },
  {
    idDist: 1191,
    distrito: "Taurija",
    idProv: 120,
  },
  {
    idDist: 1192,
    distrito: "Urpay",
    idProv: 120,
  },
  {
    idDist: 1193,
    distrito: "Huamachuco",
    idProv: 121,
  },
  {
    idDist: 1194,
    distrito: "Chugay",
    idProv: 121,
  },
  {
    idDist: 1195,
    distrito: "Cochorco",
    idProv: 121,
  },
  {
    idDist: 1196,
    distrito: "Curgos",
    idProv: 121,
  },
  {
    idDist: 1197,
    distrito: "Marcabal",
    idProv: 121,
  },
  {
    idDist: 1198,
    distrito: "Sanagorán",
    idProv: 121,
  },
  {
    idDist: 1199,
    distrito: "Sarín",
    idProv: 121,
  },
  {
    idDist: 1200,
    distrito: "Sartimbamba",
    idProv: 121,
  },
  {
    idDist: 1201,
    distrito: "Santiago de Chuco",
    idProv: 122,
  },
  {
    idDist: 1202,
    distrito: "Angasmarca",
    idProv: 122,
  },
  {
    idDist: 1203,
    distrito: "Cachicadán",
    idProv: 122,
  },
  {
    idDist: 1204,
    distrito: "Mollebamba",
    idProv: 122,
  },
  {
    idDist: 1205,
    distrito: "Mollepata",
    idProv: 122,
  },
  {
    idDist: 1206,
    distrito: "Quiruvilca",
    idProv: 122,
  },
  {
    idDist: 1207,
    distrito: "Santa Cruz de Chuca",
    idProv: 122,
  },
  {
    idDist: 1208,
    distrito: "Sitabamba",
    idProv: 122,
  },
  {
    idDist: 1209,
    distrito: "Cascas",
    idProv: 123,
  },
  {
    idDist: 1210,
    distrito: "Lucma",
    idProv: 123,
  },
  {
    idDist: 1211,
    distrito: "Compin",
    idProv: 123,
  },
  {
    idDist: 1212,
    distrito: "Sayapullo",
    idProv: 123,
  },
  {
    idDist: 1213,
    distrito: "Virú",
    idProv: 124,
  },
  {
    idDist: 1214,
    distrito: "Chao",
    idProv: 124,
  },
  {
    idDist: 1215,
    distrito: "Guadalupito",
    idProv: 124,
  },
  {
    idDist: 1216,
    distrito: "Chiclayo",
    idProv: 125,
  },
  {
    idDist: 1217,
    distrito: "Cayaltí",
    idProv: 125,
  },
  {
    idDist: 1218,
    distrito: "Chongoyape",
    idProv: 125,
  },
  {
    idDist: 1219,
    distrito: "Eten",
    idProv: 125,
  },
  {
    idDist: 1220,
    distrito: "Eten Puerto",
    idProv: 125,
  },
  {
    idDist: 1221,
    distrito: "José Leonardo Ortiz",
    idProv: 125,
  },
  {
    idDist: 1222,
    distrito: "La Victoria",
    idProv: 125,
  },
  {
    idDist: 1223,
    distrito: "Lagunas",
    idProv: 125,
  },
  {
    idDist: 1224,
    distrito: "Monsefú",
    idProv: 125,
  },
  {
    idDist: 1225,
    distrito: "Nueva Arica",
    idProv: 125,
  },
  {
    idDist: 1226,
    distrito: "Oyotún",
    idProv: 125,
  },
  {
    idDist: 1227,
    distrito: "Picsi",
    idProv: 125,
  },
  {
    idDist: 1228,
    distrito: "Pimentel",
    idProv: 125,
  },
  {
    idDist: 1229,
    distrito: "Reque",
    idProv: 125,
  },
  {
    idDist: 1230,
    distrito: "Santa Rosa",
    idProv: 125,
  },
  {
    idDist: 1231,
    distrito: "Saña",
    idProv: 125,
  },
  {
    idDist: 1232,
    distrito: "Cercado de Chiclayo",
    idProv: 125,
  },
  {
    idDist: 1233,
    distrito: "Ferreñafe",
    idProv: 126,
  },
  {
    idDist: 1234,
    distrito: "Cañaris",
    idProv: 126,
  },
  {
    idDist: 1235,
    distrito: "Incahuasi",
    idProv: 126,
  },
  {
    idDist: 1236,
    distrito: "Manuel Antonio Mesones Muro",
    idProv: 126,
  },
  {
    idDist: 1237,
    distrito: "Pitipo",
    idProv: 126,
  },
  {
    idDist: 1238,
    distrito: "Pueblo Nuevo",
    idProv: 126,
  },
  {
    idDist: 1239,
    distrito: "Lambayeque",
    idProv: 127,
  },
  {
    idDist: 1240,
    distrito: "Chóchope",
    idProv: 127,
  },
  {
    idDist: 1241,
    distrito: "Íllimo",
    idProv: 127,
  },
  {
    idDist: 1242,
    distrito: "Jayanca",
    idProv: 127,
  },
  {
    idDist: 1243,
    distrito: "Mochumí",
    idProv: 127,
  },
  {
    idDist: 1244,
    distrito: "Morrope",
    idProv: 127,
  },
  {
    idDist: 1245,
    distrito: "Motupe",
    idProv: 127,
  },
  {
    idDist: 1246,
    distrito: "Olmos",
    idProv: 127,
  },
  {
    idDist: 1247,
    distrito: "Pacora",
    idProv: 127,
  },
  {
    idDist: 1248,
    distrito: "Salas",
    idProv: 127,
  },
  {
    idDist: 1249,
    distrito: "San José",
    idProv: 127,
  },
  {
    idDist: 1250,
    distrito: "Túcume",
    idProv: 127,
  },
  {
    idDist: 1251,
    distrito: "Lima",
    idProv: 128,
  },
  {
    idDist: 1252,
    distrito: "Ancon",
    idProv: 128,
  },
  {
    idDist: 1253,
    distrito: "Ate",
    idProv: 128,
  },
  {
    idDist: 1254,
    distrito: "Barranco",
    idProv: 128,
  },
  {
    idDist: 1255,
    distrito: "Breña",
    idProv: 128,
  },
  {
    idDist: 1256,
    distrito: "Carabayllo",
    idProv: 128,
  },
  {
    idDist: 1257,
    distrito: "Chaclacayo",
    idProv: 128,
  },
  {
    idDist: 1258,
    distrito: "Chorrillos",
    idProv: 128,
  },
  {
    idDist: 1259,
    distrito: "Cieneguilla",
    idProv: 128,
  },
  {
    idDist: 1260,
    distrito: "Comas",
    idProv: 128,
  },
  {
    idDist: 1261,
    distrito: "El Agustino",
    idProv: 128,
  },
  {
    idDist: 1262,
    distrito: "Independencia",
    idProv: 128,
  },
  {
    idDist: 1263,
    distrito: "Jesus Maria",
    idProv: 128,
  },
  {
    idDist: 1264,
    distrito: "La Molina",
    idProv: 128,
  },
  {
    idDist: 1265,
    distrito: "La Victoria",
    idProv: 128,
  },
  {
    idDist: 1266,
    distrito: "Lince",
    idProv: 128,
  },
  {
    idDist: 1267,
    distrito: "Los Olivos",
    idProv: 128,
  },
  {
    idDist: 1268,
    distrito: "Lurigancho",
    idProv: 128,
  },
  {
    idDist: 1269,
    distrito: "Lurin",
    idProv: 128,
  },
  {
    idDist: 1270,
    distrito: "Magdalena del Mar",
    idProv: 128,
  },
  {
    idDist: 1271,
    distrito: "Miraflores",
    idProv: 128,
  },
  {
    idDist: 1272,
    distrito: "Pachacamac",
    idProv: 128,
  },
  {
    idDist: 1273,
    distrito: "Pucusana",
    idProv: 128,
  },
  {
    idDist: 1274,
    distrito: "Puente Piedra",
    idProv: 128,
  },
  {
    idDist: 1275,
    distrito: "Punta Hermosa",
    idProv: 128,
  },
  {
    idDist: 1276,
    distrito: "Punta Negra",
    idProv: 128,
  },
  {
    idDist: 1277,
    distrito: "Rimac",
    idProv: 128,
  },
  {
    idDist: 1278,
    distrito: "San Bartolo",
    idProv: 128,
  },
  {
    idDist: 1279,
    distrito: "San Borja",
    idProv: 128,
  },
  {
    idDist: 1280,
    distrito: "San Isidro",
    idProv: 128,
  },
  {
    idDist: 1281,
    distrito: "San Juan de Lurigancho",
    idProv: 128,
  },
  {
    idDist: 1282,
    distrito: "San Juan de Miraflores",
    idProv: 128,
  },
  {
    idDist: 1283,
    distrito: "San Luis",
    idProv: 128,
  },
  {
    idDist: 1284,
    distrito: "San Martin de Porres",
    idProv: 128,
  },
  {
    idDist: 1285,
    distrito: "San Miguel",
    idProv: 128,
  },
  {
    idDist: 1286,
    distrito: "Santa Anita",
    idProv: 128,
  },
  {
    idDist: 1287,
    distrito: "Santa Maria del Mar",
    idProv: 128,
  },
  {
    idDist: 1288,
    distrito: "Santa Rosa",
    idProv: 128,
  },
  {
    idDist: 1289,
    distrito: "Santiago de Surco",
    idProv: 128,
  },
  {
    idDist: 1290,
    distrito: "Surquillo",
    idProv: 128,
  },
  {
    idDist: 1291,
    distrito: "Villa El Salvador",
    idProv: 128,
  },
  {
    idDist: 1292,
    distrito: "Villa Maria del Triunfo",
    idProv: 128,
  },
  {
    idDist: 1293,
    distrito: "Barranca",
    idProv: 129,
  },
  {
    idDist: 1294,
    distrito: "Paramonga",
    idProv: 129,
  },
  {
    idDist: 1295,
    distrito: "Pativilca",
    idProv: 129,
  },
  {
    idDist: 1296,
    distrito: "Supe",
    idProv: 129,
  },
  {
    idDist: 1297,
    distrito: "Supe Puerto",
    idProv: 129,
  },
  {
    idDist: 1298,
    distrito: "Cajatambo",
    idProv: 130,
  },
  {
    idDist: 1299,
    distrito: "Copa",
    idProv: 130,
  },
  {
    idDist: 1300,
    distrito: "Gorgor",
    idProv: 130,
  },
  {
    idDist: 1301,
    distrito: "Huancapon",
    idProv: 130,
  },
  {
    idDist: 1302,
    distrito: "Manas",
    idProv: 130,
  },
  {
    idDist: 1303,
    distrito: "Canta",
    idProv: 131,
  },
  {
    idDist: 1304,
    distrito: "Arahuay",
    idProv: 131,
  },
  {
    idDist: 1305,
    distrito: "Huamantanga",
    idProv: 131,
  },
  {
    idDist: 1306,
    distrito: "Huaros",
    idProv: 131,
  },
  {
    idDist: 1307,
    distrito: "Lachaqui",
    idProv: 131,
  },
  {
    idDist: 1308,
    distrito: "San Buenaventura",
    idProv: 131,
  },
  {
    idDist: 1309,
    distrito: "Santa Rosa de Quives",
    idProv: 131,
  },
  {
    idDist: 1310,
    distrito: "San Vicente de Cañete",
    idProv: 132,
  },
  {
    idDist: 1311,
    distrito: "Asia",
    idProv: 132,
  },
  {
    idDist: 1312,
    distrito: "Calango",
    idProv: 132,
  },
  {
    idDist: 1313,
    distrito: "Cerro Azul",
    idProv: 132,
  },
  {
    idDist: 1314,
    distrito: "Chilca",
    idProv: 132,
  },
  {
    idDist: 1315,
    distrito: "Coayllo",
    idProv: 132,
  },
  {
    idDist: 1316,
    distrito: "Imperial",
    idProv: 132,
  },
  {
    idDist: 1317,
    distrito: "Lunahuana",
    idProv: 132,
  },
  {
    idDist: 1318,
    distrito: "Mala",
    idProv: 132,
  },
  {
    idDist: 1319,
    distrito: "Nuevo Imperial",
    idProv: 132,
  },
  {
    idDist: 1320,
    distrito: "Pacaran",
    idProv: 132,
  },
  {
    idDist: 1321,
    distrito: "Quilmana",
    idProv: 132,
  },
  {
    idDist: 1322,
    distrito: "San Antonio",
    idProv: 132,
  },
  {
    idDist: 1323,
    distrito: "San Luis",
    idProv: 132,
  },
  {
    idDist: 1324,
    distrito: "Santa Cruz de Flores",
    idProv: 132,
  },
  {
    idDist: 1325,
    distrito: "Zúñiga",
    idProv: 132,
  },
  {
    idDist: 1326,
    distrito: "Huaral",
    idProv: 133,
  },
  {
    idDist: 1327,
    distrito: "Atavillos Alto",
    idProv: 133,
  },
  {
    idDist: 1328,
    distrito: "Atavillos Bajo",
    idProv: 133,
  },
  {
    idDist: 1329,
    distrito: "Aucallama",
    idProv: 133,
  },
  {
    idDist: 1330,
    distrito: "Chancay",
    idProv: 133,
  },
  {
    idDist: 1331,
    distrito: "Ihuari",
    idProv: 133,
  },
  {
    idDist: 1332,
    distrito: "Lampian",
    idProv: 133,
  },
  {
    idDist: 1333,
    distrito: "Pacaraos",
    idProv: 133,
  },
  {
    idDist: 1334,
    distrito: "San Miguel de Acos",
    idProv: 133,
  },
  {
    idDist: 1335,
    distrito: "Santa Cruz de Andamarca",
    idProv: 133,
  },
  {
    idDist: 1336,
    distrito: "Sumbilca",
    idProv: 133,
  },
  {
    idDist: 1337,
    distrito: "Veintisiete de Noviembre",
    idProv: 133,
  },
  {
    idDist: 1338,
    distrito: "Matucana",
    idProv: 134,
  },
  {
    idDist: 1339,
    distrito: "Antioquia",
    idProv: 134,
  },
  {
    idDist: 1340,
    distrito: "Callahuanca",
    idProv: 134,
  },
  {
    idDist: 1341,
    distrito: "Carampoma",
    idProv: 134,
  },
  {
    idDist: 1342,
    distrito: "Chicla",
    idProv: 134,
  },
  {
    idDist: 1343,
    distrito: "Cuenca",
    idProv: 134,
  },
  {
    idDist: 1344,
    distrito: "Huachupampa",
    idProv: 134,
  },
  {
    idDist: 1345,
    distrito: "Huanza",
    idProv: 134,
  },
  {
    idDist: 1346,
    distrito: "Huarochiri",
    idProv: 134,
  },
  {
    idDist: 1347,
    distrito: "Lahuaytambo",
    idProv: 134,
  },
  {
    idDist: 1348,
    distrito: "Langa",
    idProv: 134,
  },
  {
    idDist: 1349,
    distrito: "Laraos",
    idProv: 134,
  },
  {
    idDist: 1350,
    distrito: "Mariatana",
    idProv: 134,
  },
  {
    idDist: 1351,
    distrito: "Ricardo Palma",
    idProv: 134,
  },
  {
    idDist: 1352,
    distrito: "San Andres de Tupicocha",
    idProv: 134,
  },
  {
    idDist: 1353,
    distrito: "San Antonio",
    idProv: 134,
  },
  {
    idDist: 1354,
    distrito: "San Bartolome",
    idProv: 134,
  },
  {
    idDist: 1355,
    distrito: "San Damian",
    idProv: 134,
  },
  {
    idDist: 1356,
    distrito: "San Juan de Iris",
    idProv: 134,
  },
  {
    idDist: 1357,
    distrito: "San Juan de Tantaranche",
    idProv: 134,
  },
  {
    idDist: 1358,
    distrito: "San Lorenzo de Quinti",
    idProv: 134,
  },
  {
    idDist: 1359,
    distrito: "San Mateo",
    idProv: 134,
  },
  {
    idDist: 1360,
    distrito: "San Mateo de Otao",
    idProv: 134,
  },
  {
    idDist: 1361,
    distrito: "San Pedro de Casta",
    idProv: 134,
  },
  {
    idDist: 1362,
    distrito: "San Pedro de Huancayre",
    idProv: 134,
  },
  {
    idDist: 1363,
    distrito: "Sangallaya",
    idProv: 134,
  },
  {
    idDist: 1364,
    distrito: "Santa Cruz de Cocachacra",
    idProv: 134,
  },
  {
    idDist: 1365,
    distrito: "Santa Eulalia",
    idProv: 134,
  },
  {
    idDist: 1366,
    distrito: "Santiago de Anchucaya",
    idProv: 134,
  },
  {
    idDist: 1367,
    distrito: "Santiago de Tuna",
    idProv: 134,
  },
  {
    idDist: 1368,
    distrito: "Santo Domingo de Los Olleros",
    idProv: 134,
  },
  {
    idDist: 1369,
    distrito: "Surco",
    idProv: 134,
  },
  {
    idDist: 1370,
    distrito: "Huacho",
    idProv: 135,
  },
  {
    idDist: 1371,
    distrito: "Ambar",
    idProv: 135,
  },
  {
    idDist: 1372,
    distrito: "Caleta de Carquin",
    idProv: 135,
  },
  {
    idDist: 1373,
    distrito: "Checras",
    idProv: 135,
  },
  {
    idDist: 1374,
    distrito: "Hualmay",
    idProv: 135,
  },
  {
    idDist: 1375,
    distrito: "Huaura",
    idProv: 135,
  },
  {
    idDist: 1376,
    distrito: "Leoncio Prado",
    idProv: 135,
  },
  {
    idDist: 1377,
    distrito: "Paccho",
    idProv: 135,
  },
  {
    idDist: 1378,
    distrito: "Santa Leonor",
    idProv: 135,
  },
  {
    idDist: 1379,
    distrito: "Santa Maria",
    idProv: 135,
  },
  {
    idDist: 1380,
    distrito: "Sayan",
    idProv: 135,
  },
  {
    idDist: 1381,
    distrito: "Vegueta",
    idProv: 135,
  },
  {
    idDist: 1382,
    distrito: "Oyón",
    idProv: 136,
  },
  {
    idDist: 1383,
    distrito: "Andajes",
    idProv: 136,
  },
  {
    idDist: 1384,
    distrito: "Caujul",
    idProv: 136,
  },
  {
    idDist: 1385,
    distrito: "Cochamarca",
    idProv: 136,
  },
  {
    idDist: 1386,
    distrito: "Navan",
    idProv: 136,
  },
  {
    idDist: 1387,
    distrito: "Pachangara",
    idProv: 136,
  },
  {
    idDist: 1388,
    distrito: "Yauyos",
    idProv: 137,
  },
  {
    idDist: 1389,
    distrito: "Alis",
    idProv: 137,
  },
  {
    idDist: 1390,
    distrito: "Ayauca",
    idProv: 137,
  },
  {
    idDist: 1391,
    distrito: "Ayaviri",
    idProv: 137,
  },
  {
    idDist: 1392,
    distrito: "Azángaro",
    idProv: 137,
  },
  {
    idDist: 1393,
    distrito: "Cacra",
    idProv: 137,
  },
  {
    idDist: 1394,
    distrito: "Carania",
    idProv: 137,
  },
  {
    idDist: 1395,
    distrito: "Catahuasi",
    idProv: 137,
  },
  {
    idDist: 1396,
    distrito: "Chocos",
    idProv: 137,
  },
  {
    idDist: 1397,
    distrito: "Cochas",
    idProv: 137,
  },
  {
    idDist: 1398,
    distrito: "Colonia",
    idProv: 137,
  },
  {
    idDist: 1399,
    distrito: "Hongos",
    idProv: 137,
  },
  {
    idDist: 1400,
    distrito: "Huampara",
    idProv: 137,
  },
  {
    idDist: 1401,
    distrito: "Huancaya",
    idProv: 137,
  },
  {
    idDist: 1402,
    distrito: "Huangascar",
    idProv: 137,
  },
  {
    idDist: 1403,
    distrito: "Huantan",
    idProv: 137,
  },
  {
    idDist: 1404,
    distrito: "Huañec",
    idProv: 137,
  },
  {
    idDist: 1405,
    distrito: "Laraos",
    idProv: 137,
  },
  {
    idDist: 1406,
    distrito: "Lincha",
    idProv: 137,
  },
  {
    idDist: 1407,
    distrito: "Madean",
    idProv: 137,
  },
  {
    idDist: 1408,
    distrito: "Miraflores",
    idProv: 137,
  },
  {
    idDist: 1409,
    distrito: "Omas",
    idProv: 137,
  },
  {
    idDist: 1410,
    distrito: "Putinza",
    idProv: 137,
  },
  {
    idDist: 1411,
    distrito: "Quinches",
    idProv: 137,
  },
  {
    idDist: 1412,
    distrito: "Quinocay",
    idProv: 137,
  },
  {
    idDist: 1413,
    distrito: "San Joaquín",
    idProv: 137,
  },
  {
    idDist: 1414,
    distrito: "San Pedro de Pilas",
    idProv: 137,
  },
  {
    idDist: 1415,
    distrito: "Tanta",
    idProv: 137,
  },
  {
    idDist: 1416,
    distrito: "Tauripampa",
    idProv: 137,
  },
  {
    idDist: 1417,
    distrito: "Tomas",
    idProv: 137,
  },
  {
    idDist: 1418,
    distrito: "Tupe",
    idProv: 137,
  },
  {
    idDist: 1419,
    distrito: "Viñac",
    idProv: 137,
  },
  {
    idDist: 1420,
    distrito: "Vitis",
    idProv: 137,
  },
  {
    idDist: 1421,
    distrito: "Yurimaguas",
    idProv: 139,
  },
  {
    idDist: 1422,
    distrito: "Balsapuerto",
    idProv: 139,
  },
  {
    idDist: 1423,
    distrito: "Jeberos",
    idProv: 139,
  },
  {
    idDist: 1424,
    distrito: "Lagunas",
    idProv: 139,
  },
  {
    idDist: 1425,
    distrito: "Santa Cruz",
    idProv: 139,
  },
  {
    idDist: 1426,
    distrito: "Teniente Cesar López Rojas",
    idProv: 139,
  },
  {
    idDist: 1427,
    distrito: "Barranca",
    idProv: 140,
  },
  {
    idDist: 1428,
    distrito: "Cahuapanas",
    idProv: 140,
  },
  {
    idDist: 1429,
    distrito: "Manseriche",
    idProv: 140,
  },
  {
    idDist: 1430,
    distrito: "Morona",
    idProv: 140,
  },
  {
    idDist: 1431,
    distrito: "Pastaza",
    idProv: 140,
  },
  {
    idDist: 1432,
    distrito: "Andoas",
    idProv: 140,
  },
  {
    idDist: 1433,
    distrito: "Nauta",
    idProv: 141,
  },
  {
    idDist: 1434,
    distrito: "Parinari",
    idProv: 141,
  },
  {
    idDist: 1435,
    distrito: "Tigre",
    idProv: 141,
  },
  {
    idDist: 1436,
    distrito: "Trompeteros",
    idProv: 141,
  },
  {
    idDist: 1437,
    distrito: "Urarinas",
    idProv: 141,
  },
  {
    idDist: 1438,
    distrito: "Caballococha",
    idProv: 142,
  },
  {
    idDist: 1439,
    distrito: "Pebas",
    idProv: 142,
  },
  {
    idDist: 1440,
    distrito: "Ramón Castilla",
    idProv: 142,
  },
  {
    idDist: 1441,
    distrito: "San Pablo",
    idProv: 142,
  },
  {
    idDist: 1442,
    distrito: "Putumayo",
    idProv: 144,
  },
  {
    idDist: 1443,
    distrito: "Rosa Panduro",
    idProv: 144,
  },
  {
    idDist: 1444,
    distrito: "Teniente Manuel Clavero",
    idProv: 144,
  },
  {
    idDist: 1445,
    distrito: "Yaguas",
    idProv: 144,
  },
  {
    idDist: 1446,
    distrito: "Requena",
    idProv: 145,
  },
  {
    idDist: 1447,
    distrito: "Alto Tapiche",
    idProv: 145,
  },
  {
    idDist: 1448,
    distrito: "Capelo",
    idProv: 145,
  },
  {
    idDist: 1449,
    distrito: "Emilio San Martín",
    idProv: 145,
  },
  {
    idDist: 1450,
    distrito: "Maquía",
    idProv: 145,
  },
  {
    idDist: 1451,
    distrito: "Puinahua",
    idProv: 145,
  },
  {
    idDist: 1452,
    distrito: "Saquena",
    idProv: 145,
  },
  {
    idDist: 1453,
    distrito: "Soplin",
    idProv: 145,
  },
  {
    idDist: 1454,
    distrito: "Tapiche",
    idProv: 145,
  },
  {
    idDist: 1455,
    distrito: "Jenaro Herrera",
    idProv: 145,
  },
  {
    idDist: 1456,
    distrito: "Yaquerana",
    idProv: 145,
  },
  {
    idDist: 1457,
    distrito: "Contamana",
    idProv: 146,
  },
  {
    idDist: 1458,
    distrito: "Inahuaya",
    idProv: 146,
  },
  {
    idDist: 1459,
    distrito: "Padre Márquez",
    idProv: 146,
  },
  {
    idDist: 1460,
    distrito: "Pampa Hermosa",
    idProv: 146,
  },
  {
    idDist: 1461,
    distrito: "Sarayacu",
    idProv: 146,
  },
  {
    idDist: 1462,
    distrito: "Vargas Guerra",
    idProv: 146,
  },
  {
    idDist: 1463,
    distrito: "Iquitos",
    idProv: 143,
  },
  {
    idDist: 1464,
    distrito: "Alto Nanay",
    idProv: 143,
  },
  {
    idDist: 1465,
    distrito: "Fernando Lores",
    idProv: 143,
  },
  {
    idDist: 1466,
    distrito: "Indiana",
    idProv: 143,
  },
  {
    idDist: 1467,
    distrito: "Las Amazonas",
    idProv: 143,
  },
  {
    idDist: 1468,
    distrito: "Mazán",
    idProv: 143,
  },
  {
    idDist: 1469,
    distrito: "Napo",
    idProv: 143,
  },
  {
    idDist: 1470,
    distrito: "Punchana",
    idProv: 143,
  },
  {
    idDist: 1471,
    distrito: "Torres Causana",
    idProv: 143,
  },
  {
    idDist: 1472,
    distrito: "Belén",
    idProv: 143,
  },
  {
    idDist: 1473,
    distrito: "San Juan Bautista",
    idProv: 143,
  },
  {
    idDist: 1474,
    distrito: "Tambopata",
    idProv: 147,
  },
  {
    idDist: 1475,
    distrito: "Inambari",
    idProv: 147,
  },
  {
    idDist: 1476,
    distrito: "Las Piedras",
    idProv: 147,
  },
  {
    idDist: 1477,
    distrito: "Laberinto",
    idProv: 147,
  },
  {
    idDist: 1478,
    distrito: "Fitzcarrald",
    idProv: 148,
  },
  {
    idDist: 1479,
    distrito: "Madre de Dios",
    idProv: 148,
  },
  {
    idDist: 1480,
    distrito: "Manu",
    idProv: 148,
  },
  {
    idDist: 1481,
    distrito: "Huepetuhe",
    idProv: 148,
  },
  {
    idDist: 1482,
    distrito: "Iñapari",
    idProv: 149,
  },
  {
    idDist: 1483,
    distrito: "Iberia",
    idProv: 149,
  },
  {
    idDist: 1484,
    distrito: "Tahuamanu",
    idProv: 149,
  },
  {
    idDist: 1485,
    distrito: "Moquegua",
    idProv: 150,
  },
  {
    idDist: 1486,
    distrito: "Carumas",
    idProv: 150,
  },
  {
    idDist: 1487,
    distrito: "Cuchumbaya",
    idProv: 150,
  },
  {
    idDist: 1488,
    distrito: "Samegua",
    idProv: 150,
  },
  {
    idDist: 1489,
    distrito: "San Cristóbal",
    idProv: 150,
  },
  {
    idDist: 1490,
    distrito: "Torata",
    idProv: 150,
  },
  {
    idDist: 1491,
    distrito: "Omate",
    idProv: 151,
  },
  {
    idDist: 1492,
    distrito: "Chojata",
    idProv: 151,
  },
  {
    idDist: 1493,
    distrito: "Coalaque",
    idProv: 151,
  },
  {
    idDist: 1494,
    distrito: "Ichuña",
    idProv: 151,
  },
  {
    idDist: 1495,
    distrito: "La Capilla",
    idProv: 151,
  },
  {
    idDist: 1496,
    distrito: "Lloque",
    idProv: 151,
  },
  {
    idDist: 1497,
    distrito: "Matalaque",
    idProv: 151,
  },
  {
    idDist: 1498,
    distrito: "Puquina",
    idProv: 151,
  },
  {
    idDist: 1499,
    distrito: "Quinistaquillas",
    idProv: 151,
  },
  {
    idDist: 1500,
    distrito: "Ubinas",
    idProv: 151,
  },
  {
    idDist: 1501,
    distrito: "Yunga",
    idProv: 151,
  },
  {
    idDist: 1502,
    distrito: "Ilo",
    idProv: 152,
  },
  {
    idDist: 1503,
    distrito: "El Algarrobal",
    idProv: 152,
  },
  {
    idDist: 1504,
    distrito: "Pacocha",
    idProv: 152,
  },
  {
    idDist: 1505,
    distrito: "Chaupimarca",
    idProv: 153,
  },
  {
    idDist: 1506,
    distrito: "Huachón",
    idProv: 153,
  },
  {
    idDist: 1507,
    distrito: "Huariaca",
    idProv: 153,
  },
  {
    idDist: 1508,
    distrito: "Huayllay",
    idProv: 153,
  },
  {
    idDist: 1509,
    distrito: "Ninacaca",
    idProv: 153,
  },
  {
    idDist: 1510,
    distrito: "Pallanchacra",
    idProv: 153,
  },
  {
    idDist: 1511,
    distrito: "Paucartambo",
    idProv: 153,
  },
  {
    idDist: 1512,
    distrito: "San Francisco de Asís de Yarusyacán",
    idProv: 153,
  },
  {
    idDist: 1513,
    distrito: "Simón Bolívar",
    idProv: 153,
  },
  {
    idDist: 1514,
    distrito: "Ticlacayán",
    idProv: 153,
  },
  {
    idDist: 1515,
    distrito: "Tinyahuarco",
    idProv: 153,
  },
  {
    idDist: 1516,
    distrito: "Vicco",
    idProv: 153,
  },
  {
    idDist: 1517,
    distrito: "Yanacancha",
    idProv: 153,
  },
  {
    idDist: 1518,
    distrito: "Yanahuanca",
    idProv: 154,
  },
  {
    idDist: 1519,
    distrito: "Chacayán",
    idProv: 154,
  },
  {
    idDist: 1520,
    distrito: "Goyllarisquizga",
    idProv: 154,
  },
  {
    idDist: 1521,
    distrito: "Paucar",
    idProv: 154,
  },
  {
    idDist: 1522,
    distrito: "San Pedro de Pillao",
    idProv: 154,
  },
  {
    idDist: 1523,
    distrito: "Santa Ana de Tusi",
    idProv: 154,
  },
  {
    idDist: 1524,
    distrito: "Tapuc",
    idProv: 154,
  },
  {
    idDist: 1525,
    distrito: "Vilcabamba",
    idProv: 154,
  },
  {
    idDist: 1526,
    distrito: "Oxapampa",
    idProv: 155,
  },
  {
    idDist: 1527,
    distrito: "Chontabamba",
    idProv: 155,
  },
  {
    idDist: 1528,
    distrito: "Huancabamba",
    idProv: 155,
  },
  {
    idDist: 1529,
    distrito: "Palcazu",
    idProv: 155,
  },
  {
    idDist: 1530,
    distrito: "Pozuzo",
    idProv: 155,
  },
  {
    idDist: 1531,
    distrito: "Puerto Bermúdez",
    idProv: 155,
  },
  {
    idDist: 1532,
    distrito: "Villa Rica",
    idProv: 155,
  },
  {
    idDist: 1533,
    distrito: "Piura",
    idProv: 156,
  },
  {
    idDist: 1534,
    distrito: "Castilla",
    idProv: 156,
  },
  {
    idDist: 1535,
    distrito: "Catacaos",
    idProv: 156,
  },
  {
    idDist: 1536,
    distrito: "Cura Mori",
    idProv: 156,
  },
  {
    idDist: 1537,
    distrito: "El Tallán",
    idProv: 156,
  },
  {
    idDist: 1538,
    distrito: "La Arena",
    idProv: 156,
  },
  {
    idDist: 1539,
    distrito: "La Unión",
    idProv: 156,
  },
  {
    idDist: 1540,
    distrito: "Las Lomas",
    idProv: 156,
  },
  {
    idDist: 1541,
    distrito: "Tambo Grande",
    idProv: 156,
  },
  {
    idDist: 1542,
    distrito: "Ayabaca",
    idProv: 157,
  },
  {
    idDist: 1543,
    distrito: "Frias",
    idProv: 157,
  },
  {
    idDist: 1544,
    distrito: "Jilili",
    idProv: 157,
  },
  {
    idDist: 1545,
    distrito: "Lagunas",
    idProv: 157,
  },
  {
    idDist: 1546,
    distrito: "Montero",
    idProv: 157,
  },
  {
    idDist: 1547,
    distrito: "Pacaipampa",
    idProv: 157,
  },
  {
    idDist: 1548,
    distrito: "Paimas",
    idProv: 157,
  },
  {
    idDist: 1549,
    distrito: "Sapillica",
    idProv: 157,
  },
  {
    idDist: 1550,
    distrito: "Sicchez",
    idProv: 157,
  },
  {
    idDist: 1551,
    distrito: "Suyo",
    idProv: 157,
  },
  {
    idDist: 1552,
    distrito: "Huancabamba",
    idProv: 158,
  },
  {
    idDist: 1553,
    distrito: "Canchaque",
    idProv: 158,
  },
  {
    idDist: 1554,
    distrito: "El Carmen de la Frontera",
    idProv: 158,
  },
  {
    idDist: 1555,
    distrito: "Huarmaca",
    idProv: 158,
  },
  {
    idDist: 1556,
    distrito: "Lalaquiz",
    idProv: 158,
  },
  {
    idDist: 1557,
    distrito: "San Miguel de El Faique",
    idProv: 158,
  },
  {
    idDist: 1558,
    distrito: "Sondor",
    idProv: 158,
  },
  {
    idDist: 1559,
    distrito: "Sondorillo",
    idProv: 158,
  },
  {
    idDist: 1560,
    distrito: "Chulucanas",
    idProv: 159,
  },
  {
    idDist: 1561,
    distrito: "Buenos Aires",
    idProv: 159,
  },
  {
    idDist: 1562,
    distrito: "Chalaco",
    idProv: 159,
  },
  {
    idDist: 1563,
    distrito: "La Matanza",
    idProv: 159,
  },
  {
    idDist: 1564,
    distrito: "Morropon",
    idProv: 159,
  },
  {
    idDist: 1565,
    distrito: "Salitral",
    idProv: 159,
  },
  {
    idDist: 1566,
    distrito: "San Juan de Bigote",
    idProv: 159,
  },
  {
    idDist: 1567,
    distrito: "Santa Catalina de Mossa",
    idProv: 159,
  },
  {
    idDist: 1568,
    distrito: "Santo Domingo",
    idProv: 159,
  },
  {
    idDist: 1569,
    distrito: "Yamango",
    idProv: 159,
  },
  {
    idDist: 1570,
    distrito: "Paita",
    idProv: 160,
  },
  {
    idDist: 1571,
    distrito: "Amotape",
    idProv: 160,
  },
  {
    idDist: 1572,
    distrito: "Arenal",
    idProv: 160,
  },
  {
    idDist: 1573,
    distrito: "Colan",
    idProv: 160,
  },
  {
    idDist: 1574,
    distrito: "La Huaca",
    idProv: 160,
  },
  {
    idDist: 1575,
    distrito: "Tamarindo",
    idProv: 160,
  },
  {
    idDist: 1576,
    distrito: "Vichayal",
    idProv: 160,
  },
  {
    idDist: 1577,
    distrito: "Sullana",
    idProv: 161,
  },
  {
    idDist: 1578,
    distrito: "Bellavista",
    idProv: 161,
  },
  {
    idDist: 1579,
    distrito: "Ignacio Escudero",
    idProv: 161,
  },
  {
    idDist: 1580,
    distrito: "Lancones",
    idProv: 161,
  },
  {
    idDist: 1581,
    distrito: "Marcavelica",
    idProv: 161,
  },
  {
    idDist: 1582,
    distrito: "Miguel Checa",
    idProv: 161,
  },
  {
    idDist: 1583,
    distrito: "Querecotillo",
    idProv: 161,
  },
  {
    idDist: 1584,
    distrito: "Salitral",
    idProv: 161,
  },
  {
    idDist: 1585,
    distrito: "Talara",
    idProv: 162,
  },
  {
    idDist: 1586,
    distrito: "El Alto",
    idProv: 162,
  },
  {
    idDist: 1587,
    distrito: "La Brea",
    idProv: 162,
  },
  {
    idDist: 1588,
    distrito: "Lobitos",
    idProv: 162,
  },
  {
    idDist: 1589,
    distrito: "Los Organos",
    idProv: 162,
  },
  {
    idDist: 1590,
    distrito: "Mancora",
    idProv: 162,
  },
  {
    idDist: 1591,
    distrito: "Sechura",
    idProv: 163,
  },
  {
    idDist: 1592,
    distrito: "Bellavista de la Unión",
    idProv: 163,
  },
  {
    idDist: 1593,
    distrito: "Bernal",
    idProv: 163,
  },
  {
    idDist: 1594,
    distrito: "Cristo Nos Valga",
    idProv: 163,
  },
  {
    idDist: 1595,
    distrito: "Rinconada Llicuar",
    idProv: 163,
  },
  {
    idDist: 1596,
    distrito: "Vice",
    idProv: 163,
  },
  {
    idDist: 1597,
    distrito: "Puno",
    idProv: 164,
  },
  {
    idDist: 1598,
    distrito: "Acora",
    idProv: 164,
  },
  {
    idDist: 1599,
    distrito: "Amantani",
    idProv: 164,
  },
  {
    idDist: 1600,
    distrito: "Atuncolla",
    idProv: 164,
  },
  {
    idDist: 1601,
    distrito: "Capachica",
    idProv: 164,
  },
  {
    idDist: 1602,
    distrito: "Chucuito",
    idProv: 164,
  },
  {
    idDist: 1603,
    distrito: "Coata",
    idProv: 164,
  },
  {
    idDist: 1604,
    distrito: "Huata",
    idProv: 164,
  },
  {
    idDist: 1605,
    distrito: "Mañazo",
    idProv: 164,
  },
  {
    idDist: 1606,
    distrito: "Paucarcolla",
    idProv: 164,
  },
  {
    idDist: 1607,
    distrito: "Pichacani",
    idProv: 164,
  },
  {
    idDist: 1608,
    distrito: "Plateria",
    idProv: 164,
  },
  {
    idDist: 1609,
    distrito: "San Antonio",
    idProv: 164,
  },
  {
    idDist: 1610,
    distrito: "Tiquillaca",
    idProv: 164,
  },
  {
    idDist: 1611,
    distrito: "Vilque",
    idProv: 164,
  },
  {
    idDist: 1612,
    distrito: "Azángaro",
    idProv: 165,
  },
  {
    idDist: 1613,
    distrito: "Achaya",
    idProv: 165,
  },
  {
    idDist: 1614,
    distrito: "Arapa",
    idProv: 165,
  },
  {
    idDist: 1615,
    distrito: "Asillo",
    idProv: 165,
  },
  {
    idDist: 1616,
    distrito: "Caminaca",
    idProv: 165,
  },
  {
    idDist: 1617,
    distrito: "Chupa",
    idProv: 165,
  },
  {
    idDist: 1618,
    distrito: "José Domingo Choquehuanca",
    idProv: 165,
  },
  {
    idDist: 1619,
    distrito: "Muñani",
    idProv: 165,
  },
  {
    idDist: 1620,
    distrito: "Potoni",
    idProv: 165,
  },
  {
    idDist: 1621,
    distrito: "Samán",
    idProv: 165,
  },
  {
    idDist: 1622,
    distrito: "San Antón",
    idProv: 165,
  },
  {
    idDist: 1623,
    distrito: "San José",
    idProv: 165,
  },
  {
    idDist: 1624,
    distrito: "San Juan de Salinas",
    idProv: 165,
  },
  {
    idDist: 1625,
    distrito: "Santiago de Pupuja",
    idProv: 165,
  },
  {
    idDist: 1626,
    distrito: "Tirapata",
    idProv: 165,
  },
  {
    idDist: 1627,
    distrito: "Macusani",
    idProv: 166,
  },
  {
    idDist: 1628,
    distrito: "Ajoyani",
    idProv: 166,
  },
  {
    idDist: 1629,
    distrito: "Ayapata",
    idProv: 166,
  },
  {
    idDist: 1630,
    distrito: "Coasa",
    idProv: 166,
  },
  {
    idDist: 1631,
    distrito: "Corani",
    idProv: 166,
  },
  {
    idDist: 1632,
    distrito: "Crucero",
    idProv: 166,
  },
  {
    idDist: 1633,
    distrito: "Ituata",
    idProv: 166,
  },
  {
    idDist: 1634,
    distrito: "Ollachea",
    idProv: 166,
  },
  {
    idDist: 1635,
    distrito: "San Gaban",
    idProv: 166,
  },
  {
    idDist: 1636,
    distrito: "Usicayos",
    idProv: 166,
  },
  {
    idDist: 1637,
    distrito: "Juli",
    idProv: 167,
  },
  {
    idDist: 1638,
    distrito: "Desaguadero",
    idProv: 167,
  },
  {
    idDist: 1639,
    distrito: "Huacullani",
    idProv: 167,
  },
  {
    idDist: 1640,
    distrito: "Kelluyo",
    idProv: 167,
  },
  {
    idDist: 1641,
    distrito: "Pisacoma",
    idProv: 167,
  },
  {
    idDist: 1642,
    distrito: "Pomata",
    idProv: 167,
  },
  {
    idDist: 1643,
    distrito: "Zepita",
    idProv: 167,
  },
  {
    idDist: 1644,
    distrito: "Ilave",
    idProv: 168,
  },
  {
    idDist: 1645,
    distrito: "Capazo",
    idProv: 168,
  },
  {
    idDist: 1646,
    distrito: "Pilcuyo",
    idProv: 168,
  },
  {
    idDist: 1647,
    distrito: "Santa Rosa",
    idProv: 168,
  },
  {
    idDist: 1648,
    distrito: "Conduriri",
    idProv: 168,
  },
  {
    idDist: 1649,
    distrito: "Huancané",
    idProv: 169,
  },
  {
    idDist: 1650,
    distrito: "Cojata",
    idProv: 169,
  },
  {
    idDist: 1651,
    distrito: "Huatasani",
    idProv: 169,
  },
  {
    idDist: 1652,
    distrito: "Inchupalla",
    idProv: 169,
  },
  {
    idDist: 1653,
    distrito: "Pusi",
    idProv: 169,
  },
  {
    idDist: 1654,
    distrito: "Rosaspata",
    idProv: 169,
  },
  {
    idDist: 1655,
    distrito: "Taraco",
    idProv: 169,
  },
  {
    idDist: 1656,
    distrito: "Vilque Chico",
    idProv: 169,
  },
  {
    idDist: 1657,
    distrito: "Lampa",
    idProv: 170,
  },
  {
    idDist: 1658,
    distrito: "Cabanilla",
    idProv: 170,
  },
  {
    idDist: 1659,
    distrito: "Calapuja",
    idProv: 170,
  },
  {
    idDist: 1660,
    distrito: "Nicasio",
    idProv: 170,
  },
  {
    idDist: 1661,
    distrito: "Ocuviri",
    idProv: 170,
  },
  {
    idDist: 1662,
    distrito: "Palca",
    idProv: 170,
  },
  {
    idDist: 1663,
    distrito: "Paratia",
    idProv: 170,
  },
  {
    idDist: 1664,
    distrito: "Pucará",
    idProv: 170,
  },
  {
    idDist: 1665,
    distrito: "Santa Lucía",
    idProv: 170,
  },
  {
    idDist: 1666,
    distrito: "Vilavila",
    idProv: 170,
  },
  {
    idDist: 1667,
    distrito: "Ayaviri",
    idProv: 171,
  },
  {
    idDist: 1668,
    distrito: "Antauta",
    idProv: 171,
  },
  {
    idDist: 1669,
    distrito: "Cupi",
    idProv: 171,
  },
  {
    idDist: 1670,
    distrito: "Llalli",
    idProv: 171,
  },
  {
    idDist: 1671,
    distrito: "Macari",
    idProv: 171,
  },
  {
    idDist: 1672,
    distrito: "Nuñoa",
    idProv: 171,
  },
  {
    idDist: 1673,
    distrito: "Orurillo",
    idProv: 171,
  },
  {
    idDist: 1674,
    distrito: "Santa Rosa",
    idProv: 171,
  },
  {
    idDist: 1675,
    distrito: "Umachiri",
    idProv: 171,
  },
  {
    idDist: 1676,
    distrito: "Moho",
    idProv: 172,
  },
  {
    idDist: 1677,
    distrito: "Conima",
    idProv: 172,
  },
  {
    idDist: 1678,
    distrito: "Huayrapata",
    idProv: 172,
  },
  {
    idDist: 1679,
    distrito: "Tilali",
    idProv: 172,
  },
  {
    idDist: 1680,
    distrito: "Putina",
    idProv: 173,
  },
  {
    idDist: 1681,
    distrito: "Ananea",
    idProv: 173,
  },
  {
    idDist: 1682,
    distrito: "Pedro Vilca Apaza",
    idProv: 173,
  },
  {
    idDist: 1683,
    distrito: "Quilcapuncu",
    idProv: 173,
  },
  {
    idDist: 1684,
    distrito: "Sina",
    idProv: 173,
  },
  {
    idDist: 1685,
    distrito: "Juliaca",
    idProv: 174,
  },
  {
    idDist: 1686,
    distrito: "Cabana",
    idProv: 174,
  },
  {
    idDist: 1687,
    distrito: "Cabanillas",
    idProv: 174,
  },
  {
    idDist: 1688,
    distrito: "Caracoto",
    idProv: 174,
  },
  {
    idDist: 1689,
    distrito: "Sandia",
    idProv: 175,
  },
  {
    idDist: 1690,
    distrito: "Cuyocuyo",
    idProv: 175,
  },
  {
    idDist: 1691,
    distrito: "Limbani",
    idProv: 175,
  },
  {
    idDist: 1692,
    distrito: "Patambuco",
    idProv: 175,
  },
  {
    idDist: 1693,
    distrito: "Phara",
    idProv: 175,
  },
  {
    idDist: 1694,
    distrito: "Quiaca",
    idProv: 175,
  },
  {
    idDist: 1695,
    distrito: "San Juan del Oro",
    idProv: 175,
  },
  {
    idDist: 1696,
    distrito: "Yanahuaya",
    idProv: 175,
  },
  {
    idDist: 1697,
    distrito: "Alto Inambari",
    idProv: 175,
  },
  {
    idDist: 1698,
    distrito: "Yunguyo",
    idProv: 176,
  },
  {
    idDist: 1699,
    distrito: "Anapia",
    idProv: 176,
  },
  {
    idDist: 1700,
    distrito: "Copani",
    idProv: 176,
  },
  {
    idDist: 1701,
    distrito: "Cuturapi",
    idProv: 176,
  },
  {
    idDist: 1702,
    distrito: "Ollaraya",
    idProv: 176,
  },
  {
    idDist: 1703,
    distrito: "Tinicachi",
    idProv: 176,
  },
  {
    idDist: 1704,
    distrito: "Unicachi",
    idProv: 176,
  },
  {
    idDist: 1705,
    distrito: "Moyobamba",
    idProv: 177,
  },
  {
    idDist: 1706,
    distrito: "Calzada",
    idProv: 177,
  },
  {
    idDist: 1707,
    distrito: "Habana",
    idProv: 177,
  },
  {
    idDist: 1708,
    distrito: "Jepelacio",
    idProv: 177,
  },
  {
    idDist: 1709,
    distrito: "Soritor",
    idProv: 177,
  },
  {
    idDist: 1710,
    distrito: "Yantalo",
    idProv: 177,
  },
  {
    idDist: 1711,
    distrito: "Bellavista",
    idProv: 178,
  },
  {
    idDist: 1712,
    distrito: "Alto Biavo",
    idProv: 178,
  },
  {
    idDist: 1713,
    distrito: "Bajo Biavo",
    idProv: 178,
  },
  {
    idDist: 1714,
    distrito: "Huallaga",
    idProv: 178,
  },
  {
    idDist: 1715,
    distrito: "San Pablo",
    idProv: 178,
  },
  {
    idDist: 1716,
    distrito: "San Rafael",
    idProv: 178,
  },
  {
    idDist: 1717,
    distrito: "San José de Sisa",
    idProv: 179,
  },
  {
    idDist: 1718,
    distrito: "Agua Blanca",
    idProv: 179,
  },
  {
    idDist: 1719,
    distrito: "San Martín",
    idProv: 179,
  },
  {
    idDist: 1720,
    distrito: "Santa Rosa",
    idProv: 179,
  },
  {
    idDist: 1721,
    distrito: "Shatoja",
    idProv: 179,
  },
  {
    idDist: 1722,
    distrito: "Saposoa",
    idProv: 180,
  },
  {
    idDist: 1723,
    distrito: "Alto Saposoa",
    idProv: 180,
  },
  {
    idDist: 1724,
    distrito: "El Eslabón",
    idProv: 180,
  },
  {
    idDist: 1725,
    distrito: "Piscoyacu",
    idProv: 180,
  },
  {
    idDist: 1726,
    distrito: "Sacanche",
    idProv: 180,
  },
  {
    idDist: 1727,
    distrito: "Tingo de Saposoa",
    idProv: 180,
  },
  {
    idDist: 1728,
    distrito: "Lamas",
    idProv: 181,
  },
  {
    idDist: 1729,
    distrito: "Alonso de Alvarado",
    idProv: 181,
  },
  {
    idDist: 1730,
    distrito: "Barranquita",
    idProv: 181,
  },
  {
    idDist: 1731,
    distrito: "Caynarachi",
    idProv: 181,
  },
  {
    idDist: 1732,
    distrito: "Cuñumbuqui",
    idProv: 181,
  },
  {
    idDist: 1733,
    distrito: "Pinto Recodo",
    idProv: 181,
  },
  {
    idDist: 1734,
    distrito: "Rumisapa",
    idProv: 181,
  },
  {
    idDist: 1735,
    distrito: "San Roque de Cumbaza",
    idProv: 181,
  },
  {
    idDist: 1736,
    distrito: "Shanao",
    idProv: 181,
  },
  {
    idDist: 1737,
    distrito: "Tabalosos",
    idProv: 181,
  },
  {
    idDist: 1738,
    distrito: "Zapatero",
    idProv: 181,
  },
  {
    idDist: 1739,
    distrito: "Juanjuí",
    idProv: 182,
  },
  {
    idDist: 1740,
    distrito: "Campanilla",
    idProv: 182,
  },
  {
    idDist: 1741,
    distrito: "Huicungo",
    idProv: 182,
  },
  {
    idDist: 1742,
    distrito: "Pachiza",
    idProv: 182,
  },
  {
    idDist: 1743,
    distrito: "Pajarillo",
    idProv: 182,
  },
  {
    idDist: 1744,
    distrito: "Picota",
    idProv: 183,
  },
  {
    idDist: 1745,
    distrito: "Buenos Aires",
    idProv: 183,
  },
  {
    idDist: 1746,
    distrito: "Caspisapa",
    idProv: 183,
  },
  {
    idDist: 1747,
    distrito: "Pilluana",
    idProv: 183,
  },
  {
    idDist: 1748,
    distrito: "Pucacaca",
    idProv: 183,
  },
  {
    idDist: 1749,
    distrito: "San Cristóbal",
    idProv: 183,
  },
  {
    idDist: 1750,
    distrito: "San Hilarión",
    idProv: 183,
  },
  {
    idDist: 1751,
    distrito: "Shamboyacu",
    idProv: 183,
  },
  {
    idDist: 1752,
    distrito: "Tingo de Ponasa",
    idProv: 183,
  },
  {
    idDist: 1753,
    distrito: "Tres Unidos",
    idProv: 183,
  },
  {
    idDist: 1754,
    distrito: "Rioja",
    idProv: 184,
  },
  {
    idDist: 1755,
    distrito: "Awajún",
    idProv: 184,
  },
  {
    idDist: 1756,
    distrito: "Elías Soplin Vargas",
    idProv: 184,
  },
  {
    idDist: 1757,
    distrito: "Nueva Cajamarca",
    idProv: 184,
  },
  {
    idDist: 1758,
    distrito: "Pardo Miguel",
    idProv: 184,
  },
  {
    idDist: 1759,
    distrito: "Posic",
    idProv: 184,
  },
  {
    idDist: 1760,
    distrito: "San Fernando",
    idProv: 184,
  },
  {
    idDist: 1761,
    distrito: "Yorongos",
    idProv: 184,
  },
  {
    idDist: 1762,
    distrito: "Yuracyacu",
    idProv: 184,
  },
  {
    idDist: 1763,
    distrito: "Tarapoto",
    idProv: 185,
  },
  {
    idDist: 1764,
    distrito: "Alberto Leveau",
    idProv: 185,
  },
  {
    idDist: 1765,
    distrito: "Cacatachi",
    idProv: 185,
  },
  {
    idDist: 1766,
    distrito: "Chazuta",
    idProv: 185,
  },
  {
    idDist: 1767,
    distrito: "Chipurana",
    idProv: 185,
  },
  {
    idDist: 1768,
    distrito: "El Porvenir",
    idProv: 185,
  },
  {
    idDist: 1769,
    distrito: "Huimbayoc",
    idProv: 185,
  },
  {
    idDist: 1770,
    distrito: "Juan Guerra",
    idProv: 185,
  },
  {
    idDist: 1771,
    distrito: "La Banda de Shilcayo",
    idProv: 185,
  },
  {
    idDist: 1772,
    distrito: "Morales",
    idProv: 185,
  },
  {
    idDist: 1773,
    distrito: "Papaplaya",
    idProv: 185,
  },
  {
    idDist: 1774,
    distrito: "San Antonio",
    idProv: 185,
  },
  {
    idDist: 1775,
    distrito: "Sauce",
    idProv: 185,
  },
  {
    idDist: 1776,
    distrito: "Shapaja",
    idProv: 185,
  },
  {
    idDist: 1777,
    distrito: "Tocache",
    idProv: 186,
  },
  {
    idDist: 1778,
    distrito: "Nuevo Progreso",
    idProv: 186,
  },
  {
    idDist: 1779,
    distrito: "Pólvora",
    idProv: 186,
  },
  {
    idDist: 1780,
    distrito: "Shunte",
    idProv: 186,
  },
  {
    idDist: 1781,
    distrito: "Uchiza",
    idProv: 186,
  },
  {
    idDist: 1782,
    distrito: "Tacna",
    idProv: 187,
  },
  {
    idDist: 1783,
    distrito: "Alto de la Alianza",
    idProv: 187,
  },
  {
    idDist: 1784,
    distrito: "Calana",
    idProv: 187,
  },
  {
    idDist: 1785,
    distrito: "Ciudad Nueva",
    idProv: 187,
  },
  {
    idDist: 1786,
    distrito: "Inclán",
    idProv: 187,
  },
  {
    idDist: 1787,
    distrito: "Pachía",
    idProv: 187,
  },
  {
    idDist: 1788,
    distrito: "Palca",
    idProv: 187,
  },
  {
    idDist: 1789,
    distrito: "Pocollay",
    idProv: 187,
  },
  {
    idDist: 1790,
    distrito: "Sama",
    idProv: 187,
  },
  {
    idDist: 1791,
    distrito: "Coronel Gregorio Albarracín Lanchipa",
    idProv: 187,
  },
  {
    idDist: 1792,
    distrito: "La Yarada los Palos",
    idProv: 187,
  },
  {
    idDist: 1793,
    distrito: "Candarave",
    idProv: 188,
  },
  {
    idDist: 1794,
    distrito: "Cairani",
    idProv: 188,
  },
  {
    idDist: 1795,
    distrito: "Camilaca",
    idProv: 188,
  },
  {
    idDist: 1796,
    distrito: "Curibaya",
    idProv: 188,
  },
  {
    idDist: 1797,
    distrito: "Huanuara",
    idProv: 188,
  },
  {
    idDist: 1798,
    distrito: "Quilahuani",
    idProv: 188,
  },
  {
    idDist: 1799,
    distrito: "Locumba",
    idProv: 189,
  },
  {
    idDist: 1800,
    distrito: "Ilabaya",
    idProv: 189,
  },
  {
    idDist: 1801,
    distrito: "Ite",
    idProv: 189,
  },
  {
    idDist: 1802,
    distrito: "Tarata",
    idProv: 190,
  },
  {
    idDist: 1803,
    distrito: "Héroes Albarracín",
    idProv: 190,
  },
  {
    idDist: 1804,
    distrito: "Estique",
    idProv: 190,
  },
  {
    idDist: 1805,
    distrito: "Estique-Pampa",
    idProv: 190,
  },
  {
    idDist: 1806,
    distrito: "Sitajara",
    idProv: 190,
  },
  {
    idDist: 1807,
    distrito: "Susapaya",
    idProv: 190,
  },
  {
    idDist: 1808,
    distrito: "Tarucachi",
    idProv: 190,
  },
  {
    idDist: 1809,
    distrito: "Ticaco",
    idProv: 190,
  },
  {
    idDist: 1810,
    distrito: "Tumbes",
    idProv: 191,
  },
  {
    idDist: 1811,
    distrito: "Corrales",
    idProv: 191,
  },
  {
    idDist: 1812,
    distrito: "La Cruz",
    idProv: 191,
  },
  {
    idDist: 1813,
    distrito: "Pampas de Hospital",
    idProv: 191,
  },
  {
    idDist: 1814,
    distrito: "San Jacinto",
    idProv: 191,
  },
  {
    idDist: 1815,
    distrito: "San Juan de la Virgen",
    idProv: 191,
  },
  {
    idDist: 1816,
    distrito: "Zorritos",
    idProv: 192,
  },
  {
    idDist: 1817,
    distrito: "Casitas",
    idProv: 192,
  },
  {
    idDist: 1818,
    distrito: "Canoas de Punta Sal",
    idProv: 192,
  },
  {
    idDist: 1819,
    distrito: "Zarumilla",
    idProv: 193,
  },
  {
    idDist: 1820,
    distrito: "Aguas Verdes",
    idProv: 193,
  },
  {
    idDist: 1821,
    distrito: "Matapalo",
    idProv: 193,
  },
  {
    idDist: 1822,
    distrito: "Papayal",
    idProv: 193,
  },
  {
    idDist: 1823,
    distrito: "Callería",
    idProv: 194,
  },
  {
    idDist: 1824,
    distrito: "Campoverde",
    idProv: 194,
  },
  {
    idDist: 1825,
    distrito: "Iparía",
    idProv: 194,
  },
  {
    idDist: 1826,
    distrito: "Masisea",
    idProv: 194,
  },
  {
    idDist: 1827,
    distrito: "Nueva Requena",
    idProv: 194,
  },
  {
    idDist: 1828,
    distrito: "Manantay",
    idProv: 194,
  },
  {
    idDist: 1829,
    distrito: "Yarinacocha",
    idProv: 194,
  },
  {
    idDist: 1830,
    distrito: "Raimondi",
    idProv: 195,
  },
  {
    idDist: 1831,
    distrito: "Sepahua",
    idProv: 195,
  },
  {
    idDist: 1832,
    distrito: "Tahuanía",
    idProv: 195,
  },
  {
    idDist: 1833,
    distrito: "Yurúa",
    idProv: 195,
  },
  {
    idDist: 1834,
    distrito: "Padre Abad",
    idProv: 196,
  },
  {
    idDist: 1835,
    distrito: "Irazola",
    idProv: 196,
  },
  {
    idDist: 1836,
    distrito: "Curimaná",
    idProv: 196,
  },
  {
    idDist: 1837,
    distrito: "Neshuya",
    idProv: 196,
  },
  {
    idDist: 1838,
    distrito: "Alexander von Humboldt",
    idProv: 196,
  },
  {
    idDist: 1839,
    distrito: "Purús",
    idProv: 197,
  },
];

const normalizeText = (text: string): string => {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
};

// Función actualizada para encontrar IDs
export const findUbigeoIds = (
  departamento: string,
  provincia: string,
  distrito: string
) => {
  const normalizedDepartamento = normalizeText(departamento);
  const normalizedProvincia = normalizeText(provincia);
  const normalizedDistrito = normalizeText(distrito);

  
  const depa = DEPARTAMENTOS.find(d => {
    const normalized = normalizeText(d.departamento);
    return normalized === normalizedDepartamento;
  });

  const prov = depa
    ? PROVINCIAS.find(
        (p) =>
          p.idDepa === depa.idDepa &&
          normalizeText(p.provincia) === normalizedProvincia
      )
    : null;

  const dist = prov
    ? DISTRITOS.find(
        (d) =>
          d.idProv === prov.idProv &&
          normalizeText(d.distrito) === normalizedDistrito
      )
    : null;

  return {
    departamentoId: depa?.idDepa,
    provinciaId: prov?.idProv,
    distritoId: dist?.idDist,
  };
};
