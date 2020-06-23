import requests
import json
import sqlite3
from bs4 import BeautifulSoup
import sys

conn = sqlite3.connect(r"C:\Users\Raphael\Desktop\JR 1.0\Server\bancoDeDados.db")

c = conn.cursor()

query_nome = 'SELECT boadica FROM produtos_servicos WHERE ps_id = ?'

def read_boadica(nome):
    for link in c.execute(query_nome, (nome,)):
        return link




# https://www.boadica.com.br/produtos/p103906/kingston-kvr16n114            memória
# https://www.boadica.com.br/produtos/p149805/kingston-sa400s37240g         SSD240
# https://www.boadica.com.br/produtos/p107491/seagate-st1000vm002           HD
# https://www.boadica.com.br/produtos/p155800/western-digital-wds120g2g0a   SSD120
# https://www.boadica.com.br/produtos/p76242/kingston-kvr1333d3s94g         memória ddr3 note 4gb
# https://www.boadica.com.br/produtos/p162820/hoopson-fnt-230w              fonte atx
# https://www.boadica.com.br/produtos/p172742/corsair-cv550-cp-9020210-br   fonte real 550W
# https://www.boadica.com.br/produtos/p165026/biostar-a320mh-ver-6x         placa mãe am4
# https://www.boadica.com.br/produtos/p167514/intel-core-i3-9100f           i3  


url2 = "https://www.boadica.com.br/produtos/p155800/western-digital-wds120g2g0a"
url3 = "https://www.boadica.com.br/produtos/p107491/seagate-st1000vm002"
url4 = "https://www.boadica.com.br/produtos/p103906/kingston-kvr16n114"

pre_url = str(read_boadica(sys.argv[1]))
pre_url2 = pre_url.strip("'(")
url = pre_url2.strip(",)'")


r = requests.get(url)
soup = BeautifulSoup(r.content, 'html.parser')
nome = soup.find_all('div', {'class': 'nome'})
endertele = soup.find_all('div', {'class': 'col-md-6'})
preco = soup.find_all('div', {'class': "col-md-3 preco-loja"})
min_max = soup.find_all('div', {'class': 'pull-left'})
date = soup.find_all('div', {'class': 'data-hora'})

dtext = str(date)
dtext2 = dtext.strip('[<div class="data-hora">')
dtext3 = dtext2.strip('</div>]')
dtext4 = dtext3.replace('\r\n', ' ')
dtext5 = dtext4.strip('\r')
dtext6 = dtext5.replace('  ', '')
dtext7 = dtext6.strip('pull-left">De<span>')
dtext8 = dtext7.replace('</span>a<span>', ' ')
dtext9 = dtext8.replace('</span>', '')
dtext10 = dtext9.strip()





mtext = str(min_max[0])
mtext2 = mtext.strip('[<div class="nome">')
mtext3 = mtext2.strip('</div>]')
mtext4 = mtext3.replace('\r\n', ' ')
mtext5 = mtext4.strip('\r')
mtext6 = mtext5.replace(' ', '')
mtext7 = mtext6.strip('pull-left">De<span>')
mtext8 = mtext7.replace('</span>a<span>', ' ')
mtext9 = mtext8.replace('</span>', '')
mtext10 = mtext9.replace('R$', '')
mtext11 = mtext10.replace(',', '.')
mtext12 = mtext11.split()



media = (float(mtext12[0]) + float(mtext12[1])) / 2
media_tratada = (f'{media:.2f}')



ttext = str(nome)
ttext2 = ttext.strip('[<div class="nome">')
ttext3 = ttext2.strip('</div>]')
ttext4 = ttext3.replace('\r\n', ' ')
ttext5 = ttext4.strip('\r')
ttext6 = ttext5.replace(' ', '')



indexX = 0
listas = [[], []]
for i in range(len(endertele)):
    text = str(endertele[i])
    text2 = text.replace('   ', '')
    text3 = text2.strip('<div class="col-md-6" style="padding-bottom:15px;">')
    text4 = text3.strip('</span> </')
    text5 = text4.replace('<br/>', ' ')
    text6 = text5.replace('<span>/', ' ')
    text7 = text6.strip('\n\r')
    text8 = text7.strip('r\n')
    text9 = text8.replace('\r\n', ' ')
    text10 = text9.replace('</span>', ' ')
    text11 = text10.replace('<span>', ' ')
    text12 = text11.replace('<i aria-hidden="true" class="fa fa-whatsapp" style="font-weight:bold;color:#129809;"></i>', ' ')
    text13 = text12.replace('/', '')
    text14 = text13.split('(21)')
    
    
    
    listas[0].append(text14)

    print()

    ptext = str(preco[i])
    ptext2 = ptext.replace('   ', '')
    ptext3 = ptext2.strip('<div class="col-md-6" style="padding-bottom:15px;">')
    ptext4 = ptext3.strip('</span> </')
    ptext5 = ptext4.replace('<br/>', ' ')
    ptext6 = ptext5.replace('<span>/', ' ')
    ptext7 = ptext6.strip('\n\r')
    ptext8 = ptext7.strip('r\n')
    ptext9 = ptext8.replace('\r\n', ' ')
    ptext10 = ptext9.strip('\n<span>BOX</span>')
    ptext11 = ptext10.strip('3 preco-loja">')
    ptext12 = ptext11.strip('\n<span>OEM')
    ptext13 = ptext12.strip('R$ ')
    ptext14 = ptext13.replace(',', '.')

    listas[1].append(ptext14)



dicionario = {
    "ps_id": sys.argv[1],
    "valor_medio": media_tratada,
    "ender_tel": listas[0],
    "valores": listas[1],
}


js = json.dumps(dicionario)
print(js)
sys.stdout.flush()

# json_bd = open('boadica.json', 'w')
# json_bd.write(js)
# json_bd.close()