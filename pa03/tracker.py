from transaction import Transaction

def print_menu():
    print("0. quit")
    print("1. show categories")
    print("2. add category")
    print("3. modify category")
    print("4. show transactions")
    print("5. add transaction")
    print("6. delete transaction")
    print("7. summarize transactions by date")
    print("8. summarize transactions by month")
    print("9. summarize transactions by year")
    print("10. summarize transactions by category")
    print("11. print this menu")

def main():
    db = Transaction("tracker.db")
    print_menu()

def format_transactions(transactions):
    # print the transactions in a nice format
    print("item # | amount | category | date       | description")
    print("------------------------------------------------------")
    for t in transactions:
        print(f"{t[0]:<6} | {t[1]:<6} | {t[2]:<8} | {t[3]:<10} | {t[4]}")

def main():
    db = Transaction("tracker.db")
    categories = set()
    print_menu()

    while True:
        choice = input("Choose an option: ")
        if choice == "0":
            break
        elif choice == "1":
            print("Categories:")
            for c in categories:
                print(c)
        elif choice == "2":
            new_category = input("Enter the new category: ")
            categories.add(new_category)
        elif choice == "3":
            old_category = input("Enter the category to modify: ")
            if old_category in categories:
                new_category = input("Enter the new category name: ")
                categories.remove(old_category)
                categories.add(new_category)
            else:
                print("Category not found.")
        elif choice == "4":
            transactions = db.get_transactions()
            format_transactions(transactions)
        elif choice == "5":
            '''Harry'''
            amount = float(input("Enter the transaction amount: "))
            category = input("Enter the transaction category: ")
            date = input("Enter the transaction date (YYYY-MM-DD): ")
            description = input("Enter the transaction description: ")
            db.add_transaction(amount, category, date, description)
        elif choice == "6":
            '''Harry'''
            item = int(input("Enter the item number to delete: "))
            db.delete_transaction(item)
        elif choice == "7":
            date = input("Enter the date to summarize (YYYY-MM-DD): ")
            transactions = [t for t in db.get_transactions() if t[3] == date]
            format_transactions(transactions)
        elif choice == "8":
            '''Harry'''
            month = input("Enter the month to summarize (YYYY-MM): ")
            transactions = [t for t in db.get_transactions() if t[3].startswith(month)]
            format_transactions(transactions)
        elif choice == "9":
            '''Harry'''
            year = input("Enter the year to summarize (YYYY): ")
            transactions = [t for t in db.get_transactions() if t[3].startswith(year)]
            format_transactions(transactions)
        elif choice == "10":
            '''Harry'''
            category = input("Enter the category to summarize: ")
            transactions = [t for t in db.get_transactions() if t[2] == category]
            format_transactions(transactions)
        elif choice == "11":
            '''Harry'''
            print_menu()
        else:
            print("Invalid choice. Try again.")

    db.close_connection()

if __name__ == "__main__":
    main()