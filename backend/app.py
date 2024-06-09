from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector as sql

app = Flask(__name__)
CORS(app)

connection = sql.connect(host='localhost', user='root', password='Admin@123', database='sample')
cursor = connection.cursor()
cursor.execute("CREATE TABLE IF NOT EXISTS tasks (id INT PRIMARY KEY, title VARCHAR(20), descr VARCHAR(255))")

@app.route("/add", methods=["POST"])
def add():
    if request.method == 'POST':
        task_id = request.form.get('id')
        title = request.form.get('title_val')
        descr = request.form.get('desc_val')

        sql_query = "INSERT INTO tasks (id, title, descr) VALUES (%s, %s, %s)"
        values = (task_id, title, descr)

        try:
            cursor.execute(sql_query, values)
            connection.commit()
            return jsonify(message="Task added successfully!"), 200
        except sql.Error as e:
            return jsonify(message=f"An error occurred: {e}"), 500

@app.route("/fetch/<int:id>", methods=["GET"])
def fetch_task(id):
    try:
        cursor.execute("SELECT * FROM tasks WHERE id = %s", (id,))
        task = cursor.fetchone()
        if task:
            return jsonify(id=task[0], title=task[1], description=task[2]), 200
        else:
            return jsonify(message="Task not found"), 404
    except sql.Error as e:
        return jsonify(message=f"An error occurred: {e}"), 500

@app.route("/update/<int:id>", methods=["POST"])
def update_task(id):
    if request.method == 'POST':
        title = request.form.get('title_val')
        descr = request.form.get('desc_val')

        sql_query = "UPDATE tasks SET title = %s, descr = %s WHERE id = %s"
        values = (title, descr, id)

        try:
            cursor.execute(sql_query, values)
            connection.commit()
            if cursor.rowcount > 0:
                return jsonify(message="Task updated successfully!"), 200
            else:
                return jsonify(message="Task not found"), 404
        except sql.Error as e:
            return jsonify(message=f"An error occurred: {e}"), 500

@app.route("/display", methods=["GET"])
def fetch():
    cursor.execute('SELECT * FROM tasks')
    res = cursor.fetchall()
    return jsonify(res)

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete(id):
    try:
        cursor.execute("DELETE FROM tasks WHERE id = %s", (id,))
        connection.commit()
        if cursor.rowcount > 0:
            return jsonify(message="Task deleted successfully!"), 200
        else:
            return jsonify(message="Task not found"), 404
    except sql.Error as e:
        return jsonify(message=f"An error occurred: {e}"), 500

if __name__ == '__main__':
    app.run(debug=True)
