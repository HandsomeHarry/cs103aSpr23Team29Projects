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

class Transaction():
    def __init__(self):
        '''Denise'''
        self.runQuery('''CREATE TABLE IF NOT EXISTS transactions
                    (item_# int, amount dec, category text, date date, description text)''',())

    def selectAll(self):
        '''Denise'''
        ''' return all of the transactions as a list of dicts.'''
        return self.runQuery("SELECT rowid,* from transactions",())

    def add(self,item):
        '''Denise'''
        ''' add a transaction '''
        return self.runQuery("INSERT INTO transactions VALUES(?,?,?,?,?)",(item['item_#'],item['amount'],item['category'],item['date'],item['description']))

    def delete(self,rowid):
        '''Denise'''
        ''' delete a transaction '''
        return self.runQuery("DELETE FROM transaction WHERE rowid=(?)",(rowid,))


    def runQuery(self,query,tuple):
        '''Denise'''
        ''' return all of the uncompleted tasks as a list of dicts.'''
        con= sqlite3.connect(os.getenv('HOME')+'/tracker.db')
        cur = con.cursor() 
        cur.execute(query,tuple)
        tuples = cur.fetchall()
        con.commit()
        con.close()
        return [toDict(t) for t in tuples]