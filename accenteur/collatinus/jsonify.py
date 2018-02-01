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

def atone(this_string):
    this_string = re.sub("ā", "a", this_string)
    this_string = re.sub("ă", "a", this_string)
    this_string = re.sub("ē", "e", this_string)
    this_string = re.sub("ĕ", "e", this_string)
    this_string = re.sub("ī", "i", this_string)
    this_string = re.sub("ĭ", "i", this_string)
    this_string = re.sub("ō", "o", this_string)
    this_string = re.sub("ŏ", "o", this_string)
    this_string = re.sub("ū", "u", this_string)
    this_string = re.sub("ŭ", "u", this_string)
    this_string = re.sub("ȳ", "y", this_string)
    this_string = re.sub("ў", "y", this_string)
    this_string = re.sub("Ā", "A", this_string)
    this_string = re.sub("Ă", "A", this_string)
    this_string = re.sub("Ē", "E", this_string)
    this_string = re.sub("Ĕ", "E", this_string)
    this_string = re.sub("Ī", "I", this_string)
    this_string = re.sub("Ĭ", "I", this_string)
    this_string = re.sub("Ō", "O", this_string)
    this_string = re.sub("Ŏ", "O", this_string)
    this_string = re.sub("Ū", "U", this_string)
    this_string = re.sub("Ŭ", "U", this_string)
    this_string = re.sub("Ȳ", "Y", this_string)
    this_string = re.sub("Ў", "Y", this_string)
    return(this_string)

# Path to "collatinus" directory:
this_dir = os.path.abspath("/Users/frromain/Doc/Langues/Latin/latin-ecclesiastic-accents/accenteur/collatinus/")

# Delete the contents of data.js:
this_file = open(this_dir + "/../js/data.js", "w", encoding="utf-8")
this_file.write("// This script has been written by collatinus/jsonify.py and creates JS Objects from the Collatinus' data.\n\n");
this_file.close()


####################################    

# Reading of modeles.la :
models = read_this_file(this_dir + "/modeles.la")
models_lines = models.split("\n")

models = dict()
roots = dict()
terminations = dict()
common_terminations = dict()
key = ""
father = ""
for l in models_lines:
    if not(l.startswith("!")):
        # Common terminations, which will be reused later:
        if(l.startswith("$")):
            key_common = l.split("=")[0][0:]
            common_terminations[key_common] = l.split("=")[1].split(";")

        # Name of the model:
        elif(l.startswith("modele:")):
            key = l.split(":")[1]

        # Father:
        elif(l.startswith("pere:")):
            father = l.split(":")[1]
            roots = models[father]["roots"].copy() # Roots inherited from the father.
            terminations = models[father]["terminations"].copy() # Term. inherited from the father.
        
        # Roots (roots[num of the root] = [characters to delete, characters to add]):
        elif(l.startswith("R:")):
            roots[l.split(":")[1]] = l.split(":")[2].split(",")
        
        # Terminations (terminations[num] = [num_rad, termination]):
        elif(l.startswith("des") or l.startswith("abs")):
            add_term = True if l.startswith("des+") else False
            rm_term = True if l.startswith("abs") else False
            terms_range = l.split(":")[1]
            if(len(l.split(":")) > 2): # If not a "abs:" line.
                terms_root = l.split(":")[2]
                terms_list = l.split(":")[3].split(";")
                terms_list_repl = terms_list.copy()
                for t in terms_list:
                    match = re.search(r"([\w]*)(\$[\w]*)", t)
                    if match:
                        comm_terms = common_terminations[match.group(2)].copy()
                        terms_list_repl.remove(t)
                        for ct in comm_terms:
                            ct = match.group(1) + ct
                            terms_list_repl.append(ct)
                terms_list = terms_list_repl.copy()
            subranges = terms_range.split(",")
            i = 0
            for s in subranges:
                if("-" in s):
                    for t in range(int(s.split("-")[0]), int(s.split("-")[1]) + 1): # for t in range(1, 6): (if range = "1,5").
                        if not(add_term):
                            terminations[str(t)] = dict() # If the model doesn't inherit from a father, we create a termination.
                        if(rm_term):
                            del terminations[str(t)]
                        else:
                            if(terms_list[0] == "-"):
                                terminations[str(t)][terms_root] = "-" # No termination.
                            else:
                                terminations[str(t)][terms_root] = terms_list[i] # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                        i += 1
                else:
                    if not(add_term):
                        terminations[s] = dict() # If the model doesn't inherit from a father, we create a termination.
                    if(rm_term):
                        del terminations[s]
                    else:
                        if(terms_list[0] == "-"):
                            terminations[s][terms_root] = "-" # No termination.
                        else:
                            terminations[s][terms_root] = terms_list[i] # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                    i += 1

        # If we find an empty line, then we make the synthesis of the model
        # and we reinitialize the data:
        elif(l == "") and (key != ""):
            models[key] = dict(roots = roots.copy(), terminations = terminations.copy())
            key = ""
            father = ""
            terminations.clear()
            roots.clear()

# Insert models into data.js:
json_path = open(this_dir + "/../js/data.js", "a", encoding="utf-8")
json_path.write("var models = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(models))
json_path.write(";\n\n");
json_path.close()


# Reading of lemmes.la:
#lemmes = read_this_file(this_dir + "/lemmes.la")
#lemmes_lines = lemmes.split("\n")
#
# Roots:
#roots = dict()
#for l in lemmes_lines:
#    if not(l.startswith("!")) and not(l == ""):
#        splinters = l.split("|")
#        for s in splinters[0].split("="):
#            roots[atone(s)] = dict(root = s, model = splinters[1], num_root = 0)
#        for i in range(2, 4):
#            s = splinters[i]
#            roots[atone(s)] = dict(root = s, model = splinters[1], num_root = i)
#
#
## Insert roots into data.js::
#json_path = open(this_dir + "/../js/data.js", "a", encoding="utf-8")
#json_path.write("var roots = ");
#json_path.write(json.JSONEncoder(ensure_ascii = False).encode(roots))
#json_path.write(";\n\n");
#json_path.close()
#
#
#
#
#
#
#
