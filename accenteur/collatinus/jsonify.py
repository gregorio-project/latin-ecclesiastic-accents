#!/usr/bin/env python3

# This script converts the Collatinus data files (lemmes.la, models.la etc.)
# into Javascript objects.

import os
import re 
import json 

def read_this_file(file_path):
    this_file = open(file_path, "r", encoding="utf-8")
    file_contents = this_file.read();
    this_file.close()
    return(file_contents)

# Path to "collatinus" directory:
this_dir = os.path.abspath("/Users/frromain/Doc/Langues/Latin/latin-ecclesiastic-accents/accenteur/collatinus/")

# Delete the contents of data.js if this file exists:
this_file = open(this_dir + "/../data.js", "w", encoding="utf-8")
this_file.write("This script has been written by collatinus/jsonify.py and creates JS Objects from the Collatinus' Data.");
this_file.close()


####################################    

# Lemmes :
lemmes = read_this_file(this_dir + "/lemmes.la")
lemmes_dict = dict()
lemmes_lines = lemmes.split("\n")
for l in lemmes_lines:
    if(l.startswith("!") == False):
        key = l.split("|")[0]
        lemmes_dict[key] = l

# Write lemmes.js = create a JS Object from the Collatinus lemmes:
json_path = open(this_dir + "/../data.js", "a", encoding="utf-8")
json_path.write("var lemmes_json = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(lemmes_dict))
json_path.write(";");
json_path.close()


####################################    

# Models :
models = read_this_file(this_dir + "/modeles.la")
models_dict = dict()
models_lines = models.split("\n")
for l in models_lines:
    if(l.startswith("!") == False):
        key = l.split("|")[0]
        models_dict[key] = l

# Write models.js = create a JS Object from the Collatinus templates:
json_path = open(this_dir + "/../data.js", "a", encoding="utf-8")
json_path.write("\n\nvar models_json = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(models_dict))
json_path.write(";");
json_path.close()






