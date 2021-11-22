import * as SQLite from "expo-sqlite";

function connect(){
    const db = SQLite.openDatabase('PayBuddyStorage.db');
    db.exec([{ sql: 'PRAGMA foreign_keys = ON;', args: [] }], false, () =>
    console.log('Foreign keys turned on')
    );

    return db;
}

export const configureTables = () =>{
    createOccasionTable();
    createItemTable();
    createPersonTable();
    createLocationTable();
}

export const dropTables = () =>{
    drop("Person");
    drop("Item");
    drop("Location");
    drop("Occasion");
}

export const getAll = () =>{
    selectALL('Person');
    selectALL('Item');
    selectALL('Location');
    selectALL('Occasion');
}

const createOccasionTable = () =>{
    connect().transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Occasion "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, " 
            + "Title varchar(255), "
            + "Description TEXT, "
            + "Expiry DATETIME, "
            + "IsPaid BOOLEAN, "
            + "BaseCurrency TEXT, "
            + "IsExpired BOOLEAN);"
        )
    })
}

const createItemTable = () =>{
    connect().transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Item "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, " 
            + "Title varchar(255) NOT NULL, "
            + "Cost DOUBLE NOT NULL, "
            + "Quantity DOUBLE NOT NULL, " 
            + "OccasionID INTEGER NOT NULL, "
            + "FOREIGN KEY (OccasionID) REFERENCES Occasion (ID) ON DELETE CASCADE);"
        )
    })
}

const createPersonTable = () =>{
    connect().transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Person "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, " 
            + "Firstname varchar(255) NOT NULL, "
            + "Lastname varchar(255) NOT NULL, "
            + "PhoneNumber TEXT NOT NULL, "
            + "ItemID INTEGER NOT NULL, "
            + "FOREIGN KEY (ItemID) REFERENCES Item (ID) ON DELETE CASCADE);"
        )
    })
}

const createLocationTable = () =>{
    connect().transaction((tx) =>{
        tx.executeSql(
            "CREATE TABLE IF NOT EXISTS "
            + "Location "
            + "(ID INTEGER PRIMARY KEY AUTOINCREMENT, " 
            + "Latitude DOUBLE NOT NULL, "
            + "Longitude DOUBLE NOT NULL, "
            + "Altitude DOUBLE NOT NULL, "
            + "OccasionID INTEGER NOT NULL, "
            + "FOREIGN KEY (OccasionID) REFERENCES Occasion (ID) ON DELETE CASCADE);"
        )
    })
}

const drop = (table) =>{
    connect().transaction((tx) =>{
        tx.executeSql(
            "DROP TABLE IF EXISTS " + table + ";"
        )
    })
}

const selectALL = (name) =>{
    connect().transaction((tx) =>{
        tx.executeSql(
            "SELECT * FROM " + name,
            [],
            function(tx, res){
                var len = res.rows.length;
                
                if(len > 0){
                    for (let i = 0; i < len; i++) {
                        var item = res.rows.item(i);
                        console.log(name + ' ', item);
                    }
                }else{
                    console.log('Empty! ', name);
                }
            }
        )
    })
} 

export const insertOccasion = (occasion) =>{
    const {Title, Description, Expiry, IsPaid, IsExpired} = occasion;

    const connection = connect();

    return new Promise((resolve, reject) => {
        connection.transaction((tx) => {
            tx.executeSql(
                "INSERT INTO Occasion (Title, Description, Expiry, IsPaid, IsExpired) VALUES (?, ?, ?, ?, ?)",
                [Title, Description, Expiry, IsPaid, IsExpired],
                function(tx, res){
                    resolve(res);

                    const OccasionID = res.insertId;
                    const {Location} = occasion;
                    //Insert occasion location.
                    insertLocation(Location, OccasionID);

                    const {Items} = occasion;
                    //For every item in occasion...
                    for (let i = 0; i < Items.length; i++) {
                        const item = Items[i];

                        //Insert item in occasion...
                        insertItem(item, OccasionID);
                    }
                },
                function(error){
                    reject(error);
                }
            );
        })
    });
}

export const insertItem = (item, OccasionID) =>{
    const {Title, Cost, Quantity, Person} = item;

    connect().transaction((tx) => {
        tx.executeSql(
            "INSERT INTO Item (Title, Cost, Quantity, OccasionID) VALUES (?, ?, ?, ?)",
            [Title, Cost, Quantity, OccasionID],
            function(tx, res){
                //Insert person to item...
                insertPerson(Person, res.insertId);
            }
        );
    })
}

export const insertLocation = (location, OccasionID) =>{
    const {latitude, longitude, altitude} = location;

    connect().transaction((tx) => {
        tx.executeSql(
            "INSERT INTO Location (Latitude, Longitude, Altitude, OccasionID) VALUES (?, ?, ?, ?)",
            [latitude, longitude, altitude, OccasionID]
        );
    })
}

export const insertPerson = (person, ItemID) =>{
    const {firstName, lastName, phoneNumber} = person;

    connect().transaction((tx) => {
        tx.executeSql(
            "INSERT INTO Person (Firstname, Lastname, PhoneNumber, ItemID) VALUES (?, ?, ?, ?)",
            [firstName, lastName, phoneNumber, ItemID]
        );
    })
}

export const GetLocationByID = (ID) =>{
    return new Promise((resolve, reject) => {
        connect().transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Location WHERE OccasionID = ?",
                [ID],
                function(tx, result){     
                    if (result && result.rows && result.rows._array) {
                        resolve(result.rows._array);
                    }else{
                        resolve([]);
                    }   
                },
                (error => reject(error))
            );
        })    
    });
}

export const GetAllLocations = () =>{
    return new Promise((resolve, reject) => {
        connect().transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Location JOIN Occasion ON Location.OccasionID = Occasion.ID",
                [],
                function(tx, result){     
                    if (result && result.rows && result.rows._array) {
                        resolve(result.rows._array);
                    }else{
                        resolve([]);
                    }   
                },
                (error => reject(error))
            );
        })    
    });
}


export const GetItemsByID = (ID) =>{
    return new Promise((resolve, reject) => {
        connect().transaction((tx) => {
            tx.executeSql(
                "SELECT * FROM Item "
                + "JOIN Person "
                + "ON Person.ItemID = Item.ID "
                + "WHERE Item.OccasionID = ?",
                [ID],
                function(tx, result){     
                    if (result && result.rows && result.rows._array) {
                        resolve(result.rows._array);
                    }else{
                        resolve([]);
                    }   
                },
                (error => reject(error))
            );
        })    
    });
}

export const GetValue = (query) =>{
    return new Promise((resolve, reject) => {
        connect().transaction((tx) => {
            tx.executeSql(
                query,
                [],
                function(tx, result){     
                    var len = result.rows.length;
                
                    if(len > 0){
                        var item = result.rows.item(0);
                        resolve(item);
                        
                    }else{
                        resolve(0);
                    }
                },
                (error => reject(error))
            );
        })    
    });
}

export const GetTotalCost = () =>{
    return GetValue("SELECT SUM(Cost * Quantity) AS TOTAL_COST FROM Item");
}

export const GetTotalPendingCost = () =>{
    return GetValue("SELECT SUM(Cost * Quantity) AS TOTAL_COST FROM Item JOIN Occasion ON Item.OccasionID = Occasion.ID WHERE IsPaid = 0");
}

export const GetTotalHistoryCost = () =>{
    return GetValue("SELECT SUM(Cost * Quantity) AS TOTAL_COST FROM Item JOIN Occasion ON Item.OccasionID = Occasion.ID WHERE IsPaid = 1");
}

export const GetTotalExpiredCost = () =>{
    return GetValue("SELECT SUM(Cost * Quantity) AS TOTAL_COST FROM Item JOIN Occasion ON Item.OccasionID = Occasion.ID WHERE IsExpired = 1");
}

export const GetAmountPending = () =>{
    return GetValue("SELECT Count(*) AS AMOUNT FROM Occasion WHERE isPaid = 0 AND IsExpired = 0");
}

export const GetAmountHistory = () =>{
    return GetValue("SELECT Count(*) AS AMOUNT FROM Occasion WHERE isPaid = 1");
}

export const GetAmountExpired = () =>{
    return GetValue("SELECT Count(*) AS AMOUNT FROM Occasion WHERE IsExpired = 1");
}

export const DeleteOccasion = (ID) =>{
    Execute("DELETE FROM Occasion WHERE ID = ?", [ID]);
}

export const DeleteItem = (ID) =>{
    Execute("DELETE FROM Item WHERE ID = ?", [ID]);
}

export const MakeActiveToHistory = (ID) => {
    Execute("UPDATE Occasion SET IsPaid = 1 WHERE ID = ?", [ID]);
}

export const MakeHistoryToPending = (ID) => {
    console.log(ID);
    Execute("UPDATE Occasion SET IsPaid = 0 WHERE ID = ?", [ID]);
}

export const MakeOccasionExpired = (ID) => {
    Execute("UPDATE Occasion SET IsExpired = 1 WHERE ID = ?", [ID])
}

export const GetAllOccasions = async () =>{
    return new Promise((resolve, reject) => {
        FetchOccasions("SELECT * FROM Occasion", resolve, reject);
    });
}

export const GetActiveOccasions = async () =>{
    return new Promise((resolve, reject) => {
        FetchOccasions("SELECT * FROM Occasion WHERE IsPaid = 0 AND IsExpired = 0", resolve, reject);
    });
}

export const GetHistoryOccasions = () =>{
    return new Promise((resolve, reject) => {
        FetchOccasions("SELECT * FROM Occasion WHERE IsPaid = 1", resolve, reject);
    });
}

export const GetExpiredOccasions = () =>{
    return new Promise((resolve, reject) => {
        FetchOccasions("SELECT * FROM Occasion WHERE IsPaid = 0 AND IsExpired = 1", resolve, reject);
    });
}

const Execute = (query, params) =>{
    connect().transaction((tx) => {
        tx.executeSql(
            query,
            params,
            null,
            function(error){
                console.log('Error found : ');
                console.log(error);
            },
        );
    })
}

const FetchOccasions = (query, resolve, reject) =>{
    connect().transaction((tx) => {
        tx.executeSql(
            query,
            [],
            function(tx, result){     
                if (result && result.rows && result.rows._array) {
                    resolve(result.rows._array);
                }else{
                    resolve([]);
                }   
            },
            (error => reject(error))
        );
    })
}

