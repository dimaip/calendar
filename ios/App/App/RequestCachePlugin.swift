import Capacitor
import SQLite3

@objc(RequestCachePlugin)
class RequestCachePlugin: CAPPlugin, CAPBridgedPlugin {
    let identifier = "RequestCachePlugin"
    let jsName = "RequestCache"
    let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "get", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "set", returnType: CAPPluginReturnPromise),
    ]

    private let queue = DispatchQueue(label: "app.molitva.request-cache")
    private var database: OpaquePointer?
    private let transient = unsafeBitCast(-1, to: sqlite3_destructor_type.self)

    deinit {
        sqlite3_close(database)
    }

    @objc func get(_ call: CAPPluginCall) {
        execute(call, sql: "SELECT value FROM requestsCache WHERE name = ?")
    }

    @objc func set(_ call: CAPPluginCall) {
        guard let value = call.getString("value") else {
            call.reject("Missing cache value")
            return
        }
        execute(call, sql: """
            INSERT INTO requestsCache (name, value) VALUES (?, ?)
            ON CONFLICT(name) DO UPDATE SET value = excluded.value
            """, value: value)
    }

    private func execute(_ call: CAPPluginCall, sql: String, value: String? = nil) {
        guard let key = call.getString("key") else {
            call.reject("Missing cache key")
            return
        }
        queue.async {
            if self.database == nil {
                // Reuse the unencrypted database created by capacitor-data-storage-sqlite.
                guard let documents = FileManager.default.urls(for: .documentDirectory, in: .userDomainMask).first else {
                    call.reject("Unable to locate the request cache")
                    return
                }
                let url = documents.appendingPathComponent("pbSQLite.db")
                var connection: OpaquePointer?
                guard sqlite3_open(url.path, &connection) == SQLITE_OK,
                      sqlite3_exec(connection, """
                          CREATE TABLE IF NOT EXISTS requestsCache (
                              id INTEGER PRIMARY KEY AUTOINCREMENT,
                              name TEXT NOT NULL UNIQUE,
                              value TEXT
                          )
                          """, nil, nil, nil) == SQLITE_OK else {
                    sqlite3_close(connection)
                    call.reject("Unable to open the request cache")
                    return
                }
                self.database = connection
            }

            var statement: OpaquePointer?
            defer { sqlite3_finalize(statement) }
            guard sqlite3_prepare_v2(self.database, sql, -1, &statement, nil) == SQLITE_OK,
                  sqlite3_bind_text(statement, 1, key, -1, self.transient) == SQLITE_OK else {
                call.reject("Unable to prepare the request cache query")
                return
            }
            if let value, sqlite3_bind_text(statement, 2, value, -1, self.transient) != SQLITE_OK {
                call.reject("Unable to bind the request cache value")
                return
            }
            switch sqlite3_step(statement) {
            case SQLITE_ROW:
                let cached = sqlite3_column_text(statement, 0).map { String(cString: $0) }
                call.resolve(["value": cached as Any? ?? NSNull()])
            case SQLITE_DONE:
                if value == nil {
                    call.resolve(["value": NSNull()])
                } else {
                    call.resolve()
                }
            default:
                call.reject("Unable to execute the request cache query")
            }
        }
    }
}

class CalendarViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(RequestCachePlugin())
    }
}
