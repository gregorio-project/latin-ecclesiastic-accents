#!/usr/bin/env python3

# This script pasts the data files (roots.txt, terminations.txt)
# in 'accenteur/accenteur_data.js' as JS-readable Objects.
# It must be launched after every modification of the data files.

import os
import re

this_dir = os.path.abspath(".")

# Read the source files:
this_file = open(this_dir + "/roots.txt", "r", encoding="utf-8")
roots = re.sub("\n\n", "", this_file.read());
this_file.close()

this_file = open(this_dir + "/terminations.txt", "r", encoding="utf-8")
terminations = re.sub("\n\n", "", this_file.read());
this_file.close()

# Clean the target file:
json_path = open(this_dir + "/../accenteur_data.js", "w", encoding="utf-8")
json_path.write("// This JS script was written by the script 'accenteur/data/data_to_js.py'.\n\n");
json_path.close()

# Write the target file:
json_path = open(this_dir + "/../accenteur_data.js", "a", encoding="utf-8")
json_path.write("var roots = {");
json_path.write(roots)
json_path.write("};\n\n");
json_path.write("var terminations = {");
json_path.write(terminations)
json_path.write("};\n\n");
json_path.close()






