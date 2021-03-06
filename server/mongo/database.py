import psycopg2
from pymongo import MongoClient
from decimal import Decimal
import datetime
from tabulate import tabulate

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

    query1 = f'''SELECT c.userid as userid, c.name as firstname, c.lastname as lastname,
                  c.address as address, c.city as city, c.state as state, 
                  c.country as country, c.postalcode as postalcode,
                  i.invoiceid as invoiceid, i.invoicedate as invoicedate, i.total as total
                FROM invoice i
                INNER JOIN users c
                on c.userid = i.userid
                WHERE i.invoicedate between '{date}' and '{date2}' ;'''
    
    cursor.execute(query1)
    connection.commit()
    select = cursor.fetchall() 
    dataList = []
    print('\n---------Resultados-----------\n')
    for row in select:
        dataList.append({
            "userid": row[0],
            "firstname": row[1],
            "lastname": row[2],
            "address": row[3],
            "city": row[4],
            "state": row[5],
            "country": row[6],
            "postalcode": row[7],
            "invoiceid": row[8],
            "invoicedate": row[9],
            "total": float(row[10])
        })
    dataListWithTitles = [{"userid":'UserId', "firstname":'FirstName', "lastname":'LastName',"address":'Address',"city":'City',"state":'State', "country":'Country',"postalcode":'PostalCode',"invoiceid":'InvoiceId',"invoicedate":'InvoiceDate',"total":'Total'}]
    dataListWithTitles = dataListWithTitles + dataList 
    print(tabulate(dataListWithTitles,tablefmt="fancy_grid"))
    print('------------------------------\n')

    #Se guarda en mongodb
    if(len(dataList)>0):
        dataid = collection.insert_many(dataList)
        print('\n---Id de los datos guardados---\n')
        for iddocument in dataid.inserted_ids:
            print(iddocument, "\n")

        print('---------------------------------\n')
        
        #Mensaje de exito
        print('\nSe lograron guardar todos los datos en la base de datos de mongodb!\n')
    else:
        
        
        #Mensaje de exito
        print('\nNo hay ninguna venta en las fechas ingresadas.\n')


#Funcion del query2
def query2(connection, cursor, collection):

    query1 = f'''SELECT c.userid as userid, c.name as firstname, c.lastname as lastname, g.name as genre, count(t.trackid) as quantity
                FROM invoice i
                INNER JOIN invoiceline il on il.invoiceid = i.invoiceid
                INNER JOIN track t on t.trackid = il.trackid
                INNER JOIN genre g on g.genreid = t.genreid
                INNER JOIN users c on c.userid = i.userid
				where c.userid in (SELECT c2.userid as userid
									FROM invoice i
									INNER JOIN invoiceline il on il.invoiceid = i.invoiceid
									INNER JOIN track t on t.trackid = il.trackid
									INNER JOIN users c2 on c2.userid = i.userid
									group by c2.userid
									order by count(t.trackid) DESC
									limit 10)
					and g.name in (select g2.name as genre
									FROM invoice i
									INNER JOIN invoiceline il on il.invoiceid = i.invoiceid
									INNER JOIN track t on t.trackid = il.trackid
									INNER JOIN genre g2 on g2.genreid = t.genreid
									INNER JOIN users c3 on c3.userid = i.userid
								  	WHERE c3.userid = c.userid and g2.name not in (select g2.name as genre
									FROM invoice i
									INNER JOIN invoiceline il on il.invoiceid = i.invoiceid
									INNER JOIN track t on t.trackid = il.trackid
									INNER JOIN genre g2 on g2.genreid = t.genreid
									INNER JOIN users c3 on c3.userid = i.userid
								  	WHERE c3.userid = c.userid 
									group by g2.genreid
									order by count(t.trackid) DESC
								  	limit 2)
									group by g2.genreid
									order by count(t.trackid) DESC
								  	limit 1)
				group by c.userid, g.genreid
				order by count(t.trackid) DESC;'''
    
    cursor.execute(query1)
    connection.commit()
    select = cursor.fetchall() 
    dataList = []
    print('\n---------Resultados-----------\n')
    for row in select:
        query2 = f'''SELECT t.name, al.title as album, a.name as artist
                    FROM logbook lb
                    INNER JOIN track t on t.trackid = lb.objectid
                    INNER JOIN genre g on g.genreid = t.genreid
                    INNER JOIN album al on al.albumid = t.albumid
                    INNER JOIN artist a on a.artistid = al.artistid
                    where lb.objecttype = 'track' and lb.logtype = 'insert' and g.name = '{row[3]}'
                    order by datemodified DESC
					limit 3;'''
        cursor.execute(query2)
        connection.commit()
        select2 = cursor.fetchall()
        for row2 in select2:
            dataList.append({
                "userid": row[0],
                "firstname": row[1],
                "lastname": row[2],
                "track": row2[0],
                "album": row2[1],
                "artist": row2[2]
            })
    dataListWithTitles = [{"userid":'UserId', "firstname":'FirstName', "lastname":'LastName',"track":'Track',"album":'Album',"artist":'Artist'}]
    dataListWithTitles = dataListWithTitles + dataList
    print(tabulate(dataListWithTitles,tablefmt="fancy_grid"))
    print('------------------------------\n')

    #Se guarda en mongodb
    if(len(dataList)>0):
        dataid = collection.insert_many(dataList)
        print('\n---Id de los datos guardados---\n')
        for iddocument in dataid.inserted_ids:
            print(iddocument, "\n")

        print('---------------------------------\n')
        
        #Mensaje de exito
        print('\nSe lograron guardar todos los datos en la base de datos de mongodb!\n')
    else:
        
        
        #Mensaje de exito
        print('\nNo hay ninguna venta en las fechas ingresadas.\n')

#Se conecta a la base de datos de postgres
dbConnectionPostgres = connectDBPostgres()
dbCursorPostgres = dbConnectionPostgres.cursor()

#Se conecta a la base de datos de mongodb
clientMongodb = connectDBMongodb()
databaseMongodb = clientMongodb["Proyecto1"]
collectionMongodb = databaseMongodb["invoiceCustomers"]
collectionMongodb2 = databaseMongodb["recomendations"]

#Comienza el menu
menu = 0
while menu != 3:
    menuStr = input('1: Guarda clientes de una fecha en específico.\n' + 
                    '2: Analizar los tracks más recientes.\n' +
                    '3: Salir.\n')
    
    #Se verifica el menu
    try:
        menu = int(menuStr)
    except:
        print('Opcion ingresada incorrecta')
    
    #Si menu = 1
    if(menu == 1):
        query1(dbConnectionPostgres, dbCursorPostgres, collectionMongodb)
    
    #Si menu = 2
    if(menu == 2):
        query2(dbConnectionPostgres, dbCursorPostgres, collectionMongodb2)

closeConnection(dbConnectionPostgres)