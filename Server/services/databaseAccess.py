# import sqlite3
# import sys


# conn = sqlite3.connect(r"Server\bancoDeDados.db")
# c = conn.cursor()

# query_nome = 'SELECT boadica FROM produtos_servicos WHERE ps_id = ?'

# def read_boadica(nome):
#     for link in c.execute(query_nome, (nome,)):
#         return link