import os
import pytest
from transaction import Transaction


@pytest.fixture
def transaction(name="tracker.db"):
    """Aaron Tang"""
    return Transaction(name)


def test_create_table(transaction):
    """Aaron Tang"""
    """Test that a 'transactions' table is created in the database"""
    tables = transaction.conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table';").fetchall()
    transaction.conn.close()
    assert len(tables) == 1
    assert tables[0][0] == "transactions"


def test_add_transaction(transaction):
    '''Harry'''
    """Test that adding a transaction increases the number of transactions"""
    num_transactions = len(transaction.get_transactions())
    transaction.add_transaction(10.0, "Food", "2022-03-25", "Groceries")
    new_num_transactions = len(transaction.get_transactions())
    transaction.conn.close()
    assert new_num_transactions == num_transactions + 1


def test_delete_transaction(transaction):
    """Aaron Tang"""
    """Test that deleting a transaction decreases the number of transactions"""
    transaction.add_transaction(10.0, "Food", "2022-03-25", "Groceries")
    num_transactions = len(transaction.get_transactions())
    transaction.delete_transaction(1)
    new_num_transactions = len(transaction.get_transactions())
    transaction.conn.close()
    assert new_num_transactions == num_transactions - 1


def test_update_transaction(transaction):
    """Test that updating a transaction changes the corresponding field"""
    pass
    # implement this method
