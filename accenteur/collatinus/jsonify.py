#!/usr/bin/env python3

# This script converts the Collatinus data files (lemmes.la, modeles.la etc.)
# into Javascript objects.

import os
import re 
from copy import deepcopy # For copying compound objects.
import unicodedata
import json 

def read_this_file(file_path):
    this_file = open(file_path, "r", encoding="utf-8")
    file_contents = this_file.read();
    this_file.close()
    return(file_contents)

def atone(this_string):
    # We reduce the common vowels to long (common = long + combining breve) deleting the combining breve:
    this_string = re.sub("\u0306", "", this_string)
    # Long, breve:
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



#######################################################################################

# Reading of modeles.la to create dicts of models and terminations:
models = read_this_file(this_dir + "/modeles.la")
models_lines = models.split("\n")

# Models (model: {{roots}, {terminations}}):
models = dict()
roots_tmp= dict()
terms_tmp= dict()
common_terms = dict()
key = ""
father = ""
for l in models_lines:
    if not(l.startswith("!")):
        # Common terms, which will be reused later:
        if(l.startswith("$")):
            key_common = l.split("=")[0][0:]
            common_terms[key_common] = l.split("=")[1].split(";")

        # Name of the model:
        elif(l.startswith("modele:")):
            key = l.split(":")[1]

        # Father:
        elif(l.startswith("pere:")):
            father = l.split(":")[1]
            models[key] = dict()
            # Roots and terminations inherited from the father:
            models[key]["roots"] = deepcopy(models[father]["roots"])
            models[key]["terms"] = deepcopy(models[father]["terms"])
            roots_tmp = deepcopy(models[key]["roots"])
            terms_tmp = deepcopy(models[key]["terms"]) 

        # Roots (roots[num of the root] = [characters to delete, characters to add]):
        elif(l.startswith("R:")):
            if(l.split(":")[2] == "K"):
                roots_tmp[int(l.split(":")[1])] = "K"
            elif(l.split(":")[2] == "-"):
                roots_tmp[int(l.split(":")[1])] = "-"
            elif(len(l.split(":")[2].split(",")) == 1):
                roots_tmp[int(l.split(":")[1])] = [l.split(":")[2].split(",")[0], "0"]
            else:
                roots_tmp[int(l.split(":")[1])] = [l.split(":")[2].split(",")[0], l.split(":")[2].split(",")[1]]

        # Terminations (terms[num] = [num_rad, termination]):
        elif(l.startswith("des") or l.startswith("abs")):
            add_term = True if l.startswith("des+") else False
            rm_term = True if l.startswith("abs") else False
            terms_range = l.split(":")[1]
            if(len(l.split(":")) > 2): # If not an "abs:" line.
                terms_root = l.split(":")[2]
                terms_list = l.split(":")[3].split(";")
                # We append common terminations ($uita, $lupus etc.):
                terms_list_common = deepcopy(terms_list)
                for t in terms_list:
                    match = re.search(r"([\w]*)(\$[\w]*)", t) # For ex. "issim$lupus".
                    if match:
                        comm_terms = deepcopy(common_terms[match.group(2)])
                        terms_list_common.remove(t)
                        for ct in comm_terms:
                            ct = match.group(1) + ct
                            terms_list_common.append(ct)
                terms_list = deepcopy(terms_list_common)

            subranges = terms_range.split(",")
            i = 0
            for s in subranges:
                if("-" in s):
                    for t in range(int(s.split("-")[0]), int(s.split("-")[1]) + 1): # "for t in range(1, 6)" (if range = "1,5").
                        if not(add_term):
                            terms_tmp[str(t)] = [] # If the model doesn't inherit from a father, we create a terminations' list.
                        if(rm_term):
                            del terms_tmp[str(t)]
                        else:
                            if(terms_list[0] == "-"):
                                terms_tmp[str(t)].append("-") # No termination.
                            else:
                                terms_tmp[str(t)].append([terms_root, terms_list[i]]) # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                        i += 1
                else:
                    if not(add_term):
                        terms_tmp[s] = [] # If the model doesn't inherit from a father, we create a terminations' list.
                    if(rm_term):
                        del terms_tmp[s]
                    else:
                        if(terms_list[0] == "-"):
                            terms_tmp[s].append("-") # No termination.
                        else:
                            terms_tmp[s].append([terms_root, terms_list[i]]) # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                    i += 1

        # If we find an empty line, then we make the synthesis of the model
        # and we reinitialize the data:
        elif(l == "") and (key != ""):
            models[key] = dict(roots = deepcopy(roots_tmp), terms = deepcopy(terms_tmp))
            key = ""
            father = ""
            terms_tmp.clear()
            roots_tmp.clear()

# Terminations (terminations[term]: {[model, num_root]: quantified, …}: 
terminations = dict()
for m in models:
    terms_model = models[m]["terms"]
    for t in terms_model.values():
        for sub_term in t: # Returns a list of [num_root, term(s)] (or "-").
            if sub_term != "-":
                for sub_sub_term in sub_term[1].split(","):
                    if atone(sub_sub_term) in terminations:
                        terminations[atone(sub_sub_term)].append([m, sub_term[0], sub_sub_term])
                    else:
                        terminations[atone(sub_sub_term)] = []
                        terminations[atone(sub_sub_term)].append([m, sub_term[0], sub_sub_term])



#######################################################################################

# Reading of lemmes.la to create a dict of roots:
lemmes = read_this_file(this_dir + "/lemmes.la")
lemmes_lines = lemmes.split("\n")

# Roots (roots[root] = [root, model, num_root]):
roots = dict()
for l in lemmes_lines:
    if not (l.startswith("!") or l == ""):
        splinters = l.split("|")
        model = models[splinters[1]]
        canonical = splinters[0].split("=")[1] if "=" in splinters[0] else splinters[0]
        canonical = canonical[0:-1] if canonical.endswith("2") else canonical
        for c in canonical.split(","): # The canonical form can have two words ('vultur,voltur').
            for num_root in model["roots"]:
                if splinters[1] == "inv":
                    root0 = c
                elif model["roots"][num_root][0] == "K":
                    root0 = c
                elif model["roots"][num_root][0] == "-":
                    root0 = c
                else:
                    del_part = int(model["roots"][num_root][0])
                    add_part = model["roots"][num_root][1]
                    root0 = (c[0:-int(del_part)] if del_part != 0 else c) + (add_part if add_part != "0" else "")
                if not (atone(root0) in roots):
                    roots[atone(root0)] = []
                # Append a new root:
                roots[atone(root0)].append([root0, splinters[1], num_root])

        # Roots 1 and 2:
        if splinters[2] != '':
            if not (atone(splinters[2]) in roots or atone(splinters[2]) == ""):
                roots[atone(splinters[2])] = []
            roots[atone(splinters[2])].append([splinters[2], splinters[1], 1])
        if splinters[3] != '':
            if not (atone(splinters[3]) in roots or atone(splinters[3]) == ""):
                roots[atone(splinters[3])] = []
            roots[atone(splinters[3])].append([splinters[3], splinters[1], 2])

# Write roots and terminations in data.js::
json_path = open(this_dir + "/../js/data.js", "a", encoding="utf-8")
json_path.write("var models = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(models))
json_path.write(";\n\n");
json_path.write("var roots = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(roots))
json_path.write(";\n\n");
json_path.write("var terminations = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(terminations))
json_path.write(";\n\n");
json_path.close()






