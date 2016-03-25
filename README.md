# latin-ecclesiatic-accents

This repository contains resources for ecclesiastic accentuation.

The goal is to have the largest possible list of accentuated words with the ecclesiastic rules, allowing a text to be accentuated (almost) automatically.

## Orthography

When relevant, the words in the list should use *j*, *v*, *æ*, *œ* (not *i*, *u*, *ae*, *oe*), allowing easy translation towards another system.

## Rules

The rules for accentuation are extremly simple at first sight:

- at most one acute accent per word
- only words of 3 syllables or more are accentuated
- the accent is on the penultimate syllable if it is strong
- the accent is on the antepenultimate syllable if the penultimate is not strong

Knowing the vowels strenght, one must determine the syllable boundaries and strength, but we're not sure yet how to do so... An interesting starting point is chapter 6 of *Vox Latina, A Guide to the Pronunciation of Classical Latin* by W.S. Allen.

## Files

- [verbs.txt](verbs.txt) was provided by M. Philippe Verkerk, it was automatically built and thus may contain errors

## Thanks

This work would not have been possible without the following persons/institutions:

- the Abbey of Flavigny (FR), for having the project started
- M. Gérard Gréco and the whole team behind the 2016 Edition of the Gaffiot Latin-French dictionnary, whose help was fundamental
- M. Philippe Verkerk and M. Yves Ouvrard, for helping us directly and through [collatinus](http://outils.biblissima.fr/collatinus/)
- the Abbey of Le Barroux (FR)

## Licence

All the documents and resources in this repository are under the [CC0](https://creativecommons.org/publicdomain/zero/1.0/) licence.