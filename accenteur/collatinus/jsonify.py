#!/usr/bin/env python3

# This script converts the Collatinus data files (lemmes.la, models.la etc.)
# into Javascript objects.

import os
import re 
import unicodedata
import json 

def read_this_file(file_path):
    this_file = open(file_path, "r", encoding="utf-8")
    file_contents = this_file.read();
    this_file.close()
    return(file_contents)

def atone(this_string):
    # Long, breve, common (common = (vowel + long) + breve).
    this_string = re.sub("ā", "a", this_string)
    this_string = re.sub("ă", "a", this_string)
    this_string = re.sub("ā\u0306", "a", this_string)
    this_string = re.sub("ē", "e", this_string)
    this_string = re.sub("ĕ", "e", this_string)
    this_string = re.sub("ē\u0306", "e", this_string)
    this_string = re.sub("ī", "i", this_string)
    this_string = re.sub("ĭ", "i", this_string)
    this_string = re.sub("ī\u0306", "i", this_string)
    this_string = re.sub("ō", "o", this_string)
    this_string = re.sub("ŏ", "o", this_string)
    this_string = re.sub("ō\u0306", "o", this_string)
    this_string = re.sub("ū", "u", this_string)
    this_string = re.sub("ŭ", "u", this_string)
    this_string = re.sub("ū\u0306", "u", this_string)
    this_string = re.sub("ȳ", "y", this_string)
    this_string = re.sub("ў", "y", this_string)
    this_string = re.sub("ȳ\u0306", "y", this_string)
    this_string = re.sub("Ā", "A", this_string)
    this_string = re.sub("Ă", "A", this_string)
    this_string = re.sub("Ā\u0306", "A", this_string)
    this_string = re.sub("Ē", "E", this_string)
    this_string = re.sub("Ĕ", "E", this_string)
    this_string = re.sub("Ē\u0306", "E", this_string)
    this_string = re.sub("Ī", "I", this_string)
    this_string = re.sub("Ĭ", "I", this_string)
    this_string = re.sub("Ī\u0306", "I", this_string)
    this_string = re.sub("Ō", "O", this_string)
    this_string = re.sub("Ŏ", "O", this_string)
    this_string = re.sub("Ō\u0306", "O", this_string)
    this_string = re.sub("Ū", "U", this_string)
    this_string = re.sub("Ŭ", "U", this_string)
    this_string = re.sub("Ū\u0306", "U", this_string)
    this_string = re.sub("Ȳ", "Y", this_string)
    this_string = re.sub("Ў", "Y", this_string)
    this_string = re.sub("Ȳ\u0306", "Y", this_string)
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

# Models (model: {{roots}, {terminations}}):
models = dict()
roots = dict()
terms = dict()
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
            roots = models[father]["roots"].copy() # Roots inherited from the father.
            terms = models[father]["terms"].copy() # Term. inherited from the father.
        
        # Roots (roots[num of the root] = [characters to delete, characters to add]):
        elif(l.startswith("R:")):
            if(l.split(":")[2] == "K"):
                roots[int(l.split(":")[1])] = "K"
            elif(l.split(":")[2] == "-"):
                roots[int(l.split(":")[1])] = "-"
            elif(len(l.split(":")[2].split(",")) == 1):
                roots[int(l.split(":")[1])] = [int(l.split(":")[2].split(",")[0]), 0]
            else:
                roots[int(l.split(":")[1])] = [int(l.split(":")[2].split(",")[0]), l.split(":")[2].split(",")[1]]

        # terms (terms[num] = [num_rad, termination]):
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
                        comm_terms = common_terms[match.group(2)].copy()
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
                            terms[str(t)] = dict() # If the model doesn't inherit from a father, we create a termination.
                        if(rm_term):
                            del terms[str(t)]
                        else:
                            if(terms_list[0] == "-"):
                                terms[str(t)][terms_root] = "-" # No termination.
                            else:
                                terms[str(t)][terms_root] = terms_list[i] # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                        i += 1
                else:
                    if not(add_term):
                        terms[s] = dict() # If the model doesn't inherit from a father, we create a termination.
                    if(rm_term):
                        del terms[s]
                    else:
                        if(terms_list[0] == "-"):
                            terms[s][terms_root] = "-" # No termination.
                        else:
                            terms[s][terms_root] = terms_list[i] # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                    i += 1

        # If we find an empty line, then we make the synthesis of the model
        # and we reinitialize the data:
        elif(l == "") and (key != ""):
            models[key] = dict(roots = roots.copy(), terms = terms.copy())
            key = ""
            father = ""
            terms.clear()
            roots.clear()


####################################    

# Creation of a dict of terminations (terminations[term]: {model, num_root}: 
terminations = dict()
for m in models:
    terms_model = models[m]["terms"]
    for t in terms_model.values():
        for num, term in t.items():
            for sub_term in term.split(","):
                terminations[atone(sub_term)] = {"model": m, "num_rad": num, "quantified": sub_term}
                
# Write terminations in data.js::
json_path = open(this_dir + "/../js/data.js", "a", encoding="utf-8")
json_path.write("var terminations = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(terminations))
json_path.write(";\n\n");
json_path.close()


####################################    

# Reading of lemmes.la:
lemmes = read_this_file(this_dir + "/lemmes.la")
lemmes_lines = lemmes.split("\n")

# Roots (roots[root] = {"model": model, "rate": rate}):
roots = dict()
for l in lemmes_lines:
    if not(l.startswith("!") or l == ""):
        splinters = l.split("|")
        canonical = splinters[0].split("=")[1] if "=" in splinters[0] else splinters[0]
        for c in canonical.split(","): # The canonical form can have two words ('vultur,voltur').
            model = models[splinters[1]]
            for r in model["roots"]: # => {num_root: [delete, add]}.
                if r == 0 or r > 2:
                    if(model["roots"][r][0] == "K"):
                        canonical = canonical
                    elif(model["roots"][r][0] == "-"):
                        canonical = canonical
                    else:
                        root0 = canonical[0:-model["roots"][r][0]]
                        roots[atone(root0)] = dict()
                        roots[atone(root0)]["quantified"] = root0
                        roots[atone(root0)]["num_root"] = r
                        roots[atone(root0)]["model"] = splinters[1]
                        roots[atone(root0)]["rate"] = splinters[5]

        """
        if(splinters[2] != ''):
            roots[atone(splinters[2])] = dict()
            roots[atone(splinters[2])]["quantified"] = splinters[2]
            roots[atone(splinters[2])]["num_root"] = 1
            roots[atone(splinters[2])]["model"] = splinters[1]
            roots[atone(splinters[2])]["rate"] = splinters[5]
        if(splinters[3] != ''):
            roots[atone(splinters[3])] = dict()
            roots[atone(splinters[3])]["quantified"] = splinters[3]
            roots[atone(splinters[3])]["num_root"] = 2
            roots[atone(splinters[3])]["model"] = splinters[1]
            roots[atone(splinters[3])]["rate"] = splinters[5]
        """

# Write roots in data.js::
json_path = open(this_dir + "/../js/data.js", "a", encoding="utf-8")
json_path.write("var roots = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(roots))
json_path.write(";\n\n");
json_path.close()







