import psycopg2
from pymongo import MongoClient
from decimal import Decimal
import datetime

#Funcion para conectarse a la base de datos postgres
def connectDBPostgres():
    try:
        connection = psycopg2.connect(user = "postgres",
                                    password = "postgres",
                                    host = "127.0.0.1",
                                    port = "5432",
                                    database = "Proyecto1")

        return connection
    except (Exception, psycopg2.Error) as error :
        print ("Error while connecting to PostgreSQL", error)

#Funcion para cerrar la conexion de base de datos postgres
def closeConnection(connection):
    #closing database connection.
        if(connection):
            cursor = connection.cursor()
            cursor.close()
            connection.close()
            print("PostgreSQL connection is closed")

#Funcion para conectarse a la base de datos mongodb
def connectDBMongodb():
    client = MongoClient('mongodb://localhost:27017/')
    return client

#Funcion del query1
def query1(connection, cursor, collection):
    validate = False
    while(validate == False):
        print('------------Fecha inicio---------------\n')
        dayStr = input('Ingrese el día de inicio: ')
        monthStr = input('Ingrese el mes de inicio: ')
        yearStr = input('Ingrese el año de inicio: ')
        print('------------Fecha fin------------------\n')
        dayStr2 = input('Ingrese el día de final: ')
        monthStr2 = input('Ingrese el mes de final: ')
        yearStr2 = input('Ingrese el año de final: ')
        try:
            day = int(dayStr)	
            month = int(monthStr)
            year = int(yearStr)
            day2 = int(dayStr2)	
            month2 = int(monthStr2)
            year2 = int(yearStr2)
            date = datetime.datetime(year, month, day)
            date2 = datetime.datetime(year2, month2, day2)
            if(date2 >= date):
                validate = True
            else:
                print('ERROR: Ingrese una fecha final mayor a inicial\n')    
        except:
            print('ERROR: Ingresa una fecha real\n')

    query1 = f'''SELECT c.customerid as customerid, c.firstname as firstname, c.lastname as lastname,
                  c.company as company, c.address as address, c.city as city, c.state as state, 
                  c.country as country, c.postalcode as postalcode, c.phone as phone, c.fax as fax,
                  c.email as email, i.invoiceid as invoiceid, i.invoicedate as invoicedate, i.total as total
                FROM invoice i
                INNER JOIN customer c
                on c.customerid = i.customerid
                WHERE i.invoicedate between '{date}' and '{date2}' ;'''
    
    cursor.execute(query1)
    connection.commit()
    select = cursor.fetchall() 
    dataList = []
    print('\n---------Resultados-----------\n')
    for row in select:
        dataList.append({
            "customerid": row[0],
            "firstname": row[1],
            "lastname": row[2],
            "company": row[3],
            "address": row[4],
            "city": row[5],
            "state": row[6],
            "country": row[7],
            "postalcode": row[8],
            "phone": row[9],
            "fax": row[10],
            "email": row[11],
            "invoiceid": row[12],
            "invoicedate": row[13],
            "total": float(row[14])
        })

        print(row, "\n")

    print('------------------------------\n')

    #Se guarda en mongodb
    dataid = collection.insert_many(dataList)
    print('\n---Id de los datos guardados---\n')
    for iddocument in dataid.inserted_ids:
        print(iddocument, "\n")

    print('---------------------------------\n')
    
    #Mensaje de exito
    print('\nSe lograron guardar todos los datos en la base de datos de mongodb!\n')



#Se conecta a la base de datos de postgres
dbConnectionPostgres = connectDBPostgres()
dbCursorPostgres = dbConnectionPostgres.cursor()

#Se conecta a la base de datos de mongodb
clientMongodb = connectDBMongodb()
databaseMongodb = clientMongodb["Proyecto1"]
collectionMongodb = databaseMongodb["invoiceCustomers"]

#Comienza el menu
menu = 0
while menu != 2:
    menuStr = input('1: Guarda clientes de una fecha en específico.\n' + 
                    '2: Salir.\n')
    
    #Se verifica el menu
    try:
        menu = int(menuStr)
    except:
        print('Opcion ingresada incorrecta')
    
    #Si menu = 1
    if(menu == 1):
        query1(dbConnectionPostgres, dbCursorPostgres, collectionMongodb)

closeConnection(dbConnectionPostgres)