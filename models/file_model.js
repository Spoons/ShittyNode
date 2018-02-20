var Database = require('better-sqlite3');
var db = new Database('db.db');

const file_model = {
    id: null,
    name: null,
    data: null,
   // owner: null,
   // key: null,

    update: function(name, data) {
        this.id = null;
        this.name = name;
        this.data = data;

        this.write();
    },

    load_by_id: function(id) {
        let q = `SELECT * FROM files WHERE id=${id}`;
        let row = db.prepare(q).get();
        console.log(row.id);
        this.id = row.id;
        this.name = row.name;
        this.data = data;

    },

    write: function() { 
        if (this.ensure_not_null == false) {
            console.log("Writing null file model!!");
        }

        id = this.id;
        name = this.name;
        data = this.data;
        var query = `INSERT OR REPLACE INTO files (id, name, data) VALUES ('${id}', '${name}', '${data}')`;
        db.prepare(query).run();
        query = "select last_insert_rowid();"
        let row = db.prepare(query).get();
        //this line is probably not right
        this.id = row.id;

    },

    print: function() {
        console.log("id: " + this.id, this.name, this.data)
    },

    ensure_not_null: function() {
        for (var property in this) {
            if (this.hasOwnProperty(property) {
                if (property == null) {
                    return (false);
                }
            }
        }
        return (true);

    }
        

    //Below here is testing code
    create_migration_table: function() {
        db.prepare("DROP TABLE files").run();
        db.prepare("CREATE TABLE files (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, data BLOB)").run();
        db.prepare("CREATE UNIQUE INDEX files_idx ON files(id)".run();
        console.log("table create");
    }
}


const sanity_test = function() {

    const test_model = Object.create(file_model);

    test_model.set(1, "cats", "0101010101010");
    test_model.print();
    test_model.write_new_file()

    const new_model = Object.create(file_model);
    new_model.load_by_id(1);
    new_model.print();
            
}

sanity_test();