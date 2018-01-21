#!/usr/bin/env python3

import os
import json 

data_dir = os.path.abspath("../data")

lemmes_path = open(data_dir + "/lemmes.la", "r", encoding = "utf-8")
lemmes = lemmes_path.read()
lemmes_path.close()

# Lemmes :
lemmes_dict = dict()
lemmes_lines = lemmes.split("\n")
for l in lemmes_lines:
    if(l.startswith("!") == False):
        key = l.split("|")[0]
        lemmes_dict[key] = l

json_path = open(data_dir + "/lemmes.json", "w", encoding = "utf-8")
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(lemmes_dict))
json_path.close()

# Modèles :
modeles_path = open(data_dir + "/modeles.la", "r", encoding = "utf-8")
modeles = modeles_path.read()
modeles_path.close()

modeles_dict = dict()
modeles_lines = modeles.split("\n")
for l in modeles_lines:
    if(l.startswith("!") == False):
        key = l.split("|")[0]
        modeles_dict[key] = l

json_path = open(data_dir + "/modeles.json", "w", encoding = "utf-8")
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(modeles_dict))
json_path.close()

