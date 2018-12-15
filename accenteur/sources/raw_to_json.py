#!/usr/bin/env python3

# This script converts the source files (lemmes.la and modeles.la)
# into 3 JSON Objects (models, roots and terminations) in the global data file 'accenteur_data.json'.

import os
import re 
from copy import deepcopy # For copying compound objects.
import unicodedata
import json 


#######################################################################################

# Generic functions:

# Opens a file and returns his content:
def read_this_file(file_path):
    this_file = open(file_path, "r", encoding="utf-8")
    file_contents = this_file.read();
    this_file.close()
    return(file_contents)

# Returns the atone version of a word:
def atone(this_string):
    # We reduce the common vowels to long deleting the combining breve (common = long + combining breve):
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

# Adds the quantity "long" to the vowels which are long by position (of course if they haven't any length indicated):
# Rule:
# If a vowel is followed by two consonantics, it is long by position.
# Exception:
# If the 1st consonantic is a 'begadkefat' (hebrew mnemonic), i.e. is in [bgdcpt],
# and the 2d one is a 'liquid', i.e. is in [lr], then the vowel is common (and thus treated as breve in ecclesiastic context).
def long_by_position(word):
    vowels = ["a", "e", "i", "o", "u", "y"]
    longs = ["ā", "ē", "ī", "ō", "ū", "ȳ"]
    consonantics = ["b", "c", "d", "f", "g", "l", "m", "n", "p", "r", "s", "t", "x", "z"]
    begadkefat = ["b", "g", "d", "c", "p", "t"]
    liquids = ["l", "r"]
    for c in range(len(word) - 2):
        if word[c] in vowels:
            if (word[c + 1] in consonantics and word[c + 2] in consonantics) and not (word[c + 1] in begadkefat and word[c + 2] in liquids):
                if not ((word[c] == "e") and (word[c - 1] in ["ā", "ō"])): #If "āe" or "ōe", don't set "e" long.
                    word = word[:c] + longs[vowels.index(word[c])] + word[c + 1:]
    return word

# Path to the main directory:
accenteur_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Delete the contents of accenteur_data.js:
this_file = open(accenteur_dir + "/accenteur_data.js", "w", encoding="utf-8")
this_file.write("");
this_file.close()



#######################################################################################

# Reading of modeles.la to create dicts of models and terminations:
models = read_this_file(accenteur_dir + "/sources/modeles.la")
models_lines = models.split("\n")



#######################################################################################

# We write models (model: {{roots}, {terminations}}).
# Models in sources/modeles.la are of this form:
# modele:deus // Name of the model.
# pere:lupus  // Father.
# R:2:3,0     // Root:num:delete,add.
# des:2:1:ŭs  // Terminations:num_term:num_root:term.
# des+:7,8,11,12:2:ĭī,ī;ĭī,ī;ĭīs,īs;ĭīs,īs // Terminations added to the father.
models = dict()
roots_tmp = dict()
terms_tmp = dict()
common_terms = dict()
key = ""
father = ""
for l in models_lines:
    if not(l.startswith("!")):
        # Common terms, which will be reused later:
        if l.startswith("$"):
            key_common = l.split("=")[0][0:]
            common_terms[key_common] = l.split("=")[1].split(";")

        # Name of the model:
        elif l.startswith("modele:"):
            key = l.split(":")[1]

        # Father:
        elif l.startswith("pere:"):
            father = l.split(":")[1]
            models[key] = dict()
            # Roots and terminations inherited from the father:
            models[key]["roots"] = deepcopy(models[father]["roots"])
            models[key]["terms"] = deepcopy(models[father]["terms"])
            roots_tmp = deepcopy(models[key]["roots"])
            terms_tmp = deepcopy(models[key]["terms"]) 

        # Roots (roots[num of the root] = [characters to delete, characters to add]):
        elif l.startswith("R:"):
            if l.split(":")[2] == "K":
                roots_tmp[int(l.split(":")[1])] = "K"
            elif l.split(":")[2] == "-":
                roots_tmp[int(l.split(":")[1])] = "-"
            elif len(l.split(":")[2].split(",")) == 1:
                roots_tmp[int(l.split(":")[1])] = [l.split(":")[2].split(",")[0], "0"]
            else:
                roots_tmp[int(l.split(":")[1])] = [l.split(":")[2].split(",")[0], l.split(":")[2].split(",")[1]]

        # Terminations (terms[num] = [num_rad, termination]):
        elif l.startswith("des") or l.startswith("abs"):
            add_term = True if l.startswith("des+") else False
            rm_term = True if l.startswith("abs") else False
            terms_range = l.split(":")[1]
            if len(l.split(":")) > 2: # If not an "abs:" line.
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
                if "-" in s:
                    for t in range(int(s.split("-")[0]), int(s.split("-")[1]) + 1): # "for t in range(1, 6)" (if range = "1,5").
                        if not(add_term):
                            terms_tmp[str(t)] = [] # If the model doesn't inherit from a father, we create a terminations' list.
                        if rm_term:
                            del terms_tmp[str(t)]
                        else:
                            if terms_list[0] == "-":
                                terms_tmp[str(t)].append("-") # No termination.
                            else:
                                terms_tmp[str(t)].append([terms_root, terms_list[i]]) # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                        i += 1
                else:
                    if not(add_term):
                        terms_tmp[s] = [] # If the model doesn't inherit from a father, we create a terminations' list.
                    if rm_term:
                        del terms_tmp[s]
                    else:
                        if terms_list[0] == "-":
                            terms_tmp[s].append("-") # No termination.
                        else:
                            terms_tmp[s].append([terms_root, terms_list[i]]) # Be careful: sometimes last term is missing in some models ("ibus" once for both dat. and abl. plur.).
                    i += 1

        # If we find an empty line, then we make the synthesis of the model
        # and we reinitialize the data:
        elif l == "" and key != "":
            models[key] = dict(roots = deepcopy(roots_tmp), terms = deepcopy(terms_tmp))
            key = ""
            father = ""
            terms_tmp.clear()
            roots_tmp.clear()



#######################################################################################

# We write a dict of terminations (terminations[term] = [quantified, model, num_root]): 
terminations = dict()
for m in models:
    terms_model = models[m]["terms"]
    for t in terms_model.values():
        for sub_term in t: # Returns a list of [num_root, term(s)] (or "-").
            if sub_term != "-":
                for term_quantified in sub_term[1].split(","):
                    if atone(term_quantified) in terminations:
                        terminations[atone(term_quantified)].append([term_quantified, m, int(sub_term[0])])
                    else:
                        terminations[atone(term_quantified)] = []
                        terminations[atone(term_quantified)].append([term_quantified, m, int(sub_term[0])])



#######################################################################################

# Reading of lemmes.la to create a dict of roots:
lemmes = read_this_file(accenteur_dir + "/sources/lemmes.la")
lemmes_lines = lemmes.split("\n") # Lemmes' lines look like this: "canonical form | model | root1 | root2 | terminations | rate. Only the 4 first fields interest us.



#######################################################################################

# We write a dict of roots (roots[root] = [root, model, num_root]):
roots = dict()
for l in lemmes_lines:
    if not (l.startswith("!") or l == ""):
        splinters = l.split("|")
        model = models[splinters[1]]
        # The canonical form can be something like this: "ā=ā,ăb,ābs". In this case, we prefer the word on the right side of the "=" sign and we remove the left-positionned one if their plain forms are the same (because the right one is more quantified), and we conserve all the words separated by comma.
        canonicals = splinters[0].split("=")
        if len(canonicals) > 1 and atone(canonicals[0]) == atone(canonicals[1].split(",")[0]):
            canonicals.pop(0)
        for canonical in canonicals:
            canonical = canonical[0:-1] if (canonical.endswith("2") or canonical.endswith("3") or canonical.endswith("4")) else canonical
            for c in canonical.split(","):
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
                    roots[atone(root0)].append([long_by_position(root0), splinters[1], num_root])

        # Roots 1 and 2:
        if splinters[2] != '':
            for splinter in splinters[2].split(","):
                if not (atone(splinter) in roots):
                    roots[atone(splinter)] = []
                roots[atone(splinter)].append([long_by_position(splinter), splinters[1], 1])
        if splinters[3] != '':
            for splinter in splinters[3].split(","):
                if not (atone(splinter) in roots):
                    roots[atone(splinter)] = []
                roots[atone(splinter)].append([long_by_position(splinter), splinters[1], 2])



#######################################################################################

# Finally, we write models, roots and terminations in the data file as JSON Objects:
json_path = open(accenteur_dir + "/accenteur_data.js", "a", encoding="utf-8")
json_path.write("//##### Models #####\n\nvar models = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(models))
json_path.write("\n\n\n");
json_path.write("//##### Roots #####\n\nvar roots = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(roots))
json_path.write("\n\n\n");
json_path.write("//##### Terminations #####\n\nvar terminations = ");
json_path.write(json.JSONEncoder(ensure_ascii = False).encode(terminations))
json_path.write("\n\n");
json_path.close()

