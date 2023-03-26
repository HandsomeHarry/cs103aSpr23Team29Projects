"""
Create a Python class Transaction in a file transaction.py will store financial transactions with the fields. 
It should have an __init__ method where you pass in the filename for the database to be used (e.g. tracker.db) 
and each transaction should have the following fields stored in a SQL table called transactions.
'item #',
'amount',
'category',
'date',
'description'
"""


import sqlite3
import os

def toDict(t):
    '''Denise'''
    ''' t is a tuple (rowid, item_#, amount, category, date, desctription)'''
    print('t='+str(t))
    transaction = {'rowid':t[0], 'item_#':t[1], 'amount':t[2], 'category':t[3], 'date':t[4], 'description:':t[5]}
    return transaction

class Transaction:
    def __init__(self, filename):
        self.filename = filename
        self.conn = sqlite3.connect(self.filename)
        self.create_table()

    def create_table(self):
        self.conn.execute('''CREATE TABLE IF NOT EXISTS transactions
                             (item INTEGER PRIMARY KEY,
                              amount REAL,
                              category TEXT,
                              date TEXT,
                              description TEXT)''')

    def add_transaction(self, amount, category, date, description):
        self.conn.execute("INSERT INTO transactions (amount, category, date, description) VALUES (?, ?, ?, ?)",
                          (amount, category, date, description))
        self.conn.commit()

    def delete_transaction(self, item):
        self.conn.execute("DELETE FROM transactions WHERE item=?", (item,))
        self.conn.commit()

    def update_transaction(self, item, field, value):
        self.conn.execute(f"UPDATE transactions SET {field}=? WHERE item=?", (value, item))
        self.conn.commit()

    def get_transactions(self):
        return self.conn.execute("SELECT * FROM transactions").fetchall()

    def close_connection(self):
        self.conn.close()
